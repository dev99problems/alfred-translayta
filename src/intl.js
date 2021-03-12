const intl = {
  bestTranslMsg: {
    ru: 'найболее подходящий перевод',
    en: 'best fit translation'
  },
  errMsg: {
    ru: 'При получении перевода произошла ошибка',
    en: 'Error occurred while getting translation'
  },
  autoCorrectMsg: {
    ru: 'возможно вы имели ввиду ⤴️',
    en: 'did you mean ⤴️'
  },
  lastSearch: {
    ru: 'предыдущий запрос',
    en: 'the most recent user search'
  },
  noSearchResults: {
    ru: 'По вашему запросу ничего не найдено',
    en: 'No results found'
  },
  addToFavoritesAction: {
    ru: 'добавить в избранное',
    en: 'add to favorites'
  },
  addToFavoritesActionTip: {
    ru: 'получить доступ к списку избранного можно набрав "."',
    en: 'to access favorites list enter "."'
  },
  removeAction: {
    ru: 'удалить',
    en: 'remove'
  },
  removeActionTip: {
    ru: 'удалит слово из избранных',
    en: 'will remove the word from your favorites'
  },
  editAction: {
    ru: 'редактировать',
    en: 'edit'
  },
  editActionTip: {
    ru: 'позволит редактировать перевод слова',
    en: "let's you to change translation of the word"
  },
  saveAction: {
    ru: 'сохранить',
    en: 'save'
  },
  saveActionTip: {
    ru: 'сохранит обновленный перевод',
    en: 'save updated translation'
  },
  importAction: {
    ru: 'имортировать избранное',
    en: 'import favorites'
  },
  importActionTip: {
    ru: 'из файла favorites.json и !!!полностью заменит текущий кэш!!!',
    en:
      'from file favorites.json and !!!completely replace current workflow cache!!!'
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
