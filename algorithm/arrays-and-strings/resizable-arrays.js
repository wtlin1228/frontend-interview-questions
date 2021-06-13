class ResizableArray {
  constructor() {
    this.array = this.createSealArray(1)
    this.lastIdx = 0
  }

  createSealArray(l) {
    return Object.seal(Array(l).fill(undefined))
  }

  push(item) {
    if (this.lastIdx >= this.array.length) {
      const newArray = this.createSealArray(this.array.length * 2)
      this.array.forEach((x, i) => (newArray[i] = x))
      this.array = newArray
    }

    this.array[this.lastIdx] = item
    this.lastIdx += 1
  }
}

const arr = new ResizableArray()

arr.push(50)
arr.push(100)
arr.push(2)
arr.push(4)
arr.push(5)
