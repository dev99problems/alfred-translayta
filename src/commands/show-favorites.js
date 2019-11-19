const { favoritesCache } = require('../cache/favorites-cache.js')

const showFavorites = () => {
  return favoritesCache.getFavorites()
}

exports.showFavorites = showFavorites
