/**
 * Space Complexity: O(n)
 */
class Heap {
  constructor(unorderedArray, sortFn) {
    this.values = unorderedArray
    this.sortFn = sortFn
  }

  peek() {
    return this.values[0]
  }

  /**
   * Time Complexity: O(n)
   */
  buildHeap() {
    if (this.size() === 0) {
      return
    }

    for (let i = Math.floor(this.values.length / 2); i >= 0; i--) {
      this.heapifyDown(i)
    }
  }

  /**
   * Time Complexity: O(log n)
   */
  pop() {
    if (this.values.length < 1) {
      throw new Error('Heap is empty')
    }

    if (this.size() === 1) {
      return this.values.pop()
    }

    const result = this.values[0]
    const end = this.values.pop()

    this.values[0] = end
    this.heapifyDown(0)

    return result
  }

  /**
   * Time Complexity: O(log n)
   */
  push(value) {
    this.values.push(value)
    this.heapifyUp(this.values.length - 1)
  }

  /**
   * Time Complexity: O(n)
   */
  delete(value) {
    const i = this.values.findIndex((x) => x === value)

    if (i === -1) {
      return
    }

    if (i === 0 && this.size() === 1) {
      this.values.pop()
      return
    }

    const end = this.values.pop()
    this.values[i] = end
    this.heapifyDown(i)
  }

  /**
   * Time Complexity: O(log n)
   */
  heapifyDown(i) {
    if (this.isLeaf(i)) {
      return
    }

    const leftChildIndex = this.left(i)
    const rightChildIndex = this.right(i)

    let currentIndex = i
    if (
      this.values[leftChildIndex] &&
      this.sortFn(this.values[currentIndex], this.values[leftChildIndex])
    ) {
      currentIndex = leftChildIndex
    }
    if (
      this.values[rightChildIndex] &&
      this.sortFn(this.values[currentIndex], this.values[rightChildIndex])
    ) {
      currentIndex = rightChildIndex
    }

    if (currentIndex !== i) {
      this.swap(currentIndex, i)
      this.heapifyDown(currentIndex)
    }
  }

  /**
   * Time Complexity: O(log n)
   */
  heapifyUp(i) {
    let currentIndex = i
    while (currentIndex !== 0) {
      const parentIndex = this.parent(currentIndex)

      if (this.sortFn(this.values[currentIndex], this.values[parentIndex])) {
        return
      }

      this.swap(currentIndex, parentIndex)
      currentIndex = parentIndex
    }
  }

  left(i) {
    return 2 * i + 1
  }

  right(i) {
    return 2 * i + 2
  }

  parent(i) {
    return Math.floor((i - 1) / 2)
  }

  isLeaf(i) {
    return (
      i >= Math.floor(this.values.length / 2) && i <= this.values.length - 1
    )
  }

  swap(i, j) {
    ;[this.values[i], this.values[j]] = [this.values[j], this.values[i]]
  }

  size() {
    return this.values.length
  }

  toArray() {
    return this.values
  }
}

// const minHeap = new Heap(
//   [4, 1, 3, 2, 16, 9, 10, 14, 8, 7],
//   (child, parent) => child >= parent
// )
// minHeap.buildHeap()
// console.log(minHeap.values)
// console.log(minHeap.peek())
// minHeap.push(0)
// console.log(minHeap.values)
// minHeap.pop()
// console.log(minHeap.values)

// const maxHeap = new Heap(
//   [4, 1, 3, 2, 16, 9, 10, 14, 8, 7],
//   (child, parent) => child <= parent
// )
// maxHeap.buildHeap()
// console.log(maxHeap.values)
// console.log(maxHeap.peek())
// maxHeap.push(100)
// console.log(maxHeap.values)
// maxHeap.pop()
// console.log(maxHeap.values)
// maxHeap.delete(14)
// console.log(maxHeap.values)

module.exports = {
  Heap,
}
