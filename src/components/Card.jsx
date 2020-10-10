import React from 'react'
import { useAllCards } from './AllCardsContext'

export const Card = ({ name, rarity, type, style, muted, ...props }) => {
  const cards = useAllCards()
  if(rarity === undefined) {
    rarity = cards[type][name].rarity
  }
  return (
    <div
      {...props}
      title={name}
      style={{
        position: 'relative',
        backgroundImage: `url(./images/rarities/${rarity}.png)`,
        backgroundSize: 'auto 100%',
        width: '54px',
        maxWidth: '54px',
        height: '69px',
        maxHeight: '69px',
        ...style
      }}>
      <div
        style={{
          position: 'absolute',
          left: '3px',
          top: '3px',
          right: '4px',
          bottom: '8px',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
        <img
          alt={`${type}/${name}`}
          src={`./images/${type}/${name}.png`}
          style={{
            position: 'absolute',
            left: '50%',
            top: type === 'drivers' ? 0 : '50%',
            transform: `translate(-50%, ${type === 'drivers' ? '0' : '-50%'})`
          }}
        />
      </div>
      <div
        style={{ backgroundColor: 'black', opacity: muted ? 0.5 : 0, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}/>
    </div>
  )
}