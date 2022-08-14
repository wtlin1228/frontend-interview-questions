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

## Maximum Twin Sum of a Linked List

https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/

1. reverse the right part
2. traverse through the left part and right part

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number}
 */
var pairSum = function (head) {
  let fast = head
  let slow = head
  while (fast.next && fast.next.next) {
    fast = fast.next.next
    slow = slow.next
  }

  let prev = null
  slow = slow.next
  while (slow !== null) {
    const next = slow.next
    slow.next = prev
    prev = slow
    slow = next
  }

  let res = 0
  let left = head
  let right = prev
  while (right !== null) {
    res = Math.max(res, left.val + right.val)
    left = left.next
    right = right.next
  }

  return res
}
```
