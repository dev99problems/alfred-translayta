const { parseAutoCorrection, parseRawResponse } = require('../utils.js')
const { addToFavoritesAction } = require('../commands/add-to-favorites.js')
const {
  formatMainTranslation,
  formatOtherTranslations,
  formatAutoCorrection
} = require('../output.js')

const createTranslationsList = (response, targetLang, userInput) => {
  const { text: translation, from: translationDetails, raw } = response
  const { otherTranslations, pronunciation } = parseRawResponse(raw)

  const mainTranslation = formatMainTranslation(
    translation,
    pronunciation,
    targetLang
  )

  const { isAutoCorrected, correctedValue } = parseAutoCorrection(
    translationDetails
  )

  if (isAutoCorrected) {
    const suggestion = formatAutoCorrection(correctedValue, targetLang)
    return [suggestion, mainTranslation]
  } else {
    const addToFavorites = addToFavoritesAction(
      userInput,
      translation,
      otherTranslations,
      targetLang
    )
    return [
      addToFavorites,
      mainTranslation,
      ...formatOtherTranslations(otherTranslations)
    ]
  }
}

exports.createTranslationsList = createTranslationsList
