const fs = require('fs')

const { favoritesCache } = require('./cache/favorites-cache.js')
const { favoritesOperations } = require('./const.js')

const { word, translations, action } = process.env

const { ADD, EDIT, REMOVE } = favoritesOperations

switch (action) {
  case ADD:
  case EDIT:
    favoritesCache.add(word, translations)
    break

  case REMOVE:
    favoritesCache.remove(word)
    break
}

const fileData = JSON.stringify(favoritesCache.items)

fs.writeFile('./favorites.json', fileData, err => {
  if (err) throw err
})
