/**
 * https://leetcode.com/problems/multiply-strings/
 */

/**
 * O(N ^ 2) Solution
 *
 * 1. Create an array which size is length of num1 + num2, because it's product of two numbers
 * 2. Store the product of num1[i] and num2[j] to arr[i + j]
 * 3. Loop through arr and calculate the carry
 * 4. Push the number to result from first non-zero digit
 */

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  if (num1 === '0' || num2 === '0') {
    return '0'
  }

  let arr = Array(num1.length + num2.length).fill(0)
  for (let i = num1.length - 1; i >= 0; i--) {
    for (let j = num2.length - 1; j >= 0; j--) {
      const d1 = num1.charCodeAt(i) - '0'.charCodeAt(0)
      const d2 = num2.charCodeAt(j) - '0'.charCodeAt(0)
      arr[i + j + 1] += d1 * d2
    }
  }

  let carry = 0
  for (let i = arr.length - 1; i >= 0; i--) {
    const temp = (arr[i] + carry) % 10
    carry = Math.floor((arr[i] + carry) / 10)
    arr[i] = temp
  }

  let result = ''
  let isLeadingZero = true
  for (let i = 0; i < arr.length; i++) {
    if (isLeadingZero && arr[i] !== 0) {
      isLeadingZero = false
    }

    if (!isLeadingZero) {
      result += arr[i]
    }
  }

  return result
}

console.log(multiply('123', '45'))
console.log(multiply('0', '0'))
