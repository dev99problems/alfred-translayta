const alfy = require('alfy')

const { getTranslations } = require('./src/translate/get-translations')
const { getLastSearchResults } = require('./src/get-last-search-results')
const { favoritesCache } = require('./src/cache')

const userInput = process.argv[2] || ''
const isInputEmpty = !Boolean(userInput.trim().length)
const isFavorites = userInput.trim().startsWith('.')

// NOTE: even though seems like top level await landed in node v10.x
// we use async iife here
!(async () => {
  let output
  if (isInputEmpty) {
    output = getLastSearchResults()
  } else if (isFavorites) {
    output = favoritesCache.get().items
  } else {
    output = await getTranslations(userInput)
  }

  alfy.output(output)
})()
