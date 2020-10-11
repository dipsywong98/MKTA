import React from 'react'
import { Box, Link } from '@theme-ui/components'
import { useAlertCourse } from '../hooks/useAlertCourse'

export const CourseLink = ({ name }) => {
  const alertCourse = useAlertCourse()
  return (
    <Box onClick={() => alertCourse(name)}>
      <Link href='#'>{name}</Link>
    </Box>
  )
}
