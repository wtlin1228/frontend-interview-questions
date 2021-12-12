/**
 * 904. Fruit Into Baskets
 *
 * https://leetcode.com/problems/fruit-into-baskets/
 *
 * You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array fruits where fruits[i] is the type of fruit the ith tree produces.
 *
 * You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:
 *
 * You only have two baskets, and each basket can only hold a single type of fruit. There is no limit on the amount of fruit each basket can hold.
 * Starting from any tree of your choice, you must pick exactly one fruit from every tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets.
 * Once you reach a tree with fruit that cannot fit in your baskets, you must stop.
 * Given the integer array fruits, return the maximum number of fruits you can pick.
 *
 *
 *
 * Example 1:
 *
 * Input: fruits = [1,2,1]
 * Output: 3
 * Explanation: We can pick from all 3 trees.
 * Example 2:
 *
 * Input: fruits = [0,1,2,2]
 * Output: 3
 * Explanation: We can pick from trees [1,2,2].
 * If we had started at the first tree, we would only pick from trees [0,1].
 * Example 3:
 *
 * Input: fruits = [1,2,3,2,2]
 * Output: 4
 * Explanation: We can pick from trees [2,3,2,2].
 * If we had started at the first tree, we would only pick from trees [1,2].
 * Example 4:
 *
 * Input: fruits = [3,3,3,1,2,1,1,2,3,3,4]
 * Output: 5
 * Explanation: We can pick from trees [1,2,1,1,2].
 *
 *
 * Constraints:
 *
 * 1 <= fruits.length <= 105
 * 0 <= fruits[i] < fruits.length
 */

const { SizeMap } = require('./sizeMap')

// My first idea is it's asking the longest sub-string contains at most k different elements
// The solution below is for arbitrary buckets.

/**
 * Time Complexity: O(n), where n = fruits.length
 * Space Complexity: O(1), since k is fixed with 2
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function (fruits) {
  // variables
  let max = 0
  let fruitFrequency = new SizeMap()
  let start = 0
  let end = 0

  while (end < fruits.length) {
    const rightFruit = fruits[end]
    if (!fruitFrequency[rightFruit]) {
      fruitFrequency.add(rightFruit)
    }

    while (fruitFrequency.getSize() > 2) {
      const leftFruit = fruits[start]
      start += 1
      fruitFrequency.remove(leftFruit)
    }

    max = Math.max(max, end - start + 1)
    end += 1
  }

  return max
}

console.log(totalFruit([])) // 0
console.log(totalFruit([1])) // 1
console.log(totalFruit([1, 2, 1])) // 3
console.log(totalFruit([0, 1, 2, 2])) // 3
console.log(totalFruit([1, 2, 3, 2, 2])) // 4
console.log(totalFruit([3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4])) // 5
