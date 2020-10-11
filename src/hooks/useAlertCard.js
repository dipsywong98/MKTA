import { useAlert } from './useAlert'
import { Box } from '@theme-ui/components'
import React from 'react'
import { useAllCards } from './useAllCards'

export const useAlertCard = () => {
  const cards = useAllCards()
  const alert = useAlert()
  return (type, name) => {
    alert({
      title: name,
      message: <Box>My Message</Box>
    })
  }
}
