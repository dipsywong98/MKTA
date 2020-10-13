const saveFile = (type = 'plain') => (text, filename = 'download.txt') => {
  let element = document.createElement('a')
  if (type === 'plain') {
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  } else {
    element.setAttribute('href', 'data:application/octet-stream;base64,' + btoa(text))
  }
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

export default saveFile

const saveFileText = saveFile()
const saveFileBase64 = saveFile('b64')

export {
  saveFileText,
  saveFileBase64
}
