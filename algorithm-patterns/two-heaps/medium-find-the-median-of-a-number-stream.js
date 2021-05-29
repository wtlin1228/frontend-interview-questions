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

class MedianOfAStream {
  constructor() {
    this.leftHeap = []
    this.rightHeap = []
  }

  insert_num(num) {
    // TODO: Write your code here
    if (this.leftHeap.length > this.rightHeap.length) {
      if (this.leftHeap[this.leftHeap.length - 1] > num) {
        this.rightHeap.push()
      }
    }
    return -1
  }

  find_median(self) {
    // TODO: Write your code here
    return 0.0
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
