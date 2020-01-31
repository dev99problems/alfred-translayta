const test = require('ava')

const { lastSearchCache } = require('../../src/cache/last-search-cache.js')

test('lastSearchCache works properly', t => {
  const lastTranslation = {
    title: 'revolt',
    subtitle: 'восставать'
  }

  lastSearchCache.set(lastTranslation)

  t.deepEqual(lastSearchCache.get(), lastTranslation)
})
