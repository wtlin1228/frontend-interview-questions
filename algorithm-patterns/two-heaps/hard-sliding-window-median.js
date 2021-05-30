/**
 * Sliding Window Median (hard)
 *
 * Given an array of numbers and a number ‘k’,
 * find the median of all the ‘k’ sized sub-arrays (or windows) of the array.
 *
 *
 * Example 1:
 *
 * Input: nums=[1, 2, -1, 3, 5], k = 2
 * Output: [1.5, 0.5, 1.0, 4.0]
 * Explanation: Lets consider all windows of size ‘2’:
 *
 * [1, 2, -1, 3, 5] -> median is 1.5
 * [1, 2, -1, 3, 5] -> median is 0.5
 * [1, 2, -1, 3, 5] -> median is 1.0
 * [1, 2, -1, 3, 5] -> median is 4.0
 *
 *
 * Example 2:
 *
 * Input: nums=[1, 2, -1, 3, 5], k = 3
 * Output: [1.0, 2.0, 3.0]
 * Explanation: Lets consider all windows of size ‘3’:
 *
 * [1, 2, -1, 3, 5] -> median is 1.0
 * [1, 2, -1, 3, 5] -> median is 2.0
 * [1, 2, -1, 3, 5] -> median is 3.0
 */

const { Heap } = require('../../algorithm/heap/heap')

class SlidingWindowMedian {
  /**
   * Space Complexity: O(K), only need to store K elements in the heaps
   */
  constructor() {
    this.maxHeap = new Heap([], (child, parent) => child <= parent)
    this.minHeap = new Heap([], (child, parent) => child >= parent)
  }

  /**
   * Time Complexity: O(N * K), N = nums.length, K = window size
   */
  find_sliding_window_median(nums, k) {
    let result = []

    for (let i = 0; i < nums.length; i++) {
      this.insert_num(nums[i])

      // we have at least k elements in window
      if (i + 1 - k >= 0) {
        // add the median to the the result array
        result.push(this.find_median())

        // remove the element going out of the sliding window
        this.remove_from_window(nums[i + 1 - k])

        this.re_balance_heaps()
      }
    }

    return result
  }

  /**
   * Time Complexity: O(log n)
   */
  insert_num(num) {
    if (this.maxHeap.size() === 0 || this.maxHeap.peek() >= num) {
      this.maxHeap.push(num)
    } else {
      this.minHeap.push(num)
    }

    this.re_balance_heaps()
  }

  /**
   * Time Complexity: O(1)
   */
  find_median() {
    if (this.maxHeap.size() > this.minHeap.size()) {
      return this.maxHeap.peek()
    }
    return (this.minHeap.peek() + this.maxHeap.peek()) / 2
  }

  /**
   * Time Complexity: O(n)
   */
  remove_from_window(elementToBeRemoved) {
    if (elementToBeRemoved <= this.maxHeap.peek()) {
      this.maxHeap.delete(elementToBeRemoved) // delete from heap
    } else {
      this.minHeap.delete(elementToBeRemoved) // delete from heap
    }
  }

  /**
   * either both the heaps will have equal number of elements or max-heap
   * will have one more element than the min-heap
   *
   * Time Complexity: O(log n)
   */
  re_balance_heaps() {
    if (this.maxHeap.size() > this.minHeap.size() + 1) {
      this.minHeap.push(this.maxHeap.pop())
    } else if (this.maxHeap.size() < this.minHeap.size()) {
      this.maxHeap.push(this.minHeap.pop())
    }
  }
}

var slidingWindowMedian = new SlidingWindowMedian()
result = slidingWindowMedian.find_sliding_window_median([1, 2, -1, 3, 5], 2)

console.log(`Sliding window medians are: ${result.join(', ')}`)

slidingWindowMedian = new SlidingWindowMedian()
result = slidingWindowMedian.find_sliding_window_median([1, 2, -1, 3, 5], 3)
console.log(`Sliding window medians are: ${result.join(', ')}`)
