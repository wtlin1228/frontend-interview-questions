/**
 * Conflicting Appointments (medium)
 *
 * Given an array of intervals representing ‘N’ appointments, find out if a person can attend all the appointments.
 *
 *
 * Appointments: [[1,4], [2,5], [7,9]]
 * Output: false
 * Explanation: Since [1,4] and [2,5] overlap, a person cannot attend both of these appointments.
 *
 * Appointments: [[6,7], [2,4], [8,12]]
 * Output: true
 * Explanation: None of the appointments overlap, therefore a person can attend all of them.
 *
 * Appointments: [[4,5], [2,3], [3,6]]
 * Output: false
 * Explanation: Since [4,5] and [3,6] overlap, a person cannot attend both of these appointments.
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
function can_attend_all_appointments(intervals) {
  intervals.sort((a, b) => a.start - b.start)

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i].start < intervals[i - 1].end) {
      return false
    }
  }

  return true
}

console.log(
  `Can attend all appointments: ${can_attend_all_appointments([
    new Interval(1, 4),
    new Interval(2, 5),
    new Interval(7, 9),
  ])}`
)

console.log(
  `Can attend all appointments: ${can_attend_all_appointments([
    new Interval(6, 7),
    new Interval(2, 4),
    new Interval(8, 12),
  ])}`
)

console.log(
  `Can attend all appointments: ${can_attend_all_appointments([
    new Interval(4, 5),
    new Interval(2, 3),
    new Interval(3, 6),
  ])}`
)

/**
 * Similar Problems
 *
 * Given a list of appointments, find all the conflicting appointments.
 *
 * Appointments: [[4,5], [2,3], [3,6], [5,7], [7,8]]
 *
 * Output:
 * [4,5] and [3,6] conflict.
 * [3,6] and [5,7] conflict.
 */
