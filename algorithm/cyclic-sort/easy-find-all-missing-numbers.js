/**
 * Find all Missing Numbers (easy)
 *
 * We are given an unsorted array containing numbers taken from
 * the range 1 to ‘n’. The array can have duplicates, which means
 * some numbers will be missing. Find all those missing numbers.
 *
 * Input: [2, 3, 1, 8, 2, 3, 5, 1]
 * Output: 4, 6, 7
 * Explanation: The array should have all numbers from 1 to 8, due to duplicates 4, 6, and 7 are missing.
 *
 * Input: [2, 4, 1, 2]
 * Output: 3
 *
 * Input: [2, 3, 2, 1]
 * Output: 4
 */

/**
 * Time Complexity: O(N), N = nums.length
 * Space Complexity: O(1), excluding space for the result array
 */
function find_missing_numbers(nums) {
  let i = 0

  while (i < nums.length) {
    let j = nums[i] - 1
    if (i === j || nums[i] === nums[j]) {
      i += 1
    } else {
      ;[nums[i], nums[j]] = [nums[j], nums[i]] // swap
    }
  }

  let result = []
  for (i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      result.push(i + 1)
    }
  }

  return result
}

console.log(find_missing_numbers([2, 3, 1, 8, 2, 3, 5, 1]))
console.log(find_missing_numbers([2, 4, 1, 2]))
console.log(find_missing_numbers([2, 3, 2, 1]))
