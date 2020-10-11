import React from 'react'
import { Box } from '@theme-ui/components'
import Icon from './common/Icon'

export const IconWithPartialHide = ({ path, hideProportion, ...props }) => {
  return (
    <Box sx={{position: 'relative', overflow: 'hidden'}}>
      <Box sx={{opacity: 0.1}}>
        <Icon path={path} {...props}/>
      </Box>
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', transform: `translateX(calc(${-hideProportion} * 100%))` }}>
        <Box sx={{transform: `translateX(calc(${hideProportion} * 100%))`}}>
          <Icon path={path} {...props}/>
        </Box>
      </Box>
    </Box>
  )
}
