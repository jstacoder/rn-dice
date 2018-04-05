import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { Constants } from 'expo';
//import { Button } from 'react-native-elements'; // 0.19.0
import {
  Button,
  Card,
  CardItem,
  Body,
  Text,
  Icon,
  Container,
  Header,
  Content,
  H2,
  Right
} from 'native-base'; // 2.4.1
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Col, Row, Grid } from 'react-native-easy-grid'; // 0.1.17
// import { Random } from 'boardgame.io/core'; // 0.21.5
import { scoreRoll } from './scoring/score-roll'


import { ResetContext } from './App'

const dieStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 85,
  alignText: 'center',
  height: 85,
  // marginLeft: 15,
  // marginRight: 15,
  // marginBottom: 10,
};

const textStyle = {
  fontSize: 32,
};

const Die = props => (
  props.value && (
  <TouchableOpacity onPress={()=>props.held ? props.unHold() : props.hold()} underlayColor="blue">
    {/* <Card style={dieStyle}> */}
      {/* <CardItem cardBody> */}        
          <MaterialCommunityIcons style={{marginTop:0,marginRight:0, width: null, flex: 1,marginBottom:0, marginLeft:0}} size={106} color={props.held ? 'lightgrey': 'grey'} name={`dice-${props.value}`}/>                
      {/* </CardItem> */}
    {/* </Card> */}
  </TouchableOpacity>
  ) || null
);

const roll = (n=6) => Array(n).fill(0).map(_=> (parseInt(Math.random() * 6) + 1)+_)
const removeIdx = (lst, idx) => [...lst.filter((itm,i)=>i!==idx)]

export default class BaseBoard extends Component {
  state = BaseBoard.resetState()
  
  static resetHeldMap = (n) =>{
    let rtn = {}
    for(let i = 0; i < n; i++){
      rtn[i] = false
    }
    return rtn
  }
  static resetState = (scores=[]) =>({ hasHeld: false, scores, dice: Array(6).fill(1), held: [], heldMap: BaseBoard.resetHeldMap(6) })
  getHeldScore = () =>{
    const held = this.state.dice.filter((d, i)=> this.state.heldMap[i])
    return scoreRoll(held)
  }
  getRunningScore = (score = 0) =>{
    return this.state.scores.reduce((prev, curr)=> curr.score + prev, score) + this.getHeldScore()
  }
  getTempScore = score => {
    return this.getRunningScore(score)
  }
  roll = () => {
    let dice = [...this.state.dice]
    let held = []
    let scores = [...this.state.scores]
    
    let rollCount = dice.length
    Object.keys(this.state.heldMap).forEach(itm=>{
      if(this.state.heldMap[itm]){
        held.push(dice[itm])
        rollCount = rollCount - 1
      }
    })
    if(held.length){
      let score = {score: scoreRoll(held), held}    
      scores.push(score)
    }
    const newDice = roll(rollCount||6)
    const cid = setInterval(()=>{
      this.setState({scores: [...scores], dice: roll(rollCount||6) , heldMap: BaseBoard.resetHeldMap(rollCount||6)});
    },100)
    setTimeout(()=>{
      this.setState({scores: [...scores], dice: [...newDice]})
      clearInterval(cid)
    }, 2500)    
  }
  endTurn = () =>{
    this.setState({...BaseBoard.resetState()})
    this.props.events.endTurn()
  }
  unHold = idx=>{
    this.setState({heldMap: {...this.state.heldMap, [idx]: false}},()=>{
      if(Object.keys(this.state.heldMap).filter(x=>this.state.heldMap[x]).length==0){
        this.setState({hasHeld: false})
      }
    })
  }
  hold = (die, idx) =>{
    let dice = [...this.state.dice.map((d,i)=>{
      if(this.state.heldMap[i]){
        return undefined
      }
      return d
    })]
            
    if(idx > -1){
      this.setState({heldMap: {...this.state.heldMap, [idx]: true}},()=>{
        if(Object.keys(this.state.heldMap).filter(x=>this.state.heldMap[x]).length>0){
          this.setState((prevState, props)=>{
            if(!prevState.hasHeld){
              return {hasHeld: true}
            }
          })
        }
      })
    }
  }
  renderDice = () => {
    const [die1, die2, die3, die4, die5, die6] = this.state.dice;
    const topRow = [die1, die2, die3]
    const bottomRow = [die4, die5, die6]
    let rtn = (
      <Col>
        <Row>          
          <React.Fragment>                  
          <Row size={3}><Text>{' '}</Text></Row>
          {topRow.map((die, idx)=>(
            <Die value={die} key={`dieset1-${idx}`} unHold={()=>this.unHold(idx)} hold={()=>this.hold(die,idx)} held={this.state.heldMap[idx]} />
          ))}                              
          <Row size={3}><Text /></Row>
          </React.Fragment>
        </Row>
        <Row>
        <React.Fragment> 
          <Row size={3}><Text>{' '}</Text></Row>
          {bottomRow.map((die, idx)=>(
            <Die value={die} key={`dieset2-${idx}`} unHold={()=>this.unHold(idx+3)} hold={()=>this.hold(die,idx+3)} held={this.state.heldMap[idx+3]} />
          ))}                              
          <Row size={3}><Text>{' '}</Text></Row>
          </React.Fragment> 
        </Row>
      </Col>
    )
    return rtn;
  };
  keepScore = () => {
    this.props.moves.keepScore(this.getTempScore(this.props.G.scores[this.props.ctx.currentPlayer]))
    this.endTurn()
  }
  render() {
    return (
      <ResetContext.Consumer>
        {setPlayers =>(
      <Container>
        <Header />
        <Content>
          <Grid>
            <Row>
              <Col>
              {this.props.G.scores.map((score, idx)=>(
              <Row key={`plyer-score-${idx}`}>
                
                <Card>
                  <CardItem>
                    <H2>Player: {idx+1}</H2><Right><H2>{score}</H2></Right>
                  </CardItem>                  
                </Card>
                
                </Row>
                ))}
                <Row>
                <Card>
                  <CardItem>
                    <H2>running score</H2><Right><H2>{this.getRunningScore()}</H2></Right>                    
                  </CardItem>
                  <CardItem>
                    <H2>current player</H2><Right><H2>{(this.props.ctx.currentPlayer*1)+1}</H2></Right>
                  </CardItem>                  
                </Card>
              </Row>                         
                <Row size={3}><Text>{' '}</Text></Row>
                <Button full onPress={this.roll}><Text>Roll</Text></Button>
                <Row size={3}><Text>{' '}</Text></Row>
                {this.renderDice()}
                <Row size={3}><Text>{' '}</Text></Row>
                {this.state.hasHeld&&(this.getTempScore(this.props.G.scores[this.props.ctx.currentPlayer]) >= 1000)&&( 
                <Button full success onPress={this.keepScore}><Text>Keep Score</Text></Button>
               
                )||(
                <Button full danger onPress={this.endTurn}><Text>End Turn</Text></Button>
               
                )}
                 <Row size={3}><Text>{' '}</Text></Row>                
                 <Button full danger onPress={()=>setPlayers(0)}><Text>reset</Text></Button>
              </Col>
            </Row>
            {/* <Text>{JSON.stringify(this.props.G)}</Text>
            <Text>{JSON.stringify(this.props.ctx)}</Text>
            <Text>{JSON.stringify(this.state.held)}</Text>
            <Text>{JSON.stringify(this.state.scores)}</Text>
            <Text>{this.getTempScore(this.props.G.scores[this.props.ctx.currentPlayer])}</Text> */}
          </Grid>
        </Content>
      </Container>
      )}
      </ResetContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})