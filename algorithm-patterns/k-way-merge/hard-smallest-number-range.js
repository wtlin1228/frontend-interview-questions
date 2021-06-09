/**
 * Smallest Number Range (Hard)
 *
 * Given ‘M’ sorted arrays, find the smallest range that includes at least one number from each of the ‘M’ lists.
 *
 *
 * Example 1:
 *
 * Input: L1=[1, 5, 8], L2=[4, 12], L3=[7, 8, 10]
 * Output: [4, 7]
 * Explanation: The range [4, 7] includes 5 from L1, 4 from L2 and 7 from L3.
 *
 *
 * Example 2:
 *
 * Input: L1=[1, 9], L2=[4, 12], L3=[7, 10, 16]
 * Output: [9, 12]
 * Explanation: The range [9, 12] includes 9 from L1, 12 from L2 and 10 from L3.
 */

const { Heap } = require('../../algorithm/heap/heap')

const find_smallest_range = function (lists) {
  // O(n) space
  const minHeap = new Heap(
    matrix.map((list) => ({ list, pointer: 0 })),
    (child, parent) => child.list[child.pointer] >= parent.list[parent.pointer]
  )
  return [-1, -1]
}

console.log(
  `Smallest range is: ${find_smallest_range([
    [1, 5, 8],
    [4, 12],
    [7, 8, 10],
  ])}`
)
