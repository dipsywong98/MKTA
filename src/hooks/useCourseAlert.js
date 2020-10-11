import { useAllCourses } from './AllCoursesContext'
import { useAlert } from './common/AlertContext'
import { Box } from '@theme-ui/components'
import React from 'react'

export const useCourseAlert = () => {
  const courses = useAllCourses()
  const alert = useAlert()
  return (name) => {
    alert({
      title: name,
      message: <Box>My Message</Box>
    })
  }
}
