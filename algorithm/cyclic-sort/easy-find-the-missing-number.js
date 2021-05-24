/**
 * Find the Missing Number (easy)
 *
 * We are given an array containing ‘n’ distinct numbers taken
 * from the range 0 to ‘n’. Since the array has only ‘n’ numbers
 * out of the total ‘n+1’ numbers, find the missing number.
 *
 * Input: [4, 0, 3, 1]
 * Output: 2
 *
 * Input: [8, 3, 5, 2, 4, 6, 0, 1]
 * Output: 7
 */

/**
 * Time Complexity: O(N), N = nums.length
 * Space Complexity: O(1)
 */
function find_missing_number(nums) {
  let i = 0
  while (i < nums.length) {
    const j = nums[i]
    if (nums[i] === nums[j] || nums[i] === undefined) {
      i++
    } else {
      ;[nums[i], nums[j]] = [nums[j], nums[i]] // swap
    }
  }

  for (i = 0; i < nums.length; i++) {
    if (nums[i] === undefined) {
      return i
    }
  }
}

console.log(find_missing_number([4, 0, 3, 1]))
console.log(find_missing_number([8, 3, 5, 2, 4, 6, 0, 1]))
