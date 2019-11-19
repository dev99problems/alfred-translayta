const alfy = require('alfy')

const { getTranslationSource } = require('./translation-direction')
const { createArgWithParams } = require('./utils')
const { favoritesOperations } = require('./const')
const { intl } = require('./intl')

const { word } = process.env
const newTranslations = (process.argv[2] || '').trim()

const srcLang = getTranslationSource(word)
const titles = {
  saveAction: `/${intl.saveAction[srcLang]}`,
  saveActionTip: intl.saveActionTip[srcLang]
}

alfy.output([
  {
    title: titles.saveAction,
    subtitle: titles.saveActionTip,
    arg: createArgWithParams(favoritesOperations.EDIT, word, newTranslations),
    icon: { path: 'icons/save-changes.png' }
  }
])
