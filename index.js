const alfy = require('alfy')
const translate = require('@vitalets/google-translate-api')

const { getOtherTranslations, parseAutoCorrection } = require('./utils')
const {
  formatMainTranslation,
  formatForOutput,
  getCorrectedOutput
} = require('./output')
const intl = require('./intl')

const userInput = process.argv[2] || ''

const isASCII = str => [].every.call(str, sign => sign.charCodeAt(0) <= 127)

const getTranslationSource = input => (isASCII(input) ? 'en' : 'ru')
const getTranslationTarget = input => (isASCII(input) ? 'ru' : 'en')

const from = getTranslationSource(userInput)
const to = getTranslationTarget(userInput)

translate(userInput, { from, to, raw: true })
  .then(response => {
    const { text: translation, from: translationDetails, raw } = response
    const { isAutoCorrected, correctedValue } = parseAutoCorrection(
      translationDetails
    )

    const mainTranslation = formatMainTranslation(translation, to)
    let allVariants = []

    if (isAutoCorrected) {
      const correctedTranslation = getCorrectedOutput(correctedValue, to)
      allVariants = [correctedTranslation, mainTranslation]
    } else {
      const otherTranslations = getOtherTranslations(raw)
      allVariants = [mainTranslation, ...formatForOutput(otherTranslations)]
    }

    alfy.output(allVariants)
  })
  .catch(err => {
    alfy.output([{ title: intl.errMsg[to] }])
  })
