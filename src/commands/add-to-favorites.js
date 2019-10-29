const { favoritesCache } = require('../cache')

const { word, translations } = process.env

const { items } = favoritesCache.get() || {}

favoritesCache.set({
  items: [
    {
      title: word,
      subtitle: translations
    },
    ...items
  ]
})
