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

const { Heap } = require('../algorithm/heap/heap')

/**
 * Use Buckets to solve the problem.
 * Time Complexity: O(n), where n = nums.length
 * Space Complexity: O(n), where n = nums.length
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequentWithBuckets = function (nums, k) {
  // O(n) for building frequency map
  const frequencyMap = {}
  nums.forEach((num) => {
    if (frequencyMap[num]) {
      frequencyMap[num] += 1
    } else {
      frequencyMap[num] = 1
    }
  })

  const buckets = []
  Object.entries(frequencyMap).map(([num, frequency]) => {
    if (buckets[frequency]) {
      buckets[frequency].push(num)
    } else {
      buckets[frequency] = [num]
    }
  })

  return buckets.flat().reverse().slice(0, k)
}

/**
 * Use Heap to solve the problem.
 * Time Complexity: O(n log(n)) in worst case. Where n = nums.length, k = nums.length and all numbers are distinct.
 * Space Complexity: O(n) in worst case. Where n = nums.length.
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequentWithHeap = function (nums, k) {
  // O(n) for building frequency map
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

// console.log(topKFrequentWithHeap([2, 3, 4, 1, 4, 0, 4, -1, -2, -1], 2))
console.log(topKFrequentWithBuckets([2, 3, 4, 1, 4, 0, 4, -1, -2, -1], 2))
