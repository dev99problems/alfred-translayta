const { getActionTranslations } = require('../intl')

describe('intl', () => {
  describe('getActionTranslations', () => {
    test('returns dict. of action name and tip according to current language', () => {
      expect(getActionTranslations('addToFavorites', 'en')).toEqual({
        action: '/add to favorites',
        actionTip: 'to access favorites list enter "."'
      })

      expect(getActionTranslations('addToFavorites', 'ru')).toEqual({
        action: '/добавить в избранное',
        actionTip: 'получить доступ к списку избранного можно набрав "."'
      })

      expect(getActionTranslations('save', 'en')).toEqual({
        action: '/save',
        actionTip: 'save updated translation'
      })

      expect(getActionTranslations('save', 'ru')).toEqual({
        action: '/сохранить',
        actionTip: 'сохранит обновленный перевод'
      })
    })
  })
})
