/**
 * Intervals Intersection (medium)
 *
 * Given two lists of intervals, find the intersection of these two lists. Each list consists of disjoint intervals sorted on their start time.
 *
 * Input: arr1=[[1, 3], [5, 6], [7, 9]], arr2=[[2, 3], [5, 7]]
 * Output: [2, 3], [5, 6], [7, 7]
 * Explanation: The output list contains the common intervals between the two lists.
 *
 * Input: arr1=[[1, 3], [5, 7], [9, 12]], arr2=[[5, 10]]
 * Output: [5, 7], [9, 10]
 * Explanation: The output list contains the common intervals between the two lists.
 */

class Interval {
  constructor(start, end) {
    this.start = start
    this.end = end
  }

  print_interval() {
    process.stdout.write(`[${this.start}, ${this.end}]`)
  }

  toString() {
    return `[${this.start}, ${this.end}]`
  }

  static isIntersected(a, b) {
    if (a.end < b.start) {
      return false
    }

    if (b.end < a.start) {
      return false
    }

    return true
  }

  static findIntersect(a, b) {
    return new Interval(Math.max(a.start, b.start), Math.min(a.end, b.end))
  }
}

/**
 * Time Complexity: O(N + M), N = intervals_a.length, M = intervals_b.length
 * Space Complexity: O(1), if we ignore the result list space
 */
function merge(intervals_a, intervals_b) {
  let aIdx = 0
  let bIdx = 0
  let merged = []

  while (aIdx < intervals_a.length && bIdx < intervals_b.length) {
    const a = intervals_a[aIdx]
    const b = intervals_b[bIdx]

    if (Interval.isIntersected(a, b)) {
      merged.push(Interval.findIntersect(a, b))
    }

    if (a.end >= b.end) {
      bIdx += 1
    } else {
      aIdx += 1
    }
  }

  return merged
}

process.stdout.write('Intervals Intersection: ')
let result = merge(
  [new Interval(1, 3), new Interval(5, 6), new Interval(7, 9)],
  [new Interval(2, 3), new Interval(5, 7)]
)
for (i = 0; i < result.length; i++) {
  result[i].print_interval()
}
console.log()

process.stdout.write('Intervals Intersection: ')
result = merge(
  [new Interval(1, 3), new Interval(5, 7), new Interval(9, 12)],
  [new Interval(5, 10)]
)
for (i = 0; i < result.length; i++) {
  result[i].print_interval()
}
console.log()
