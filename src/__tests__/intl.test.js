const { getActionTranslations } = require('../intl')

describe('intl', () => {
  describe('getActionTranslations', () => {
    test('returns dict. of action name and tip according to current language', () => {
      expect(getActionTranslations('addToFavorites', 'en')).toEqual({
        action: '/add to favorites',
        actionTip: 'to access favorites list enter "."'
      })

      expect(getActionTranslations('addToFavorites', 'uk')).toEqual({
        action: '/додати в обране',
        actionTip: 'переглянути обране можна натиснувши "."'
      })

      expect(getActionTranslations('save', 'en')).toEqual({
        action: '/save',
        actionTip: 'will save updated translation'
      })

      expect(getActionTranslations('save', 'uk')).toEqual({
        action: '/зберегти',
        actionTip: 'збереже зміни'
      })
    })
  })
})
