const { intl } = require('./intl')

module.exports.formatMainTranslation = (translation, to) => ({
  title: translation,
  subtitle: intl.bestTranslMsg[to]
})

module.exports.formatOtherTranslations = (otherTranslations = {}) =>
  Object.keys(otherTranslations).reduce((acc, partOfSpeech) => {
    const translations = otherTranslations[partOfSpeech]
    const items = translations.map((item, idx) => ({
      title: item,
      subtitle: idx === 0 ? `${partOfSpeech} ⤵️` : ''
    }))

    return [...acc, ...items]
  }, [])

module.exports.formatAutoCorrection = (correctedValue, to) => {
  const parsedValue = correctedValue.replace(/[\[\]]/g, '')

  return {
    title: parsedValue,
    subtitle: intl.autoCorrectMsg[to],
    autocomplete: parsedValue,
    icon: {
      path: './icons/question.png'
    }
  }
}
