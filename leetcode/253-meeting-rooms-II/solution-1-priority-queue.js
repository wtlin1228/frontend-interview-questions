// Use a min heap to track the free time in the rooms
//
// Complexity Analysis
//   - Time Complexity: O(NlogN), where N = intervals.length
//   - Space Complexity: O(N)

const { Heap } = require('../../algorithm/heap/heap')

/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function (intervals) {
  // O(NlogN)
  const sortedMeetings = intervals.sort((a, b) => {
    return a[0] - b[0]
  })

  const minHeap = new Heap([], (child, parent) => child >= parent)

  // O(NlogN)
  sortedMeetings.forEach((meeting) => {
    const [start, end] = meeting

    if (start >= minHeap.peek()) {
      // reuse the free room
      minHeap.pop()
    }

    minHeap.push(end)
  })

  return minHeap.size()
}

console.log(
  minMeetingRooms([
    [5, 100],
    [5, 20],
    [5, 30],
    [1, 50],
    [2, 30],
    [51, 60],
    [60, 80],
    [61, 90],
    [31, 38],
  ])
) // 5

console.log(minMeetingRooms([])) // 0

console.log(
  minMeetingRooms([
    [13, 15],
    [1, 13],
  ])
) //1
