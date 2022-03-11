/**
 * https://leetcode.com/problems/multiply-strings/
 */

/**
 * Time Complexity: O(N * M)
 * Space Complexity: O(N + M)
 *   where N = num1.length and M = num2.length
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  if (num1 === '0' || num2 === '0') {
    return '0'
  }

  num1 = num1.split('').reverse()
  num2 = num2.split('').reverse()
  const N = num1.length + num2.length
  let answer = Array(N).fill(0)

  for (let i = 0; i < num1.length; i++) {
    for (let j = 0; j < num2.length; j++) {
      const currentPosition = i + j
      const value = answer[currentPosition] + num1[i] * num2[j]
      answer[currentPosition] = value % 10
      answer[currentPosition + 1] += Math.floor(value / 10)
    }
  }

  if (answer[N - 1] === 0) {
    answer.pop()
  }

  return answer.reverse().join('')
}
