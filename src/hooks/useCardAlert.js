import { useAllCourses } from './AllCoursesContext'
import { useAlert } from './common/AlertContext'
import { Box } from '@theme-ui/components'
import React from 'react'
import { useAllCards } from './AllCardsContext'

export const useCardAlert = () => {
  const cards = useAllCards()
  const alert = useAlert()
  return (type, name) => {
    alert({
      title: name,
      message: <Box>My Message</Box>
    })
  }
}
