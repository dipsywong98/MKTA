import { useAlert } from './useAlert'
import { Box, Flex, Grid, Heading, Text } from '@theme-ui/components'
import React from 'react'
import { useAllCards } from './useAllCards'
import { CourseImage } from '../components/CourseImage'
import { useAlertCourse } from './useAlertCourse'
import { Card } from '../components/Card'
import { useDoIHave } from './useDoIHave'
import { useMyFavoredCourses } from './useMyFavoredCourses'

export const useAlertCard = () => {
  const cards = useAllCards()
  const alert = useAlert()
  const alertCourse = useAlertCourse()
  const iHave = useDoIHave()
  const { myCourses } = useMyFavoredCourses()
  return (type, name) => {
    const renderCourses = (courseNames) => courseNames.map(name => (
      <Box onClick={() => alertCourse(name)}>
        <CourseImage name={name}/>
        <Text>{name}</Text>
      </Box>
    ))
    const typeIndex = ['drivers', 'karts', 'gliders'].indexOf(type)
    const topUniqueCourses = cards[type][name].top.filter(courseName => !myCourses[courseName].allTopFlags[typeIndex])
    const middleUniqueCourses = cards[type][name].middle.filter(courseName => !myCourses[courseName].allMiddleFlags[typeIndex])
    alert({
      title: name,
      message: (
        <Box>
          <Flex>
            <Card type={type} name={name} muted={!iHave(type, name)}/>
            <Box>
              <Box>
                Unlock {topUniqueCourses.length} courses
              </Box>
              <Box>
                Unlock {middleUniqueCourses.length} courses
              </Box>
            </Box>
          </Flex>
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
  }
}
