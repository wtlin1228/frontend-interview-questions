/**
 * https://leetcode.com/problems/sort-list/
 */

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}

/**
 * Time Complexity: O(n log n)
 * Space Complexity: O(log n)
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
  /**
   * Time Complexity: O(n log n)
   * Space Complexity: O(log n)
   * @param {ListNode} head - head node of the list
   * @returns {ListNode} head node of the sorted list
   */
  function sortListRecursive(head) {
    if (head === null || head.next === null) {
      return head
    }

    const middle = getMid(head)
    // console.log(`separate in ${middle.val}`)
    const sortedListLeft = sortListRecursive(head)
    const sortedListRight = sortListRecursive(middle)

    // console.log(sortedListLeft)
    // console.log(sortedListRight)

    return merge(sortedListLeft, sortedListRight)
  }

  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   * @param {ListNode} left - head node of left list
   * @param {ListNode} right - head node of right list
   * @returns {ListNode} head node of merged list
   */
  function merge(left, right) {
    if (left === null) {
      return right
    }
    if (right === null) {
      return left
    }

    let head
    if (left.val < right.val) {
      head = left
      left = left.next
    } else {
      head = right
      right = right.next
    }
    head.next = null

    let current = head
    while (left && right) {
      if (left.val < right.val) {
        current.next = left
        left = left.next
      } else {
        current.next = right
        right = right.next
      }

      current = current.next
      current.next = null
    }

    if (left !== null) {
      current.next = left
    }
    if (right !== null) {
      current.next = right
    }

    // console.log(`after merged `)
    // console.log(head)
    return head
  }

  /**
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   * @param {ListNode} head - head node of the list
   * @returns {ListNode} middle node of the list
   */
  function getMid(head) {
    let middlePrev = null
    let middle = head
    let tail = head
    while (tail !== null && tail.next !== null) {
      middlePrev = middle
      middle = middle.next
      tail = tail.next.next
    }
    middlePrev.next = null
    return middle
  }

  return sortListRecursive(head)
}

const head = new ListNode(-1)
head.next = new ListNode(5)
head.next.next = new ListNode(3)
head.next.next.next = new ListNode(4)
head.next.next.next.next = new ListNode(0)

const sorted = sortList(head)

let pointer = sorted
const temp = []
while (pointer) {
  temp.push(pointer.val)
  pointer = pointer.next
}

console.log(temp.join(' -> '))
