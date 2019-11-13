const { getTranslations } = require('../translate/get-translations')

const showLastTranslation = userInput => {
  return getTranslations(userInput)
}

exports.showLastTranslation = showLastTranslation
