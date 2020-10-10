const eachWithLimit = async (list, limit, asyncCallback) => {
  let promises = []
  for (let i = 0; i < list.length; i++) {
    if (promises.length >= limit) {
      await Promise.all(promises)
      promises = []
    }
    promises.push(asyncCallback(list[i], i, list))
  }
  await Promise.all(promises)
}

module.exports = eachWithLimit
