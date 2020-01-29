const alfy = require('alfy')

const { config } = require('./src/config/config.js')
const {
  showLastTranslation
} = require('./src/commands/show-last-translation.js')
const { showFavorites } = require('./src/commands/show-favorites.js')
const { searchInFavorites } = require('./src/commands/search-in-favorites.js')
const { translate } = require('./src/commands/translate.js')
const { showSettingsMenu } = require('./src/commands/show-settings.js')

const userInput = (process.argv[2] || '').trim()

const previousMode = !Boolean(userInput.length)
const settingsMode = userInput === '/settings'
const showFavoritesMode = userInput === '.'
const learnFavoritesMode = userInput === '..'
const searchInFavoritesMode = userInput.startsWith('.') && !showFavoritesMode

// NOTE: even though seems like top level await landed in node v10.x
// we use async iife here
!(async () => {
  let output

  if (previousMode) {
    output = showLastTranslation()
  } else if (settingsMode) {
    output = showSettingsMenu()
  } else if (showFavoritesMode) {
    config.set('withSubtitle', true)
    output = showFavorites()
  } else if (learnFavoritesMode) {
    config.set('withSubtitle', false)
    output = showFavorites()
  } else if (searchInFavoritesMode) {
    output = searchInFavorites(userInput)
  } else {
    output = await translate(userInput)
  }

  alfy.output(output)
})()
