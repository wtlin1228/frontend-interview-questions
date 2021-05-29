/**
 * Reverse a LinkedList (easy)
 *
 * Given the head of a Singly LinkedList, reverse the LinkedList.
 * Write a function to return the new head of the reversed LinkedList.
 */

class Node {
  constructor(value, next = null) {
    this.value = value
    this.next = next
  }

  print_list() {
    let temp = this
    const arr = []
    while (temp !== null) {
      arr.push(temp.value)
    }
    console.log(arr.join('->'), '\n')
  }
}

/**
 * Time Complexity: O(N), N = nodes in the LinkedList
 * Space Complexity: O(1)
 */
function reverse(head) {
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

const head = new Node(2)
head.next = new Node(4)
head.next.next = new Node(6)
head.next.next.next = new Node(8)
head.next.next.next.next = new Node(10)

console.log('Nodes of original LinkedList are: ')
head.print_list()
result = reverse(head)
console.log('Nodes of reversed LinkedList are: ')
result.print_list()
