const { getTranslations } = require('../translate/get-translations.js')

const showLastTranslation = userInput => {
  return getTranslations(userInput)
}

exports.showLastTranslation = showLastTranslation
