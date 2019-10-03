const _get = require('lodash.get')

module.exports.formatForOutput = (otherTranslations = {}) =>
  Object.keys(otherTranslations).reduce((acc, partOfSpeech) => {
    const translations = otherTranslations[partOfSpeech]
    const items = translations.map((item, idx) => ({
      title: item,
      subtitle: idx === 0 ? `${partOfSpeech} ⤵️` : ''
    }))

    return [...acc, ...items]
  }, [])

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

module.exports.getCorrectedOutput = (correctedValue, hint) => {
  const parsedValue = correctedValue.replace(/[\[\]]/g, '')

  return {
    title: parsedValue,
    subtitle: hint,
    autocomplete: parsedValue,
    icon: {
      path: './icons/question.png'
    }
  }
}