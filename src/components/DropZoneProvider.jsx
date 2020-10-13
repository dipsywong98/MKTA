import React, { createContext, useCallback, useContext, useEffect, useReducer } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box } from '@theme-ui/components'
import { readFileAsText } from '../utils/readFile'
import { SLOW, transition } from '../theme/transitions'

const DropZoneContext = createContext({
  openFileDialog: () => console.error('openFileDialog not implemented'),
  subscribeDrop: () => console.error('subscribe not implemented'),
  unSubscribeDrop: () => console.error('unSubscribeDrop not implemented')
})

export const DropZoneProvider = ({ children, sx }) => {
  const [listeners, reducer] = useReducer((existing, { adding, removing }) => [
    ...existing.filter(f => !removing || f !== removing)
    , adding
  ].filter(f => typeof f === 'function'), [])
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length === 1) {
      readFileAsText(acceptedFiles[0]).then(content => {
        listeners.forEach((callback) => callback(content))
      })
    }
  }, [listeners])
  const subscribeDrop = useCallback((adding) => {
    reducer({ adding })
  }, [])
  const unSubscribeDrop = useCallback((removing) => {
    reducer({ removing })
  }, [])
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({ onDrop, noClick: true, multiple: false })
  return (
    <Box {...getRootProps()} sx={sx}>
      <input {...getInputProps()} />
      <DropZoneContext.Provider value={{ openFileDialog: open, subscribeDrop, unSubscribeDrop }}>
        <Box sx={{ boxShadow: isDragActive ? 3 : 0, ...transition(SLOW, ['box-shadow']) }}>
          {children}
        </Box>
      </DropZoneContext.Provider>
    </Box>
  )
}

export const useOpenFileAsText = (callback) => {
  const { unSubscribeDrop, subscribeDrop, openFileDialog } = useContext(DropZoneContext)
  useEffect(() => {
    subscribeDrop(callback)
    return () => {
      unSubscribeDrop(callback)
    }
  }, [callback, subscribeDrop, unSubscribeDrop])
  return openFileDialog
}
