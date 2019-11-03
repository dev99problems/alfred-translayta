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
    const favoritesList = []

    const keys = Object.keys(items).reverse()
    const keysCount = keys.length

    for (let i = 0; i < keysCount; i++) {
      const blockSize = 7
      if (i && !(i % blockSize)) {
        let lastIndex = i + blockSize
        if (lastIndex > keysCount) {
          lastIndex = keysCount
        }
        const subtitle = `${i + 1}—${lastIndex} ⤵️`
        favoritesList.push({ title: ' ', subtitle, icon: { path: ' ' } })
      }

      const key = keys[i]
      favoritesList.push({ title: key, subtitle: items[key] })
    }

    return favoritesList
  }
}

exports.favoritesCache = new FavoritesCache('favorites')
