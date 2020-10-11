import React, { createContext, useState } from 'react'
import ConfirmDialog from './ConfirmDialog'
import { Box } from '@theme-ui/components'

export const AlertContextProvider = props => {
  const [queue, setQueue] = useState([])

  const popAlert = () => {
    setQueue(queue.slice(1))
  }

  const queueAlert = (s) => {
    const message = typeof s === 'string' ? { title: 'Alert', message: s } : s
    setQueue(queue.concat([message]))
  }

  const alertNodes = queue.map((message, i) => (
    <ConfirmDialog key={i} isOpen={i === 0} title={message.title} onClose={popAlert} hideNoChoice>
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
