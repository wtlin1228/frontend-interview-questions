// Two Pointers Approach:
//   1. start from last index of s and t until one of the pointers reaches -1
//   2. increment the ignore count when there is a '#'
//   3. compare two s[ptrS] and t[ptrT] only when two ignore counts are 0
//
// Complexity Analysis
// - Time Complexity: O(M + N), where M and N are the lengths of S and T respectively
// - Space Complexity: O(1)

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
  let ignoreS = 0
  let ignoreT = 0
  let ptrS = s.length - 1
  let ptrT = t.length - 1

  while (ptrS >= 0 && ptrT >= 0) {
    const ss = s[ptrS]
    const tt = t[ptrT]

    const readyToCompare =
      ss !== '#' && tt !== '#' && ignoreS === 0 && ignoreT === 0

    if (readyToCompare) {
      if (ss !== tt) {
        return false
      }
      ptrS -= 1
      ptrT -= 1
    } else {
      // not ready to compare
      // ss === '#' or tt === '#' or ignoreS > 0 or ignoreT > 0
      if (ss === '#') {
        ignoreS += 1
        ptrS -= 1
      } else if (ignoreS > 0) {
        ignoreS -= 1
        ptrS -= 1
      }

      if (tt === '#') {
        ignoreT += 1
        ptrT -= 1
      } else if (ignoreT > 0) {
        ignoreT -= 1
        ptrT -= 1
      }
    }
  }

  while (ptrS >= 0) {
    const ss = s[ptrS]
    if (ss === '#') {
      ignoreS += 1
    } else {
      if (ignoreS <= 0) {
        return false
      } else {
        ignoreS -= 1
      }
    }
    ptrS -= 1
  }

  while (ptrT >= 0) {
    const tt = t[ptrT]
    if (tt === '#') {
      ignoreT += 1
    } else {
      if (ignoreT <= 0) {
        return false
      } else {
        ignoreT -= 1
      }
    }
    ptrT -= 1
  }

  return true
}
