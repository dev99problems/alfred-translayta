const { lastSearchCache } = require('../last-search-cache.js')

test('lastSearchCache: works properly', async () => {
  const lastTranslation = {
    title: 'revolt',
    subtitle: 'восставать'
  }

  await lastSearchCache.set(lastTranslation)

  expect(await lastSearchCache.get()).toEqual(lastTranslation)
})
