import React from 'react'
import { useMyCardsReducers } from './MyCardsContext'
import { Card } from './Card'
import { useAllCards } from '../hooks/useAllCards'
import CollapsibleWell from './common/CollapsibleWell'
import { Box, Heading } from '@theme-ui/components'
import IconText from './common/IconText'
import { ICONS } from './common/Icon'

export const MyCards = () => {
  const allCards = useAllCards()
  const { myCards, levelToggle } = useMyCardsReducers()
  return (
    <Box sx={{width: '100%'}}>
      <Heading><IconText path={ICONS.drivers}>My Cards</IconText></Heading>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%'}}>
        {['drivers', 'karts', 'gliders'].map(type => (
          <Box key={type} sx={{minWidth: '248px', mr: 2}} id={type}>
            <CollapsibleWell header={<IconText path={ICONS[type]} sx={{textTransform: 'capitalize'}}>my {type}</IconText>}>
              <div key={type} style={{ display: 'flex', flexWrap: 'wrap', maxWidth: 'calc(54px *4)', minWidth: 'calc(54px *4)' }}>
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
            </CollapsibleWell>
          </Box>
        ))}
      </div>
    </Box>
  )
}
