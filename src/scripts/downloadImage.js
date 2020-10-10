const axios = require('axios')
const fs = require('fs')

const downloadImage = async (url, name) => {
  const writer = fs.createWriteStream(name)
  const { data } = await axios.get(url, { responseType: 'stream' })
  data.pipe(writer)
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

module.exports = downloadImage
