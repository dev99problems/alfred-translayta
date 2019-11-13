const { favoritesCache } = require('../cache/favorites-cache')

const showFavorites = () => {
  return favoritesCache.getFavorites()
}

exports.showFavorites = showFavorites
