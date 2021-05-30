/**
 * Space Complexity: O(n)
 */
class Heap {
  values = []
  sortFn = () => {}

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
  reBalanceHeap() {
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
  remove(value) {
    const i = this.values.findIndex((x) => x === value)
    if (i !== -1) {
      const end = this.values.pop()

      this.values[i] = end
      this.heapifyDown(i)
    }
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
    if (this.sortFn(this.values[currentIndex], this.values[leftChildIndex])) {
      currentIndex = leftChildIndex
    }
    if (this.sortFn(this.values[currentIndex], this.values[rightChildIndex])) {
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

  heapSize() {
    return this.values.length
  }
}

// const minHeap = new Heap(
//   [4, 1, 3, 2, 16, 9, 10, 14, 8, 7],
//   (child, parent) => child >= parent
// )
// minHeap.reBalanceHeap()
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
// maxHeap.reBalanceHeap()
// console.log(maxHeap.values)
// console.log(maxHeap.peek())
// maxHeap.push(100)
// console.log(maxHeap.values)
// maxHeap.pop()
// console.log(maxHeap.values)
// maxHeap.remove(14)
// console.log(maxHeap.values)

module.exports = {
  Heap,
}
