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
