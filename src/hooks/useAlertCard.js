import { useAlert } from './useAlert'
import { Box, Grid, Heading, Text } from '@theme-ui/components'
import React, { useCallback } from 'react'
import { useAllCards } from './useAllCards'
import { CourseImage } from '../components/CourseImage'
import { useAlertCourse } from './useAlertCourse'
import { Card } from '../components/Card'
import { useDoIHave } from './useDoIHave'
import { useMyFavoredCourses } from './useMyFavoredCourses'
import { useMyUniqueCards } from './useMyUniqueCards'

export const useAlertCard = () => {
  const cards = useAllCards()
  const alert = useAlert()
  const alertCourse = useAlertCourse()
  const iHave = useDoIHave()
  const { myCourses } = useMyFavoredCourses()
  const uniqueCards = useMyUniqueCards()
  return useCallback((type, name) => {
    let iHaveIt = iHave(type, name)
    const typeIndex = ['drivers', 'karts', 'gliders'].indexOf(type)
    const topUniqueCourses = iHaveIt ? uniqueCards[type][name].top : cards[type][name]?.top.filter(courseName => !myCourses[courseName].allTopFlags[typeIndex])
    const middleUniqueCourses = iHaveIt ? uniqueCards[type][name].middle : cards[type][name]?.middle.filter(courseName => !myCourses[courseName].allMiddleFlags[typeIndex])

    const renderCourses = (courseNames) => courseNames.map(name => (
      <Box key={name} onClick={() => alertCourse(name)}>
        <CourseImage name={name}/>
        <Text variant='caption'>{name}</Text>
      </Box>
    ))
    alert({
      title: name,
      message: (
        <Box>
          <Grid columns={2}>
            <Card type={type} name={name} muted={!iHaveIt}/>
            <Box>
              <Box>
                Unlock {topUniqueCourses.length} courses
              </Box>
              <Box>
                Unlock {middleUniqueCourses.length} courses
              </Box>
            </Box>
          </Grid>
          <Heading>Top Courses</Heading>
          <Grid columns={2}>
            {renderCourses(cards[type][name].top)}
          </Grid>
          <Heading>Middle Courses</Heading>
          <Grid columns={2}>
            {renderCourses(cards[type][name].middle)}
          </Grid>
        </Box>
      )
    })
  }, [alert, alertCourse, cards, iHave, myCourses, uniqueCards])
}
