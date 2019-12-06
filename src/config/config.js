const alfy = require('alfy')

class Config {
  set(name, value) {
    alfy.config.set(name, value)
  }

  get(name) {
    return alfy.config.get(name)
  }
}

exports.config = new Config()
