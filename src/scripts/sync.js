const fs = require('fs')
const { computeDKGData } = require('./computeDKGData')
const { getAllCourseData } = require('./getAllCourseData')
const path = require('path')
const eachWithLimit = require('./eachWithLimit')
const downloadImage = require('./downloadImage')

const CONCURRENT_LIMIT = 5

const ENDPOINT = 'https://www.mariowiki.com' //

const sync = async () => {
  const {
    courses,
    courseImages,
    drivers,
    karts,
    gliders
  } = await syncData()
  mkdir(path.resolve('public','images'))
  mkdir(path.resolve('public','images','courses'))
  mkdir(path.resolve('public','images','drivers'))
  mkdir(path.resolve('public','images','karts'))
  mkdir(path.resolve('public','images','gliders'))
  mkdir(path.resolve('public','data'))
  await downloadCourseImages(courseImages)
  await downloadDKGImages(drivers, 'drivers')
  await downloadDKGImages(karts, 'karts')
  await downloadDKGImages(gliders, 'gliders')
  fs.writeFileSync(__dirname + '/../../public/data/courses.json', JSON.stringify(courses))
  fs.writeFileSync(__dirname + '/../../public/data/drivers.json', JSON.stringify(drivers))
  fs.writeFileSync(__dirname + '/../../public/data/karts.json', JSON.stringify(karts))
  fs.writeFileSync(__dirname + '/../../public/data/gliders.json', JSON.stringify(gliders))
}

const mkdir = dir => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
}

const syncData = async () => {
  console.log('sync data start')
  const { courses, courseImages, drivers, gliders, karts } = await getAllCourseData()
  computeDKGData(courses, drivers, karts, gliders)
  console.log('sync data done')
  return {
    courses,
    courseImages,
    drivers,
    karts,
    gliders
  }
}

const downloadCourseImages = async courseImages => {
  console.log('downloading course images')
  await eachWithLimit(Object.entries(courseImages), CONCURRENT_LIMIT, async ([courseName, imgSrc], k, list) => {
    if(imgSrc !== undefined) {
      await downloadImage(ENDPOINT + imgSrc, path.resolve('public','images','courses', courseName) + '.png')
      console.log(k,'/',list.length)
    }
  })
  console.log('finish downloading course images')
}

const downloadDKGImages = async (dkgData, dkgDataName) => {
  console.log('downloading '+dkgDataName+' images')
  await eachWithLimit(Object.entries(dkgData), CONCURRENT_LIMIT, async ([dkgName, dkg], k, list) => {
    const {imgSrc} = dkg
    if(imgSrc !== undefined) {
      await downloadImage(ENDPOINT + imgSrc, path.resolve('public', 'images', dkgDataName, dkgName) + '.png')
    }
    delete dkg.imgSrc
    console.log(k,'/',list.length)
  })
  console.log('finish downloading '+dkgDataName+' images')
}

if (process.env.RUN_CLI === 'true') {
  sync().then(() => {
    console.log('finished')
  })
}

module.exports = {
  sync
}
