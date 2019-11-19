const { getTranslations } = require('../translate/get-translations.js')

const translate = userInput => {
  return getTranslations(userInput)
}

exports.translate = translate
