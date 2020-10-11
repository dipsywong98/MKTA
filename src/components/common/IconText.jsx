import React from 'react'
import { Flex, Text } from '@theme-ui/components'
import PropTypes from 'prop-types'
import Icon from './Icon'

const iconTextProps = {
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  size: PropTypes.number,
  color: PropTypes.any,
  reverse: PropTypes.bool
}

const IconText = ({ children, color, path, size, reverse = false, ...otherProps }) => {
  const reverse_ = reverse ?? false
  return (
    <Flex sx={{ alignItems: 'center', flexDirection: reverse_ ? 'row-reverse' : 'row' }} {...otherProps}>
      <Icon
        size={size}
        path={path}
        color={color}
        sx={{
          fillOpacity: color === 'transparent' ? 0 : 1,
          path: {
            fill: color
          }
        }}
      />
      {' '}
      <Text ml={!reverse_ ? 2 : 0} mr={reverse_ ? 2 : 0} sx={{ flex: 1, color }}>{children}</Text>
    </Flex>
  )
}

IconText.propTypes = iconTextProps

IconText.defaultProps = {
  reverse: false
}

export default IconText
