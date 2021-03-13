const { createArgWithAction, createArgWithParams } = require('../utils.js')

const setup = variables => ({
  alfredworkflow: {
    variables
  }
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
