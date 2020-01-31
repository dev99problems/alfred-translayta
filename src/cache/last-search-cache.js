const alfy = require('alfy')

const { Cache } = require('./cache.js')

exports.lastSearchCache = new Cache('last-search', alfy.cache)
