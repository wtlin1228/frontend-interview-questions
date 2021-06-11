/**
 * https://leetcode.com/problems/largest-number/
 */

/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function (nums) {
  if (nums.length === 0) {
    return '0'
  }

  const sortedNums = nums.map((x) => String(x)).sort((a, b) => b + a - (a + b))

  if (sortedNums[0] === '0') {
    return '0'
  }

  return sortedNums.join('')
}

console.log(largestNumber([3, 30, 34, 5, 9]))
console.log(largestNumber([0]))
console.log(largestNumber([]))
console.log(largestNumber([0, 0]))
