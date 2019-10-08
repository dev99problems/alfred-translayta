const _get = require('lodash.get')

module.exports.parseAutoCorrection = translationDetails => {
  const textDetails = _get(translationDetails, 'text', {})
  return {
    isAutoCorrected: textDetails.autoCorrected,
    correctedValue: textDetails.value
  }
}

const parseRawResponse = rawApiResponse => {
  try {
    const parsedResponse = JSON.parse(rawApiResponse) || []
    return {
      otherTranslations: _get(parsedResponse, '[1]') || [],
      pronunciationDetails: _get(parsedResponse, '[0][1]')
    }
  } catch (err) {
    console.error(`Error while parsing apiResponse: ${err}`)
    return {}
  }
}

module.exports.normalizeResponse = rawApiResponse => {
  const { otherTranslations, pronunciationDetails } = parseRawResponse(
    rawApiResponse
  )

  return {
    otherTranslations: normalizeOtherTranslations(otherTranslations),
    pronunciation: normalizePronunciation(pronunciationDetails)
  }
}

const normalizePronunciation = (pronunciationDetails = []) =>
  _get(pronunciationDetails, '[3]')

const normalizeOtherTranslations = otherTranslations =>
  otherTranslations.reduce((acc, translation) => {
    const partOfSpeech = _get(translation, '[0]')
    const translationVariants = _get(translation, '[1]')

    return {
      ...acc,
      [partOfSpeech]: translationVariants
    }
  }, {})
