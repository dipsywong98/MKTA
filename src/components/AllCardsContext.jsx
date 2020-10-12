import { createContext } from 'react'

export const AllCardsContext = createContext({ drivers: {}, karts: {}, gliders: {} })

AllCardsContext.displayName = 'AllCardsContext'
