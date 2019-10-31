const fs = require('fs')
const { favoritesCache } = require('../cache')

const { word, translations } = process.env

const { items = [] } = favoritesCache.get() || {}

const updatedItems = [
  {
    title: word,
    subtitle: translations
  },
  ...items
]

saveFavorites(updatedItems, () => {
  favoritesCache.set({ items: updatedItems })
})

function saveFavorites(items, cb) {
  const convertedData = items.reduce((acc, item) => {
    acc[item.title] = item.subtitle
    return acc
  }, {})

  const fileData = JSON.stringify(convertedData)

  fs.writeFile('./favorites.txt', fileData, err => {
    if (err) throw err

    if (typeof cb === 'function') {
      cb()
    }
  })
}
