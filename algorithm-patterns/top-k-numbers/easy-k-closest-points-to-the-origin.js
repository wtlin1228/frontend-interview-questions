/**
 * 'K' Closest Points to the Origin (easy)
 *
 * Given an array of points in a 2D plane, find ‘K’ closest points to the origin.
 *
 *
 * Example 1:
 *
 * Input: points = [[1,2],[1,3]], K = 1
 * Output: [[1,2]]
 * Explanation: The Euclidean distance between (1, 2) and the origin is sqrt(5).
 * The Euclidean distance between (1, 3) and the origin is sqrt(10).
 * Since sqrt(5) < sqrt(10), therefore (1, 2) is closer to the origin.
 *
 *
 * Example 2:
 *
 * Input: point = [[1, 3], [3, 4], [2, -1]], K = 2
 * Output: [[1, 3], [2, -1]]
 */

const { Heap } = require('../../algorithm/heap/heap')

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  get_point() {
    return '[' + this.x + ', ' + this.y + '] '
  }

  square_length_to_origin() {
    return this.x * this.x + this.y + this.y
  }
}

/**
 * Time Complexity: O(n log k), n = nums.length
 * Space Complexity: O(k)
 */
const find_closest_points = function (points, k) {
  const maxHeap = new Heap(
    [],
    (child, parent) =>
      child.square_length_to_origin() <= parent.square_length_to_origin()
  )

  points.forEach((point) => {
    if (maxHeap.size() === k) {
      if (
        point.square_length_to_origin() <
        maxHeap.peek().square_length_to_origin()
      ) {
        maxHeap.pop()
        maxHeap.push(point)
      }
    } else {
      maxHeap.push(point)
    }
  })

  return maxHeap.toArray()
}

points = find_closest_points(
  [new Point(1, 3), new Point(3, 4), new Point(2, -1)],
  2
)
result = 'Here are the k points closest the origin: '
for (i = 0; i < points.length; i++) result += points[i].get_point()
console.log(result)
