const SegmentTree = require('../build-segment-tree.js')

describe('range sum queries', () => {
  const arr = [18, 17, 13, 19, 15, 11, 20, 12, 33, 25]
  const mergeFn = (a, b) => a + b
  const valueForNullNode = 0

  test('build segment tree', () => {
    const segmentTree = new SegmentTree(arr, mergeFn, valueForNullNode)

    // prettier-ignore
    expect(segmentTree._tree).toEqual([183, 82, 101, 48, 34, 43, 58, 35, 13, 19, 15, 31, 12, 33, 25, 18, 17, undefined, undefined, undefined, undefined, undefined, undefined, 11, 20])
  })

  test('query segment tree', () => {
    const segmentTree = new SegmentTree(arr, mergeFn, valueForNullNode)

    expect(segmentTree.query(0, 0, arr.length - 1, 0, 9)).toBe(183)
    expect(segmentTree.query(0, 0, arr.length - 1, 2, 8)).toBe(123)
    expect(segmentTree.query(0, 0, arr.length - 1, 5, 9)).toBe(101)
  })

  test('update segment tree', () => {
    const segmentTree = new SegmentTree(arr, mergeFn, valueForNullNode)

    segmentTree.update(0, 0, arr.length - 1, 1, arr[1] + 3)
    segmentTree.update(0, 0, arr.length - 1, 3, arr[3] - 1)
    segmentTree.update(0, 0, arr.length - 1, 6, arr[6] + 2)

    expect(segmentTree.query(0, 0, arr.length - 1, 0, 9)).toBe(183 + 3 - 1 + 2)
    expect(segmentTree.query(0, 0, arr.length - 1, 2, 8)).toBe(123 - 1 + 2)
    expect(segmentTree.query(0, 0, arr.length - 1, 5, 9)).toBe(101 + 2)
  })
})

describe('range minimum queries', () => {
  const arr = [9, 8, 7, 1, 2, 3, 4, 5, 6]
  const mergeFn = (a, b) => Math.min(a, b)
  const valueForNullNode = Infinity

  test('build segment tree', () => {
    const segmentTree = new SegmentTree(arr, mergeFn, valueForNullNode)

    // prettier-ignore
    expect(segmentTree._tree).toEqual([1, 1, 3, 7, 1, 3, 5, 8, 7, 1, 2, 3, 4, 5, 6, 9, 8])
  })

  test('query segment tree', () => {
    const segmentTree = new SegmentTree(arr, mergeFn, valueForNullNode)

    expect(segmentTree.query(0, 0, arr.length - 1, 0, 8)).toBe(1)
    expect(segmentTree.query(0, 0, arr.length - 1, 0, 2)).toBe(7)
    expect(segmentTree.query(0, 0, arr.length - 1, 2, 7)).toBe(1)
    expect(segmentTree.query(0, 0, arr.length - 1, 5, 7)).toBe(3)
    expect(segmentTree.query(0, 0, arr.length - 1, 8, 8)).toBe(6)
    expect(segmentTree.query(0, 0, arr.length - 1, 0, 0)).toBe(9)
  })

  test('update segment tree', () => {
    const segmentTree = new SegmentTree(arr, mergeFn, valueForNullNode)

    segmentTree.update(0, 0, arr.length - 1, 1, 3)
    segmentTree.update(0, 0, arr.length - 1, 3, -2)
    segmentTree.update(0, 0, arr.length - 1, 6, 1)

    expect(segmentTree.query(0, 0, arr.length - 1, 0, 8)).toBe(-2)
    expect(segmentTree.query(0, 0, arr.length - 1, 0, 2)).toBe(3)
    expect(segmentTree.query(0, 0, arr.length - 1, 2, 7)).toBe(-2)
    expect(segmentTree.query(0, 0, arr.length - 1, 5, 7)).toBe(1)
    expect(segmentTree.query(0, 0, arr.length - 1, 8, 8)).toBe(6)
    expect(segmentTree.query(0, 0, arr.length - 1, 0, 0)).toBe(9)
  })
})

describe('range maximum queries', () => {
  const arr = [9, 8, 7, 1, 2, 3, 4, 5, 6]
  const mergeFn = (a, b) => Math.max(a, b)
  const valueForNullNode = -Infinity

  test('build segment tree', () => {
    const segmentTree = new SegmentTree(arr, mergeFn, valueForNullNode)

    // prettier-ignore
    expect(segmentTree._tree).toEqual([9, 9, 6, 9, 2, 4, 6, 9, 7, 1, 2, 3, 4, 5, 6, 9, 8])
  })

  test('query segment tree', () => {
    const segmentTree = new SegmentTree(arr, mergeFn, valueForNullNode)

    expect(segmentTree.query(0, 0, arr.length - 1, 0, 8)).toBe(9)
    expect(segmentTree.query(0, 0, arr.length - 1, 0, 2)).toBe(9)
    expect(segmentTree.query(0, 0, arr.length - 1, 2, 7)).toBe(7)
    expect(segmentTree.query(0, 0, arr.length - 1, 5, 7)).toBe(5)
    expect(segmentTree.query(0, 0, arr.length - 1, 8, 8)).toBe(6)
    expect(segmentTree.query(0, 0, arr.length - 1, 0, 0)).toBe(9)
  })

  test('update segment tree', () => {
    const segmentTree = new SegmentTree(arr, mergeFn, valueForNullNode)

    segmentTree.update(0, 0, arr.length - 1, 1, 10)
    segmentTree.update(0, 0, arr.length - 1, 3, 6)
    segmentTree.update(0, 0, arr.length - 1, 6, 12)

    expect(segmentTree.query(0, 0, arr.length - 1, 0, 8)).toBe(12)
    expect(segmentTree.query(0, 0, arr.length - 1, 0, 2)).toBe(10)
    expect(segmentTree.query(0, 0, arr.length - 1, 2, 7)).toBe(12)
    expect(segmentTree.query(0, 0, arr.length - 1, 5, 7)).toBe(12)
    expect(segmentTree.query(0, 0, arr.length - 1, 8, 8)).toBe(6)
    expect(segmentTree.query(0, 0, arr.length - 1, 0, 0)).toBe(9)
  })
})
