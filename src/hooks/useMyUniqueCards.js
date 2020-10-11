import { useMyFavoredCourses } from './useMyFavoredCourses'
import { useMemo } from 'react'
import set from 'set-value'
import { mergeAll } from 'ramda'

export const useMyUniqueCards = () => {
  const myFavoredCourses = useMyFavoredCourses()
  return useMemo(() => {
    const myCards = {}
    Object.entries(mergeAll(Object.values(myFavoredCourses))).forEach(([courseName, myCourse]) => {
      Object.entries(myCourse).forEach(([typeName, {top, middle}]) => {
        const topCardNames = Object.keys(top || {})
        if(topCardNames.length === 1) {
          set(myCards, `${typeName}.top.${topCardNames[0]}.${courseName}`, true)
        }
        const middleCardNames = Object.keys(middle || {})
        if(topCardNames.length === 0 && middleCardNames.length === 1) {
          set(myCards, `${typeName}.middle.${middleCardNames[0]}.${courseName}`, true)
        }
      })
    })
    return myCards
  }, [myFavoredCourses])
}
