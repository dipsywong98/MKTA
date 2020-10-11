import React, { createContext, useContext, useState } from 'react'
import ConfirmDialog from './ConfirmDialog'

export const withAlertQueue = (WrappedComponent) => {
  const AlertWrapper = props => {
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
        <WrappedComponent {...props}/>
        {alertNodes}
      </AlertContext.Provider>
    )
  }

  return AlertWrapper
}

export const useAlert = () => useContext(AlertContext)
export const AlertContext = createContext(window.alert)
AlertContext.displayName = 'AlertContext'
