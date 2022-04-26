// Merge lists divide and conquer
//
// Time Complexity: O(k * log n)
// Space Complexity: O(1)
//
// where n = lists.length and k = the longest linked list

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}

function mergeTwoLinkedList(list1, list2) {
  const head = new ListNode()
  let current = head

  while (list1 !== null && list2 !== null) {
    if (list1.val < list2.val) {
      current.next = list1
      current = current.next
      list1 = list1.next
    } else {
      current.next = list2
      current = current.next
      list2 = list2.next
    }
  }

  if (list1 !== null) {
    current.next = list1
  }

  if (list2 !== null) {
    current.next = list2
  }

  return head.next
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

  let interval = 1
  while (interval < lists.length) {
    for (let i = 0; i < lists.length; i += interval * 2) {
      if (lists[i + interval]) {
        lists[i] = mergeTwoLinkedList(lists[i], lists[i + interval])
      }
    }
    interval = interval * 2
  }

  return lists[0]
}
