const { parseAutoCorrection, normalizeResponse } = require('../utils')
const {
  formatMainTranslation,
  formatOtherTranslations,
  formatAutoCorrection
} = require('../output')

const createTranslationsList = (response, targetLang) => {
  const { text: translation, from: translationDetails, raw } = response
  const { otherTranslations, pronunciation } = normalizeResponse(raw)

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
  }

  return [mainTranslation, ...formatOtherTranslations(otherTranslations)]
}

module.exports.createTranslationsList = createTranslationsList
