import React from 'react'
import { Flex, Link } from '@theme-ui/components'
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
  }} {...props}
  />
)

export const NavBar = () => {
  return <Flex
    px={theme.layout?.container.p}
    sx={{
      alignItems: 'center',
      gridArea: 'navbar',
      width: '100%',
      zIndex: 1,
      backgroundColor: 'bgs.1',
      boxShadow: 1
    }}>

    <NavLink title='my drivers' href='#drivers'><Icon path={ICONS.drivers}/></NavLink>
    <NavLink title='my karts' href='#karts'><Icon path={ICONS.karts}/></NavLink>
    <NavLink title='my gliders' href='#gliders'><Icon path={ICONS.gliders}/></NavLink>
    <NavLink title='courses analysis' href='#courses'><Icon path={ICONS.star}/></NavLink>
    <NavLink title='unique cards' href='#unique_cards'><Icon path={ICONS.greenShell}/></NavLink>
  </Flex>
}
