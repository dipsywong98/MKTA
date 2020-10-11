import React, { forwardRef, useEffect, useState } from 'react'
import PropTypes  from 'prop-types'
import Well from './Well'
import { Box, Flex } from '@theme-ui/components'
import Icon from './Icon'
import { mdiChevronDown } from '@mdi/js'
import { transition } from '../../theme/transitions'
import Collapsible from './Collapsible'
import { baseWell } from '../../theme/wells'
import { isDefined } from '../../utils/componentHelpers'

const collapsibleWellProps = {
  defaultOpen: PropTypes.bool,
  children: PropTypes.node.isRequired,
  header: PropTypes.node.isRequired,
  setController: PropTypes.func,
  noPad: PropTypes.bool,
  reverseHeader: PropTypes.bool,
  headerSx: PropTypes.object,
  hideOnly: PropTypes.bool,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
  color: PropTypes.string
}

const CollapsibleWell = forwardRef(
  (
    { defaultOpen, children, header, noPad, setController, hideOnly, reverseHeader, headerSx, onOpen, ...boxProps },
    ref
  ) => {
    const [isOpen, setOpen] = useState(defaultOpen ?? false)

    useEffect(() => {
      if (isDefined(setController)) {
        setController({
          show: () => setOpen(true),
          hide: () => setOpen(false),
          toggle: () => setOpen(!isOpen)
        })
      }
    }, [isOpen, setController])

    useEffect(() => {
      if (isOpen && onOpen) {
        onOpen()
      }
    }, [isOpen, onOpen])

    return (
      <Well
        ref={ref}
        {...boxProps}
        sx={{ p: [0, 0, 0, 0], ...(boxProps.sx) }}>
        <Flex
          onClick={() => setOpen(!isOpen)}
          sx={{
            px: baseWell.px,
            py: baseWell.py,
            ':hover': {
              backgroundColor: 'highlight'
            },
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: reverseHeader ?? false ? 'row-reverse' : 'row',
            ...headerSx
          }}>
          {header}
          <Icon
            path={mdiChevronDown}
            sx={{
              ...transition(0.3, ['transform']),
              transform: isOpen ? 'rotate(180deg)' : undefined
            }}
          />
        </Flex>
        <Collapsible isOpen={isOpen} hideOnly={hideOnly}>
          <Box
            className='collapsible-content'
            px={noPad ?? false ? undefined : baseWell.px}
            py={noPad ?? false ? undefined : baseWell.py}
            sx={{
              borderTopColor: 'border',
              borderTopWidth: '1px',
              borderTopStyle: 'solid'
            }}>
            {children}
          </Box>
        </Collapsible>
      </Well>
    )
  }
)

CollapsibleWell.propTypes = collapsibleWellProps

CollapsibleWell.displayName = 'CollapsibleWell'

export default CollapsibleWell
