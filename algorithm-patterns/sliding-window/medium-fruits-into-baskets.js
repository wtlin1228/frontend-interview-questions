/**
 * Fruits into Baskets (medium)
 *
 * Given an array of characters where each character represents
 * a fruit tree, you are given two baskets, and your goal is to
 * put maximum number of fruits in each basket. The only restriction
 * is that each basket can have only one type of fruit.
 *
 * Input: Fruit=['A', 'B', 'C', 'A', 'C']
 * Output: 3
 * Explanation: We can put 2 'C' in one basket and one 'A' in the other from the subarray ['C', 'A', 'C']
 *
 * Input: Fruit=['A', 'B', 'C', 'B', 'B', 'C']
 * Output: 5
 * Explanation: We can put 3 'B' in one basket and two 'C' in the other basket.
 * This can be done if we start with the second letter: ['B', 'C', 'B', 'B', 'C']
 */

/**
 * Time Complexity: O(N), N = fruits.length
 * Space Complexity: O(1)
 */
const fruits_into_baskets = function (fruits) {
  let maxWidth = 0
  let fruitFrequency = {}

  for (let start = 0, end = 0; end < fruits.length; end++) {
    const rightFruit = fruits[end]

    if (!(rightFruit in fruitFrequency)) {
      fruitFrequency[rightFruit] = 0
    }
    fruitFrequency[rightFruit] += 1

    while (Object.keys(fruitFrequency).length > 2) {
      const leftFruit = fruits[start]
      fruitFrequency[leftFruit] -= 1
      if (fruitFrequency[leftFruit] === 0) {
        delete fruitFrequency[leftFruit]
      }
      start += 1
    }

    maxWidth = Math.max(maxWidth, end - start + 1)
  }

  return maxWidth
}

console.log(
  `Maximum number of fruits: ${fruits_into_baskets(['A', 'B', 'C', 'A', 'C'])}`
)
console.log(
  `Maximum number of fruits: ${fruits_into_baskets([
    'A',
    'B',
    'C',
    'B',
    'B',
    'C',
  ])}`
)
