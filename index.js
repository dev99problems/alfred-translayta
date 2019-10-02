const alfy = require('alfy')
const translate = require('@vitalets/google-translate-api')
const { convertIntoItems, getOtherTranslations } = require('./utils')

const intl = {
  bestTranslMsg: {
    ru: 'найболее подходящий перевод',
    en: 'best match translation'
  },
  errMsg: {
    ru: 'При получении перевода произошла ошибка',
    en: 'Error occured while getting translation'
  }
}

const userInput = process.argv[2] || ''

const isASCII = str => [].every.call(str, sign => sign.charCodeAt(0) <= 127)

const getTranslationTarget = input => isASCII(input) ? 'ru' : 'en'
const to = getTranslationTarget(userInput)

translate(userInput, {to, raw: true}).then(response => {
  const otherTranslations = getOtherTranslations(response.raw)

  const mainTranslation = {
    title: response.text,
    subtitle: intl.bestTranslMsg[to]
  }

  const allVariants = [mainTranslation].concat(
    convertIntoItems(otherTranslations)
  )

  alfy.output(allVariants)
}).catch(err => {
  alfy.output([{ title: intl.errMsg[to]}])
})

