const TYPES = ['drivers', 'karts', 'gliders']

const addDKGTo = (DKGDict, courseName, topOrMiddle, DKGType) => DKGName => {
  if (!(DKGName in DKGDict)) {
    console.warn(`[WARNING] skipping unknown ${DKGType}: '${DKGName}', course: '${courseName}'`)
    return
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
      courseDKG[DKGType].top.forEach(addDKGTo(DKGDicts[DKGType], courseName, 'top', DKGType))
      courseDKG[DKGType].middle.forEach(addDKGTo(DKGDicts[DKGType], courseName, 'middle', DKGType))
    })
  })
  return DKGDicts
}

module.exports = {
  computeDKGData
}
