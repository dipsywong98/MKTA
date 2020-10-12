import { Box, Flex, Heading, Text } from '@theme-ui/components'
import React, { useCallback } from 'react'
import { useAllCourses } from './useAllCourses'
import { useAlert } from './useAlert'
import IconText from '../components/common/IconText'
import Icon, { ICONS } from '../components/common/Icon'
import { useDoIHave } from './useDoIHave'
import { Card } from '../components/Card'
import { CourseImage } from '../components/CourseImage'
import { IconWithPartialHide } from '../components/IconWithPartialHide'

export const useAlertCourse = () => {
  const courses = useAllCourses()
  const alert = useAlert()
  const iHave = useDoIHave()
  return useCallback((name) => {
    if (name in courses) {
      const cardList = (type, cards) => {
        return (
          <Flex sx={{ maxWidth: '100%', overflowX: 'auto' }}>
            {cards.map(name => [name, iHave(type, name)]).sort((a, b) => b[1] - a[1]).map(([name, have]) => (
              <Card key={name} type={type} name={name} muted={!have}/>
            ))}
          </Flex>
        )
      }
      alert({
        title: name,
        message: <Box>
          <CourseImage name={name}/>
          {['drivers', 'karts', 'gliders'].map((type) => (
            <Box mb={3} key={type}>
              <Heading mb={2}>
                <IconText
                  path={ICONS[type]}
                  size={3}
                                        sx={{ textTransform: 'capitalize' }}>
                  {type}
                </IconText>
              </Heading>
              <Text><Flex><Icon path={ICONS.greenShell}/><Text ml={2}>Top ({courses[name][type].top.filter(name => iHave(type, name)).length} / {courses[name][type].top.length})</Text></Flex></Text>
              {cardList(type, courses[name][type].top)}
              <Box m={1}/>
              <Text><Flex><IconWithPartialHide hideProportion={0.5} path={ICONS.greenShell}/><Text ml={2}>Middle ({courses[name][type].middle.filter(name => iHave(type, name)).length} / {courses[name][type].middle.length})</Text></Flex></Text>
              {cardList(type, courses[name][type].middle)}
            </Box>
          ))}
        </Box>
      })
    }
  }, [courses, alert, iHave])
}
