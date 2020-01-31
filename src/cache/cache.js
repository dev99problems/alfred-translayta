const cacheMock = {
  set: () => {},
  get: () => {}
}

class Cache {
  constructor(name, cache = cacheMock) {
    this.cacheName = name
    this.cache = cache
  }

  set(value) {
    this.cache.set(this.cacheName, value)
  }

  get() {
    return this.cache.get(this.cacheName) || {}
  }

  reset() {
    this.set(null)
  }
}

exports.Cache = Cache
