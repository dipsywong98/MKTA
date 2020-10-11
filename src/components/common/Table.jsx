import React from 'react'
import { Box } from '@theme-ui/components'

export const Table = props => {
  return (
    <Box
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
      <table {...props} />
    </Box>
  )
}
