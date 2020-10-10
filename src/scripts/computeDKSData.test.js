import { computeDKGData } from './computeDKGData'

describe('computeDKGData', () => {
  it('can compute driver kart and glider data', () => {
    const courseData = {
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
          top: [],
          middle: ['d1', 'd2']
        },
        karts: {
          top: [],
          middle: ['k1', 'k2']
        },
        gliders: {
          top: [],
          middle: ['g1', 'g2']
        }
      }
    }
    const result = computeDKGData(courseData)
    expect(result.drivers).toEqual({
      d1: {
        top: ['course1'],
        middle: ['course2']
      },
      d2: {
        top: [],
        middle: ['course1', 'course2']
      },
      d3: {
        top: [],
        middle: ['course1']
      }
    })
  })
})
