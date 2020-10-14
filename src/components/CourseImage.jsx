import React from 'react'
import { Box, Image } from '@theme-ui/components'
import { CoursePerformanceTag } from './CoursePerformanceTag'
import { fullUrl } from '../utils/componentHelpers'
import { useMyFavoredCourses } from '../hooks/useMyFavoredCourses'

export const CourseImage = ({ name, extraTag, calculateMute = false }) => {
  const { myCourses } = useMyFavoredCourses()
  const { allTopFlags, allMiddleFlags } = myCourses[name]
  const transparent = calculateMute ? (allTopFlags.reduce((a, b) => a + b) + allMiddleFlags.reduce((a, b) => a + b)) / 7 : 1
  return (
    <Box sx={{ position: 'relative' }}>
      <Image alt={name} src={fullUrl(`/images/courses/${name}.png`)} sx={{ width: '100%' }} title={name}/>
      <div
        style={{
          backgroundColor: 'black',
          opacity: 1 - transparent,
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }}
      />
      <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
        <CoursePerformanceTag name={name} size={3} extraTag={extraTag}/>
      </Box>
    </Box>
  )
}
