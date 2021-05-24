/**
 * Merge Intervals (medium)
 *
 * Given a list of intervals, merge all the overlapping intervals
 * to produce a list that has only mutually exclusive intervals.
 *
 * Intervals: [[1,4], [2,5], [7,9]]
 * Output: [[1,5], [7,9]]
 * Explanation: Since the first two intervals [1,4] and [2,5] overlap, we merged them into
 * one [1,5].
 *
 * Intervals: [[6,7], [2,4], [5,9]]
 * Output: [[2,4], [5,9]]
 * Explanation: Since the intervals [6,7] and [5,9] overlap, we merged them into one [5,9].
 *
 * Intervals: [[1,4], [2,6], [3,5]]
 * Output: [[1,6]]
 * Explanation: Since all the given intervals overlap, we merged them into one.
 *
 */

class Interval {
  constructor(start, end) {
    this.start = start
    this.end = end
  }

  print_interval() {
    process.stdout.write(`[${this.start}, ${this.end}]`)
  }
}

/**
 * Time Complexity: O(N * log(N)), N = intervals.length
 * Space Complexity: O(N), N = intervals.length
 */
function merge(intervals) {
  if (intervals.length < 2) {
    return intervals
  }

  intervals.sort((a, b) => a.start - b.start)

  const mergedIntervals = [intervals[0]]
  for (let i = 1; i < intervals.length; i++) {
    const source = intervals[i]
    const target = mergedIntervals[mergedIntervals.length - 1]

    if (source.start < target.end) {
      target.end = Math.max(target.end, source.end)
    } else {
      mergedIntervals.push(source)
    }
  }

  return mergedIntervals
}

process.stdout.write('Merged intervals: ')
let result = merge([new Interval(1, 4), new Interval(2, 5), new Interval(7, 9)])
for (i = 0; i < result.length; i++) {
  result[i].print_interval()
}
console.log()

process.stdout.write('Merged intervals: ')
result = merge([new Interval(6, 7), new Interval(2, 4), new Interval(5, 9)])
for (i = 0; i < result.length; i++) {
  result[i].print_interval()
}
console.log()

process.stdout.write('Merged intervals: ')
result = merge([new Interval(1, 4), new Interval(2, 6), new Interval(3, 5)])
for (i = 0; i < result.length; i++) {
  result[i].print_interval()
}
console.log()

/**
 * Similar Problems #
 *
 * Given a set of intervals, find out if any two intervals overlap.
 *
 * Intervals: [[1,4], [2,5], [7,9]]
 * Output: true
 * Explanation: Intervals [1,4] and [2,5] overlap
 */
