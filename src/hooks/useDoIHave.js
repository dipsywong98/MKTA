import { useMyCards } from '../components/MyCardsContext'
import { useCallback } from 'react'

export const useDoIHave = () => {
  const myCards = useMyCards()
  return useCallback((type, cardName) => {
    return !!myCards[type][cardName]?.level
  }, [myCards])
}
