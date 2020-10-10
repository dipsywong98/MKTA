import { createContext, useContext } from 'react'

export const AllCardsContext = createContext({ drivers: {}, karts: {}, gliders: {} })

export const useAllCards = () => useContext(AllCardsContext)
