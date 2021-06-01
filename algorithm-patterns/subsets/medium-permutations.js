/**
 * Permutations (medium)
 *
 * Given a set of distinct numbers, find all of its permutations.
 *
 * Permutation is defined as the re-arranging of the elements of the set.
 * For example, {1, 2, 3} has the following six permutations:
 *
 * {1, 2, 3}
 * {1, 3, 2}
 * {2, 1, 3}
 * {2, 3, 1}
 * {3, 1, 2}
 * {3, 2, 1}
 *
 * If a set has ‘n’ distinct elements it will have n! permutations.
 */

/**
 * ------ My Strategy ------
 * Insert the new value to each slot of previous set.
 * for example: subsets = [[1, 2], [2, 1]], insert 3
 *              [1, 2] have 3 slots to insert -> [3, 1, 2], [1, 3, 2], [1, 2, 3]
 *              [2, 1] have 3 slots to insert -> [3, 2, 1], [2, 3, 1], [2, 1, 3]
 *              The new subsets length will be 6, and keep doing so for each num
 */

/**
 * Time Complexity: O(N * N!), total sets number is N! and
 * Space Complexity: O(N * N!), subsets.length = N!, and item.length in subsets = N
 */
function find_permutations(nums) {
  if (nums.length === 0) {
    return []
  }

  let subsets = [[nums[0]]]

  for (let i = 1; i < nums.length; i++) {
    const numToInsert = nums[i]
    const n = subsets.length
    for (let j = 0; j < n; j++) {
      const previousSet = subsets.shift()
      for (let k = 0; k < previousSet.length + 1; k++) {
        let newSet = previousSet.slice(0)
        newSet.splice(k, 0, numToInsert)
        subsets.push(newSet)
      }
    }
  }

  return subsets
}

console.log('Here are all the permutations:')
const result = find_permutations([1, 3, 5, 4, 2])
result.forEach((permutation) => {
  console.log(permutation)
})
