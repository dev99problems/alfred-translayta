var get = require('lodash.get')

const { intl, getActionTranslations } = require('./intl')
const { createArgWithParams } = require('./utils')
const { favoritesOperations } = require('./const')

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
      pickBestTranslations()
    )
  }

  function pickBestTranslations() {
    if (otherTranslations?.length > 1) {
      const concated = otherTranslations.join(', ').toLowerCase()
      return concated
    }

    const firstTranslation = get(otherTranslations, '0') || ''

    return firstTranslation.toLowerCase()
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

exports.formatAutoCorrection = (correctedValue, targetLang) => {
  const parsedValue = correctedValue.replace(/[\[\]]/g, '')

  return {
    title: parsedValue,
    subtitle: intl.autoCorrectMsg[targetLang],
    autocomplete: parsedValue,
    icon: {
      path: './icons/question.png'
    }
  }
}

exports.formatLastSearch = (lastUserInput, destLang) => ({
  title: lastUserInput,
  subtitle: intl.lastSearch[destLang],
  icon: { path: './icons/history.png' }
})
