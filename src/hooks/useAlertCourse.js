import { Box } from '@theme-ui/components'
import React from 'react'
import { useAllCourses } from './useAllCourses'
import { useAlert } from './useAlert'

export const useAlertCourse = () => {
  const courses = useAllCourses()
  const alert = useAlert()
  return (name) => {
    alert({
      title: name,
      message: <Box>My Message</Box>
    })
  }
}
