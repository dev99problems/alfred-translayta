const alfy = require('alfy')

const { getTranslations } = require('./src/translate/get-translations')
const { lastSearchCache } = require('./src/cache')

const userInput = process.argv[2] || ''
const isInputEmpty = !!!userInput.trim().length

if (isInputEmpty) {
  alfy.output(lastSearchCache.get())
} else {
  const output = await getTranslations(userInput)
  alfy.output(output)
}
