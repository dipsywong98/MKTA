/** @jsx jsx */
import { Box, jsx } from 'theme-ui'
import MdiIcon from '@mdi/react'
import PropTypes from 'prop-types'
import drivers from '../../assets/images/icons/drivers.png'
import gliders from '../../assets/images/icons/gliders.png'
import karts from '../../assets/images/icons/karts.png'
import star from '../../assets/images/icons/star.png'
import greenShell from '../../assets/images/icons/greenShell.png'

export const ICONS = {
  drivers,
  gliders,
  karts,
  star,
  greenShell
}

const Icon = ({ path, ...props }) => {
  const fontSizes = Array.isArray(props.size) ? props.size : [props.size]
  const sizes = fontSizes.map(x => theme => theme.fontSizes[x] * theme.lineHeights.body)

  return (
    Object.values(ICONS).includes(path) ?
      <Box sx={{
        width: sizes,
        height: sizes,
        backgroundImage: `url(${path})`,
        backgroundSize: '100% auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
      }}/>
      : <MdiIcon
        {...{ ...props, color: null, size: null }}
        path={path}
        sx={{
          fill: props.color,
          height: sizes,
          width: sizes,
          ...props?.sx
        }}
      />
  )
}

Icon.propTypes = {
  path: PropTypes.string.isRequired,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ])
}

Icon.defaultProps = {
  color: 'text',
  size: 1
}

export default Icon
