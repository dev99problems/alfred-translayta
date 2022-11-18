const intl = {
  bestTranslMsg: {
    uk: 'накрайщий переклад',
    en: 'best fit translation'
  },
  errMsg: {
    uk: 'При обробці перекладу виникла помилка',
    en: 'Error occurred while getting translation'
  },
  autoCorrectMsg: {
    uk: 'можливо, ви мали на увазі ⤴️',
    en: 'did you mean ⤴️'
  },
  lastSearch: {
    uk: 'попередній запит',
    en: 'the most recent user search'
  },
  noSearchResults: {
    uk: 'За вашим запитом нічого не знайдено',
    en: 'No results found'
  },
  addToFavoritesAction: {
    uk: 'додати в обране',
    en: 'add to favorites'
  },
  addToFavoritesActionTip: {
    uk: 'переглянути обране можна натиснувши "."',
    en: 'to access favorites list enter "."'
  },
  removeAction: {
    uk: 'видалити',
    en: 'remove'
  },
  removeActionTip: {
    uk: 'видалить цей переклад з обраного',
    en: 'will remove the word from your favorites'
  },
  editAction: {
    uk: 'редагувати',
    en: 'edit'
  },
  editActionTip: {
    uk: 'дозволить редагувати переклад',
    en: 'will let you change translation of the word'
  },
  saveAction: {
    uk: 'зберегти',
    en: 'save'
  },
  saveActionTip: {
    uk: 'збереже зміни',
    en: 'will save updated translation'
  },
  importAction: {
    uk: 'імпортувати обране',
    en: 'import favorites'
  },
  importActionTip: {
    uk: 'з файлу favorites.json !!!це повністю перетре поточний кеш!!!',
    en: 'from file favorites.json !!!this completely replace current cache!!!'
  },
  exportAction: {
    uk: 'експортувати обране',
    en: 'export favorites'
  },
  exportActionTip: {
    uk: 'до файлу favorites.json !!!це повністю перетре дані у файлі!!!',
    en: 'to file favorites.json !!!this completely replace current cache!!!'
  }
}

const getActionTranslations = (action, lang) => {
  const actionName = `${action}Action`
  const actionTipName = `${action}ActionTip`

  return {
    action: '/' + intl[actionName][lang],
    actionTip: intl[actionTipName][lang]
  }
}

exports.intl = intl
exports.getActionTranslations = getActionTranslations
