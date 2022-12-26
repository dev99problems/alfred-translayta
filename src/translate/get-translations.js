const translate = require('@vitalets/google-translate-api')

const { createTranslationsList } = require('./create-translations-list.js')
const { translationDirection } = require('../translation-direction.js')
const { intl } = require('../intl.js')
const { lastSearchCache } = require('../cache/last-search-cache.js')

const getTranslations = userInput => {
  const { from, to } = translationDirection(userInput)

  return translate(userInput, { from, to, raw: true })
    .then(response => {
      const translationsList = createTranslationsList(response, to, userInput)
      lastSearchCache.set({
        prevUserInput: userInput,
        prevTargetLang: to,
        prevOutput: translationsList
      })

      return translationsList
    })
    .catch(err => {
      console.error('error on translation response: ', err)
      lastSearchCache.reset()
      return [{ title: intl.errMsg[to] }]
    })
}

exports.getTranslations = getTranslations
