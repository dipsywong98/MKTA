import { useContext, useMemo } from 'react'
import { useAllCourses } from './useAllCourses'
import { useDoIHave } from './useDoIHave'
import { assocPath, fromPairs, groupBy } from 'ramda'
import { CalculationContext } from '../components/CalculationContext'

export const useCalMyFavoredCourses = () => {
  const courses = useAllCourses()
  const iHave = useDoIHave()

  return useMemo(() => {
    const myCourses = []
    const calScore = ({ allTopFlags, allMiddleFlags }) => {
      return allTopFlags.reduce((s, f, k) => s + k * f * 10 + 100 * f, 0) + allMiddleFlags.reduce((s, f, k) => s + k * f + 10 * f, 0)
    }
    Object.entries(courses).forEach(([courseName, courseData]) => {
      let myCourse = {}
      const allTopFlags = [false, false, false]
      const allMiddleFlags = [false, false, false]
      Object.entries(courseData).forEach(([type, { top, middle }], typeIndex) => {
        top.forEach((cardName) => {
          if (iHave(type, cardName)) {
            allTopFlags[typeIndex] = true
            allMiddleFlags[typeIndex] = true
            myCourse = assocPath([type, 'top', cardName], true, myCourse)
          }
        })
        middle.forEach((cardName) => {
          if (iHave(type, cardName)) {
            allMiddleFlags[typeIndex] = true
            myCourse = assocPath([type, 'middle', cardName], true, myCourse)
          }
        })
      })
      myCourse.allTopFlags = allTopFlags
      myCourse.allMiddleFlags = allMiddleFlags
      myCourse.score = calScore({ allTopFlags, allMiddleFlags })
      myCourses.push([courseName, myCourse])
    })
    const { myTopCourses = [], myMiddleCourses = [], myWorstCourses = [] } = groupBy(([_, { allTopFlags, allMiddleFlags }]) => {
      if (allTopFlags[0] && allTopFlags[1] && allTopFlags[2]) {
        return 'myTopCourses'
      } else if (allMiddleFlags[0] && allMiddleFlags[1] && allMiddleFlags[2]) {
        return 'myMiddleCourses'
      } else {
        return 'myWorstCourses'
      }
    })(myCourses.sort((a, b) => b[1].score - a[1].score))

    return {
      myTopCourses: fromPairs(myTopCourses),
      myMiddleCourses: fromPairs(myMiddleCourses),
      myWorstCourses: fromPairs(myWorstCourses),
      myCourses: fromPairs(myCourses)
    }
  }, [courses, iHave])
}

export const useMyFavoredCourses = () => {
  return useContext(CalculationContext).myFavoredCourses
}
