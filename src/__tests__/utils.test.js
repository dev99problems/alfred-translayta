const {
  parseAutoCorrection,
  parseRawResponse,
  createArgWithAction,
  createArgWithParams
} = require('../utils.js')
const { responseMock } = require('./rawGTranslateRes.mock')

const setup = variables => ({
  alfredworkflow: {
    variables
  }
})

describe('utils', () => {
  test('parseAutoCorrection: returns whether translation was auto corrected', () => {
    const translationDetails = {
      language: { didYouMean: false, iso: 'en' },
      text: { autoCorrected: false, value: '[castle]', didYouMean: true }
    }

    expect(parseAutoCorrection(translationDetails)).toEqual({
      isAutoCorrected: true,
      correctedValue: 'castle'
    })
  })

  test('parseRawResponse: does initial data normalization of raw g-translate response', () => {
    expect(parseRawResponse(responseMock.raw)).toMatchInlineSnapshot(
      {
        otherTranslations: [
          'замок',
          'дворец',
          'ладья',
          'твердыня',
          'рокировка',
          'убежище'
        ],
        pronunciation: 'ˈkasəl'
      },
      `
      Object {
        "otherTranslations": Array [
          "замок",
          "дворец",
          "ладья",
          "твердыня",
          "рокировка",
          "убежище",
        ],
        "pronunciation": "ˈkasəl",
      }
    `
    )
  })

  test('createArgWithAction: properly convert workflow variables into string', () => {
    expect(createArgWithAction('import')).toBe(
      `{"alfredworkflow":{"variables":{"action":"import"}}}`
    )

    const workflow = setup({ action: 'import' })

    expect(JSON.stringify(workflow)).toBe(createArgWithAction('import'))
  })

  test('createArgWithParams: properly convert workflow variables into string', () => {
    const action = 'remove or edit'
    const word = 'embrace'
    const translations = 'охватывать, обнимать'

    expect(createArgWithParams(action, word, translations)).toBe(
      `{"alfredworkflow":{"variables":{"action":"${action}","word":"${word}","translations":"${translations}"}}}`
    )

    const workflow = setup({ action, word, translations })

    expect(JSON.stringify(workflow)).toBe(
      createArgWithParams(action, word, translations)
    )
  })
})
