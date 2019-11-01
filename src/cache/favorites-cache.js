const { Cache } = require('./cache')

class FavoritesCache extends Cache {
  get items() {
    return super.get()
  }

  addToFavorites(word, translations) {
    const items = this.items

    items[word] = translations
    super.set(items)
  }

  removeFromFavorites(word) {
    const items = this.items

    delete items[word]
    super.set(items)
  }

  getFavorites() {
    const items = this.items

    return Object.keys(items)
      .map(key => ({ title: key, subtitle: items[key] }))
      .reverse()
  }
}

exports.favoritesCache = new FavoritesCache('favorites')
