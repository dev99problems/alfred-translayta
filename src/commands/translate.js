const { getTranslations } = require('../translate/get-translations')

const translate = userInput => {
  return getTranslations(userInput)
}

exports.translate = translate
