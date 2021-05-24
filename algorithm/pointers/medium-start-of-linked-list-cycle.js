/**
 * Start of LinkedList Cycle (medium)
 *
 * Given the head of a Singly LinkedList that contains a cycle,
 * write a function to find the starting node of the cycle.
 */

class Node {
  constructor(value, next = null) {
    this.value = value
    this.next = next
  }
}

/**
 * Time Complexity: O(N), N is the total number of nodes in the LinkedList
 * Space Complexity: O(1)
 */
function find_cycle_start(head) {
  const cycleLength = find_cycle_length(head)

  let slow = head
  let fast = head
  for (let i = 0; i < cycleLength; i++) {
    fast = fast.next
  }

  while (slow !== fast) {
    slow = slow.next
    fast = fast.next
  }

  return slow
}

/**
 * Time Complexity: O(N), N is the total number of nodes in the LinkedList
 * Space Complexity: O(1)
 */
function find_cycle_length(head) {
  let slow = head
  let fast = head

  while (fast !== null && fast.next !== null) {
    slow = slow.next
    fast = fast.next.next

    if (slow === fast) {
      return calculate_cycle_length(slow)
    }
  }

  return 0
}

/**
 * Time Complexity: O(N), N is the total number of node in the cycle
 * Space Complexity: O(1)
 */
function calculate_cycle_length(slow) {
  let current = slow
  let length = 0

  while (true) {
    current = current.next
    length += 1
    if (current === slow) {
      return length
    }
  }
}

const head = new Node(1)
head.next = new Node(2)
head.next.next = new Node(3)
head.next.next.next = new Node(4)
head.next.next.next.next = new Node(5)
head.next.next.next.next.next = new Node(6)

head.next.next.next.next.next.next = head.next.next
console.log(`LinkedList cycle start: ${find_cycle_start(head).value}`)

head.next.next.next.next.next.next = head.next.next.next
console.log(`LinkedList cycle start: ${find_cycle_start(head).value}`)

head.next.next.next.next.next.next = head
console.log(`LinkedList cycle start: ${find_cycle_start(head).value}`)
