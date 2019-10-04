const alfy = require('alfy')
const translate = require('@vitalets/google-translate-api')

const { getOtherTranslations, parseAutoCorrection } = require('./utils')
const {
  formatMainTranslation,
  formatOtherTranslations,
  formatAutoCorrection
} = require('./output')
const { translationDirection } = require('./translation-direction')
const { intl } = require('./intl')

const userInput = process.argv[2] || ''

const { from, to } = translationDirection(userInput)

translate(userInput, { from, to, raw: true })
  .then(response => {
    const { text: translation, from: translationDetails, raw } = response
    const { isAutoCorrected, correctedValue } = parseAutoCorrection(
      translationDetails
    )

    const mainTranslation = formatMainTranslation(translation, to)
    let allVariants = []

    if (isAutoCorrected) {
      const correctedTranslation = formatAutoCorrection(correctedValue, to)
      allVariants = [correctedTranslation, mainTranslation]
    } else {
      const otherTranslations = getOtherTranslations(raw)
      allVariants = [
        mainTranslation,
        ...formatOtherTranslations(otherTranslations)
      ]
    }

    alfy.output(allVariants)
  })
  .catch(err => {
    console.error('error on translation response: ', err)
    alfy.output([{ title: intl.errMsg[to] }])
  })
