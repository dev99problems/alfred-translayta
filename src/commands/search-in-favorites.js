const { getTranslationSource } = require('../translation-direction')
const { intl } = require('../intl')
const { favoritesCache } = require('../cache/favorites-cache')

const emptyListMsg = userInput => {
  const userSrc = getTranslationSource(userInput)

  return [{ title: intl.noSearchResults[userSrc] }]
}

const searchInFavorites = userInput => {
  const screenedInput = userInput.replace(/^(\.|\s)*/g, '')
  const results = favoritesCache.findInFavorites(screenedInput)

  return results.length ? results : emptyListMsg(userInput)
}

exports.searchInFavorites = searchInFavorites
