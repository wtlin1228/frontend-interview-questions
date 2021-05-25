/**
 * Reverse a Sub-list (medium)
 *
 * Given the head of a LinkedList and two positions ‘p’ and ‘q’,
 * reverse the LinkedList from position ‘p’ to ‘q’.
 */

class Node {
  constructor(value, next = null) {
    this.value = value
    this.next = next
  }

  print_list() {
    let temp = this
    while (temp !== null) {
      process.stdout.write(`${temp.value} `)
      temp = temp.next
    }
    console.log()
  }
}

/**
 * Time Complexity: O(N), N = nodes in the LinkedList
 * Space Complexity: O(1)
 */
function reverse_sub_list(head, p, q) {
  if (p === q) {
    return head
  }

  let nodeBeforeP = null
  let nodeAfterQ = null
  let nodeP = null
  let nodeQ = null
  let previous = null
  let current = head
  while (true) {
    if (current.value === p) {
      nodeBeforeP = previous
      nodeP = current
    }

    if (current.value === q) {
      nodeAfterQ = current.next
      nodeQ = current

      break
    }

    previous = current
    current = current.next
  }

  // reverse p -> q, so it's become q -> p -> null
  nodeQ.next = null
  reverse(nodeP)

  // q -> p -> (q + 1)
  nodeP.next = nodeAfterQ

  if (!nodeBeforeP) {
    // q -> p -> (q + 1)
    head = nodeQ
  } else {
    // (p - 1) -> q -> p -> (q + 1)
    nodeBeforeP.next = nodeQ
  }

  return head
}

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

const head = new Node(1)
head.next = new Node(2)
head.next.next = new Node(3)
head.next.next.next = new Node(4)
head.next.next.next.next = new Node(5)

process.stdout.write('Nodes of original LinkedList are: ')
head.print_list()
result = reverse_sub_list(head, 1, 5)
process.stdout.write('Nodes of reversed LinkedList are: ')
result.print_list()
