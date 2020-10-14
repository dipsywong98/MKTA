import { useContext, useMemo } from 'react'
import { mergeAll } from 'ramda'
import { useAllCards } from './useAllCards'
import { CalculationContext } from '../components/CalculationContext'
import { useDoIHave } from './useDoIHave'

export const useCalMyWishList = ({ myCourses }) => {
  const cards = useAllCards()
  const iHave = useDoIHave()
  return useMemo(() => {
    if (Object.keys(cards).length === 0 || Object.keys(cards.drivers).length === 0 || Object.keys(cards.karts).length === 0 || Object.keys(cards.gliders).length === 0) {
      return {
        drivers: {},
        karts: {},
        gliders: {}
      }
    }
    if (Object.keys(myCourses).length === 0) {
      return {
        drivers: {},
        karts: {},
        gliders: {}
      }
    }
    const myWishList = {}
    Object.entries(cards).forEach(([type, cardsOfType]) => {
      const typeIndex = ['drivers', 'karts', 'gliders'].indexOf(type)
      myWishList[type] = mergeAll(Object.entries(cardsOfType).filter(([cardName]) => !iHave(type, cardName)).map(([cardName, card]) => {
        const top = card.top.filter(courseName => myCourses[courseName] === undefined || myCourses[courseName].allTopFlags[typeIndex] === false)
        const middle = card.middle.filter(courseName => myCourses[courseName] === undefined || !myCourses[courseName].allMiddleFlags[typeIndex])
        const score = top.length * 1000 + middle.length * 10 + ['Normal', 'Super', 'High-End'].indexOf(cards[type][cardName].rarity)
        return [cardName, { top, middle }, score]
      }).sort((a,b) => b[2] - a[2]).map(([cardName, card, score]) => ({[cardName]: {...card, score}})))
    })
    return myWishList
  }, [cards, iHave, myCourses])
}

export const useMyWishList = () => {
  return useContext(CalculationContext).myWishList
}
