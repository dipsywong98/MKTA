import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react'
import { clone } from 'ramda'

export const MyCardsContext = createContext({
  myCards: { drivers: {}, karts: {}, gliders: {} },
  levelUp: () => console.error('levelUp not implemented'),
  levelDown: () => console.error('levelDown not implemented'),
  levelToggle: () => console.error('levelToggle not implemented'),
  overwrite: () => console.error('overwrite not implemented'),
  iHave: () => true
})

export const useMyCards = () => useContext(MyCardsContext).myCards
export const useMyCardsReducers = () => useContext(MyCardsContext)

export const LEVEL_UP = 'level_up'
export const LEVEL_DOWN = 'level_down'
export const LEVEL_TOGGLE = 'level_toggle'
export const OVERWRITE = 'overwrite'

const makeMyNewCard = () => clone({
  level: 0
})

export const MyCardContextProvider = (props) => {
  const reducer = useCallback((prevState, { action, payload }) => {
    switch (action) {
      case LEVEL_UP: {
        const { type, name } = payload
        if (!(name in prevState[type])) {
          prevState[type][name] = makeMyNewCard()
        }
        prevState[type][name].level = Math.min((prevState[type][name].level) + 1, 1)
        return { ...prevState }
      }
      case LEVEL_DOWN: {
        const { type, name } = payload
        if (!(name in prevState[type])) {
          prevState[type][name] = makeMyNewCard()
        }
        prevState[type][name].level = Math.max((prevState[type][name].level) - 1, 0)
        return { ...prevState }
      }
      case LEVEL_TOGGLE: {
        const { type, name } = payload
        if (!(name in prevState[type])) {
          prevState[type][name] = makeMyNewCard()
        }
        prevState[type][name].level = prevState[type][name].level === 0 ? 1 : 0
        return { ...prevState }
      }
      case OVERWRITE:
        return payload
      default:
        return prevState
    }
  }, [])
  const [myCards, myCardsReducer] = useReducer(reducer, null, () => {
    const inCookie = localStorage.getItem('myCards')
    if (!!inCookie) {
      return JSON.parse(inCookie)
    }
    return { drivers: {}, karts: {}, gliders: {} }
  })
  const levelUp = (type, name) => {
    myCardsReducer({ action: LEVEL_UP, payload: { type, name } })
  }
  const levelDown = (type, name) => {
    myCardsReducer({ action: LEVEL_DOWN, payload: { type, name } })
  }
  const levelToggle = (type, name) => {
    myCardsReducer({ action: LEVEL_TOGGLE, payload: { type, name } })
  }
  const overwrite = payload => {
    myCardsReducer({ action: OVERWRITE, payload })
  }
  useEffect(() => {
    localStorage.setItem('myCards', JSON.stringify(myCards))
  }, [myCards])
  const iHave = useCallback((type, cardName) => {
    return !!myCards[type][cardName]?.level
  }, [myCards])
  return (
    <MyCardsContext.Provider value={{ myCards, levelUp, levelDown, levelToggle, overwrite, iHave }} {...props}/>
  )
}
