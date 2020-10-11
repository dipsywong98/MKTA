import React, { useState } from 'react'
import { useMyFavoredCourses } from '../hooks/useMyFavoredCourses'
import { useAlertCourse } from '../hooks/useAlertCourse'
import { Box, Flex, Heading, Text } from '@theme-ui/components'
import IconText from './common/IconText'
import { ICONS } from './common/Icon'
import CollapsibleWell from './common/CollapsibleWell'
import { CourseLink } from './CourseLink'
import { Table } from './common/Table'
import { IconWithPartialHide } from './IconWithPartialHide'

const CoursesCollapsible = ({courses, header}) => {
  const getHideProportion = (hasTop, hasMiddle) => {
    return hasTop ? 0 : (hasMiddle ? 0.5 : 1)
  }
  return (
    <Box sx={{flex: 1, mr: 2}}>
      <CollapsibleWell header={header} noPad>
        <Table>
          <tbody>
            {Object.entries(courses).map(([courseName, {allTopFlags, allMiddleFlags}]) => (
              <tr>
                <td>
                  <CourseLink name={courseName}/>
                </td>
                <td>
                  <Flex>
                    <IconWithPartialHide path={ICONS.drivers} hideProportion={getHideProportion(allTopFlags[0], allMiddleFlags[0])}/>
                    <IconWithPartialHide path={ICONS.karts} hideProportion={getHideProportion(allTopFlags[1], allMiddleFlags[1])}/>
                    <IconWithPartialHide path={ICONS.gliders} hideProportion={getHideProportion(allTopFlags[2], allMiddleFlags[2])}/>
                  </Flex>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CollapsibleWell>
    </Box>
  )
}

export const CoursePerformance = () => {
  const {myTopCourses, myMiddleCourses, myWorstCourses} = useMyFavoredCourses()
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
    <Flex sx={{flexWrap: 'wrap'}}>
      <CoursesCollapsible header={<Flex><IconWithPartialHide path={ICONS.star} hideProportion={0}/><Text ml={2}> TopCourses({Object.keys(myTopCourses).length})</Text></Flex>} courses={myTopCourses}/>
      <CoursesCollapsible header={<Flex><IconWithPartialHide path={ICONS.star} hideProportion={0.5}/><Text ml={2}> MiddleCourses({Object.keys(myMiddleCourses).length})</Text></Flex>} courses={myMiddleCourses}/>
      <CoursesCollapsible header={<Flex><IconWithPartialHide path={ICONS.star} hideProportion={1}/><Text ml={2}> WorstCourses({Object.keys(myWorstCourses).length})</Text></Flex>} courses={myWorstCourses}/>
    </Flex>
  </Box>
}
