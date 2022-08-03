# In-place Reversal of a LinkedList

## reverse a linked list

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
 * @return {ListNode}
 */
var reverseList = function (head) {
  let prev = null
  let current = head

  while (current !== null) {
    const next = current.next
    current.next = prev
    prev = current
    current = next
  }

  return prev
}
```

## reverse a sub-list

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
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  if (left === right) {
    return head
  }

  let counter = 1

  // traverse the list until meet the left
  let previous = null
  let current = head
  while (counter < left) {
    previous = current
    current = current.next
    counter += 1
  }

  // keep the previous node because it will be connected to the head of reversed list
  const nodeBeforeReversedList = previous
  const lastNodeOfReversedList = current

  // start reverse the sub-list
  previous = null
  while (counter <= right) {
    const next = current.next
    current.next = previous
    previous = current
    current = next
    counter += 1
  }

  // connect reversed list's head and tail
  if (nodeBeforeReversedList !== null) {
    nodeBeforeReversedList.next = previous
  } else {
    head = previous
  }
  lastNodeOfReversedList.next = current

  return head
}
```

## reverse every k-node for a linked list

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
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  // need to keep the head in the first round
  const [firstReversedHead, firstReversedTail] = reverseK(head, k)
  head = firstReversedHead

  let prevTail = firstReversedTail
  while (prevTail !== null) {
    const [subListHead, subListTail] = reverseK(prevTail.next, k)
    prevTail.next = subListHead
    prevTail = subListTail
  }

  return head
}

const reverseK = (node, k) => {
  // check: Are there k nodes to reverse?
  let checker = node
  for (let i = 0; i < k; i++) {
    if (checker === null) {
      return [node, null]
    }
    checker = checker.next
  }

  // initialize
  const tail = node
  let previous = null
  let current = node

  // reverse the link k times
  let i = 0
  while (i < k) {
    const next = current.next
    current.next = previous
    previous = current
    current = next
    i++
  }

  // link the tail to the next node in the original list
  tail.next = current

  return [previous, tail]
}
```
