const TYPES = ['drivers', 'karts', 'gliders']

let warned = 0
const warningAsError = !!process.env.WARNING_AS_ERROR
if(warningAsError){
  console.info('WARNING_AS_ERROR env detected, treating warnings as errors')
}
const warnOrError = (...params) => {
  warned++
  if(warningAsError){
    console.error('[ERROR]',...params)
  } else {
    console.warn('[WARNING]',...params)
  }
}

const addDKGTo = (DKGDict, courseName, topOrMiddle, DKGType) => DKGName => {
  if (!(DKGName in DKGDict)) {
    warnOrError(`skipping unknown ${DKGType}: '${DKGName}', course: '${courseName}'`)
    return
  }
  DKGDict[DKGName][topOrMiddle] = Array.from(new Set([...DKGDict[DKGName][topOrMiddle], courseName]))
}

const computeDKGData = (courseData, drivers, karts, gliders) => {
  console.log('computing driver, kart and glider data')
  warned = 0
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
  if(warningAsError && warned > 0) {
    console.error(`there are ${warned} sync errors, please update mariowiki and sync again, https://www.mariowiki.com/List_of_favored_drivers,_karts,_and_gliders_per_course_in_Mario_Kart_Tour or https://www.mariowiki.com/Mario_Kart_Tour`)
    process.exitCode = 1
    process.exit()
  }
  return DKGDicts
}

module.exports = {
  computeDKGData
}
