class FenwickTree {
  constructor(arr) {
    this._tree = Array.from({ length: arr.length + 1 }, () => 0)

    arr.forEach((val, index) => {
      this.update(index, val)
    })
  }

  update(index, val) {
    index += 1
    while (index < this._tree.length) {
      this._tree[index] += val
      index += index & -index
    }
  }

  query(index) {
    let res = 0
    index += 1
    while (index > 0) {
      res += this._tree[index]
      index -= index & -index
    }
    return res
  }

  queryRange(start, end) {
    return this.query(end) - this.query(start - 1)
  }
}

module.exports = FenwickTree
