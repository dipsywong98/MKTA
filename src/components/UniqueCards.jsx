import React from 'react'
import { Card } from './Card'
import { useMyUniqueCards } from '../hooks/useMyUniqueCards'
import { Box, Flex, Heading, Text } from '@theme-ui/components'
import CollapsibleWell from './common/CollapsibleWell'
import { CourseLink } from './CourseLink'
import IconText from './common/IconText'
import { ICONS } from './common/Icon'

export const UniqueCards = () => {
  const uniqueCards = useMyUniqueCards()
  return (
    <Box
      id='unique_cards'
      sx={{
        table: {
          width: '100%',
          borderCollapse: 'collapse'
        },
        tr: {
          ':nth-of-type(odd)': {
            backgroundColor: 'bgs.1'
          },
          ':nth-of-type(even)': {
            backgroundColor: 'bgs.2'
          }
        }
      }}>
      <Heading><IconText path={ICONS.greenShell}>Unique Cards</IconText></Heading>
      <Text>A unique card is the only top card of any course that you have. (or middle if you dont have any top card for
        it)</Text>
      {
        Object.entries(uniqueCards).map(([type, cardsToCourses]) => (<CollapsibleWell key={type} header={
            <IconText path={ICONS[type]} sx={{textTransform: 'capitalize'}}>unique {type} ({Object.entries(cardsToCourses).length})</IconText>
          } noPad>
            <table>
              <tbody>
              {
                Object.entries(cardsToCourses).map(([name, { top, middle }]) => (
                  <tr key={name}>
                    <td>
                      <Flex sx={{ justifyContent: 'center', alignContent: 'center' }}>
                        <Card type={type} name={name}/>
                      </Flex>
                    </td>
                    <td>
                      {top && <Flex sx={{ flexDirection: ['column', null, 'row'] }}>
                        <Box><strong>Top({top.length}):</strong></Box>
                        <Box>
                          {top.map(courseName => <CourseLink key={courseName} name={courseName}/>)}
                        </Box>
                      </Flex>}
                      {middle && <Flex sx={{ flexDirection: ['column', null, 'row'] }}>
                        <Box><strong>Middle({middle.length}):</strong></Box>
                        <Box>
                          {middle.map(courseName => <CourseLink key={courseName} name={courseName}/>)}
                        </Box>
                      </Flex>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CollapsibleWell>
        ))
      }
    </Box>
  )
}
