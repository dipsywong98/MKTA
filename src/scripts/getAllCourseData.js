const axios = require('axios')
const cheerio = require('cheerio')
const { mergeAll } = require('ramda')
const union = require('union-value')

const ENDPOINT = 'https://www.mariowiki.com' //'http://localhost:3000/api/dummy' //
const TYPES = ['drivers', 'karts', 'gliders']

const formatName = name => {
  return name.trim().replace('?', '❓').replace('/', '')
}

const getAllCourseData = async () => {
  console.log('getting all course data')
  const { data: homepageHtml } = await axios.get(`${ENDPOINT}/Mario_Kart_Tour`).catch(console.log)
  const courseImages = getCourseImagesFromHome(trimHomepage(homepageHtml, 'Courses'))
  const drivers = getKDGImageAndDataFromHome(trimHomepage(homepageHtml, 'Drivers'))
  const karts = getKDGImageAndDataFromHome(trimHomepage(homepageHtml, 'Karts'))
  const gliders = getKDGImageAndDataFromHome(trimHomepage(homepageHtml, 'Gliders'))

  // const courses = {}
  // const urls = getCoursesUrlFromHome(trimHomepage(homepageHtml, 'Courses'))
  // console.log(`there are ${urls.length} courses`)
  // await eachWithLimit(urls, CONCURRENT_LIMIT, async (url, i) => {
  //   console.log(i, '/', urls.length)
  //   await axios.get(ENDPOINT + urls[i])
  //     .then(({ data: courseHtml }) => mergeCoursesFavorData(courses, getDriversFromCourse(courseHtml)))
  //     .catch(console.log)
  // })

  const { data: listOfFavoredDKGHtml } = await axios.get(`${ENDPOINT}/List_of_favored_drivers,_karts,_and_gliders_per_course_in_Mario_Kart_Tour`).catch(console.log)
  const courses = getCoursesDKGData(listOfFavoredDKGHtml)
  return { courses, courseImages, drivers, karts, gliders }
}

const trimHomepage = (homepageHtml, title) => {
  return '<div>' + homepageHtml.split(`<span class="mw-headline" id="${title}">${title}</span>`)[1].split(`</h2>`)[1].split(`<h2>`)[0] + '</div>'
}

const getCoursesUrlFromHome = html => {
  const $ = cheerio.load(html)
  return $('table').find('tr>td:first-child a').toArray().map(a => a.attribs.href)
}

const makeCourseName = (name, variant) => {
  if (/\d$/.test(name)) {
    return name + variant
  } else {
    return name + ' ' + variant
  }
}

const getCourseImagesFromHome = html => {
  const $ = cheerio.load(html)
  return mergeAll($('tbody').find('tr:not(:first-child)').toArray().map(tr => {
    const name = $(tr).find('a')[0].attribs.title
    const hrefs = $(tr).find('img').toArray().map(img => img.attribs.src)
    return {
      [name]: hrefs[0],
      [makeCourseName(name, 'R')]: hrefs[1],
      [makeCourseName(name, 'T')]: hrefs[2],
      [makeCourseName(name, 'RT')]: hrefs[3],
    }
  }))
}

const getKDGImageAndDataFromHome = html => {
  const $ = cheerio.load(html)
  return mergeAll($('table.sortable tbody tr:not(:first-child)').toArray().map(tr => {
    const name = formatName($(tr).find('a')[0].children[0].data)
    const imgSrc = $(tr).find('img')[0].attribs.src
    const rarity = $(tr).find('td:nth-child(4)')[0].children[0].data.trim()
    const special = $(tr).find('td:nth-child(5)')[0].children.pop().data.trim()
    return {
      [name]: {
        imgSrc,
        rarity,
        special,
        top: [],
        middle: []
      }
    }
  }))
}

const courseVariants = ['', 'R', 'T', 'RT']

const getCoursesDKGData = html => {
  const courses = {}
  const $ = cheerio.load(html)
  $('h3+table').toArray().forEach(table => {
    const courseNameBase = $(table.prev.prev).find('a[title]')[0].attribs.title
    $(table).find('tr td:not([rowspan])').toArray().forEach((td, k) => {
      const variantId = Math.floor(k / 18)
      const type = ['drivers', 'karts', 'gliders'][k % 3]
      const topMiddle = (k % 6) < 3 ? 'top' : 'middle'
      const courseName = formatName(makeCourseName(courseNameBase, courseVariants[variantId]))
      const names = $(td).find('a').toArray().map(a => formatName(a.attribs.title))
      union(courses, `${courseName}.${type}.${topMiddle}`, names)
    })
  })
  return courses
}

const getDriversFromCourse = (html) => {
  const $ = cheerio.load(html)
  let mapKey = ''
  return $('div.mw-collapsible[data-collapsetext="Hide stats"] tr').toArray().reduce((dict, tr, k) => {
    if (k % 4 === 0) {
      mapKey = formatName($(tr).find('th').first().html().split('<br>')[1].replace(/<.*>(.*)<\/.*>/, '$1'))
      if (!(mapKey in dict)) {
        dict[mapKey] = {
          drivers: {
            top: [],
            middle: []
          },
          karts: {
            top: [],
            middle: []
          },
          gliders: {
            top: [],
            middle: []
          }
        }
      }
    } else if (k % 4 !== 1) {
      const rank = { 2: 'top', 3: 'middle' }[k % 4]
      $(tr).find('td').toArray().forEach((td, typeId) => {
        $(td).find('a').toArray().forEach(a => {
          const name = formatName(a.attribs.title)
          if (!dict[mapKey][TYPES[typeId]][rank].includes(name)) {
            dict[mapKey][TYPES[typeId]][rank].push(name)
          }
        })
      })
    }
    return dict
  }, {})
}

const mergeCoursesFavorData = async (coursesA, coursesB) => {
  Object.entries(coursesB).forEach(([courseName, driverKartGlider]) => {
    if (courseName in coursesA) {
      Object.entries(driverKartGlider).forEach(([driverKartGliderKey, topMiddle]) => {
        Object.entries(topMiddle).forEach(([topMiddleKey, cards]) => {
          coursesA[courseName][driverKartGliderKey][topMiddleKey] = Array.from(new Set([...coursesA[courseName][driverKartGliderKey][topMiddleKey], ...cards]))
        })
      })
    } else {
      coursesA[courseName] = driverKartGlider
    }
  })
  return Promise.resolve(coursesA)
}

module.exports = {
  getAllCourseData,
  getDriversFromCourse,
  getCoursesUrlFromHome,
  mergeCoursesFavorData,
  trimHomepage,
  getCourseImagesFromHome,
  getKDGImageAndDataFromHome,
  getCoursesDKGData
}
