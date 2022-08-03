# Two Heaps

interested in knowing the smallest element in one part and the biggest element in the other part.

- a Min Heap
- a Max Heap

## find the median of a number stream

```js
var MedianFinder = function () {
  // put larger numbers
  this.hi = new Heap([], (child, parent) => child >= parent)
  // put smaller numbers
  this.lo = new Heap([], (child, parent) => child <= parent)
}

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  this.lo.push(num) // Add to max heap

  this.hi.push(this.lo.pop()) // balancing step

  if (this.lo.size() < this.hi.size()) {
    // maintain size property
    this.lo.push(this.hi.pop())
  }
}

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  return this.lo.size() > this.hi.size()
    ? this.lo.peek()
    : (this.lo.peek() + this.hi.peek()) * 0.5
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
```

## sliding window median

## maximize capital / IPO

## next interval
