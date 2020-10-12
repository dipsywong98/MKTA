import { Box, Flex, Heading, Text } from '@theme-ui/components'
import React, { useCallback } from 'react'
import { useAllCourses } from './useAllCourses'
import { useAlert } from './useAlert'
import IconText from '../components/common/IconText'
import Icon, { ICONS } from '../components/common/Icon'
import { useDoIHave } from './useDoIHave'
import { Card } from '../components/Card'
import { CourseImage } from '../components/CourseImage'

export const useAlertCourse = () => {
  const courses = useAllCourses()
  const alert = useAlert()
  const iHave = useDoIHave()
  return useCallback((name) => {
    if(name in courses){
      const cardList = (type, cards) => {
        return cards.map(name => [name, iHave(type, name)]).sort((a ,b) => b[1] - a[1]).map(([name, have]) => (
          <Card key={name} type={type} name={name} muted={!have}/>
        ))
      }
      alert({
        title: name,
        message: <Box>
          <CourseImage name={name} />
          {['drivers', 'karts', 'gliders'].map((type) => (
            <Box mb={3}>
              <Heading mb={2}><IconText path={ICONS[type]} size={3} sx={{textTransform: 'capitalize'}}>{type}</IconText></Heading>
              <Text><Flex><Text ml={2}>Top</Text><Icon path={ICONS.greenShell}/><Icon path={ICONS.greenShell}/><Icon path={ICONS.greenShell}/></Flex></Text>
              <Flex>
                {cardList(type, courses[name][type].top)}
              </Flex>
              <Text><Flex><Text ml={2}>Middle</Text><Icon path={ICONS.greenShell}/><Icon path={ICONS.greenShell}/></Flex></Text>
              <Flex>
                {cardList(type, courses[name][type].middle)}
              </Flex>
            </Box>
            ))}
        </Box>
      })
    }
  }, [courses, alert, iHave])
}
