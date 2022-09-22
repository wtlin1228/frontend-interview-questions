class NumArray {
  // time complexity: O(n)
  // space complexity: O(n)
  constructor(arr) {
    this.prefixSum = arr.reduce((acc, curr) => {
      const prev = acc[acc.length - 1] || 0
      acc.push(curr + prev)
      return acc
    }, [])
  }

  // time complexity: O(1)
  // space complexity: O(1)
  rangeSumQuery(left, right) {
    return this.prefixSum[right] - (this.prefixSum[left - 1] || 0)
  }
}

// Usage
const numArr = new NumArray([9, 8, 7, 1, 2, 3, 4, 5, 6])
console.log(
  numArr.rangeSumQuery(0, 8), // 45
  numArr.rangeSumQuery(0, 2), // 24
  numArr.rangeSumQuery(2, 7), // 22
  numArr.rangeSumQuery(5, 7), // 12
  numArr.rangeSumQuery(8, 8), // 6
  numArr.rangeSumQuery(0, 0) // 9
)
