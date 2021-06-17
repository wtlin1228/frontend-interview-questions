/**
 * https://leetcode.com/problems/maximum-distance-in-arrays/
 *
 * Given m arrays, and each array is sorted in ascending order.
 * Now you can pick up two integers from two different arrays
 * (each array picks one) and calculate the distance. We define
 * the distance between two integers a and b to be their absolute
 * difference |a-b|. Your task is to find the maximum distance.
 *
 *
 * Example 1:
 *
 * Input:
 * [[1,2,3],
 *  [4,5],
 *  [1,2,3]]
 *
 * Output: 4
 *
 * Explanation:
 * One way to reach the maximum distance 4 is to pick 1 in the
 * first or third array and pick 5 in the second array.
 *
 *
 * Note:
 *
 * Each given array will have at least 1 number. There will be at least two non-empty arrays.
 * The total number of the integers in all the m arrays will be in the range of [2, 10000].
 * The integers in the m arrays will be in the range of [-10000, 10000].
 */

/**
 * Time Complexity: O(n), arrays.length
 * Space Complexity: O(1)
 */
function maxDistance(arrays) {
  let min1 = {
    value: Infinity,
    arrayIdx: -1,
  }
  let min2 = {
    value: Infinity,
    arrayIdx: -1,
  }
  let max1 = {
    value: -Infinity,
    arrayIdx: -1,
  }
  let max2 = {
    value: -Infinity,
    arrayIdx: -1,
  }

  for (let i = 0; i < arrays.length; i++) {
    const left = arrays[i][0]
    const right = arrays[i][arrays[i].length - 1]

    if (left < min1.value && left < min2.value) {
      min2 = min1
      min1 = {
        value: left,
        arrayIdx: i,
      }
    } else if (left < min2.value) {
      min2 = {
        value: left,
        arrayIdx: i,
      }
    }

    if (right > max1.value && right > max2.value) {
      max2 = max1
      max1 = {
        value: right,
        arrayIdx: i,
      }
    } else if (right > max2.value) {
      max2 = {
        value: right,
        arrayIdx: i,
      }
    }
  }

  if (max1.arrayIdx !== min1.arrayIdx) {
    return Math.abs(max1.value - min1.value)
  }

  return Math.max(
    Math.abs(max1.value - min2.value),
    Math.abs(max2.value - min1.value)
  )
}

console.log(
  maxDistance([
    [1, 2, 3],
    [4, 5],
    [1, 2, 3],
  ]) === 4
)

console.log(
  maxDistance([
    [-4, 2, 3],
    [-1000, 5, 500],
    [1, 50, 89],
  ]) === 1089
)

console.log(
  maxDistance([
    [-4, 2, 3],
    [-1000, 5, 999],
    [1, 50, 89],
    [-1000, 999],
  ]) === 1999
)
