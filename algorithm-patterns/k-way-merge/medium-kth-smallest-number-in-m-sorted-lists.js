/**
 * Kth Smallest Number in M Sorted Lists (Medium)
 *
 * Given ‘M’ sorted arrays, find the K’th smallest number among all the arrays.
 *
 *
 * Example 1:
 *
 * Input: L1=[2, 6, 8], L2=[3, 6, 7], L3=[1, 3, 4], K=5
 * Output: 4
 * Explanation: The 5th smallest number among all the arrays is 4, this can be verified from
 * the merged list of all the arrays: [1, 2, 3, 3, 4, 6, 6, 7, 8]
 *
 *
 * Example 2:
 *
 * Input: L1=[5, 8, 9], L2=[1, 7], K=3
 * Output: 7
 * Explanation: The 3rd smallest number among all the arrays is 7.
 */

const { Heap } = require('../../algorithm/heap/heap')

/**
 * Time Complexity: O(n + k log n), n = lists.length
 * Space Complexity: O(n), n = lists.length
 */
const find_Kth_smallest = function (lists, k) {
  // O(n) space
  const minHeap = new Heap(
    lists.map((list) => ({ list, pointer: 0 })),
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
      [3, 6, 7],
      [1, 3, 4],
    ],
    5
  )}`
)
