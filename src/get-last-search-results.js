const { lastSearchCache } = require('./cache/last-search-cache.js')
const { formatLastSearch } = require('./output.js')

exports.getLastSearchResults = () => {
  // NOTE, @genechulkov: here prevDestLang should be prevTargetLang
  const { prevUserInput, prevOutput = [], prevDestLang } = lastSearchCache.get()

  const lastSearch = formatLastSearch(prevUserInput, prevDestLang)

  return [lastSearch, ...prevOutput]
}
