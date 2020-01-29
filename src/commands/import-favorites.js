const fs = require('fs')

const { isObjEmpty } = require('../utils.js')
const { favoritesCache } = require('../cache/favorites-cache.js')

let fileData

try {
  fileData = fs.readFileSync('./favorites.json', 'utf8')
} catch (err) {
  console.error(`Can't read file favorites.json, details: ${err}`)
}

try {
  const parsedData = JSON.parse(fileData)
  if (!isObjEmpty(parsedData)) {
    favoritesCache.clear()
  }

  Object.keys(parsedData).forEach(key => {
    const translations = parsedData[key]

    favoritesCache.add(key, translations)
  })
} catch (err) {
  console.error(`favorites.json parsing error, details: ${err}`)
}
