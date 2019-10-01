const alfy = require('alfy')
const translate = require('@vitalets/google-translate-api')
const _get = require('lodash.get')

const convertIntoItems = (allTranslations = {}) =>
  Object.keys(allTranslations).reduce((acc, partOfSpeech) => {
    const translations = allTranslations[partOfSpeech]
    const items = translations.map((item, idx) => ({
      title: item,
      subtitle: idx === 0 ? `${partOfSpeech} ⤵️` : ''
    }))

    return [...acc, ...items]
  }, [])

const getOtherTranslations = input => {
  try {
    const parsedResponse = JSON.parse(input)
    const otherTranslations = _get(parsedResponse, '[1]') || []

    const allTranslations = otherTranslations.reduce((acc, translation) => {
      const partOfSpeech = _get(translation, '[0]')
      const translationVariants = _get(translation, '[1]')

      return {
        ...acc,
        [partOfSpeech]: translationVariants
      }
    }, {})

    return allTranslations
  } catch (err) {
    console.error(err)
    return {}
  }
}

const translateQuery = process.argv[2] || ''

translate(translateQuery, {to: 'ru', raw: true}).then(response => {
  const otherTranslations = getOtherTranslations(response.raw)

  const mainTranslation = {
    title: response.text,
    subtitle: 'best fit translation'
  }

  const allVariants = [mainTranslation].concat(
    convertIntoItems(otherTranslations)
  )

  alfy.output(allVariants)
}).catch(err => {
  alfy.output([{ title: 'Error while getting translation'}])
})

