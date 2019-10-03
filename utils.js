const _get = require('lodash.get')

module.exports.parseAutoCorrection = translationDetails => {
  const textDetails = _get(translationDetails, 'text', {})
  return {
    isAutoCorrected: textDetails.autoCorrected,
    correctedValue: textDetails.value
  }
}

module.exports.getOtherTranslations = input => {
  try {
    const parsedResponse = JSON.parse(input)
    const otherTranslations = _get(parsedResponse, '[1]') || []

    return otherTranslations.reduce((acc, translation) => {
      const partOfSpeech = _get(translation, '[0]')
      const translationVariants = _get(translation, '[1]')

      return {
        ...acc,
        [partOfSpeech]: translationVariants
      }
    }, {})
  } catch (err) {
    console.error(err)
    return {}
  }
}
