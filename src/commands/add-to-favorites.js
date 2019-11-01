const fs = require('fs')
const { favoritesCache } = require('../cache/favorites-cache')

const { word, translations } = process.env

favoritesCache.addToFavorites(word, translations)

const fileData = JSON.stringify(favoritesCache.items)

fs.writeFile('./favorites.json', fileData, err => {
  if (err) throw err
})
