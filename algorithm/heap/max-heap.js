/**
 * Space Complexity: O(n)
 */
class MaxHeap {
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
  buildMaxHeap() {
    for (let i = Math.floor(this.values.length / 2); i >= 0; i--) {
      this.heapifyDown(i)
    }
  }

  /**
   * Time Complexity: O(log n)
   */
  extractMax() {
    if (this.values.length < 1) {
      throw new Error('try to extract value from empty max heap')
    }

    const max = this.values[0]
    const end = this.values.pop()

    this.values[0] = end
    this.heapifyDown(0)

    return max
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

    let largestIndex = i
    if (this.values[leftChildIndex] > this.values[largestIndex]) {
      largestIndex = leftChildIndex
    }
    if (this.values[rightChildIndex] > this.values[largestIndex]) {
      largestIndex = rightChildIndex
    }

    if (largestIndex !== i) {
      this.swap(largestIndex, i)
      this.heapifyDown(largestIndex)
    }
  }

  /**
   * Time Complexity: O(log n)
   */
  heapifyUp(i) {
    let currentIndex = i
    while (currentIndex !== 0) {
      const parentIndex = this.parent(currentIndex)

      if (this.values[currentIndex] <= this.values[parentIndex]) {
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

const maxHeap = new MaxHeap([4, 1, 3, 2, 16, 9, 10, 14, 8, 7])
maxHeap.buildMaxHeap()
console.log(maxHeap.values)
console.log(maxHeap.peek())
maxHeap.add(100)
console.log(maxHeap.values)
maxHeap.extractMax()
console.log(maxHeap.values)
