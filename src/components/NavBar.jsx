import React from 'react'
import { Flex, Link, Text } from '@theme-ui/components'
import theme from '../theme'
import Icon, { ICONS } from './common/Icon'

export const NavLink = (props) => (
  <Link
    href={props.href}
    sx={{
      py: 2,
      px: 3,
      color: 'fgs.0',
      ':hover': {
        backgroundColor: 'highlight'
      }
    }}>
    <Flex>
      <Icon path={props.path}/>
      <Text sx={{ display: ['none', null, 'unset'], ml: 2, pointerEvents: 'none' }}>{props.title}</Text>
    </Flex>
  </Link>
)

export const NavBar = () => {
  return (
    <Flex
      px={theme.layout?.container.p}
      sx={{
        alignItems: 'center',
        gridArea: 'navbar',
        width: '100%',
        zIndex: 1,
        backgroundColor: 'bgs.1',
        boxShadow: 1
      }}>
      <NavLink title='My Cards' href='#my_cards' path={ICONS.drivers} />
      <NavLink title='Course Performance' href='#courses' path={ICONS.star}/>
      <NavLink title='Unique Cards' href='#unique_cards' path={ICONS.greenShell}/>
      <NavLink title='Wish List' href='#wish_list' path={ICONS.gift}/>
      <NavLink title='About' href='#about' path={ICONS.news}/>
    </Flex>
  )
}
