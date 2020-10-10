import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AllCardsContext } from './AllCardsContext'
import { MyCards } from './MyCards'
import { MyCardContextProvider } from './MyCardsContext'
import { AllCoursesContext } from './AllCoursesContext'
import { CourseStat } from './CourseStat'
import { CardStat } from './CardStat'

function App() {
  const [drivers, setDrivers] = useState({})
  const [karts, setKarts] = useState({})
  const [gliders, setGliders] = useState({})
  const [courses, setCourses] = useState({})
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
    axios.get('./data/courses.json').then(({ data }) => {
      setCourses(data)
    })
  }, [])
  return (
    <AllCardsContext.Provider value={{ drivers, karts, gliders }}>
      <AllCoursesContext.Provider value={courses}>
        <MyCardContextProvider>
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            <MyCards/>
            <CourseStat/>
            <CardStat/>
          </div>
        </MyCardContextProvider>
      </AllCoursesContext.Provider>
    </AllCardsContext.Provider>
  )

}

export default App
