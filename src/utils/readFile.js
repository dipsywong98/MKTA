const readFile = target => async file => new Promise((resolve) => {
  const reader = new FileReader()
  reader.addEventListener(
    'load',
    ({ target: { result } }) => (
      resolve(result)
    )
  )
  switch (target) {
    case 'readAsDataURL':
    case 'dataURL':
    case 'base64':
      reader.readAsDataURL(file)
      break
    case 'readAsText':
    case 'text':
      reader.readAsText(file)
      break
    case 'buffer':
    case 'arrayBuffer':
    case 'readAsArrayBuffer':
      reader.readAsArrayBuffer(file)
      break
    case 'bs':
    case 'binaryString':
    case 'readAsBinaryString':
      reader.readAsBinaryString(file)
      break
    default:
      throw new Error(`readFile received an unknown option ${target}`)
  }
})

const readFileAsDataURL = readFile('readAsDataURL')
const readFileAsText = readFile('readAsText')
const readFileAsArrayBuffer = readFile('readAsArrayBuffer')
const readFileAsBinaryString = readFile('readAsBinaryString')

export default readFile

export {
  readFileAsDataURL,
  readFileAsText,
  readFileAsArrayBuffer,
  readFileAsBinaryString
}
