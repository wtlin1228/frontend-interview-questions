/**
 * Subsets (easy)
 *
 * Given a set with distinct elements, find all of its distinct subsets.
 *
 *
 * Example 1:
 *
 * Input: [1, 3]
 * Output: [], [1], [3], [1,3]
 * Example 2:
 *
 * Input: [1, 5, 3]
 * Output: [], [1], [5], [3], [1,5], [1,3], [5,3], [1,5,3]
 */

/**
 * Time Complexity: O(N * 2 ^ N)
 *   JSON.stringify take O(N)
 *   JSON.parse take O(N)
 *   subsets will have 2^N items
 *
 * Space Complexity: O(N * 2 ^ N)
 *   subsets will have 2^N items and each item will take up to N items
 */
const find_subsets = function (nums) {
  let subsets = [[]]

  for (let num of nums) {
    let copiedSubsets = JSON.parse(JSON.stringify([...subsets]))

    for (let subset of copiedSubsets) {
      subset.push(num)
    }

    subsets.push(...copiedSubsets)
  }

  return subsets
}

console.log('Here is the list of subsets: ')
let result = find_subsets([1, 3])
result.forEach((subset) => {
  console.log(subset)
})

console.log('Here is the list of subsets: ')
result = find_subsets([1, 5, 3])
result.forEach((subset) => {
  console.log(subset)
})
