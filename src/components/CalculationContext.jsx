import React, { createContext } from 'react'
import { useCalMyFavoredCourses } from '../hooks/useMyFavoredCourses'
import { useCalMyUniqueCards } from '../hooks/useMyUniqueCards'

export const CalculationContext = createContext(null)

CalculationContext.displayName = 'CalculationContext'

export const CalculationContextProvider = (props) => {
  const myFavoredCourses = useCalMyFavoredCourses()
  const myUniqueCards = useCalMyUniqueCards(myFavoredCourses)

  return (
    <CalculationContext.Provider value={{myFavoredCourses, myUniqueCards}} {...props} />
  )
}
