import React from 'react'
import { Box, Image } from '@theme-ui/components'
import { CoursePerformanceTag } from './CoursePerformanceTag'
import { fullUrl } from '../utils/componentHelpers'

export const CourseImage = ({ name }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Image alt={name} src={fullUrl(`/images/courses/${name}.png`)} sx={{ width: '100%' }} title={name}/>
      <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
        <CoursePerformanceTag name={name} size={3}/>
      </Box>
    </Box>
  )
}