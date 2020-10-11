import React from 'react'
import { useMyFavoredCourses } from '../hooks/useMyFavoredCourses'
import { Box, Flex, Heading, Text } from '@theme-ui/components'
import IconText from './common/IconText'
import { ICONS } from './common/Icon'
import CollapsibleWell from './common/CollapsibleWell'
import { CourseLink } from './CourseLink'
import { Table } from './common/Table'
import { IconWithPartialHide } from './IconWithPartialHide'
import { CoursePerformanceTag } from './CoursePerformanceTag'

const CoursesCollapsible = ({courses, header}) => {
  return (
    <Box sx={{flex: 1, mr: 2, minWidth: 'calc(54px *4)'}}>
      <CollapsibleWell header={header} noPad>
        <Table>
          <tbody>
            {Object.keys(courses).map((courseName) => (
              <tr key={courseName}>
                <td>
                  <CourseLink name={courseName}/>
                </td>
                <td>
                  <CoursePerformanceTag name={courseName}/>
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
