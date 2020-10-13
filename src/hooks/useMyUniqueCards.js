import { useContext, useMemo } from 'react'
import { assocPath, mergeAll } from 'ramda'
import { useAllCards } from './useAllCards'
import { CalculationContext } from '../components/CalculationContext'

export const useCalMyUniqueCards = (myFavoredCourses) => {
  const cards = useAllCards()
  return useMemo(() => {
    if (Object.keys(cards).length === 0 || Object.keys(cards.drivers).length === 0 || Object.keys(cards.karts).length === 0 || Object.keys(cards.gliders).length === 0) {
      return {
        drivers: {},
        karts: {},
        gliders: {}
      }
    }
    let myCards = {}
    Object.entries(mergeAll(Object.values(myFavoredCourses))).forEach(([courseName, myCourse]) => {
      Object.entries(myCourse).forEach(([typeName, { top, middle }]) => {
        const topCardNames = Object.keys(top || {})
        if (topCardNames.length === 1) {
          myCards = assocPath([typeName, 'top', topCardNames[0], courseName], true, myCards)
        }
        const middleCardNames = Object.keys(middle || {})
        if (topCardNames.length === 0 && middleCardNames.length === 1) {
          myCards = assocPath([typeName,'middle',middleCardNames[0], courseName], true, myCards)
        }
      })
    })
    return mergeAll(['drivers', 'karts', 'gliders'].map((type) => {
      const { top, middle } = myCards?.[type] || { top: {}, middle: {} }
      const joinedList = Object.entries(top).map(([name, courses]) => [name, { top: Object.keys(courses) }, Object.keys(courses).length * 10000])
      Object.entries(middle).forEach(([name, courses]) => {
        const find = joinedList.find(([_name]) => name === _name)
        if (find) {
          find[1].middle = Object.keys(courses)
          find[2] += Object.keys(courses).length * 10
        } else {
          joinedList.push([name, { middle: Object.keys(courses) }, Object.keys(courses).length * 10])
        }
      })
      joinedList.forEach((card) => {
        try {
          card[2] += ['Normal', 'Super', 'High-End'].indexOf(cards[type][card[0]].rarity)
        } catch (e) {
          console.error(cards, cards[type], card[0], joinedList)
        }
      })
      return {
        [type]: mergeAll(joinedList.sort((a, b) => b[2] - a[2]).map(([name, cards]) => ({
          [name]: cards
        })))
      }
    }))
  }, [myFavoredCourses, cards])
}

export const useMyUniqueCards = () => {
  return useContext(CalculationContext).myUniqueCards
}
