/**
 * Find the Median of a Number Stream (medium)
 *
 * Design a class to calculate the median of a number stream.
 * The class should have the following two methods:
 * - insertNum(int num): stores the number in the class
 * - findMedian(): returns the median of all numbers inserted in the class
 *
 * If the count of numbers inserted in the class is even, the median will be
 * the average of the middle two numbers.
 *
 *
 * Example 1:
 *
 * 1. insertNum(3)
 * 2. insertNum(1)
 * 3. findMedian() -> output: 2
 * 4. insertNum(5)
 * 5. findMedian() -> output: 3
 * 6. insertNum(4)
 * 7. findMedian() -> output: 3.5
 */

const { Heap } = require('../../algorithm/heap/heap')

/**
 * Space Complexity: O(N)
 */
class MedianOfAStream {
  constructor() {
    this.maxHeap = new Heap([], (child, parent) => child <= parent)
    this.minHeap = new Heap([], (child, parent) => child >= parent)
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

    if (this.maxHeap.size() > this.minHeap.size() + 1) {
      this.minHeap.push(this.maxHeap.pop())
    } else if (this.maxHeap.size() < this.minHeap.size()) {
      this.maxHeap.push(this.minHeap.pop())
    }
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
}

var medianOfAStream = new MedianOfAStream()
medianOfAStream.insert_num(3)
medianOfAStream.insert_num(1)
console.log(`The median is: ${medianOfAStream.find_median()}`)
medianOfAStream.insert_num(5)
console.log(`The median is: ${medianOfAStream.find_median()}`)
medianOfAStream.insert_num(4)
console.log(`The median is: ${medianOfAStream.find_median()}`)
