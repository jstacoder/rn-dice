import { Game, Random } from 'boardgame.io/core'

export default Game({
  setup:()=>({scores: [0,0], held:[], dice:Array(6).fill(0)}),
  moves:{
    roll:(G, ctx)=> ({...G, dice: Random.D6(G.dice.length) }),
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
    add:(G, ctx, idx, num)=> G.map((n, i)=>{
      if(i !== idx){
        return n
      }
      return n + num
    })
  }
})