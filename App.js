import React, { Component } from 'react';
// import SvgUri from 'react-native-svg-uri'
// import Logo from './logo.svg'

import {
  AppContainer,
  AppHeader,
  AppTitle,
  AppIntro,
} from './Containers'

import { Grid, Row, Col } from 'react-native-easy-grid'
import { Button, Text, Container, Content, Header, Left, Right, Icon } from 'native-base'

import StorybookUI from './storybook'

import createReactContext from 'create-react-context'

export const ResetContext = createReactContext(()=>{})

import BaseBoard from './BaseBoard'
import AppGame  from './AppGame'
import PlayerPicker from './PlayerPicker'




class App extends Component {
  state = {numPlayers: 0, page: 'init'}
  setPlayers = numPlayers =>{
    if(numPlayers){
      this.setState({numPlayers})
    }else{
    this.setState({page:'init'})
    }
  }
  pressPlay = () =>{
    this.setState({page:'play'})
  }
  pressStory = ()=>{
    this.setState({page: 'story'})
  }
  render() {
    switch(this.state.page){
      case 'init':
        return (
          <Container>
            <Header></Header>
            <Content>
              <Grid>
                <Col size={1} style={{backgroundColor: 'white'}}><Text></Text></Col>
                    <Col size={5} style={{backgroundColor: 'white'}}>                  
                      <Button success rounded large block onPress={this.pressPlay}>
                        <Text>play</Text>
                      </Button>      
                      <Button warning rounded block large onPress={this.pressStory}>
                        <Text>StoryBookUI</Text>
                      </Button>                    
                    </Col>        
                    <Col size={1} style={{backgroundColor: 'white'}}><Text></Text></Col>        
              </Grid>
            </Content>
          </Container>
        )
      case 'play':
        if(this.state.numPlayers===0){
          return (<PlayerPicker setPlayers={this.setPlayers} /> ) 
        }
        return (
          <ResetContext.Provider value={this.setPlayers}>
              <AppGame numPlayers={this.state.numPlayers} />
          </ResetContext.Provider>
        ) 
      case 'story':
        return (
          <StorybookUI />
        )
      default:
        return null
    }   
  }
}

export default App;
