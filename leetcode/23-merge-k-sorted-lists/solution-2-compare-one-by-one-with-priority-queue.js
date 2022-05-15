// Compare one by one with priority queue
//
// Time Complexity: O(k log n)
// Space Complexity: O(n), since I use Heap as my priority queue
//
// where n = lists.length and k = the longest linked list

const { Heap } = require('../../algorithm/heap/heap')

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  lists = lists.filter((node) => node !== null)

  if (lists.length === 0) {
    return null
  }

  if (lists.length === 1) {
    return lists[0]
  }

  const head = new ListNode(0)
  let current = head

  const priorityQueue = new Heap(
    lists,
    (child, parent) => child.val >= parent.val
  )
  // O(k), k = lists.length
  priorityQueue.buildHeap()

  while (priorityQueue.size() >= 2) {
    const node = priorityQueue.pop()
    current.next = node
    current = current.next
    if (node.next) {
      // O(log k)
      priorityQueue.push(node.next)
    }
  }

  if (priorityQueue.size() !== 0) {
    current.next = priorityQueue.pop()
  }

  return head.next
}
