import styled from 'styled-components/native'
import { Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')

export const AppContainer = styled.View`
  justify-content: center;
  align-items: center;
`
export const AppHeader = styled.View`
  background-color: #222;
  height: 150;
  paddingVertical: 20;
  width: ${width};
  align-items: center;
`

export const AppTitle = styled.Text`
  font-size: 35;
  color: white;
`

export const AppIntro = styled.Text`
  font-size: 20
`