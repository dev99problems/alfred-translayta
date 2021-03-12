const { intl, getActionTranslations } = require('./intl')
const { createArgWithParams } = require('./utils.js')
const { favoritesOperations } = require('./const.js')

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
      const concattedLowercased = otherTranslations.join(', ').toLowerCase()
      return concattedLowercased.slice(0, concattedLowercased.length - 2)
    }
    return otherTranslations[0].toLowerCase()
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
