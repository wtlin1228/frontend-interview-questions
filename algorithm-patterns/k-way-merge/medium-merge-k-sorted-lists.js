/**
 * Merge K Sorted Lists (medium)
 *
 * Given an array of ‘K’ sorted LinkedLists, merge them into one sorted list.
 *
 *
 * Example 1:
 *
 * Input: L1=[2, 6, 8], L2=[3, 6, 7], L3=[1, 3, 4]
 * Output: [1, 2, 3, 3, 4, 6, 6, 7, 8]
 *
 *
 * Example 2:
 *
 * Input: L1=[5, 8, 9], L2=[1, 7]
 * Output: [1, 5, 7, 8, 9]
 */

const { Heap } = require('../../algorithm/heap/heap')

class ListNode {
  constructor(value, next = null) {
    this.value = value
    this.next = next
  }
}

/**
 * Time Complexity: O(M log N), N = lists.length, M = total nodes
 * Space Complexity: O(N), N = lists.length
 */
const merge_lists = function (lists) {
  const minHeap = new Heap(
    lists,
    (child, parent) => child.value >= parent.value
  ) // O(n) space
  minHeap.buildHeap() // O(n) time

  let resultHead = null
  let currentNode = null
  while (minHeap.size() > 0) {
    const listNode = minHeap.pop() // O(n) time

    if (currentNode !== null) {
      currentNode.next = new ListNode(listNode.value)
      currentNode = currentNode.next
    } else {
      currentNode = new ListNode(listNode.value)
      resultHead = currentNode
    }

    if (list.next !== null) {
      minHeap.push(listNode.next) // O(n) time
    }
  }

  return resultHead
}

l1 = new ListNode(2)
l1.next = new ListNode(6)
l1.next.next = new ListNode(8)

l2 = new ListNode(3)
l2.next = new ListNode(6)
l2.next.next = new ListNode(7)

l3 = new ListNode(1)
l3.next = new ListNode(3)
l3.next.next = new ListNode(4)

result = merge_lists([l1, l2, l3])
output = 'Here are the elements form the merged list: '
while (result != null) {
  output += result.value + ' '
  result = result.next
}
console.log(output)
