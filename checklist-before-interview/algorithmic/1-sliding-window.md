# Sliding Window

## max sub array of size k

```js
function maxSubArrayOfSizeK(k, arr) {
  let maxSum = 0
  let windowSum = 0
  let windowStart = 0

  for (windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd] // add the next element
    // slide the window, we don't need to slide if we've not hit the required window size of 'k'
    if (windowEnd >= k - 1) {
      maxSum = Math.max(maxSum, windowSum)
      windowSum -= arr[windowStart] // subtract the element going out
      windowStart += 1 // slide the window ahead
    }
  }
  return maxSum
}

console.log(maxSubArrayOfSizeK(3, [2, 1, 5, 1, 3, 2]))
console.log(maxSubArrayOfSizeK(2, [2, 3, 4, 1, 5]))
```

## smallest sub-array sum

```js
const smallestSubarraySum = function (s, arr) {
  let windowStart = 0
  let windowSum = 0
  let smallestSize = Infinity

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd] // add the next element

    // shrink the window as small as possible until the 'window_sum' is smaller than 's'
    while (windowSum >= s) {
      smallestSize = Math.min(smallestSize, windowEnd - windowStart + 1)
      windowSum -= arr[windowStart]
      windowStart += 1 // sliding the window
    }
  }

  if (smallestSize === Infinity) {
    return 0
  }

  return smallestSize
}

console.log(smallestSubarraySum(7, [2, 1, 5, 2, 3, 2]))
console.log(smallestSubarraySum(8, [3, 4, 1, 1, 6]))
console.log(smallestSubarraySum(7, [2, 1, 5, 2, 3, 2]))
```

## longest sub-string with k distinct

```js
const longestSubstringWithKDistinct = function (str, k) {
  const frequencyMap = new Map()
  let windowStart = 0
  let longestLength = 0

  for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
    const c = s[windowEnd]
    const frequency = frequencyMap.get(c)
    frequencyMap.set(c, frequency ? frequency + 1 : 1)

    while (frequencyMap.size > k) {
      const toRemove = s[windowStart]
      windowStart += 1

      if (frequencyMap.get(toRemove) === 1) {
        frequencyMap.delete(toRemove)
      } else {
        frequencyMap.set(toRemove, frequencyMap.get(toRemove) - 1)
      }
    }

    longestLength = Math.max(longestLength, windowEnd - windowStart + 1)
  }

  return longestLength
}

console.log(longestSubstringWithKDistinct('araaci', 2))
console.log(longestSubstringWithKDistinct('araaci', 1))
console.log(longestSubstringWithKDistinct('cbbebi', 3))
```

# permutation in string

```js
/**
 * @param {array|string} arr
 * @returns {map}
 */
const buildFrequencyMap = (arr) => {
  const map = new Map()

  for (let i = 0; i < arr.length; i++) {
    if (!map.has(arr[i])) {
      map.set(arr[i], 0)
    }
    map.set(arr[i], map.get(arr[i]) + 1)
  }

  return map
}

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
const checkInclusion = function (pattern, s) {
  const frequencyMap = buildFrequencyMap(pattern)
  let matched = 0
  let windowStart = 0

  for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
    const rightChar = s[windowEnd]
    if (frequencyMap.has(rightChar)) {
      const nextFrequency = frequencyMap.get(rightChar) - 1
      // Decrement the frequency of matched character
      frequencyMap.set(rightChar, nextFrequency)
      if (nextFrequency === 0) {
        matched += 1
      }
    }

    if (matched === frequencyMap.size) {
      return true
    }

    // Shrink the sliding window
    if (windowEnd >= pattern.length - 1) {
      const leftChar = s[windowStart]
      windowStart += 1
      if (frequencyMap.has(leftChar)) {
        const frequency = frequencyMap.get(leftChar)
        if (frequency === 0) {
          matched -= 1
        }
        frequencyMap.set(leftChar, frequency + 1)
      }
    }
  }
  return false
}
```

## smallest window containing substring

```js
/**
 * @param {array|string} arr
 * @returns {map}
 */
const buildFrequencyMap = (arr) => {
  const map = new Map()

  for (let i = 0; i < arr.length; i++) {
    if (!map.has(arr[i])) {
      map.set(arr[i], 0)
    }
    map.set(arr[i], map.get(arr[i]) + 1)
  }

  return map
}

/**
 * @param {string} s
 * @param {string} pattern
 * @return {string}
 */
var minWindow = function (s, pattern) {
  const frequencyMap = buildFrequencyMap(pattern)
  let windowStart = 0
  let matched = 0
  let subStrStart = 0
  let minLength = s.length + 1

  // try to extend the range [windowStart, windowEnd]
  for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
    const rightChar = s[windowEnd]
    if (frequencyMap.has(rightChar)) {
      const nextFrequency = frequencyMap.get(rightChar) - 1
      // Decrement the frequency of matched character
      frequencyMap.set(rightChar, nextFrequency)
      // Count every matching of a character
      if (nextFrequency >= 0) {
        matched += 1
      }
    }

    // Shrink the window if we can, finish as soon as we remove a matched character
    while (matched === pattern.length) {
      if (minLength > windowEnd - windowStart + 1) {
        minLength = windowEnd - windowStart + 1
        subStrStart = windowStart
      }

      const leftChar = s[windowStart]
      windowStart += 1
      if (frequencyMap.has(leftChar)) {
        const frequency = frequencyMap.get(leftChar)
        // Note that we could have redundant matching characters, therefore we'll decrement the
        // matched count only when a useful occurrence of a matched character is going out of the window
        if (frequency === 0) {
          matched -= 1
        }
        frequencyMap.set(leftChar, frequency + 1)
      }
    }
  }

  if (minLength > s.length) {
    return ''
  }
  return str.substring(subStrStart, subStrStart + minLength)
}
```
