const { lastSearchCache } = require('./cache/last-search-cache.js')
const { formatLastSearch } = require('./output.js')

exports.getLastSearchResults = () => {
  const {
    prevUserInput,
    prevOutput = [],
    prevDestLang: prevTargetLang
  } = lastSearchCache.get()
  const lastSearch = formatLastSearch(prevUserInput, prevTargetLang)

  return [lastSearch, ...prevOutput]
}
