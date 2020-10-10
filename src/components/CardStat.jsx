import React, { useState } from 'react'
import { useMyUniqueCards } from './useMyUniqueCards'
import { Card } from './Card'

export const CardStat = () => {
  const uniqueCards = useMyUniqueCards()
  const [show, setShow] = useState(false)
  return (
    <div>
      <div>Unique Cards <button onClick={() => setShow(!show)}>{show ? '-' : '+'}</button></div>
      <table>
        <tbody>
        {
          show && Object.entries(uniqueCards).map(([type, { top, middle }]) => {
            const sortedTop = Object.entries(top).sort((a, b) => Object.values(b[1]).length - Object.values(a[1]).length)
            return sortedTop.map(([name, courses]) => (
              <tr key={name}>
                <td>
                  <Card type={type} name={name}/>
                </td>
                <td>
                  {Object.keys(courses).join(', ')}
                </td>
              </tr>
            ))
          })
        }
        </tbody>
      </table>
    </div>
  )
}
