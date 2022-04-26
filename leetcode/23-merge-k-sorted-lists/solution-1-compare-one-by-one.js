// Compare one by one
//
// Time Complexity: O(n * k)
// Space Complexity: O(1)
//
// where n = lists.length and k = the longest linked list

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}

// O(k), where k = lists.length
var filterOutEmptyList = (lists) => lists.filter((list) => list !== null)

// O(k), where k = lists.length
var findIndexOfNextSmallestNode = (lists) => {
  let indexOfSmallestNode = 0
  lists.forEach((node, index) => {
    if (node && lists[indexOfSmallestNode].val > node.val) {
      indexOfSmallestNode = index
    }
  })
  return indexOfSmallestNode
}

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  lists = filterOutEmptyList(lists)

  if (lists.length === 0) {
    return null
  }

  if (lists.length === 1) {
    return lists[0]
  }

  const head = new ListNode(0)
  let current = head

  while (lists.length >= 2) {
    // O(k)
    const indexOfSmallestNode = findIndexOfNextSmallestNode(lists)

    // O(1)
    current.next = lists[indexOfSmallestNode]
    lists[indexOfSmallestNode] = lists[indexOfSmallestNode].next
    current = current.next
    current.next = null

    // O(k)
    lists = filterOutEmptyList(lists)
  }

  if (lists.length !== 0) {
    current.next = lists[0]
  }

  return head.next
}
