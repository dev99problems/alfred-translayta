const test = require('ava')

const { createArgWithAction, createArgWithParams } = require('../src/utils.js')

const setup = variables => ({
  alfredworkflow: {
    variables
  }
})

test('createArgWithAction properly convert workflow variables into string', t => {
  t.is(
    createArgWithAction('import'),
    `{"alfredworkflow":{"variables":{"action":"import"}}}`
  )

  const workflow = setup({ action: 'import' })

  t.is(JSON.stringify(workflow), createArgWithAction('import'))
})

test('createArgWithParams properly convert workflow variables into string', t => {
  const action = 'remove or edit'
  const word = 'embrace'
  const translations = 'охватывать, обнимать'

  t.is(
    createArgWithParams(action, word, translations),
    `{"alfredworkflow":{"variables":{"action":"${action}","word":"${word}","translations":"${translations}"}}}`
  )

  const workflow = setup({ action, word, translations })

  t.is(
    JSON.stringify(workflow),
    createArgWithParams(action, word, translations)
  )
})
