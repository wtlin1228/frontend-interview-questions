/**
 * LinkedList Cycle (easy)
 *
 * Given the head of a Singly LinkedList, write a function
 * to determine if the LinkedList has a cycle in it or not.
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
function has_cycle(head) {
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

const head = new Node(1)
head.next = new Node(2)
head.next.next = new Node(3)
head.next.next.next = new Node(4)
head.next.next.next.next = new Node(5)
head.next.next.next.next.next = new Node(6)
console.log(`LinkedList has cycle: ${has_cycle(head)}`)

head.next.next.next.next.next.next = head.next.next
console.log(`LinkedList has cycle: ${has_cycle(head)}`)

head.next.next.next.next.next.next = head.next.next.next
console.log(`LinkedList has cycle: ${has_cycle(head)}`)

/**
 * Similar Problems
 *
 * Given the head of a LinkedList with a cycle, find the length of the cycle.
 */

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

const head2 = new Node(1)
head2.next = new Node(2)
head2.next.next = new Node(3)
head2.next.next.next = new Node(4)
head2.next.next.next.next = new Node(5)
head2.next.next.next.next.next = new Node(6)
head2.next.next.next.next.next.next = head2.next.next
console.log(`LinkedList cycle length: ${find_cycle_length(head2)}`)

head2.next.next.next.next.next.next = head2.next.next.next
console.log(`LinkedList cycle length: ${find_cycle_length(head2)}`)
