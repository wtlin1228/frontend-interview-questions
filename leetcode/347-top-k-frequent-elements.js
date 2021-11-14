/**
 * https://leetcode.com/problems/top-k-frequent-elements/submissions/
 *
 * Top K Frequent Elements
 *
 * Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.
 *
 *
 * Example 1:
 *
 * Input: nums = [1,1,1,2,2,3], k = 2
 * Output: [1,2]
 * Example 2:
 *
 * Input: nums = [1], k = 1
 * Output: [1]
 *
 *
 * Constraints:
 *
 * 1 <= nums.length <= 105
 * k is in the range [1, the number of unique elements in the array].
 * It is guaranteed that the answer is unique.
 */

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

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  // O(n) for building frequency map cost
  const frequencyMap = {}
  nums.forEach((num) => {
    if (frequencyMap[num]) {
      frequencyMap[num] += 1
    } else {
      frequencyMap[num] = 1
    }
  })

  // O(m) for building a heap from frequency map
  // where m is the number of distinct elements (m = n in worst case)
  const maxHeap = new Heap(
    Object.entries(frequencyMap),
    (child, parent) => child[1] < parent[1]
  )
  maxHeap.buildHeap()

  // O(k * log(m)) for get the result
  // where m is the number of distinct elements (m = n in worst case)
  const result = []
  for (let i = 0; i < k; i++) {
    result.push(maxHeap.pop())
  }

  return result.map((entry) => entry[0])
}

console.log(topKFrequent([2, 3, 4, 1, 4, 0, 4, -1, -2, -1], 2))
