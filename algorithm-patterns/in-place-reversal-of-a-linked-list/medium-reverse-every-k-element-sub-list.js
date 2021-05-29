/**
 * Reverse every K-element Sub-list (medium)
 *
 * Given the head of a LinkedList and a number ‘k’, reverse
 * every ‘k’ sized sub-list starting from the head. If, in the end,
 * you are left with a sub-list with less than ‘k’ elements, reverse it too.
 */

class Node {
  constructor(value, next = null) {
    this.value = value
    this.next = next
  }

  print_list() {
    let temp = this
    const arr = []
    let i = 0
    while (i < 12 && temp !== null) {
      arr.push(temp.value)
      temp = temp.next
      i++
    }
    console.log(arr.join(' -> '), '\n')
  }
}

/**
 * Time Complexity: O(N), N = nodes in the LinkedList
 * Space Complexity: O(1)
 */
function reverse_every_k_elements(head, k) {
  if (!head || !head.next || k < 2) {
    return head
  }

  let isFirstRound = true
  let count = 0
  let current = head
  let prev = null
  let previousReversedTail = null
  let reversedTail = head
  let newHead = null
  while (current !== null) {
    // reverse two node
    const next = current.next
    current.next = prev
    prev = current
    current = next
    count += 1

    // record the edge nodes and link together
    if (count === 3) {
      count = 0

      if (!isFirstRound) {
        previousReversedTail.next = prev
      }
      previousReversedTail = reversedTail
      if (current !== null) {
        reversedTail = current
      }

      if (isFirstRound) {
        newHead = prev
        isFirstRound = false
      }
    }
  }

  if (isFirstRound) {
    newHead = prev
  } else if (count !== 0) {
    previousReversedTail.next = prev
  }
  reversedTail.next = null

  return newHead
}

const head = new Node(1)
head.next = new Node(2)
head.next.next = new Node(3)
head.next.next.next = new Node(4)
head.next.next.next.next = new Node(5)
head.next.next.next.next.next = new Node(6)
head.next.next.next.next.next.next = new Node(7)
head.next.next.next.next.next.next.next = new Node(8)
head.next.next.next.next.next.next.next.next = new Node(9)

console.log('Nodes of original LinkedList are: ')
head.print_list()
result = reverse_every_k_elements(head, 3)
console.log('Nodes of reversed LinkedList are: ')
result.print_list()
