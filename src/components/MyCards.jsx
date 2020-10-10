import React from 'react'
import { useAllCards } from './AllCardsContext'
import { useMyCardsReducers } from './MyCardsContext'
import { Card } from './Card'

export const MyCards = () => {
  const allCards = useAllCards()
  const { myCards, levelUp, levelDown } = useMyCardsReducers()
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
                    levelUp(type, name)
                  }}
                  onContextMenu={e => {
                    levelDown(type, name)
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
