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
        const translation = 'вірно'
        const pronunciation = 'inˈdēd'
        const targetLang = 'en'

        const mainTranslation = formatMainTranslation(
          translation,
          pronunciation,
          targetLang
        )

        expect(mainTranslation).toEqual({
          title: 'вірно [inˈdēd]',
          subtitle: 'best fit translation'
        })
      })

      test('returns only translation, if no pronunciation found', () => {
        // originalInput = 'indeed'
        const translation = 'вірно'
        const pronunciation = undefined
        const targetLang = 'en'

        const mainTranslation = formatMainTranslation(
          translation,
          pronunciation,
          targetLang
        )

        expect(mainTranslation).toEqual({
          title: 'вірно',
          subtitle: 'best fit translation'
        })
      })
    })

    describe('shows translation and tip in subtitle in "targetLang" and pronunciation in "sourceLang"', () => {
      test('for en-uk direction', () => {
        // originalInput = 'dwell'
        const translation = 'мешкати'
        const pronunciation = 'dwell'
        const targetLang = 'uk'

        const mainTranslation = formatMainTranslation(
          translation,
          pronunciation,
          targetLang
        )
        const hintLang = getStrLanguage(mainTranslation.subtitle)

        expect(mainTranslation).toEqual({
          title: 'мешкати [dwell]',
          subtitle: 'накрайщий переклад'
        })

        expect(hintLang).toBe('uk')
      })

      test('for uk-en direction', () => {
        // originalInput = 'мешкати'
        const translation = 'dwell'
        const pronunciation = 'meshkaty'
        const targetLang = 'en'

        const mainTranslation = formatMainTranslation(
          translation,
          pronunciation,
          targetLang
        )
        const hintLang = getStrLanguage(mainTranslation.subtitle)

        expect(mainTranslation).toEqual({
          title: 'dwell [meshkaty]',
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
        'контейнер',
        'сховище',
        'палац',
        'тура',
        'фортеця'
      ]

      const formattedOtherTranslations = formatOtherTranslations(translations)

      expect(formattedOtherTranslations).toEqual([
        {
          title: 'контейнер'
        },
        {
          title: 'сховище'
        },
        {
          title: 'палац'
        },
        {
          title: 'тура'
        },
        {
          title: 'фортеця'
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
      const targetLang = 'uk'

      const autoCorrectedItem = formatAutoCorrection(correctedValue, targetLang)
      const hintLang = getStrLanguage(autoCorrectedItem.subtitle)

      expect(autoCorrectedItem).toEqual({
        title: 'castle',
        subtitle: 'можливо, ви мали на увазі ⤴️',
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
      const targetLang = 'uk'

      const lastSearchItem = formatLastSearch(lastUserInput, targetLang)
      const hintLang = getStrLanguage(lastSearchItem.subtitle)

      expect(lastSearchItem).toEqual({
        title: 'dog',
        subtitle: 'попередній запит',
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

    // TODO: add test cases for 1 otherTranslations and 0 otherTranslations
  })
})
