import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AllCardsContext } from './AllCardsContext'
import { MyCards } from './MyCards'
import { MyCardContextProvider } from './MyCardsContext'

function App() {
  const [drivers, setDrivers] = useState({})
  const [karts, setKarts] = useState({})
  const [gliders, setGliders] = useState({})
  useEffect(() => {
    axios.get('./data/drivers.json').then(({ data }) => {
      setDrivers(data)
    })
    axios.get('./data/karts.json').then(({ data }) => {
      setKarts(data)
    })
    axios.get('./data/gliders.json').then(({ data }) => {
      setGliders(data)
    })
  }, [])
  return (
    <AllCardsContext.Provider value={{ drivers, karts, gliders }}>
      <MyCardContextProvider>
        <MyCards/>
      </MyCardContextProvider>
    </AllCardsContext.Provider>
  )

}

export default App
