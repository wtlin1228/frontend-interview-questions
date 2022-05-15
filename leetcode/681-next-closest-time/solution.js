/**
 * 681. Next Closest Time
 * https://leetcode.com/problems/next-closest-time/
 *
 * Given a time represented in the format "HH:MM", form the next closest time by reusing the current digits. There is no limit on how many times a digit can be reused.
 *
 * You may assume the given input string is always valid. For example, "01:34", "12:09" are all valid. "1:34", "12:9" are all invalid.
 *
 *
 *
 * Example 1:
 *
 * Input: time = "19:34"
 * Output: "19:39"
 * Explanation: The next closest time choosing from digits 1, 9, 3, 4, is 19:39, which occurs 5 minutes later.
 * It is not 19:33, because this occurs 23 hours and 59 minutes later.
 *
 *
 *
 * Example 2:
 *
 * Input: time = "23:59"
 * Output: "22:22"
 * Explanation: The next closest time choosing from digits 2, 3, 5, 9, is 22:22.
 * It may be assumed that the returned time is next day's time since it is smaller than the input time numerically.
 *
 *
 * Constraints:
 *
 * time.length == 5
 * time is a valid time in the form "HH:MM".
 * 0 <= HH < 24
 * 0 <= MM < 60
 */

var isValidTime = function (h, m) {
  return h < 24 && m < 60
}

var getMinutesDifference = function (current, next) {
  return next >= current ? next - current : next + (24 * 60 - current)
}

/**
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 * @param {string} time
 * @return {string}
 */
var nextClosestTime = function (time) {
  const [h1, h2, , m1, m2] = time.split('')
  const hour = Number('' + h1 + h2)
  const minute = Number('' + m1 + m2)
  const currentTotalMinutes = hour * 60 + minute

  let result = [h1, h2, m1, m2]
  let minDiff = 24 * 60

  const numberArr = [h1, h2, m1, m2]
  numberArr.forEach((h1) =>
    numberArr.forEach((h2) =>
      numberArr.forEach((m1) =>
        numberArr.forEach((m2) => {
          const nextHour = Number('' + h1 + h2)
          const nextMinute = Number('' + m1 + m2)

          if (isValidTime(nextHour, nextMinute)) {
            const diff = getMinutesDifference(
              currentTotalMinutes,
              nextHour * 60 + nextMinute
            )

            if (diff !== 0 && diff < minDiff) {
              result = [h1, h2, m1, m2]
              minDiff = diff
            }
          }
        })
      )
    )
  )

  return `${result[0]}${result[1]}:${result[2]}${result[3]}`
}
