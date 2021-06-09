/**
 * Kth Smallest Number in a Sorted Matrix (Hard)
 *
 * Given an N*N matrix where each row and column is sorted in
 * ascending order, find the Kth smallest element in the matrix.
 *
 * Example 1:
 *
 * Input:
 *
 * Matrix=[
 *   [2, 6, 8],
 *   [3, 7, 10],
 *   [5, 8, 11]
 * ],
 * K=5
 *
 * Output: 7
 * Explanation: The 5th smallest number in the matrix is 7.
 */

const { Heap } = require('../../algorithm/heap/heap')

const find_Kth_smallest = function (matrix, k) {
  // O(n) space
  const minHeap = new Heap(
    matrix.map((list) => ({ list, pointer: 0 })),
    (child, parent) => child.list[child.pointer] >= parent.list[parent.pointer]
  )
  minHeap.buildHeap() // O(n) time

  let i = 0
  while (minHeap.size() > 0) {
    // O(log n)
    let { list, pointer } = minHeap.pop() // { list: number[], pointer: number }

    i += 1
    if (i === k) {
      return list[pointer]
    }

    if (pointer + 1 < list.length) {
      pointer += 1
      // O(log n)
      minHeap.push({ list, pointer })
    }
  }

  return null
}

console.log(
  `Kth smallest number is: ${find_Kth_smallest(
    [
      [2, 6, 8],
      [3, 7, 10],
      [5, 8, 11],
    ],
    5
  )}`
)
