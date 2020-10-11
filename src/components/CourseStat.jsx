import React, { useState } from 'react'
import { useMyFavoredCourses } from '../hooks/useMyFavoredCourses'
import { useAlertCourse } from '../hooks/useAlertCourse'
import { Box, Flex, Heading } from '@theme-ui/components'


export const CourseStat = () => {
  const favoredCourses = useMyFavoredCourses()
  const [expands, setExpands] = useState({})
  const alertCourse = useAlertCourse()
  return <Box>
    <Heading id='courses'>Course Analysis</Heading>
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
