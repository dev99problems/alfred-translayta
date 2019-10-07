const translate = require('@vitalets/google-translate-api')

const { createTranslationsList } = require('./create-translations-list')
const { translationDirection } = require('../translation-direction')
const { intl } = require('../intl')
const { lastSearchCache } = require('../cache')

const getTranslations = userInput => {
  const { from, to } = translationDirection(userInput)

  return translate(userInput, { from, to, raw: true })
    .then(response => {
      const translationsList = createTranslationsList(response, to)
      lastSearchCache.set(translationsList)

      return translationsList
    })
    .catch(err => {
      console.error('error on translation response: ', err)
      lastSearchCache.reset()
      return [{ title: intl.errMsg[to] }]
    })
}

module.exports.getTranslations = getTranslations
