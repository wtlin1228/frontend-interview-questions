/**
 * https://leetcode.com/problems/insert-into-a-sorted-circular-linked-list/
 *
 * Given a node from a Circular Linked List which is sorted in ascending order,
 * write a function to insert a value insertVal into the list such that it
 * remains a sorted circular list. The given node can be a reference to any
 * single node in the list, and may not be necessarily the smallest value in
 * the circular list.
 *
 * If there are multiple suitable places for insertion, you may choose any
 * place to insert the new value. After the insertion, the circular list
 * should remain sorted.
 *
 * If the list is empty (i.e., given node is null), you should create a new
 * single circular list and return the reference to that single node.
 * Otherwise, you should return the original given node.
 *
 */

class Node {
  constructor(val, next = null) {
    this.val = val
    this.next = next
  }

  static logCircularList(node) {
    const vals = []
    let ptr = node
    while (true) {
      vals.push(ptr.val)
      if (ptr.next === node) {
        break
      }
      ptr = ptr.next
    }
    console.log(vals.join('->'))
  }
}

/**
 * Time Complexity: O(n), n = list length
 * Space Complexity: O(1)
 */
function insert(head, insertVal) {
  const newNode = new Node(insertVal)

  if (head === null) {
    newNode.next = newNode
    return newNode
  }

  if (head.next === head) {
    newNode.next = head
    head.next = newNode
    return head
  }

  let ptr = head
  while (true) {
    if (
      (ptr.next.val < ptr.val &&
        (insertVal < ptr.next.val || insertVal > ptr.val)) ||
      (insertVal >= ptr.val && insertVal <= ptr.next.val)
    ) {
      newNode.next = ptr.next
      ptr.next = newNode
      break
    }
    ptr = ptr.next
  }

  return head
}

Node.logCircularList(insert(null, 1))

// insert 2 into 5 ->
const head1 = new Node(5)
head1.next = head1
Node.logCircularList(insert(head1, 2))

// insert 8 into 5 ->
const head2 = new Node(5)
head2.next = head2
Node.logCircularList(insert(head2, 8))

// insert 0 into 5 -> 10 -> 15 ->
const head3 = new Node(5)
head3.next = new Node(10)
head3.next.next = new Node(15)
head3.next.next.next = head3
Node.logCircularList(insert(head3, 0))

// insert 20 into 5 -> 10 -> 15 ->
const head4 = new Node(5)
head4.next = new Node(10)
head4.next.next = new Node(15)
head4.next.next.next = head4
Node.logCircularList(insert(head4, 20))

// insert 8 into 5 -> 10 -> 15 ->
const head5 = new Node(5)
head5.next = new Node(10)
head5.next.next = new Node(15)
head5.next.next.next = head5
Node.logCircularList(insert(head5, 8))

// insert 12 into 5 -> 10 -> 15 ->
const head6 = new Node(5)
head6.next = new Node(10)
head6.next.next = new Node(15)
head6.next.next.next = head6
Node.logCircularList(insert(head6, 12))

// insert 100 into 15 -> 0 -> 5 ->
const head7 = new Node(15)
head7.next = new Node(0)
head7.next.next = new Node(5)
head7.next.next.next = head7
Node.logCircularList(insert(head7, 100))

// insert 5 into 15 -> 0 -> 5 ->
const head8 = new Node(15)
head8.next = new Node(0)
head8.next.next = new Node(5)
head8.next.next.next = head8
Node.logCircularList(insert(head8, 5))
