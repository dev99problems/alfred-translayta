const { getTranslationSource } = require('../translation-direction')
const {
  formatPronunciation,
  formatMainTranslation,
  formatOtherTranslations,
  formatAutoCorrection,
  formatLastSearch
} = require('../output')

const getStrLanguage = getTranslationSource

describe('output', () => {
  describe.only('formatPronunciation', () => {
    test('creates list item, that shows pronunciation if it is provided by API', () => {
      // originalInput = 'castle', translation = 'замок'
      const pronunciation = 'kasəl'
      const targetLang = 'uk'

      const requestedPhrasePronunciation = formatPronunciation(
        pronunciation,
        targetLang
      )

      expect(requestedPhrasePronunciation).toEqual({
        title: "[kasəl]",
        subtitle: "вимова слова/фрази із запиту",
        arg: '{"alfredworkflow":{"variables":{"action":"copy","word":"kasəl","translations":""}}}',
        mods: {
          shift: {
            arg: '{"alfredworkflow":{"variables":{"action":"paste to foremost","word":"kasəl","translations":""}}}',
          },
        },
      })
    })

    // this usually happens, when multi words phrase provided
    test('creates a list item mock, if pronunciation is not provided', () => {
      // originalInput = 'white castle on the rock', translation = 'Білий замок на скелі'
      const pronunciation = null
      const targetLang = 'uk'

      const requestedPhrasePronunciation = formatPronunciation(
        pronunciation,
        targetLang
      )

      // in final list this item simply will be omitted!
      expect(requestedPhrasePronunciation).toEqual({
        title: "",
        subtitle: "вимова слова/фрази із запиту",
        arg: '{"alfredworkflow":{"variables":{"action":"copy","word":"","translations":""}}}',
        mods: {
          shift: {
            arg: '{"alfredworkflow":{"variables":{"action":"paste to foremost","word":"","translations":""}}}',
          },
        },
      })
    })
  })

  describe('formatMainTranslation', () => {
    test('prepares raw translation to alfy-output in format {title, subtitle}', () => {
      // originalInput = 'castle'
      const translation = 'замок'
      const targetLang = 'uk'

      const mainTranslation = formatMainTranslation(translation, targetLang)

      expect(mainTranslation).toEqual({
        title: 'замок',
        subtitle: 'накрайщий переклад',
        arg:
          '{"alfredworkflow":{"variables":{"action":"copy","word":"замок","translations":""}}}',
        mods: {
          shift: {
            arg:
              '{"alfredworkflow":{"variables":{"action":"paste to foremost","word":"замок","translations":""}}}'
          }
        }
      })
    })

    describe('shows translation and tip in subtitle in "targetLang"', () => {
      test('for en-uk direction', () => {
        // originalInput = 'dwell'
        const translation = 'мешкати'
        const targetLang = 'uk'

        const mainTranslation = formatMainTranslation(translation, targetLang)
        const hintLang = getStrLanguage(mainTranslation.subtitle)

        expect(mainTranslation).toEqual({
          title: 'мешкати',
          subtitle: 'накрайщий переклад',
          arg:
            '{"alfredworkflow":{"variables":{"action":"copy","word":"мешкати","translations":""}}}',
          mods: {
            shift: {
              arg:
                '{"alfredworkflow":{"variables":{"action":"paste to foremost","word":"мешкати","translations":""}}}'
            }
          }
        })

        expect(hintLang).toBe('uk')
      })

      test('for uk-en direction', () => {
        // originalInput = 'мешкати'
        const translation = 'dwell'
        const targetLang = 'en'

        const mainTranslation = formatMainTranslation(
          translation,
          targetLang
        )
        const hintLang = getStrLanguage(mainTranslation.subtitle)

        expect(mainTranslation).toEqual({
          title: 'dwell',
          subtitle: 'best fit translation',
          arg:
            '{"alfredworkflow":{"variables":{"action":"copy","word":"dwell","translations":""}}}',
          mods: {
            shift: {
              arg:
                '{"alfredworkflow":{"variables":{"action":"paste to foremost","word":"dwell","translations":""}}}'
            }
          }
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
          title: 'контейнер',
          arg:
            '{"alfredworkflow":{"variables":{"action":"copy","word":"контейнер","translations":""}}}',
          mods: {
            shift: {
              arg:
                '{"alfredworkflow":{"variables":{"action":"paste to foremost","word":"контейнер","translations":""}}}'
            }
          }
        },
        {
          title: 'сховище',
          arg:
            '{"alfredworkflow":{"variables":{"action":"copy","word":"сховище","translations":""}}}',
          mods: {
            shift: {
              arg:
                '{"alfredworkflow":{"variables":{"action":"paste to foremost","word":"сховище","translations":""}}}'
            }
          }
        },
        {
          title: 'палац',
          arg:
            '{"alfredworkflow":{"variables":{"action":"copy","word":"палац","translations":""}}}',
          mods: {
            shift: {
              arg:
                '{"alfredworkflow":{"variables":{"action":"paste to foremost","word":"палац","translations":""}}}'
            }
          }
        },
        {
          title: 'тура',
          arg:
            '{"alfredworkflow":{"variables":{"action":"copy","word":"тура","translations":""}}}',
          mods: {
            shift: {
              arg:
                '{"alfredworkflow":{"variables":{"action":"paste to foremost","word":"тура","translations":""}}}'
            }
          }
        },
        {
          title: 'фортеця',
          arg:
            '{"alfredworkflow":{"variables":{"action":"copy","word":"фортеця","translations":""}}}',
          mods: {
            shift: {
              arg:
                '{"alfredworkflow":{"variables":{"action":"paste to foremost","word":"фортеця","translations":""}}}'
            }
          }
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
})
