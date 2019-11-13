const { Cache } = require('./cache')

class FavoritesCache extends Cache {
  get items() {
    return super.get()
  }

  get keys() {
    return Object.keys(this.items).reverse()
  }

  getOutputItem(key) {
    return {
      title: key,
      subtitle: this.items[key]
    }
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
    const keys = this.keys
    const keysCount = keys.length
    const favoritesList = []

    for (let idx = 0; idx < keysCount; idx++) {
      const blockSize = 7
      if (idx && !(idx % blockSize)) {
        let lastIndex = idx + blockSize
        if (lastIndex > keysCount) {
          lastIndex = keysCount
        }
        const subtitle = `${idx + 1}—${lastIndex} ⤵️`
        favoritesList.push({ title: ' ', subtitle, icon: { path: ' ' } })
      }

      const key = keys[idx]
      const outputItem = this.getOutputItem(key)
      favoritesList.push(outputItem)
    }

    return favoritesList
  }

  findInFavorites(userInput) {
    const keys = this.keys
    const matches = keys.filter(key => key.includes(userInput))

    return matches.map(key => this.getOutputItem(key))
  }
}

exports.favoritesCache = new FavoritesCache('favorites')
