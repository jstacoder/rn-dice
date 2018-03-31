import React, { Component } from 'react'
import { View, Text, TouchableHighlight, Button } from 'react-native'
import { Random } from 'boardgame.io/core'

import Die from './Die'

export default class Board extends Component {
  state = {
    held: [false,false,false,false,false,false]
  }
  updateHeld = (idx, val) =>{
    this.setState((prevState, props)=>{
      return {
          held: prevState.held.map((itm, i)=>{
          if(i!==idx){
            return itm
          }
          return val
        })
      }
    }, ()=>{
      const die = this.props.G.dice[idx]
      if(this.state.held[idx]){
        this.props.moves.addHeld(idx, die)
      }else{
        this.props.moves.removeHeld(idx, die)
      }

    })
  }
  render(){
    return (
      <View style={{flex:1}}>
        <Text>Game</Text>
        <Text>player: {this.props.ctx.currentPlayer}</Text>
        <Text>turn: {this.props.ctx.turn}</Text>
        {/* <Button title="next" onPress={()=>this.props.events.endTurn()}/> */}
        <View style={{minHeight: 70, flex: 1, borderWidth: 1, paddingTop:10, paddingBottom: 8, borderColor: 'black'}}>
            <Button title="roll" style={{width: 20, height: 10, flex: 1,borderColor: 'black', borderWidth: 1, marginVertical: 20}} onPress={()=>this.props.moves.roll()}/>
        </View>
        <Text style={{marginBottom: 20,marginTop:20}}>{this.props.G.dice}</Text>
        <View style={{flex: 1,flexDirection: 'row', marginTop: 20,justifyContent: 'space-between'}}>
        {this.props.G.dice.map((d,i)=>(
          <Die key={d*i+Random.Number()} held={this.state.held[i]} updateHeld={this.updateHeld} index={i} value={d}/>
        ))}
        </View>
        <Text style={{paddingHorizontal: 20, height: 20, marginTop: 90, fontSize: 25}}>{this.state.held.map((itm, idx)=>{
          if(itm){
            return this.props.G.dice[idx]
          }
        })}</Text>
        <Text>{JSON.stringify(this.props.G.held)}</Text>
      </View>
    )
  }
}