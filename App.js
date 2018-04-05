import React, { Component } from 'react';
// import SvgUri from 'react-native-svg-uri'
// import Logo from './logo.svg'

import {
  AppContainer,
  AppHeader,
  AppTitle,
  AppIntro,
} from './Containers'

import createReactContext from 'create-react-context'

export const ResetContext = createReactContext(()=>{})

import BaseBoard from './BaseBoard'
import AppGame  from './AppGame'
import PlayerPicker from './PlayerPicker'




class App extends Component {
  state = {numPlayers: 0}
  setPlayers = numPlayers =>{
    this.setState({numPlayers})
  }
  render() {
    if(this.state.numPlayers===0){
      return (<PlayerPicker setPlayers={this.setPlayers} /> ) 
    }
    return (
      <ResetContext.Provider value={this.setPlayers}>
          <AppGame numPlayers={this.state.numPlayers} />
     </ResetContext.Provider>
    )    
  }
}

export default App;
