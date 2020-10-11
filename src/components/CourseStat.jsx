import React, { useState } from 'react'
import { useMyFavoredCourses } from '../hooks/useMyFavoredCourses'
import { useAlertCourse } from '../hooks/useAlertCourse'


export const CourseStat = () => {
  const favoredCourses = useMyFavoredCourses()
  const [expands, setExpands] = useState({})
  const alertCourse = useAlertCourse()
  return <div style={{ display: 'flex' }}>
    {Object.entries(favoredCourses).map(([key, courses]) => (<div key={key}>
      <div>{Object.keys(courses).length} {key} <button onClick={() => setExpands({...expands, [key]:!expands[key]})}>{expands[key] ? '-' : '+'}</button></div>
      {expands[key] && Object.entries(courses).map(([courseName, course]) => {
        return <div key={courseName}>
          <button onClick={() => alertCourse(courseName)}>{courseName}</button>
        </div>
      })}
    </div>))}
  </div>
}
