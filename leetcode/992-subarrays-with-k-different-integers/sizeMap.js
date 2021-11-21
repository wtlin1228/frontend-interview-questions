class SizeMap {
  constructor() {
    this.size = 0
    this.map = {}
  }

  add(key) {
    if (this.map[key]) {
      this.map[key] += 1
    } else {
      this.map[key] = 1
      this.size += 1
    }
  }

  remove(key) {
    if (!this.map[key]) {
      throw new Error(`Can't remove ${key} since it's not existing `)
    }

    this.map[key] -= 1

    if (this.map[key] === 0) {
      this.size -= 1
      this.map[key] = undefined
    }
  }

  getValue(key) {
    return this.map[key]
  }

  getSize() {
    return this.size
  }
}

module.exports = {
  SizeMap,
}
