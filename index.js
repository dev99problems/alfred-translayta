const alfy = require('alfy')

const {
  showLastTranslation
} = require('./src/commands/show-last-translation.js')
const { showFavorites } = require('./src/commands/show-favorites.js')
const { searchInFavorites } = require('./src/commands/search-in-favorites.js')
const { translate } = require('./src/commands/translate.js')

const userInput = (process.argv[2] || '').trim()

const isInputEmpty = !Boolean(userInput.length)
const isFavorites = userInput === '.'
const isFavoritesSearch = userInput.startsWith('.') && !isFavorites

// NOTE: even though seems like top level await landed in node v10.x
// we use async iife here
!(async () => {
  let output

  if (isInputEmpty) {
    output = showLastTranslation()
  } else if (isFavorites) {
    output = showFavorites()
  } else if (isFavoritesSearch) {
    output = searchInFavorites(userInput)
  } else {
    output = await translate(userInput)
  }

  alfy.output(output)
})()
