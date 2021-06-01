/**
 * Balanced Parentheses (hard)
 *
 * For a given number ‘N’, write a function to generate all combination of ‘N’ pairs of balanced parentheses.
 *
 * Example 1:
 *
 * Input: N=2
 * Output: (()), ()()
 *
 *
 * Example 2:
 *
 * Input: N=3
 * Output: ((())), (()()), (())(), ()(()), ()()()
 */

/**
 * ------ My Strategy ------
 * 1. Create a data structure to keep track the counts of open parentheses and close parentheses.
 * 2. Close parentheses can only be inserted when openCount > closeCount.
 */

/**
 * Time Complexity: O(N * 2 ^ N) or, O(2 ^ N)
 *   total leaves = 2 ^ N, string concatenation is O(N) or O(1)
 * Space Complexity: O(N * 2 ^ N)
 */
class ParenthesesString {
  constructor(str, openCount, closeCount) {
    this.str = str
    this.openCount = openCount
    this.closeCount = closeCount
  }
}

const generate_valid_parentheses = function (num) {
  let result = []
  let currentLayer = [new ParenthesesString('', 0, 0)]

  while (currentLayer.length > 0) {
    let nextLayer = []

    for (let ps of currentLayer) {
      if (ps.openCount === num && ps.closeCount === num) {
        result.push(ps.str)
      } else {
        if (ps.openCount <= num) {
          nextLayer.push(
            new ParenthesesString(ps.str + '(', ps.openCount + 1, ps.closeCount)
          )
        }
        if (ps.openCount > ps.closeCount) {
          nextLayer.push(
            new ParenthesesString(ps.str + ')', ps.openCount, ps.closeCount + 1)
          )
        }
      }
    }

    currentLayer = nextLayer
  }

  return result
}

console.log(
  `All combinations of balanced parentheses are: ${generate_valid_parentheses(
    2
  )}`
)
console.log(
  `All combinations of balanced parentheses are: ${generate_valid_parentheses(
    3
  )}`
)
