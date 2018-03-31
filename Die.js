import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'

export default class Die extends Component {
  hold = ()=>{
      this.props.updateHeld(this.props.index, !this.props.held)
  }
  render(){
    const backgroundColor = this.props.held ? 'grey' : 'white'
    return (
      <TouchableHighlight onPress={()=> this.hold()}>
      <View style={{alignItems: 'center',justifyContent: 'center', marginHorizontal: 10, height: 42, width: 42, borderColor: "black", borderWidth: 1, backgroundColor}}>
        <Text style={{fontSize: 25}}>{this.props.value}</Text>
      </View>
      </TouchableHighlight>
    )
  }
}