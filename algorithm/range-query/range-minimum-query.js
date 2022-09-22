function getBaseLog(x, y) {
  return Math.ceil(Math.log(y) / Math.log(x))
}

class NumArray {
  // time complexity: O(n * log(n))
  // space complexity: O(n * log(n))
  constructor(arr) {
    const arrSize = arr.length
    const arrSizeLog = getBaseLog(2, arr.length)

    // m[start][log], ex: m[2][2] -> the minimum number of range arr[2...6]
    const m = Array.from({ length: arrSize }).map(() =>
      Array.from({ length: arrSizeLog + 1 }).map(() => Infinity)
    )

    // m[i][0] = arr[i] (base cases)
    for (let i = 0; i < arrSize; i++) {
      m[i][0] = arr[i]
    }

    // m[i][j] = min(m[i][j-1], m[i+2^(j-1)][j-1]), ex: m[2][3] = min(m[2][2], m[6][2])
    for (let j = 1; j <= arrSizeLog; j++) {
      const prevLog = j - 1
      const prevLogLength = Math.pow(2, prevLog)
      for (let i = 0; i < arrSize - prevLogLength; i++) {
        m[i][j] = Math.min(m[i][prevLog], m[i + prevLogLength][prevLog])
      }
    }

    this.m = m
  }

  // time complexity: O(1)
  // space complexity: O(1)
  rangeMinimumQuery(left, right) {
    if (left === right) {
      return this.m[left][0]
    }

    // ex: (left, right) = (2, 7), length = 7 - 2 + 1
    const log = getBaseLog(2, right - left + 1) - 1
    const logLength = Math.pow(2, log)
    return Math.min(this.m[left][log], this.m[right - logLength + 1][log])
  }
}

const numArr = new NumArray([9, 8, 7, 1, 2, 3, 4, 5, 6]) // arr length = 9
console.log(
  numArr.rangeMinimumQuery(0, 8), // 1
  numArr.rangeMinimumQuery(0, 2), // 7
  numArr.rangeMinimumQuery(2, 7), // 1
  numArr.rangeMinimumQuery(5, 7), // 3
  numArr.rangeMinimumQuery(8, 8), // 6
  numArr.rangeMinimumQuery(0, 0) // 9
)
