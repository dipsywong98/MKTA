import React, { useState } from 'react'
import { useMyFavoredCourses } from '../hooks/useMyFavoredCourses'
import { useAlertCourse } from '../hooks/useAlertCourse'
import { Box, Flex, Heading, Text } from '@theme-ui/components'
import IconText from './common/IconText'
import { ICONS } from './common/Icon'


export const CoursePerformance = () => {
  const favoredCourses = useMyFavoredCourses()
  const [expands, setExpands] = useState({})
  const alertCourse = useAlertCourse()
  return <Box>
    <Heading id='courses'><IconText path={ICONS.star}>Course Performance</IconText></Heading>
    <Text>
      Course Performance list out all courses that
      <ol>
        <li>You have all the top drivers, karts and gliders (Top Courses)</li>
        <li>You have all the middle or above drivers, karts and gliders (Middle Courses)</li>
        <li>You have dont have any of the middle or above in drivers, karts or gliders (Worst Courses)</li>
      </ol>
    </Text>
    <Flex>
      {Object.entries(favoredCourses).map(([key, courses]) => (<div key={key}>
        <div>{Object.keys(courses).length} {key} <button onClick={() => setExpands({...expands, [key]:!expands[key]})}>{expands[key] ? '-' : '+'}</button></div>
        {expands[key] && Object.entries(courses).map(([courseName, course]) => {
          return <div key={courseName}>
            <button onClick={() => alertCourse(courseName)}>{courseName}</button>
          </div>
        })}
      </div>))}
    </Flex>
  </Box>
}
