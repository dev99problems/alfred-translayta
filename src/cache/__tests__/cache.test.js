const alfyTest = require('alfy-test')

const { Cache } = require('../cache.js')

const setup = () => {
  const alfy = alfyTest()
  return {
    // alfy,
    alfyCache: new Cache('names', alfy.cache),
    translation: {
      title: 'indeed',
      subtitle: 'дійсно'
    }
  }
}

describe('Cache', () => {
  test('does not fail without "alfy" instance', () => {
    const tempCache = new Cache('temp')

    expect(() => tempCache.set('name', 'John')).not.toThrow()
    expect(() => tempCache.get('name')).not.toThrow()
    expect(() => tempCache.reset()).not.toThrow()
  })

  test('instance of "Cache" set/get value properly', () => {
    const { alfyCache, translation } = setup()
    alfyCache.set(translation)

    expect(alfyCache.get()).toEqual(translation)
  })

  test('instance of "Cache" reset it\'s value properly', () => {
    const { alfyCache, translation } = setup()
    alfyCache.set(translation)
    alfyCache.reset()

    expect(alfyCache.get()).toEqual({})
  })
})
