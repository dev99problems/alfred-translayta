const alfy = require('alfy')

const { getTranslationSource } = require('../translation-direction.js')
const { createArgWithAction } = require('../utils.js')
const { favoritesOperations } = require('../const.js')
const { getActionTranslations } = require('../intl.js')

const { word, translations } = process.env

const srcLang = getTranslationSource(word)

const { action: editAction, actionTip: editActionTip } = getActionTranslations(
  'edit',
  srcLang
)
const {
  action: removeAction,
  actionTip: removeActionTip
} = getActionTranslations('remove', srcLang)

alfy.output([
  {
    title: editAction,
    subtitle: editActionTip,
    icon: { path: './icons/edit.png' },
    arg: createArgWithAction(favoritesOperations.EDIT)
  },
  {
    title: removeAction,
    subtitle: removeActionTip,
    icon: { path: './icons/remove.png' },
    arg: createArgWithAction(favoritesOperations.REMOVE)
  },
  {
    title: word,
    subtitle: translations
  }
])
