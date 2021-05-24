/**
 * Find the Duplicate Number (easy)
 *
 * We are given an unsorted array containing ‘n+1’ numbers taken
 * from the range 1 to ‘n’. The array has only one duplicate but
 * it can be repeated multiple times. Find that duplicate number
 * without using any extra space. You are, however, allowed to
 * modify the input array.
 *
 * Input: [1, 4, 4, 3, 2]
 * Output: 4
 *
 * Input: [2, 1, 3, 3, 5, 4]
 * Output: 3
 *
 * Input: [2, 4, 1, 4, 4]
 * Output: 4
 */

/**
 * Time Complexity: O(N), N = nums.length
 * Space Complexity: O(1)
 */
function find_duplicate(nums) {
  let i = 0
  while (i < nums.length) {
    j = nums[i] - 1
    if (i === j || nums[i] === nums[j]) {
      i += 1
    } else {
      ;[nums[i], nums[j]] = [nums[j], nums[i]] // swap
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (i + 1 !== nums[i]) {
      return nums[i]
    }
  }
}

console.log(find_duplicate([1, 4, 4, 3, 2]))
console.log(find_duplicate([2, 1, 3, 3, 5, 4]))
console.log(find_duplicate([2, 4, 1, 4, 4]))
