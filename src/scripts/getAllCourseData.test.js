import { readFileSync } from 'fs'
import {
  getAllCourseData, getCourseImagesFromHome,
  getCoursesUrlFromHome,
  getDriversFromCourse, getKDGImageAndDataFromHome,
  mergeCoursesFavorData, trimHomepage, getCoursesDKGData
} from './getAllCourseData'

describe('getAllCourseData', () => {
  it('test', async () => {
    const data = await getAllCourseData()
    console.log()
  })
})

describe('getCoursesUrlFromHome', () => {
  it('can parse home page', () => {
  const html = readFileSync(__dirname + '/../fixtures/Mario_Kart_Tour.html').toString()
    const content = getCoursesUrlFromHome(trimHomepage(html, 'Courses'))
    console.log(content)
  })
})

describe('getCourseImageFromHome', () => {
  it('test', () => {
    const html = readFileSync(__dirname + '/../fixtures/Mario_Kart_Tour.html').toString()
    const content = getCourseImagesFromHome(trimHomepage(html, 'Courses'))
    console.log(content)
  })
})

describe('getKDGImageAndDataFromHome', () => {
  it('test', () => {
    const html = readFileSync(__dirname + '/../fixtures/Mario_Kart_Tour.html').toString()
    const content = getKDGImageAndDataFromHome(trimHomepage(html, 'Drivers'))
    console.log(content)
  })
})

describe('getCoursesDKGData', () => {
  it('test', () => {
    const html = readFileSync(__dirname + '/../fixtures/List_of_favored_drivers,_karts,_and_gliders_per_course_in_Mario_Kart_Tour.html').toString()
    const content = getCoursesDKGData(html)
    console.log(content)
  })
})

describe('getDriversFromCourse', () => {
  it('can parse course page', () => {
    const html = readFileSync(__dirname + '/../fixtures/Tokyo_blur.html').toString()
    const content = getDriversFromCourse(html)
    expect(Object.keys(content)).toHaveLength(4)
  })
})

describe('meergeCoursesFavorData', () => {
  it('can merge course forvor data', () => {
    const coursesA = {
      course1: {
        drivers: {
          top: ['d1'],
          middle: ['d2']
        },
        karts: {
          top: ['k1'],
          middle: ['k2']
        },
        gliders: {
          top: ['g1'],
          middle: ['g2']
        }
      }
    }
    const coursesB = {
      course1: {
        drivers: {
          top: ['d1'],
          middle: ['d2', 'd3']
        },
        karts: {
          top: [],
          middle: ['k2']
        },
        gliders: {
          top: ['g1', 'g3'],
          middle: ['g2']
        }
      },
      course2: {
        drivers: {
          top: ['d4'],
          middle: []
        },
        karts: {
          top: ['k4'],
          middle: []
        },
        gliders: {
          top: ['g4'],
          middle: []
        }
      }
    }
    const result = mergeCoursesFavorData(coursesA, coursesB)
    expect(result).resolves.toEqual({
      course1: {
        drivers: {
          top: ['d1'],
          middle: ['d2', 'd3']
        },
        karts: {
          top: ['k1'],
          middle: ['k2']
        },
        gliders: {
          top: ['g1', 'g3'],
          middle: ['g2']
        }
      },
      course2: {
        drivers: {
          top: ['d4'],
          middle: []
        },
        karts: {
          top: ['k4'],
          middle: []
        },
        gliders: {
          top: ['g4'],
          middle: []
        }
      }
    })
  })
})
