import React, { createContext } from 'react'
import { useCalMyFavoredCourses } from '../hooks/useMyFavoredCourses'
import { useCalMyUniqueCards } from '../hooks/useMyUniqueCards'
import { useCalMyWishList } from '../hooks/useMyWishList'

export const CalculationContext = createContext(null)

CalculationContext.displayName = 'CalculationContext'

export const CalculationContextProvider = (props) => {
  const myFavoredCourses = useCalMyFavoredCourses()
  const myUniqueCards = useCalMyUniqueCards(myFavoredCourses)
  const myWishList = useCalMyWishList(myFavoredCourses)

  return (
    <CalculationContext.Provider value={{myFavoredCourses, myUniqueCards, myWishList}} {...props} />
  )
}
