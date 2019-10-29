const { intl } = require('./intl')

exports.addToFavoritesAction = (
  userInput,
  translation,
  otherTranslations,
  targetLang
) => {
  return {
    title: intl.addToFavorite[targetLang],
    icon: { path: './icons/bookmark.png' },
    arg: createArgs()
  }

  function createArgs() {
    return JSON.stringify({
      alfredworkflow: {
        variables: {
          action: 'favorite',
          word: userInput,
          translations: pickBestTranslations()
        }
      }
    })
  }

  function pickBestTranslations() {
    return Object.keys(otherTranslations).reduce((acc, partOfSpeech) => {
      const translations = otherTranslations[partOfSpeech]
      return `${acc}, ${translations[0]}`
    }, translation)
  }
}

exports.formatMainTranslation = (translation, pronunciation, targetLang) => ({
  title: pronunciation ? `${translation} [${pronunciation}]` : translation,
  subtitle: intl.bestTranslMsg[targetLang]
})

exports.formatOtherTranslations = (otherTranslations = {}) =>
  Object.keys(otherTranslations).reduce((acc, partOfSpeech) => {
    const translations = otherTranslations[partOfSpeech]
    const items = translations.map((item, idx) => ({
      title: item,
      subtitle: idx === 0 ? `${partOfSpeech} ⤵️` : ''
    }))

    return [...acc, ...items]
  }, [])

exports.formatAutoCorrection = (correctedValue, targetLang) => {
  const parsedValue = correctedValue.replace(/[\[\]]/g, '')

  return {
    title: parsedValue,
    subtitle: intl.autoCorrectMsg[targetLang],
    autocomplete: parsedValue,
    icon: {
      path: './icons/question.png'
    }
  }
}

exports.formatLastSearch = (lastUserInput, destLang) => ({
  title: lastUserInput,
  subtitle: intl.lastSearch[destLang],
  icon: { path: './icons/history.png' }
})
