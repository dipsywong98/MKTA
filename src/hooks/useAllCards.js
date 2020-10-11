import { useContext } from 'react'
import { AllCardsContext } from '../components/AllCardsContext'

export const useAllCards = () => useContext(AllCardsContext)
