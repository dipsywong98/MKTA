import React, { useCallback } from 'react'
import { useMyCardsReducers } from './MyCardsContext'
import { Card } from './Card'
import { useAllCards } from '../hooks/useAllCards'
import CollapsibleWell from './common/CollapsibleWell'
import { Box, Flex, Heading, Text } from '@theme-ui/components'
import IconText from './common/IconText'
import { ICONS } from './common/Icon'
import Button from './common/Button'
import { useOpenFileAsText } from './DropZoneProvider'
import { mdiExport, mdiImport } from '@mdi/js'
import { saveFileText } from '../utils/saveFile'

export const MyCards = () => {
  const allCards = useAllCards()
  const { myCards, levelToggle, overwrite } = useMyCardsReducers()
  const processImportFile = useCallback(text => {
    overwrite(JSON.parse(text))
  }, [overwrite])
  const saveFile = () => {
    saveFileText(JSON.stringify(myCards), 'myCards.mkta.json')
  }
  const openFileDialog = useOpenFileAsText(processImportFile)
  return (
    <Box sx={{ width: '100%' }}>
      <Heading id='my_cards'><IconText path={ICONS.drivers}>My Cards</IconText></Heading>
      <Text>Tap to mark whether you have the card, long press to see the card's info.</Text>
      <Text mb={3}>
        Drag and drop or click the import button to load your cards from file, or click export to save your cards
      </Text>
      <Flex>
        <Button onClick={openFileDialog} variant='normal-md' mr={2}>
          <IconText path={mdiImport}>Import Data</IconText>
        </Button>
        <Button onClick={saveFile} variant='normal-md'>
          <IconText path={mdiExport}>Export Data</IconText>
        </Button>
      </Flex>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        {['drivers', 'karts', 'gliders'].map(type => (
          <Box key={type} sx={{ flex: 1, mr: 2, minWidth: 'calc(54px *4)' }} id={type}>
            <CollapsibleWell header={<IconText path={ICONS[type]}
                                               sx={{ textTransform: 'capitalize' }}>my {type} ({Object.keys(myCards[type]).length}/{Object.keys(allCards[type]).length})</IconText>}
                             noPad>
              <div key={type} style={{
                display: 'flex',
                flexWrap: 'wrap',
                maxWidth: 'calc(54px *4)',
                minWidth: 'calc(54px *4)',
                margin: 'auto'
              }}>
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
