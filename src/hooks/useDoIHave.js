import { MyCardsContext } from '../components/MyCardsContext'
import { useContext } from 'react'

export const useDoIHave = () => {
  return useContext(MyCardsContext).iHave
}
