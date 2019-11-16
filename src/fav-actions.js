const alfy = require('alfy')

const { getTranslationSource } = require('./translation-direction.js')
const { createArgWithAction } = require('./utils.js')
const { favoritesOperations } = require('./const.js')
const { intl } = require('./intl.js')

const { word, translations } = process.env

const srcLang = getTranslationSource(word)
const titles = {
  removeAction: `/${intl.removeAction[srcLang]}`,
  removeTip: intl.removeActionTip[srcLang],
  editAction: `/${intl.editAction[srcLang]}`,
  editTip: intl.editActionTip[srcLang]
}

alfy.output([
  {
    title: word,
    subtitle: translations
  },
  {
    title: titles.removeAction,
    subtitle: titles.removeTip,
    icon: { path: './icons/remove.png' },
    arg: createArgWithAction(favoritesOperations.REMOVE)
  },
  {
    title: titles.editAction,
    subtitle: titles.editTip,
    icon: { path: './icons/edit.png' },
    arg: createArgWithAction(favoritesOperations.EDIT)
  }
])
