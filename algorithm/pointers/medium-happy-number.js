/**
 * Happy Number (medium)
 *
 * Any number will be called a happy number if, after repeatedly
 * replacing it with a number equal to the sum of the square of all
 * of its digits, leads us to number ‘1’. All other (not-happy) numbers
 * will never reach ‘1’. Instead, they will be stuck in a cycle of
 * numbers which does not include ‘1’.
 *
 * Input: 23
 * Output: true (23 is a happy number)
 *
 * Input: 12
 * Output: false (12 is not a happy number)
 *
 */

function find_happy_number(num) {
  let slow = num
  let fast = num

  while (true) {
    slow = get_square_sum(slow)
    fast = get_square_sum(get_square_sum(fast))

    if (slow === fast) {
      break
    }
  }

  return slow === 1
}

/**
 * Time Complexity: O(1)
 * Space Complexity: O(N), N is digits of num
 */
const get_square_sum = (num) =>
  String(num)
    .split('')
    .map((x) => Number(x))
    .map((x) => x * x)
    .reduce((acc, curr) => acc + curr, 0)

console.log(find_happy_number(23))
console.log(find_happy_number(12))
