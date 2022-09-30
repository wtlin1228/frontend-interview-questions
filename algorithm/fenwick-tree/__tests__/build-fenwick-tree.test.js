const FenwickTree = require('../build-fenwick-tree.js')

describe('range sum queries', () => {
  const arr = [18, 17, 13, 19, 15, 11, 20, 12, 33, 25]

  test('build fenwick tree', () => {
    const fenwickTree = new FenwickTree(arr)

    // prettier-ignore
    expect(fenwickTree._tree).toEqual([0, 18, 35, 13, 67, 15, 26, 20, 125, 33, 58])
  })

  test('query fenwick tree', () => {
    const fenwickTree = new FenwickTree(arr)

    expect(fenwickTree.queryRange(0, 9)).toBe(183)
    expect(fenwickTree.queryRange(2, 8)).toBe(123)
    expect(fenwickTree.queryRange(5, 9)).toBe(101)
  })

  test('update fenwick tree', () => {
    const fenwickTree = new FenwickTree(arr)

    fenwickTree.update(1, +3)
    fenwickTree.update(3, -1)
    fenwickTree.update(6, +2)

    expect(fenwickTree.queryRange(0, 9)).toBe(183 + 3 - 1 + 2)
    expect(fenwickTree.queryRange(2, 8)).toBe(123 - 1 + 2)
    expect(fenwickTree.queryRange(5, 9)).toBe(101 + 2)
  })
})
