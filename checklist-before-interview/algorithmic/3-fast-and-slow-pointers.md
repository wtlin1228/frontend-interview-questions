# Fast & Slow pointer

## linked list cycle

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  let slow = head
  let fast = head
  while (fast !== null && fast.next !== null) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) {
      return true
    }
  }
  return false
}
```

## happy number

```js
const calc = (n) =>
  String(n)
    .split('')
    .reduce((acc, curr) => acc + curr * curr, 0)

/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
  let slow = n
  let fast = n
  while (calc(fast) !== 1 && calc(calc(fast)) !== 1) {
    slow = calc(slow)
    fast = calc(calc(fast))
    if (slow === fast) {
      return false
    }
  }
  return true
}
```
