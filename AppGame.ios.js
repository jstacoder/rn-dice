
import { ReactNativeClient } from 'boardgame.io/react-native'
import Board from './Board'
import Game from './Game'

export const AppGame = ReactNativeClient({
  game: Game,
  board: Board,
  multiplayer: false,
})
