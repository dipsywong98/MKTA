import React, { useState } from 'react'
import { useMyFavoredCourses } from './useMyFavoredCourses'
import { useMyUniqueCards } from './useMyUniqueCards'


export const CourseStat = () => {
  const favoredCourses = useMyFavoredCourses()
  const [expands, setExpands] = useState({})
  console.log(useMyUniqueCards())
  return <div style={{ display: 'flex' }}>
    {Object.entries(favoredCourses).map(([key, courses]) => (<div key={key}>
      <div>{Object.keys(courses).length} {key} <button onClick={() => setExpands({...expands, [key]:!expands[key]})}>{expands[key] ? '-' : '+'}</button></div>
      {expands[key] && Object.entries(courses).map(([courseName, course]) => {
        return <div key={courseName}>
          <button onClick={() => console.log(course)}>{courseName}</button>
        </div>
      })}
    </div>))}
  </div>
}
