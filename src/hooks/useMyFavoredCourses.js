import { useMemo } from 'react'
import set from 'set-value'
import { useAllCourses } from './useAllCourses'
import { useDoIHave } from './useDoIHave'

export const useMyFavoredCourses= () => {
  const courses = useAllCourses()
  const iHave = useDoIHave()

  return useMemo(() => {
    const myTopCourses = {}
    const myMiddleCourses = {}
    const myWorstCourses = {}
    Object.entries(courses).forEach(([courseName, courseData]) => {
      const myCourse = {}
      const allTopFlags = [false, false, false]
      const allMiddleFlags = [false, false, false]
      Object.entries(courseData).forEach(([type, { top, middle }], typeIndex) => {
        top.forEach((cardName) => {
          if (iHave(type, cardName)) {
            allTopFlags[typeIndex] = true
            set(myCourse, `${type}.top.${cardName}`, true)
          }
        })
        middle.forEach((cardName) => {
          if (iHave(type, cardName)) {
            allMiddleFlags[typeIndex] = true
            set(myCourse, `${type}.middle.${cardName}`, true)
          }
        })
      })
      myCourse.allTopFlags = allTopFlags
      myCourse.allMiddleFlags = allMiddleFlags
      if (allTopFlags[0] && allTopFlags[1] && allTopFlags[2]) {
        myTopCourses[courseName] = myCourse
      } else if (allMiddleFlags[0] && allMiddleFlags[1] && allMiddleFlags[2]) {
        myMiddleCourses[courseName] = myCourse
      } else {
        myWorstCourses[courseName] = myCourse
      }
    })
    return { myTopCourses, myMiddleCourses, myWorstCourses }
  }, [courses, iHave])
}
