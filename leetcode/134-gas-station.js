/**
 * https://leetcode.com/problems/gas-station/
 */

/**
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  let start = gas.length - 1
  let end = 0
  let sum = gas[start] - cost[start]
  while (start !== end) {
    if (sum >= 0) {
      sum += gas[end] - cost[end]
      end += 1
    } else {
      start -= 1
      sum += gas[start] - cost[start]
    }
  }
  return sum >= 0 ? start : -1
}

console.log(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]))
console.log(canCompleteCircuit([5, 0, 5, 0, 5, 0], [0, 0, 0, 5, 0, 10]))
console.log(canCompleteCircuit([5], [6]))
