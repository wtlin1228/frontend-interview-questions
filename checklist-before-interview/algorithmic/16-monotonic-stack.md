# Monotonic Stack

A monotonic stack is a stack whose elements are monotonically increasing or decreasing.

Sometimes we store the index of the elements in the stack and make sure the elements corresponding to those indexes in the stack forms a mono-sequence.

## online stock span

Since each element can be push and pop at most once, the time complexity is O(n).

```js
var StockSpanner = function () {
  this.stack = [] // { price, result }
}

/**
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function (price) {
  let res = 1
  while (this.stack.length > 0 && this.top().price <= price) {
    const { result } = this.pop()
    res += result
  }
  this.push(price, res)
  return res
}

StockSpanner.prototype.top = function () {
  return this.stack[this.stack.length - 1]
}

StockSpanner.prototype.pop = function () {
  return this.stack.pop()
}

StockSpanner.prototype.push = function (price, result) {
  return this.stack.push({ price, result })
}

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */
```

## min stack

Keep track of the min val of the stack.

```js
var MinStack = function () {
  // element: { val: number, min: number }
  this.data = []
}

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  this.data.push({
    val,
    min: Math.min(this.getMin(), val),
  })
}

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  return this.data.pop().val
}

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.data[this.data.length - 1].val
}

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  if (this.data.length === 0) {
    return Infinity
  }
  return this.data[this.data.length - 1].min
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
```
