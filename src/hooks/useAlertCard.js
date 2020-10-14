import { useAlert } from './useAlert'
import { Box, Flex, Grid, Heading, Text } from '@theme-ui/components'
import React, { useCallback } from 'react'
import { useAllCards } from './useAllCards'
import { CourseImage } from '../components/CourseImage'
import { useAlertCourse } from './useAlertCourse'
import { Card } from '../components/Card'
import { useDoIHave } from './useDoIHave'
import { useMyFavoredCourses } from './useMyFavoredCourses'
import { useMyUniqueCards } from './useMyUniqueCards'
import Icon, { ICONS } from '../components/common/Icon'
import { IconWithPartialHide } from '../components/IconWithPartialHide'
import IconText from '../components/common/IconText'
import { CoursePerformanceTag } from '../components/CoursePerformanceTag'

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
    const topUniqueCourses = iHaveIt ? uniqueCards[type][name]?.top : cards[type][name]?.top.filter(courseName => !myCourses[courseName].allTopFlags[typeIndex])
    const middleUniqueCourses = iHaveIt ? uniqueCards[type][name]?.middle : cards[type][name]?.middle.filter(courseName => !myCourses[courseName].allMiddleFlags[typeIndex])

    const renderCourses = (courseNames) => courseNames.map(name => (
      <Box key={name} onClick={() => alertCourse(name)} sx={{ minWidth: ['', null, '240px'] }}>
        <CourseImage name={name}/>
        <Text variant='caption' sx={{ display: 'flex', justifyContent: 'space-between' }}>{name} <CoursePerformanceTag
          name={name} extraTag={middleUniqueCourses?.includes(name) || topUniqueCourses?.includes(name) ?
          <Icon path={ICONS.greenShell} title='Unique Card' size={0}/> : undefined}/></Text>
      </Box>
    ))
    alert({
      title: name,
      message: (
        <Grid>
          <Grid columns={['auto 1fr']} sx={{ alignItems: 'center' }}>
            <Card type={type} name={name} muted={!iHaveIt}/>
            <Box>
              <Flex>
                <IconWithPartialHide hideProportion={0} path={ICONS.greenShell}/>
                Unique Top Courses: {topUniqueCourses?.length ?? 0}
              </Flex>
              <Flex>
                <IconWithPartialHide hideProportion={0.5} path={ICONS.greenShell}/>
                Unique Middle Courses: {middleUniqueCourses?.length ?? 0}
              </Flex>
            </Box>
          </Grid>
          <Heading variant='subheading'><IconText path={ICONS.star}>Top Courses
            :{cards[type][name].top.length}</IconText></Heading>
          <Grid columns={2}>
            {renderCourses(cards[type][name].top)}
          </Grid>
          <Heading variant='subheading'><IconWithPartialHide hideProportion={0.5} path={ICONS.star}
                                                             text={`Middle Courses`}/></Heading>
          <Grid columns={2}>
            {renderCourses(cards[type][name].middle)}
          </Grid>
        </Grid>
      )
    })
  }, [alert, alertCourse, cards, iHave, myCourses, uniqueCards])
}
