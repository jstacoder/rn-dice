import { Game, Random } from 'boardgame.io/core'

export default Game({
  setup:(n)=>({initialRoll: true, scores: Array(n).fill(0), held: [], dice:Array(6).fill(1)}),
  flow:{
    onTurnEnd: (G, ctx)=>({...G, initialRoll: true}),
    onMove: (G, ctx, action)=>({
      ...G, 
      dice: G.dice.filter(
        d=> G.held.filter(
          h=> h===d
        ).length==0
      )
    })
  },
  moves:{
    roll:(G, ctx, initialRoll = false)=> ({...G, initialRoll, dice: Random.D6(G.dice.length) }),
    addHeld:(G, ctx, idx, num)=>{
        const held = [...G.held.map(itm=>{
          if(itm.idx===idx&&itm.num===num){
            if(itm.turn !== ctx.turn){
              return itm
            }
          }
          return itm
        }), {idx, num, turn: ctx.turn}]
        return {...G, held}
    },
    removeHeld: (G, ctx, idx, num)=>{
      const held = [...G.held.filter(itm=>{
        return itm.idx !== idx && itm.num !== num && itm.turn === ctx.turn
      })]
      return {...G, held}
    },

    keepScore: (G, ctx, score)=>{
    let scores = [...G.scores]
    scores[ctx.currentPlayer] = score
    return {...G, scores: [...scores]}
  }
}})