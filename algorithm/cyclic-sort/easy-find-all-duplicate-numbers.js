/**
 * Find all Duplicate Numbers (easy)
 *
 * We are given an unsorted array containing ‘n’ numbers taken from the range 1 to ‘n’.
 * The array has some numbers appearing twice, find all these duplicate numbers without
 * using any extra space.
 *
 * Input: [3, 4, 4, 5, 5]
 * Output: [4, 5]
 *
 * Input: [5, 4, 7, 2, 3, 5, 3]
 * Output: [3, 5]
 */

/**
 * Time Complexity: O(N), N = nums.length
 * Space Complexity: O(1)
 */
function find_all_duplicates(nums) {
  let i = 0
  while (i < nums.length) {
    const j = nums[i] - 1
    if (nums[i] !== nums[j]) {
      ;[nums[i], nums[j]] = [nums[j], nums[i]]
    } else {
      i += 1
    }
  }

  let result = []
  for (i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      result.push(nums[i])
    }
  }

  return result
}

console.log(find_all_duplicates([3, 4, 4, 5, 5]))
console.log(find_all_duplicates([5, 4, 7, 2, 3, 5, 3]))
