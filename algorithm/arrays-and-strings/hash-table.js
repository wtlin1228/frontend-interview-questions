class HashEntry {
  constructor(key, value, next = null) {
    this.key = key
    this.value = value
    this.next = next
  }
}

class HashTable {
  constructor(tableSize = 5) {
    this.buckets = Array(tableSize).fill(null)
  }

  getIndex(key) {
    const hash = key
      .split('')
      .reduce((acc, curr) => acc + curr.charCodeAt(0), 0)

    return hash % this.buckets.length
  }

  insert(key, value) {
    const newEntry = new HashEntry(key, value)

    const index = this.getIndex(key)

    if (this.buckets[index] === null) {
      this.buckets[index] = newEntry
      return
    }

    let lastEntry = this.buckets[index]

    while (lastEntry !== null) {
      if (lastEntry.key === key) {
        lastEntry.value = value
        return
      }

      if (lastEntry.next === null) {
        lastEntry.next = newEntry
      }

      lastEntry = lastEntry.next
    }
  }

  get(key) {
    const index = this.getIndex(key)

    let lastEntry = this.buckets[index]

    if (lastEntry.key === key) {
      return lastEntry.value
    }

    while (lastEntry !== null) {
      if (lastEntry.key === key) {
        return lastEntry.value
      }
      lastEntry = lastEntry.next
    }

    return undefined
  }
}

const hashTable = new HashTable()
console.log(hashTable)
