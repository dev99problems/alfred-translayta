const alfy = require('alfy')

const { getTranslationSource } = require('./translation-direction.js')
const { createArgWithParams } = require('./utils.js')
const { favoritesOperations } = require('./const.js')
const { intl } = require('./intl.js')

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
