import { useContext } from 'react'
import { AllCoursesContext } from '../components/AllCoursesContext'

export const useAllCourses = () => useContext(AllCoursesContext)
