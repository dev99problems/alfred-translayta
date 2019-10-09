const alfy = require('alfy')

const { getTranslations } = require('./src/translate/get-translations')
const { lastSearchCache } = require('./src/cache')

const userInput = process.argv[2] || ''
const isInputEmpty = !!!userInput.trim().length

// NOTE: even though seems like top level await landed in node v10.x
// we use async iife here
!(async () => {
  if (isInputEmpty) {
    alfy.output(lastSearchCache.get())
  } else {
    const output = await getTranslations(userInput)
    alfy.output(output)
  }
})()
