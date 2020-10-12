import React, { createContext, useCallback, useState } from 'react'
import ConfirmDialog from './ConfirmDialog'
import { Box } from '@theme-ui/components'

export const AlertContextProvider = props => {
  const [queue, setQueue] = useState([])

  const popAlert = (i) => {
    setQueue(queue.filter((_, k) => k !== i))
  }

  const queueAlert = useCallback((s) => {
    const message = typeof s === 'string' ? { title: 'Alert', message: s } : s
    setQueue(queue.concat([message]))
  }, [queue])

  const alertNodes = queue.map((message, i) => (
    <ConfirmDialog key={i} isOpen={true} title={message.title} onClose={() => popAlert(i)} hideNoChoice>
      {message.message}
    </ConfirmDialog>
  ))

  return (
    <AlertContext.Provider value={queueAlert}>
      <Box {...props}/>
      {alertNodes}
    </AlertContext.Provider>
  )
}

export const AlertContext = createContext(window.alert)
AlertContext.displayName = 'AlertContext'
