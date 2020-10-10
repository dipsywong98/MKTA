const TYPES = ['drivers', 'karts', 'gliders']

const addDKGTo = (DKGDict, courseName, topOrMiddle) => DKGName => {
  if (!(DKGName in DKGDict)) {
    DKGDict[DKGName] = {
      top: [],
      middle: []
    }
  }
  DKGDict[DKGName][topOrMiddle] = Array.from(new Set([...DKGDict[DKGName][topOrMiddle], courseName]))
}

const computeDKGData = (courseData, drivers, karts, gliders) => {
  console.log('computing driver, kart and glider data')
  const DKGDicts = {
    drivers,
    karts,
    gliders
  }
  Object.entries(courseData).forEach(([courseName, courseDKG]) => {
    TYPES.forEach(DKGType => {
      courseDKG[DKGType].top.forEach(addDKGTo(DKGDicts[DKGType], courseName, 'top'))
      courseDKG[DKGType].middle.forEach(addDKGTo(DKGDicts[DKGType], courseName, 'middle'))
    })
  })
  return DKGDicts
}

module.exports = {
  computeDKGData
}
