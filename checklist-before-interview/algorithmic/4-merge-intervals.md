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

## broadcasting company

I want to start a broadcasting company. I will provide a schedule with channels and shows, this will include things such as program name,
start time, end time, and quality (SD/HD/4K.etc). What I'm wanting from you is to create a way that based on this schedule I can understand
What my peak bandwidth requirement is to broadcast my proposed schedule.

Constraint:

- I will only be able to purchase bandwidth once a year, so I will need
  plan my schedule and get a peak requirement for the entire schedule presented. This will contain multiple channels and ontent changes in
  quality throughout the year.

Required Outputs:

1. Maximum total bandwidth over the schedule
2. Stretch, average consumption based on schedule.

Quality Type Bandwidth
Standard Def (SD) -> 1 (1500bit)
High Def (HD) -> 5 (6000bit)
Ultra High Def (4K) - > 12 (21000bit)

Example TV Guide:
Channel 1 = 12p - 4p -> SD, 4p - 5p -> HD, 6p - 9p -> 4K
Channel 2 = 10a - 1p -> HD, 1:30p - 5p -> SD, 8p - 12p - 4K

10a - 12p (1 HD) = 5
12p - 1p (1 HD, 1 SD) = 6
1p - 1:30p (1 SD) = 1

```js
// Use a minHeap to track the shows.
// The sorting algo depends on the show's end time.
// Which means that the most early ending show will be in the top of our heap.
//
// Time complexity for push() and pop() from minHeapForPlayingShows: O(channels.length)
//
const minHeapForPlayingShows = new Heap(
  [],
  (child, parent) => child.endTime >= parent.endTime
)

// Track the maximum bandwidth we need in the variable.
// Update maxBandwidth whenever we are using more bandwidth.
let maxBandwidth = 0
let currentBandwidth = 0

// To find the show which has the earliest start time.
// We can use another minHeap and only put the earliest shows of each channel into it.
// Whenever we pop one show from this minHeap, we put the next show of the same channel
// into the heap until there is no show left in that channel.
//
// Time complexity for push() and pop() from minHeapForShowsToPlay: O(channels.length)
//
const minHeapForShowsToPlay = new Heap(
  [],
  (child, parent) => child.show.startTime >= parent.show.startTime
)
for (let i = 0; i < channels.length; i++) {
  const firstShow = channels[i][0]
  minHeapForShowsToPlay.push({
    channelIdx: i,
    showIdx: 0,
    show: firstShow,
    bandwidth: getBandwidthOfShow(firstShow),
  })
}

// Start popping shows from minHeapForShowsToPlay and push it into minHeapForPlayingShows.
//
// Since each show will be push and pop form minHeapForShowsToPlay and minHeapForPlayingShows
// only once, the time complexity is O(n * c), where n = shows count and c = channels count.
//
while (minHeapForShowsToPlay.size() > 0) {
  const { channelIdx, showIdx, show } = minHeapForShowsToPlay.pop()

  while (
    minHeapForPlayingShows.size() > 0 &&
    show.startTime > minHeapForPlayingShows.peek().endTime
  ) {
    const finishShow = minHeapForPlayingShows.pop()
    currentBandwidth -= finishShow.bandwidth
  }

  currentBandwidth += show.bandwidth
  maxBandwidth = Math.max(maxBandwidth, currentBandwidth)

  if (showIdx + 1 < channels[channelIdx].length) {
    const nextShowInTheChannel = channels[channelIdx][showIdx]
    minHeapForShowsToPlay.push({
      channelIdx: i,
      showIdx: showIdx + 1,
      show: nextShowInTheChannel,
      bandwidth: getBandwidthOfShow(nextShowInTheChannel),
    })
  }
}

return maxBandwidth
```
