const alfy = require('alfy')

class Cache {
  constructor(name) {
    this.cacheName = name
  }

  set(value) {
    alfy.cache.set(this.cacheName, value)
  }

  get() {
    return alfy.cache.get(this.cacheName) || {}
  }

  reset() {
    this.set(null)
  }
}

exports.Cache = Cache