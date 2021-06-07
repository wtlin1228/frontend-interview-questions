/**
 * Kth Largest Number in a Stream (medium)
 *
 * Design a class to efficiently find the Kth largest element in
 * a stream of numbers.
 *
 * The class should have the following two things:
 *
 * The constructor of the class should accept an integer array
 * containing initial numbers from the stream and an integer ‘K’.
 * The class should expose a function add(int num) which will
 * store the given number and return the Kth largest number.
 *
 *
 * Example 1:
 *
 * Input: [3, 1, 5, 12, 2, 11], K = 4
 * 1. Calling add(6) should return '5'.
 * 2. Calling add(13) should return '6'.
 * 2. Calling add(4) should still return '6'.
 */

const { Heap } = require('../../algorithm/heap/heap')

/**
 * Space Complexity: O(k)
 */
class KthLargestNumberInStream {
  /**
   * Time Complexity: O(n log k)
   */
  constructor(nums, k) {
    this.minHeap = new Heap([], (child, parent) => child >= parent)
    this.k = k

    nums.forEach((num) => this.add(num))
  }

  /**
   *  Time Complexity: O(log k)
   */
  add(num) {
    if (this.minHeap.size() < this.k) {
      this.minHeap.push(num)
      return this.minHeap.peek()
    }

    if (num > this.minHeap.peek()) {
      this.minHeap.pop()
      this.minHeap.push(num)
    }

    return this.minHeap.peek()
  }
}

kthLargestNumber = new KthLargestNumberInStream([3, 1, 5, 12, 2, 11], 4)
console.log(`4th largest number is: ${kthLargestNumber.add(6)}`)
console.log(`4th largest number is: ${kthLargestNumber.add(13)}`)
console.log(`4th largest number is: ${kthLargestNumber.add(4)}`)
