const { getTranslationSource } = require('../../translation-direction.js')
const { addToFavoritesAction } = require('../add-to-favorites.js')

const getStrLanguage = getTranslationSource

describe('addToFavoritesAction', () => {
  test('prepares addToFavs action to alfy-format, with proper arguments', () => {
    const userInput = 'castle'
    const translation = 'замок'
    const otherTranslations = [
      'замок',
      'контейнер',
      'сховище',
      'палац',
      'тура',
      'фортеця'
    ]
    const targetLang = 'uk'

    const addToFavsItem = addToFavoritesAction(
      userInput,
      translation,
      otherTranslations,
      targetLang
    )
    const titleLang = getStrLanguage(addToFavsItem.title)
    const hintLang = getStrLanguage(addToFavsItem.subtitle)
    const otherTranslationsInArg = /"translations":"(.*)"/gi.exec(
      addToFavsItem.arg
    )[1]
    console.log('otherTranslationsInArg', otherTranslationsInArg)

    expect(addToFavsItem).toEqual({
      title: '/додати в обране',
      subtitle: 'переглянути обране можна натиснувши "."',
      icon: { path: './icons/bookmark.png' },
      arg:
        '{"alfredworkflow":{"variables":{"action":"add","word":"castle","translations":"замок, контейнер, сховище, палац, тура, фортеця"}}}'
    })

    expect(titleLang).toBe(targetLang)
    expect(hintLang).toBe(targetLang)
    expect(typeof addToFavsItem.icon.path).toBe('string')
    expect(otherTranslations.join(', ')).toEqual(otherTranslationsInArg)
  })

  test('adds to favorites properly, when only 1 other translation provided', () => {
    const userInput = 'castle'
    const translation = 'замок'
    const otherTranslations = [
      'фортеця'
    ]
    const targetLang = 'uk'

    const addToFavsItem = addToFavoritesAction(
      userInput,
      translation,
      otherTranslations,
      targetLang
    )

    expect(addToFavsItem).toEqual({
      title: '/додати в обране',
      subtitle: 'переглянути обране можна натиснувши "."',
      icon: { path: './icons/bookmark.png' },
      arg:
        '{"alfredworkflow":{"variables":{"action":"add","word":"castle","translations":"фортеця"}}}'
    })
  })

  test('adds to favorites properly, when there are no other translations', () => {
    const userInput = 'castle'
    const translation = 'замок'
    const otherTranslations = []
    const targetLang = 'uk'

    const addToFavsItem = addToFavoritesAction(
      userInput,
      translation,
      otherTranslations,
      targetLang
    )

    expect(addToFavsItem).toEqual({
      title: '/додати в обране',
      subtitle: 'переглянути обране можна натиснувши "."',
      icon: { path: './icons/bookmark.png' },
      arg:
        '{"alfredworkflow":{"variables":{"action":"add","word":"castle","translations":"замок"}}}'
    })
  })
})
