import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AllCardsContext } from './AllCardsContext'
import { MyCards } from './MyCards'
import { MyCardContextProvider } from './MyCardsContext'
import { AllCoursesContext } from './AllCoursesContext'
import { CoursePerformance } from './CoursePerformance'
import { UniqueCards } from './UniqueCards'
import { withAlertQueue } from './common/AlertContext'
import { Box, Container } from '@theme-ui/components'
import { NavBar } from './NavBar'

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
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              display: 'grid',
              gridTemplateColumns: '1fr',
              gridTemplateRows: '0fr 1fr',
              gridTemplateAreas: `
              "navbar"
              "content"
              `,
            }}>
            <NavBar/>
            <Container sx={{ gridArea: 'content', overflow: 'auto' }}>
              <MyCards/>
              <CoursePerformance/>
              <UniqueCards/>
            </Container>
          </Box>
        </MyCardContextProvider>
      </AllCoursesContext.Provider>
    </AllCardsContext.Provider>
  )

}

export default withAlertQueue(App)
