const { lastSearchCache } = require('./cache')
const { formatLastSearch } = require('./output')

exports.getLastSearchResults = () => {
  const { prevUserInput, prevOutput = [], prevDestLang } = lastSearchCache.get()

  const lastSearch = formatLastSearch(prevUserInput, prevDestLang)

  return [lastSearch, ...prevOutput]
}
