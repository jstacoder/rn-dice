import React from 'react'
import { ReactNativeClient } from 'boardgame.io/react-native'
import BaseBoard from './BaseBoard'
import Game from './Game'


export default class AppGame extends React.Component{
  render(){
    const Client = ReactNativeClient({
      game: Game,
      board: BaseBoard,
      numPlayers:this.props.numPlayers,
      multiplayer: false,
    })
    return (
      <Client />
    )
  }
}

