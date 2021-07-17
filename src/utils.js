const get = require('lodash.get')

exports.parseAutoCorrection = translationDetails => {
  const { autoCorrected, value, didYouMean } = get(
    translationDetails,
    'text',
    {}
  )
  return {
    isAutoCorrected: autoCorrected || didYouMean,
    correctedValue: value
  }
}

exports.parseRawResponse = rawApiResponse => {
  try {
    const parsedResponse = rawApiResponse || []
    const otherTranslationsRaw = get(parsedResponse, '[3][5][0][0][1]') || []
    const pronunciation = get(parsedResponse, '[0][0]')

    return {
      otherTranslations: otherTranslationsRaw.map(translation =>
        get(translation, '0')
      ),
      pronunciation
    }
  } catch (err) {
    console.error(
      `JError -> parseRawResponse: Error while parsing apiResponse: ${err}`
    )
    return {}
  }
}

// NOTE: instead of using JSON.stringify, we use these methods
// with intention to avoid possible perf issues
exports.createArgWithAction = action =>
  `{"alfredworkflow":{"variables":{"action":"${action}"}}}`

exports.createArgWithParams = (action, word, translations) =>
  `{"alfredworkflow":{"variables":{"action":"${action}","word":"${word}","translations":"${translations}"}}}`

exports.isObjEmpty = obj =>
  obj === undefined ||
  obj === null ||
  (typeof obj === 'object' && Object.keys(obj).length === 0)
