import React, { useEffect, useState } from 'react'
import { AllCardsContext } from './AllCardsContext'
import { MyCards } from './MyCards'
import { MyCardContextProvider } from './MyCardsContext'
import { AllCoursesContext } from './AllCoursesContext'
import { CoursePerformance } from './CoursePerformance'
import { UniqueCards } from './UniqueCards'
import { Box, Container } from '@theme-ui/components'
import { NavBar } from './NavBar'
import { AlertContextProvider } from './common/AlertContext'
import { fullUrl } from '../utils/componentHelpers'
import { CalculationContextProvider } from './CalculationContext'

function App() {
  const [drivers, setDrivers] = useState({})
  const [karts, setKarts] = useState({})
  const [gliders, setGliders] = useState({})
  const [courses, setCourses] = useState({})
  useEffect(() => {
    fetch(fullUrl('/data/drivers.json')).then(res => res.json()).then((data) => {
      setDrivers(data)
    })
    fetch(fullUrl('/data/karts.json')).then(res => res.json()).then((data) => {
      setKarts(data)
    })
    fetch(fullUrl('/data/gliders.json')).then(res => res.json()).then((data) => {
      setGliders(data)
    })
    fetch(fullUrl('/data/courses.json')).then(res => res.json()).then((data) => {
      setCourses(data)
    })
  }, [])
  return (
    <AllCardsContext.Provider value={{ drivers, karts, gliders }}>
      <AllCoursesContext.Provider value={courses}>
        <MyCardContextProvider>
          <CalculationContextProvider>
            <AlertContextProvider>
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
            </AlertContextProvider>
          </CalculationContextProvider>
        </MyCardContextProvider>
      </AllCoursesContext.Provider>
    </AllCardsContext.Provider>
  )
}

export default App
