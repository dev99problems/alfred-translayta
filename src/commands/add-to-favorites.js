const get = require('lodash.get')

const { getActionTranslations } = require('../intl')
const { createArgWithParams } = require('../utils')
const { favoritesOperations } = require('../const')

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
