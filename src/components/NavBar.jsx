import React from 'react'
import { Flex, Link, Text } from '@theme-ui/components'
import theme from '../theme'
import Icon, { ICONS } from './common/Icon'

export const NavLink = (props) => (
  <Link sx={{
    py: 2,
    px: 3,
    color: 'fgs.0',
    ':hover': {
      backgroundColor: 'highlight'
    }
  }}>
    <Flex {...props}/>
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
      <NavLink title='My Cards' href='#my_cards'>
        <Icon path={ICONS.drivers}/>
        <Text sx={{ display: ['none', null, 'unset'], ml: 2 }}>My Cards</Text>
      </NavLink>
      {/*<NavLink title='My Drivers' href='#drivers'><Icon path={ICONS.drivers}/></NavLink>*/}
      {/*<NavLink title='My Karts' href='#karts'><Icon path={ICONS.karts}/></NavLink>*/}
      {/*<NavLink title='My Gliders' href='#gliders'><Icon path={ICONS.gliders}/></NavLink>*/}
      <NavLink title='Course Performance' href='#courses'>
        <Icon path={ICONS.star}/>
        <Text sx={{ display: ['none', null, 'unset'], ml: 2 }}>Course Performance</Text>
      </NavLink>
      <NavLink title='Unique Cards' href='#unique_cards'>
        <Icon path={ICONS.greenShell}/>
        <Text sx={{ display: ['none', null, 'unset'], ml: 2 }}>Unique Cards</Text>
      </NavLink>
    </Flex>
  )
}
