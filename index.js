const alfy = require('alfy')

const { getTranslations } = require('./src/translate/get-translations')
const { getLastSearchResults } = require('./src/get-last-search-results')

const userInput = process.argv[2] || ''
const isInputEmpty = !!!userInput.trim().length

// NOTE: even though seems like top level await landed in node v10.x
// we use async iife here
!(async () => {
  let output
  if (isInputEmpty) {
    output = getLastSearchResults()
  } else {
    output = await getTranslations(userInput)
  }

  alfy.output(output)
})()
