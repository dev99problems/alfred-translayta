const alfy = require('alfy')

const { getTranslationSource } = require('../translation-direction.js')
const { createArgWithParams } = require('../utils.js')
const { favoritesOperations } = require('../const.js')
const { getActionTranslations } = require('../intl.js')

const { word } = process.env
const newTranslations = (process.argv[2] || '').trim()

const srcLang = getTranslationSource(word)
const { action, actionTip } = getActionTranslations('save', srcLang)

alfy.output([
  {
    title: action,
    subtitle: actionTip,
    arg: createArgWithParams(favoritesOperations.EDIT, word, newTranslations),
    icon: { path: 'icons/save-changes.png' }
  }
])
