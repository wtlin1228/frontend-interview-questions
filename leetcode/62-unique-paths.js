/**
 * https://leetcode.com/problems/unique-paths/
 */

/**
 * First idea:
 *
 * if m = 3 and n = 7, we need to find all combinations of 6 rights and 2 downs
 * C(7, 2) + C(7, 1) = 28
 *
 * if m = 4 and n = 7, we need to find all combinations of 6 rights and 3 downs
 * C(7, 3) + C(7, 2) * 2 + C(7, 1) = 84
 */

/**
 * Second idea:
 *
 * divide and conquer
 *
 *                         (1, 1)
 *                        ／     ＼
 *                       ／       ＼
 *                      ／         ＼
 *                     ／           ＼
 *                 (2, 1)          (1, 2)
 *                ／     ＼         ／    ＼
 *               ／       ＼       ／      ＼
 *              ／         ＼     ／        ＼
 *           (3, 1)     (2, 2)  (2, 2)    (1, 3)
 *          return 1     ／ ＼    ／ ＼     ／ ＼
 */

function getCacheKey(x, y) {
  return `${x},${y}`
}

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  if (m === 0 || n === 0) {
    return 0
  }

  const cache = {}

  function findPathsRecursive(m, n, currentM, currentN) {
    if (m === currentM || n === currentN) {
      return 1
    }

    let left = cache[getCacheKey(currentM + 1, currentN)]
    if (!left) {
      cache[getCacheKey(currentM + 1, currentN)] = findPathsRecursive(
        m,
        n,
        currentM + 1,
        currentN
      )
      left = cache[getCacheKey(currentM + 1, currentN)]
    }

    let right = cache[getCacheKey(currentM, currentN + 1)]
    if (!right) {
      cache[getCacheKey(currentM, currentN + 1)] = findPathsRecursive(
        m,
        n,
        currentM,
        currentN + 1
      )
      right = cache[getCacheKey(currentM, currentN + 1)]
    }

    return left + right
  }

  return findPathsRecursive(m, n, 1, 1)
}

console.log(uniquePaths(7, 3))
console.log(uniquePaths(3, 3))
console.log(uniquePaths(0, 0))
console.log(uniquePaths(3, 0))
console.log(uniquePaths(0, 3))
console.log(uniquePaths(1, 1))
console.log(uniquePaths(10, 50))
console.log(uniquePaths(4, 7))
