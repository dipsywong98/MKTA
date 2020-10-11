import React from 'react'
import { IconWithPartialHide } from './IconWithPartialHide'
import { ICONS } from './common/Icon'
import { Flex } from '@theme-ui/components'
import { useMyFavoredCourses } from '../hooks/useMyFavoredCourses'

export const CoursePerformanceTag = ({ name, size }) => {
  const { myCourses } = useMyFavoredCourses()
  const { allTopFlags, allMiddleFlags } = myCourses[name]
  const getHideProportion = (hasTop, hasMiddle) => {
    return hasTop ? 0 : (hasMiddle ? 0.5 : 1)
  }
  return (
    <Flex>
      <IconWithPartialHide size={size} path={ICONS.drivers} hideProportion={getHideProportion(allTopFlags[0], allMiddleFlags[0])}/>
      <IconWithPartialHide size={size} path={ICONS.karts} hideProportion={getHideProportion(allTopFlags[1], allMiddleFlags[1])}/>
      <IconWithPartialHide size={size} path={ICONS.gliders} hideProportion={getHideProportion(allTopFlags[2], allMiddleFlags[2])}/>
    </Flex>
  )
}
