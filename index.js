const alfy = require('alfy')
const translate = require('@vitalets/google-translate-api')
const _get = require('lodash.get')

const {formatForOutput, getOtherTranslations, getCorrectedOutput} = require('./utils')

const intl = {
  bestTranslMsg: {
    ru: 'найболее подходящий перевод',
    en: 'best match translation'
  },
  errMsg: {
    ru: 'При получении перевода произошла ошибка',
    en: 'Error occured while getting translation'
  },
  autoCorrectMsg: {
    ru: 'может вы имели ввиду ⤴️',
    en: 'did you mean ⤴️'
  }
}

const parseCorrectedDetails = translationDetails => {
  const textDetails = _get(translationDetails, 'text', {})
  return {
    isAutoCorrected: textDetails.autoCorrected,
    correctedValue: textDetails.value
  }
}

const userInput = process.argv[2] || ''

const isASCII = str => [].every.call(str, sign => sign.charCodeAt(0) <= 127)

const getTranslationSource = input => (isASCII(input) ? 'en' : 'ru')
const getTranslationTarget = input => (isASCII(input) ? 'ru' : 'en')

const from = getTranslationSource(userInput)
const to = getTranslationTarget(userInput)

translate(userInput, {from, to, raw: true})
  .then(response => {
    const {text: translation, from: translationDetails, raw} = response
    const mainTranslation = {
      title: translation,
      subtitle: intl.bestTranslMsg[to]
    }
    const { isAutoCorrected, correctedValue} = parseCorrectedDetails(translationDetails)

    let allVariants = []

    if (isAutoCorrected) {
      const correctedTranslation = getCorrectedOutput(correctedValue, intl.autoCorrectMsg[to])
      allVariants = [correctedTranslation, mainTranslation]
    } else {
      const otherTranslations = getOtherTranslations(raw)
      allVariants = [mainTranslation, ...formatForOutput(otherTranslations)]
    }

    alfy.output(allVariants)
  })
  .catch(err => {
    alfy.output([{title: intl.errMsg[to]}])
  })
