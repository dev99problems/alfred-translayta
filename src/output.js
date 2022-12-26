const { intl } = require('./intl.js')
const { createArgWithParams } = require('./utils.js')

exports.formatMainTranslation = (translation, pronunciation, targetLang) => ({
  title: pronunciation ? `${translation} [${pronunciation}]` : translation,
  subtitle: intl.bestTranslMsg[targetLang],
  arg: createArgWithParams('copy', translation, ''),
})

exports.formatOtherTranslations = (otherTranslations = []) =>
  otherTranslations.splice(1).map(translation => ({
    title: translation,
    arg: createArgWithParams('copy', translation, ''),
  }))

exports.formatAutoCorrection = (correctedValue, targetLang) => ({
  title: correctedValue,
  subtitle: intl.autoCorrectMsg[targetLang],
  autocomplete: correctedValue,
  icon: {
    path: './icons/question.png'
  }
})

exports.formatLastSearch = (lastUserInput, targetLang) => ({
  title: lastUserInput,
  subtitle: intl.lastSearch[targetLang],
  icon: { path: './icons/history.png' }
})
