const { getOtherTranslations, parseAutoCorrection } = require('../utils')
const {
  formatMainTranslation,
  formatOtherTranslations,
  formatAutoCorrection
} = require('../output')

const createTranslationsList = (response, targetLang) => {
  const { text: translation, from: translationDetails, raw } = response

  const mainTranslation = formatMainTranslation(translation, targetLang)

  const { isAutoCorrected, correctedValue } = parseAutoCorrection(
    translationDetails
  )

  if (isAutoCorrected) {
    const suggestion = formatAutoCorrection(correctedValue, targetLang)
    return [suggestion, mainTranslation]
  }

  const otherTranslations = getOtherTranslations(raw)

  return [mainTranslation, ...formatOtherTranslations(otherTranslations)]
}

module.exports.createTranslationsList = createTranslationsList
