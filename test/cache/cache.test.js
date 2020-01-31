const test = require('ava')
const alfyTest = require('alfy-test')

const { Cache } = require('../../src/cache/cache.js')

test('"Cache" does not fail without "alfy" instance', t => {
  const tempCache = new Cache('temp')

  t.notThrows(() => tempCache.set('name', 'John'))
  t.notThrows(() => tempCache.get('name'))
  t.notThrows(() => tempCache.reset())
})

const setup = () => {
  const alfy = alfyTest()
  return {
    // alfy,
    alfyCache: new Cache('names', alfy.cache),
    translation: {
      title: 'indeed',
      subtitle: 'на самом деле'
    }
  }
}

test('instance of "Cache" set/get value properly', t => {
  const { alfyCache, translation } = setup()
  alfyCache.set(translation)

  t.deepEqual(alfyCache.get(), translation)
})

test('instance of "Cache" reset it\'s value properly', async t => {
  const { alfyCache, translation } = setup()
  alfyCache.set(translation)
  alfyCache.reset()

  t.deepEqual(alfyCache.get(), {})
})
