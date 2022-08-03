# Merge Intervals

Given two intervals (‘a’ and ‘b’), there will be six different ways the two intervals can relate to each other:

1. 'a' and 'b' do not overlap

   ```
   |---------|
               |----|
   ```

2. 'a' and 'b' overlap, 'b' ends after 'a'

   ```
   |---------|
           |----|
   ```

3. 'a' completely overlaps 'b'

   ```
   |---------|
      |----|
   ```

4. 'a' and 'b' overlap, 'b' ends before 'a'

   ```
      |---------|
   |----|
   ```

5. 'b' completely overlaps 'a'

   ```
      |----|
   |---------|
   ```

6. 'a' and 'b' do not overlap

   ```
          |---------|
   |----|
   ```

## merge intervals

```js
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  if (intervals.length <= 1) {
    return intervals
  }
  // sort the intervals on the start time
  intervals.sort((a, b) => a[0] - b[0])

  // [1, 3], [2, 6], [3, 4] -> [1, 6]
  const mergedIntervals = []
  let mergedLeft = intervals[0][0]
  let mergedRight = intervals[0][1]
  for (let i = 1; i < intervals.length; i++) {
    const [left, right] = intervals[i]

    if (left > mergedRight) {
      // case - not overlapping
      mergedIntervals.push([mergedLeft, mergedRight])
      mergedLeft = left
      mergedRight = right
    } else {
      mergedRight = Math.max(mergedRight, right)
    }
  }
  mergedIntervals.push([mergedLeft, mergedRight])

  return mergedIntervals
}
```

## insert interval

```js
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  const mergedIntervals = []
  const [toMergeLeft, toMergeRight] = newInterval
  let i = 0

  // not overlapping
  while (i < intervals.length && intervals[i][1] < toMergeLeft) {
    mergedIntervals.push(intervals[i])
    i++
  }

  // merging
  let mergedLeft = toMergeLeft
  let mergedRight = toMergeRight
  while (i < intervals.length && mergedRight >= intervals[i][0]) {
    const [left, right] = intervals[i]
    mergedLeft = Math.min(mergedLeft, left)
    mergedRight = Math.max(mergedRight, right)
    i++
  }
  mergedIntervals.push([mergedLeft, mergedRight])

  // after merge
  while (i < intervals.length) {
    mergedIntervals.push(intervals[i])
    i++
  }

  return mergedIntervals
}
```

## intervals intersection

```js
/**
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {number[][]}
 */
var intervalIntersection = function (firstList, secondList) {
  let i = 0
  let j = 0
  const intersections = []

  while (i < firstList.length && j < secondList.length) {
    const [left1, right1] = firstList[i]
    const [left2, right2] = secondList[j]
    const isFirstOverlapSecond = left1 <= right2 && right1 >= left2
    const isSecondOverlapFirst = left2 <= right1 && right2 >= left1
    if (isFirstOverlapSecond || isSecondOverlapFirst) {
      intersections.push([Math.max(left1, left2), Math.min(right1, right2)])
    }
    if (right1 < right2) {
      i++
    } else {
      j++
    }
  }

  return intersections
}
```

## meeting rooms

```js
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function (intervals) {
  const sortedMeetings = intervals.sort((a, b) => a[0] - b[0])
  const minHeap = new Heap([], (child, parent) => child >= parent)

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
```

## employee free time

```js
class HeapElement {
  constructor(employeeIdx, intervalIdx) {
    this.employeeIdx = employeeIdx
    this.intervalIdx = intervalIdx
  }
}

const getIntervalFromHeapElement = (schedule, heapElement) =>
  schedule[heapElement.employeeIdx][heapElement.intervalIdx]

/**
 * @param {Interval[][]} schedule
 * @return {Interval[]}
 */
var employeeFreeTime = function (schedule) {
  const minHeap = new Heap([], (child, parent) => {
    const childInterval = getIntervalFromHeapElement(schedule, child)
    const parentInterval = getIntervalFromHeapElement(schedule, parent)
    return childInterval.start >= parentInterval.start
  })

  // insert the first interval of each employee to the queue
  schedule.forEach((_, employeeIdx) => {
    minHeap.push(new HeapElement(employeeIdx, 0))
  })

  const freeTimes = []
  let previousInterval = getIntervalFromHeapElement(schedule, minHeap.peek())
  while (minHeap.size() > 0) {
    const topHeapElement = minHeap.pop()
    const currentInterval = getIntervalFromHeapElement(schedule, topHeapElement)

    // if previousInterval is not overlapping with the next interval, insert a free interval
    if (previousInterval.end < currentInterval.start) {
      freeTimes.push(new Interval(previousInterval.end, currentInterval.start))
    }

    // overlapping intervals, update the previousInterval if needed
    if (previousInterval.end < currentInterval.end) {
      previousInterval = currentInterval
    }

    // if there are more intervals available for the same employee, add their next interval
    if (
      topHeapElement.intervalIdx <
      schedule[topHeapElement.employeeIdx].length - 1
    ) {
      minHeap.push(
        new HeapElement(
          topHeapElement.employeeIdx,
          topHeapElement.intervalIdx + 1
        )
      )
    }
  }

  return freeTimes
}
```
