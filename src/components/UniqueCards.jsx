import React from 'react'
import { Card } from './Card'
import { useMyUniqueCards } from '../hooks/useMyUniqueCards'
import { Box, Flex, Grid, Heading, Text } from '@theme-ui/components'
import CollapsibleWell from './common/CollapsibleWell'
import { CourseLink } from './CourseLink'
import IconText from './common/IconText'
import { ICONS } from './common/Icon'
import { Table } from './common/Table'

export const UniqueCards = () => {
  const uniqueCards = useMyUniqueCards()
  return (
    <Box id='unique_cards'>
      <Heading><IconText path={ICONS.greenShell}>Unique Cards</IconText></Heading>
      <Text>A unique card is the only top card of any course that you have. (or middle if you dont have any top card for
        it)</Text>
      {
        Object.entries(uniqueCards).map(([type, cardsToCourses]) => (<CollapsibleWell key={type} header={
            <IconText path={ICONS[type]} sx={{textTransform: 'capitalize'}}>unique {type} ({Object.entries(cardsToCourses).length})</IconText>
          } noPad>
            <Table>
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
                      <Grid columns={[1, null, 'auto 1fr']} gap={1}>
                      {top && <>
                        <Box><strong>Top({top.length}):</strong></Box>
                        <Box>
                          {top.map(courseName => <CourseLink key={courseName} name={courseName}/>)}
                        </Box>
                      </>}
                      {middle && <>
                        <Box><strong>Middle({middle.length}):</strong></Box>
                        <Box>
                          {middle.map(courseName => <CourseLink key={courseName} name={courseName}/>)}
                        </Box>
                      </>}
                      </Grid>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CollapsibleWell>
        ))
      }
    </Box>
  )
}
