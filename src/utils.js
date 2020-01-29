const _get = require('lodash.get')

exports.parseAutoCorrection = translationDetails => {
  const { autoCorrected, value, didYouMean } = _get(
    translationDetails,
    'text',
    {}
  )
  return {
    isAutoCorrected: autoCorrected || didYouMean,
    correctedValue: value
  }
}

exports.normalizeResponse = rawApiResponse => {
  const { otherTranslations, pronunciationDetails } = parseRawResponse(
    rawApiResponse
  )

  return {
    otherTranslations: normalizeOtherTranslations(otherTranslations),
    pronunciation: normalizePronunciation(pronunciationDetails)
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

// NOTE: instead of using JSON.stringify, we use these methods
// with intention to avoid possible perf issues
exports.createArgWithAction = action =>
  `{"alfredworkflow":{"variables":{"action":"${action}"}}}`

exports.createArgWithParams = (action, word, translations) => {
  return `{"alfredworkflow":{"variables":{"action":"${action}","word":"${word}","translations":"${translations}"}}}`
}

exports.isObjEmpty = obj =>
  obj === undefined ||
  obj === null ||
  (typeof obj === 'object' && Object.keys(obj).length === 0)
