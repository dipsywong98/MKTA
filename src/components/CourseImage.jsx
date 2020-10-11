import React from 'react'
import { Image } from '@theme-ui/components'

export const CourseImage = ({name}) => {
  return (
    <Image alt={name} src={`./images/courses/${name}.png`} sx={{width: '100%'}} title={name}/>
  )
}
