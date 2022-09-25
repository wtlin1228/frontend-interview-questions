class SegmentTree {
  constructor(arr, mergeFn, valueForNullNode) {
    this._tree = []
    this._mergeFn = mergeFn
    this._valueForNullNode = valueForNullNode
    this._buildSegmentTree(arr, 0, 0, arr.length - 1)
  }

  _getTreeIndexForLeftChild(treeIndex) {
    return 2 * treeIndex + 1
  }

  _getTreeIndexForRightChild(treeIndex) {
    return 2 * treeIndex + 2
  }

  _getRangeMid(lo, hi) {
    return lo + Math.floor((hi - lo) / 2)
  }

  // We visit each leaf of the segment tree (corresponding to each element in our array arr[]).
  // That makes nn leaves. Also there will be n−1 internal nodes. So we process about 2*n nodes.
  // This makes the build process run in O(n) linear complexity.
  _buildSegmentTree(arr, treeIndex, lo, hi) {
    // leaf node. store value in node.
    if (lo === hi) {
      this._tree[treeIndex] = arr[lo]
      return
    }

    // recurse deeper for children.
    const mid = this._getRangeMid(lo, hi)
    const leftChildTreeIndex = this._getTreeIndexForLeftChild(treeIndex)
    const rightChildTreeIndex = this._getTreeIndexForRightChild(treeIndex)
    this._buildSegmentTree(arr, leftChildTreeIndex, lo, mid)
    this._buildSegmentTree(arr, rightChildTreeIndex, mid + 1, hi)

    // merge build result.
    this._tree[treeIndex] = this._mergeFn(
      this._tree[leftChildTreeIndex],
      this._tree[rightChildTreeIndex]
    )
  }

  // lo and hi represents the segment range
  // i and j represents the query range
  query(treeIndex, lo, hi, i, j) {
    // segment completely outside the query range
    if (lo > j || hi < i) {
      return this._valueForNullNode
    }

    // segment completely inside the query range
    if (i <= lo && j >= hi) {
      return this._tree[treeIndex]
    }

    // partial overlap of current segment and the query range.
    // Recurse deeper.
    const mid = this._getRangeMid(lo, hi)
    const leftChildTreeIndex = this._getTreeIndexForLeftChild(treeIndex)
    const rightChildTreeIndex = this._getTreeIndexForRightChild(treeIndex)
    return this._mergeFn(
      this.query(leftChildTreeIndex, lo, mid, i, j),
      this.query(rightChildTreeIndex, mid + 1, hi, i, j)
    )
  }

  update(treeIndex, lo, hi, arrIndex, val) {
    if (lo === hi) {
      this._tree[treeIndex] = val
      return
    }

    const mid = this._getRangeMid(lo, hi)
    const leftChildTreeIndex = this._getTreeIndexForLeftChild(treeIndex)
    const rightChildTreeIndex = this._getTreeIndexForRightChild(treeIndex)

    if (arrIndex > mid) {
      this.update(rightChildTreeIndex, mid + 1, hi, arrIndex, val)
    } else if (arrIndex <= mid) {
      this.update(leftChildTreeIndex, lo, mid, arrIndex, val)
    }

    this._tree[treeIndex] = this._mergeFn(
      this._tree[leftChildTreeIndex],
      this._tree[rightChildTreeIndex]
    )
  }
}

module.exports = SegmentTree
