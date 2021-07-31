var get = require('lodash.get')

const { intl, getActionTranslations } = require('./intl')
const { createArgWithParams } = require('./utils')
const { favoritesOperations } = require('./const')

function pickBestTranslations(otherTranslations, translation) {
  let bestTranslations
  if (otherTranslations?.length > 1) {
    const concatenatedMultipleTransl = otherTranslations.join(', ')
    bestTranslations = concatenatedMultipleTransl
  } else if (otherTranslations?.length === 1) {
    const firstTranslation = get(otherTranslations, '0')
    bestTranslations = firstTranslation
  } else {
    bestTranslations = translation
  }

  return bestTranslations.toLowerCase()
}

// NOTE, @genechulkov, seems like this should be renamed
// to smth. more "format" related, like
// formatAddToFavsAction
exports.addToFavoritesAction = (
  userInput,
  translation,
  otherTranslations,
  targetLang
) => {
  const { action, actionTip } = getActionTranslations(
    'addToFavorites',
    targetLang
  )

  return {
    title: action,
    subtitle: actionTip,
    icon: { path: './icons/bookmark.png' },
    arg: createArgWithParams(
      favoritesOperations.ADD,
      userInput,
      pickBestTranslations(otherTranslations, translation)
    )
  }
}

exports.formatMainTranslation = (translation, pronunciation, targetLang) => ({
  title: pronunciation ? `${translation} [${pronunciation}]` : translation,
  subtitle: intl.bestTranslMsg[targetLang]
})

exports.formatOtherTranslations = (otherTranslations = []) =>
  otherTranslations.splice(1).map(translation => ({
    title: translation
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
