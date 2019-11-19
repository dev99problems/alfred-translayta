const { getTranslationSource } = require('../translation-direction.js')
const { intl } = require('../intl.js')
const { favoritesCache } = require('../cache/favorites-cache.js')

const emptyListMsg = userInput => {
  const userSrc = getTranslationSource(userInput)

  return [{ title: intl.noSearchResults[userSrc] }]
}

const searchInFavorites = userInput => {
  const screenedInput = userInput.replace(/^(\.|\s)*/g, '')
  const results = favoritesCache.filterBy(screenedInput)

  return results.length ? results : emptyListMsg(userInput)
}

exports.searchInFavorites = searchInFavorites
