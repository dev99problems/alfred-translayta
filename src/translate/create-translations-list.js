const { parseAutoCorrection, parseRawResponse } = require('../utils.js')
const { addToFavoritesAction } = require('../commands/add-to-favorites.js')
const {
  formatMainTranslation,
  formatOtherTranslations,
  formatAutoCorrection,
  formatPronunciation,
} = require('../output.js')

const createTranslationsList = (response, targetLang, userInput) => {
  const { text: translation, from: translationDetails, raw } = response
  const { otherTranslations, pronunciation } = parseRawResponse(raw)

  const requestedPhrasePronunciation = formatPronunciation(pronunciation, targetLang)
  const mainTranslation = formatMainTranslation(translation, targetLang)
  const { isAutoCorrected, correctedValue } = parseAutoCorrection(translationDetails)

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
      (requestedPhrasePronunciation?.title ? requestedPhrasePronunciation : {}),
      mainTranslation,
      ...formatOtherTranslations(otherTranslations),
      addToFavorites,
    ]
  }
}

exports.createTranslationsList = createTranslationsList
