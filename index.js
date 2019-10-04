const alfy = require('alfy')
const translate = require('@vitalets/google-translate-api')

const { getOtherTranslations, parseAutoCorrection } = require('./src/utils')
const {
  formatMainTranslation,
  formatOtherTranslations,
  formatAutoCorrection
} = require('./src/output')
const { translationDirection } = require('./src/translation-direction')
const { intl } = require('./src/intl')
const { lastSearchCache } = require('./src/cache')

const userInput = process.argv[2] || ''
const isInputEmpty = !!!userInput.trim().length

if (isInputEmpty) {
  alfy.output(lastSearchCache.get())
  return
}

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

    lastSearchCache.set(allVariants)
    alfy.output(allVariants)
  })
  .catch(err => {
    console.error('error on translation response: ', err)
    lastSearchCache.reset()
    alfy.output([{ title: intl.errMsg[to] }])
  })
