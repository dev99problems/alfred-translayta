const { getTranslationSource } = require('../translation-direction')
const {
  formatMainTranslation,
  formatOtherTranslations,
  formatAutoCorrection,
  formatLastSearch,
  addToFavoritesAction
} = require('../output')

const getStrLanguage = getTranslationSource

describe('output', () => {
  describe('formatMainTranslation', () => {
    test('prepares raw translation to alfy-output in format {title, subtitle}', () => {
      // originalInput = 'castle'
      const translation = 'замок'
      const pronunciation = 'kasəl'
      const targetLang = 'en'

      const mainTranslation = formatMainTranslation(
        translation,
        pronunciation,
        targetLang
      )

      expect(mainTranslation).toEqual({
        title: 'замок [kasəl]',
        subtitle: 'best fit translation'
      })
    })

    describe('pronunciation', () => {
      test('adds "pronunciation" next to translation if there is one', () => {
        // originalInput = 'indeed'
        const translation = 'верно'
        const pronunciation = 'inˈdēd'
        const targetLang = 'en'

        const mainTranslation = formatMainTranslation(
          translation,
          pronunciation,
          targetLang
        )

        expect(mainTranslation).toEqual({
          title: 'верно [inˈdēd]',
          subtitle: 'best fit translation'
        })
      })

      test('returns only translation, if no pronunciation found', () => {
        // originalInput = 'indeed'
        const translation = 'верно'
        const pronunciation = undefined
        const targetLang = 'en'

        const mainTranslation = formatMainTranslation(
          translation,
          pronunciation,
          targetLang
        )

        expect(mainTranslation).toEqual({
          title: 'верно',
          subtitle: 'best fit translation'
        })
      })
    })

    describe('shows translation and tip in subtitle in "targetLang" and pronunciation in "sourceLang"', () => {
      test('for en-ru direction', () => {
        // originalInput = 'dwell'
        const translation = 'жить'
        const pronunciation = 'dwell'
        const targetLang = 'ru'

        const mainTranslation = formatMainTranslation(
          translation,
          pronunciation,
          targetLang
        )
        const hintLang = getStrLanguage(mainTranslation.subtitle)

        expect(mainTranslation).toEqual({
          title: 'жить [dwell]',
          subtitle: 'найболее подходящий перевод'
        })

        expect(hintLang).toBe('ru')
      })

      test('for ru-en direction', () => {
        // originalInput = 'обитать'
        const translation = 'dwell'
        const pronunciation = "obitat'"
        const targetLang = 'en'

        const mainTranslation = formatMainTranslation(
          translation,
          pronunciation,
          targetLang
        )
        const hintLang = getStrLanguage(mainTranslation.subtitle)

        expect(mainTranslation).toEqual({
          title: "dwell [obitat']",
          subtitle: 'best fit translation'
        })

        expect(hintLang).toBe('en')
      })
    })
  })

  describe('formatOtherTranslations', () => {
    test('prepares other translations to alfy-output format of {title: translation}', () => {
      const translations = [
        'замок',
        'дворец',
        'ладья',
        'твердыня',
        'рокировка',
        'убежище'
      ]

      const formattedOtherTranslations = formatOtherTranslations(translations)

      expect(formattedOtherTranslations).toEqual([
        {
          title: 'дворец'
        },
        {
          title: 'ладья'
        },
        {
          title: 'твердыня'
        },
        {
          title: 'рокировка'
        },
        {
          title: 'убежище'
        }
      ])
    })

    test('not fails, when translations are empty', () => {
      expect(formatOtherTranslations()).toEqual([])

      expect(formatOtherTranslations([])).toEqual([])
    })
  })

  describe('formatAutoCorrection', () => {
    test('prepares auto corrected value to alfy-output format', () => {
      // originalInput = 'casle'
      const correctedValue = 'castle'
      const targetLang = 'ru'

      const autoCorrectedItem = formatAutoCorrection(correctedValue, targetLang)
      const hintLang = getStrLanguage(autoCorrectedItem.subtitle)

      expect(autoCorrectedItem).toEqual({
        title: 'castle',
        subtitle: 'возможно вы имели ввиду ⤴️',
        autocomplete: 'castle',
        icon: { path: './icons/question.png' }
      })

      expect(hintLang).toBe(targetLang)
      expect(typeof autoCorrectedItem.icon.path).toBe('string')
    })
  })

  describe('formatLastSearch', () => {
    test('prepares last searched input to alfy-output format', () => {
      const lastUserInput = 'dog'
      const targetLang = 'ru'

      const lastSearchItem = formatLastSearch(lastUserInput, targetLang)
      const hintLang = getStrLanguage(lastSearchItem.subtitle)

      expect(lastSearchItem).toEqual({
        title: 'dog',
        subtitle: 'предыдущий запрос',
        icon: { path: './icons/history.png' }
      })

      expect(hintLang).toBe(targetLang)
      expect(typeof lastSearchItem.icon.path).toBe('string')
    })
  })

  describe('addToFavoritesAction', () => {
    test('prepares addToFavs action to alfy-format, with proper arguments', () => {
      const userInput = 'castle'
      const translation = 'замок'
      const otherTranslations = [
        'замок',
        'дворец',
        'ладья',
        'твердыня',
        'рокировка',
        'убежище'
      ]
      const targetLang = 'ru'

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
        title: '/добавить в избранное',
        subtitle: 'получить доступ к списку избранного можно набрав "."',
        icon: { path: './icons/bookmark.png' },
        arg:
          '{"alfredworkflow":{"variables":{"action":"add","word":"castle","translations":"замок, дворец, ладья, твердыня, рокировка, убежище"}}}'
      })

      expect(titleLang).toBe(targetLang)
      expect(hintLang).toBe(targetLang)
      expect(typeof addToFavsItem.icon.path).toBe('string')
      expect(otherTranslations.join(', ')).toEqual(otherTranslationsInArg)
    })

    // TODO: add test cases for 1 otherTranslations and 0 otherTranslations
  })
})
