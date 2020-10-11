import React from 'react'
import { useMyCardsReducers } from './MyCardsContext'
import { Card } from './Card'
import { useAllCards } from '../hooks/useAllCards'

export const MyCards = () => {
  const allCards = useAllCards()
  const { myCards, levelToggle } = useMyCardsReducers()
  return (
    <div>
      <button onClick={() => console.log(myCards)}>console.log</button>
      <div style={{ display: 'flex', alignContent: 'flex-start', justifyContent: 'flex-start' }}>
        {['drivers', 'karts', 'gliders'].map(type => (
          <div key={type} style={{ display: 'flex', flexWrap: 'wrap' }}>
            {Object.entries(allCards[type]).map(([name, { rarity }]) => {
              return (
                <Card
                  key={name}
                  type={type}
                  rarity={rarity}
                  name={name}
                  muted={!myCards[type][name]?.level}
                  onClick={(e) => {
                    e.preventDefault()
                    levelToggle(type, name)
                  }}
                  onContextMenu={e => {
                    // levelDown(type, name)
                    e.preventDefault()
                  }}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
