import { createContext, useContext } from 'react'

export const AllCoursesContext = createContext({})

export const useAllCourses = () => useContext(AllCoursesContext)
