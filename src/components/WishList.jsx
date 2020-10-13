import React from 'react'
import { Box, Flex, Grid, Heading, Text } from '@theme-ui/components'
import IconText from './common/IconText'
import { ICONS } from './common/Icon'
import CollapsibleWell from './common/CollapsibleWell'
import { Table } from './common/Table'
import { Card } from './Card'
import { CourseLink } from './CourseLink'
import { useMyWishList } from '../hooks/useMyWishList'

export const WishList = () => {
  const wishList = useMyWishList()
  return (
    <Box id='wish_list'>
      <Heading><IconText path={ICONS.gift}>Wish List</IconText></Heading>
      <Text>Wish list contains the cards that you may want the most as it unlocks the most courses</Text>
      {
        Object.entries(wishList).map(([type, cardsToCourses]) => (<CollapsibleWell key={type} header={
            <IconText path={ICONS[type]}
                      sx={{ textTransform: 'capitalize' }}>unique {type} ({Object.entries(cardsToCourses).length})</IconText>
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
