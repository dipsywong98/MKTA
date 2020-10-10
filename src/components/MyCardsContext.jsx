import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { clone } from 'ramda'

export const MyCardsContext = createContext({myCards: {drivers: {}, karts: {}, gliders: {}}, levelUp: () => console.error('levelUp not implemented'), levelDown: () => console.error('levelDown not implemented')})

export const useMyCards = () => useContext(MyCardsContext).myCards
export const useMyCardsReducers = () => useContext(MyCardsContext)

export const LEVEL_UP = 'level_up'
export const LEVEL_DOWN = 'level_down'

const makeMyNewCard = () => clone({
  level: 0
})

export const MyCardContextProvider = (props) => {
  const [myCards, myCardsReducer] = useReducer((prevState, {action, payload}) => {
    switch(action){
      case LEVEL_UP: {
        const { type, name } = payload
        if(!(name in prevState[type])) {
          prevState[type][name] = makeMyNewCard()
        }
        prevState[type][name].level = Math.min((prevState[type][name].level) + 1, 1)
        return { ...prevState }
      }
      case LEVEL_DOWN: {
        const { type, name } = payload
        if(!(name in prevState[type])) {
          prevState[type][name] = makeMyNewCard()
        }
        prevState[type][name].level = Math.max((prevState[type][name].level) - 1, 0)
        return { ...prevState }
      }
      default:
      return prevState
    }
  }, null, () => {
    const inCookie = localStorage.getItem('myCards')
    if(!!inCookie) {
      return JSON.parse(inCookie)
    }
    return {drivers: {}, karts: {}, gliders: {}}
  })
  const levelUp = (type, name) => myCardsReducer({action: LEVEL_UP, payload: {type, name}})
  const levelDown = (type, name) => myCardsReducer({action: LEVEL_DOWN, payload: {type, name}})
  useEffect(() => {
    localStorage.setItem('myCards', JSON.stringify(myCards))
  }, [myCards])
  return (
    <MyCardsContext.Provider value={{myCards, levelUp, levelDown}} {...props}/>
  )
}
