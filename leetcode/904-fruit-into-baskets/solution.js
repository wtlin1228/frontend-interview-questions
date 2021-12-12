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

// My first idea is it's asking the longest sub-string contains at most k different elements

function generateEmptyBucket() {
  return {
    fruit: null,
    count: 0,
  }
}

/**
 * Time Complexity: O(n), where n = fruits.length
 * Space Complexity: O(1)
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function (fruits) {
  if (fruits.length <= 1) {
    return fruits.length
  }

  // variables
  const firstBucket = generateEmptyBucket()
  const secondBucket = generateEmptyBucket()
  let totalFruitsInTheBuckets = 0
  let max = 0

  // helpers
  function copySecondBucketToFirstBucket() {
    firstBucket.fruit = secondBucket.fruit
    firstBucket.count = secondBucket.count
  }

  function getTotalFruitsInTheBuckets() {
    return firstBucket.count + secondBucket.count
  }

  // Loop through fruits, put fruits in the buckets
  //
  // Case1:
  // When the type of fruit put into bucket changes, recalculate totalFruitsInTheBuckets.
  // For example: a, b -> b, c
  //
  // Case2:
  // When the order of buckets switches, reset the second bucket's count
  // For example: a, b -> b, a

  firstBucket.fruit = fruits[0]
  firstBucket.count = 1
  totalFruitsInTheBuckets = 1
  max = 1

  for (let i = 1; i < fruits.length; i++) {
    const currentFruit = fruits[i]

    if (secondBucket.fruit === null) {
      if (currentFruit === firstBucket.fruit) {
        firstBucket.count += 1
        totalFruitsInTheBuckets += 1
      } else {
        secondBucket.fruit = currentFruit
        secondBucket.count = 1
        totalFruitsInTheBuckets += 1
      }
    } else {
      if (
        currentFruit !== firstBucket.fruit &&
        currentFruit !== secondBucket.fruit
      ) {
        // Case 1
        copySecondBucketToFirstBucket()
        secondBucket.fruit = currentFruit
        secondBucket.count = 1
        totalFruitsInTheBuckets = getTotalFruitsInTheBuckets()
      } else if (currentFruit === firstBucket.fruit) {
        // Case 2
        copySecondBucketToFirstBucket()
        secondBucket.fruit = currentFruit
        secondBucket.count = 1
        totalFruitsInTheBuckets += 1
      } else if (currentFruit === secondBucket.fruit) {
        secondBucket.count += 1
        totalFruitsInTheBuckets += 1
      }
    }

    if (max < totalFruitsInTheBuckets) {
      max = totalFruitsInTheBuckets
    }
  }

  return max
}

console.log(totalFruit([])) // 0
console.log(totalFruit([1])) // 1
console.log(totalFruit([1, 2, 1])) // 3
console.log(totalFruit([0, 1, 2, 2])) // 3
console.log(totalFruit([1, 2, 3, 2, 2])) // 4
console.log(totalFruit([3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4])) // 5
