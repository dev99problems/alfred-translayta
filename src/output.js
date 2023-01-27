const { intl } = require('./intl.js')
const { createArgWithParams } = require('./utils.js')

const createCopyPasteActions = (word) => ({
  arg: createArgWithParams('copy', word),
  mods: {
    shift: {
      arg: createArgWithParams('paste to foremost', word)
    }
  }
})

exports.formatPronunciation = (pronunciation, targetLang) => ({
  title: pronunciation ? `[${pronunciation}]` : '',
  subtitle: intl.pronunciationMsg[targetLang],
  ...createCopyPasteActions(pronunciation ?? ''),
})

exports.formatMainTranslation = (translation, targetLang) => ({
  title: translation,
  subtitle: intl.bestTranslMsg[targetLang],
  ...createCopyPasteActions(translation),
})

exports.formatOtherTranslations = (otherTranslations = []) =>
  otherTranslations.splice(1).map(translation => ({
    title: translation,
    ...createCopyPasteActions(translation),
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
  ...createCopyPasteActions(lastUserInput),
  icon: { path: './icons/history.png' }
})
