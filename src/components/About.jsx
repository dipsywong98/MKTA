import React, { useEffect, useState } from 'react'
import { Box, Heading, Link, Text } from '@theme-ui/components'
import IconText from './common/IconText'
import { ICONS } from './common/Icon'

export const About = () => {
  const [{ lastTime, lastMessage }, setLastUpdate] = useState({})
  useEffect(() => {
    fetch('https://api.github.com/repos/dipsywong98/MKTA/commits/master')
      .then(res => res.json())
      .then(json => {
        const lastTime = json.commit?.author.date
        const lastMessage = json.commit?.message
        setLastUpdate({ lastMessage, lastTime })
      })
  }, [])
  return (
    <Box id='about'>
      <Heading><IconText path={ICONS.news}>About</IconText></Heading>
      <Text>
        Thanks for using this website, hope you like it. Feel free to share with your friends if you find this website
        is useful.
      </Text>
      <Text>
        If you found any bugs or got any suggestions, feel free to leave an issue at <a
        href='//github.com/dipsywong98/MKTA'>the project repo</a>.
      </Text>
      <Link href='https://github.com/dipsywong98/MKTA'><Text>Last Update: {lastMessage} at {lastTime}</Text></Link>
      <Text variant='helperText'>
        Artworks of this website originally from a copyrighted computer or video game,
        and the copyright for it is most likely held by the company that developed the game.
        It is believed that the use of a limited number of web-resolution sprites for identification
        and critical commentary on the computer or video game in question or the copyrighted character(s)
        depicted by the sprite in question qualifies as fair use under United States copyright law,
        as such display does not significantly impede the right of the copyright holder to sell the copyrighted
        material,
        is not being used to turn a profit in this context,
        and presents ideas that cannot be exhibited otherwise.
        This website does server as a community project, not as any commercial purpose, nor generating any revenue.
      </Text>
      <Text variant='helperText'>
        Information including but not limited to Courses, Drivers, Karts and Gliders are collected from <a
        href="https://www.mariowiki.com/">https://www.mariowiki.com/</a>.
        Owners and maintainers of this website will not be responsible for the correctness information nor any loses
        caused by the bugs of this website.
      </Text>
      <Text variant='helperText'>
        Cookies are used for storing your drivers/karts/gliders, which is stored in your browsers locally.
        When you uses this website, you agreed the use of cookies.
        We wont ask for any username nor password, nor collecting any other data.
        We used google analytics to collect anonymous site statistics
      </Text>
    </Box>
  )
}
