/**
 * Space Complexity: O(n)
 */
class MinHeap {
  values = []

  constructor(unorderedArray) {
    this.values = unorderedArray
  }

  peek() {
    return this.values[0]
  }

  /**
   * Time Complexity: O(n)
   */
  buildMinHeap() {
    for (let i = Math.floor(this.values.length / 2); i >= 0; i--) {
      this.heapifyDown(i)
    }
  }

  /**
   * Time Complexity: O(log n)
   */
  extractMin() {
    if (this.values.length < 1) {
      throw new Error('try to extract value from empty min heap')
    }

    const min = this.values[0]
    const end = this.values.pop()

    this.values[0] = end
    this.heapifyDown(0)

    return min
  }

  /**
   * Time Complexity: O(log n)
   */
  add(value) {
    this.values.push(value)
    this.heapifyUp(this.values.length - 1)
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

    let smallestIndex = i
    if (this.values[leftChildIndex] < this.values[smallestIndex]) {
      smallestIndex = leftChildIndex
    }
    if (this.values[rightChildIndex] < this.values[smallestIndex]) {
      smallestIndex = rightChildIndex
    }

    if (smallestIndex !== i) {
      this.swap(smallestIndex, i)
      this.heapifyDown(smallestIndex)
    }
  }

  /**
   * Time Complexity: O(log n)
   */
  heapifyUp(i) {
    let currentIndex = i
    while (currentIndex !== 0) {
      const parentIndex = this.parent(currentIndex)

      if (this.values[currentIndex] >= this.values[parentIndex]) {
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

const minHeap = new MinHeap([4, 1, 3, 2, 16, 9, 10, 14, 8, 7])
minHeap.buildMinHeap()
console.log(minHeap.values)
console.log(minHeap.peek())
minHeap.add(0)
console.log(minHeap.values)
minHeap.extractMin()
console.log(minHeap.values)
