const candidates = [1, 2, 3, 4, 5, 6, 7, 8]

const backtracing = (count) => {
  const res = []
  helper(res, [], count, 0)
  return res
}

const helper = (res, accumulator, n, startPoint) => {
  if (n === 0) {
    res.push([...accumulator])
    return
  }

  for (let i = startPoint; i < candidates.length; i++) {
    accumulator.push(candidates[i])
    helper(res, accumulator, n - 1, i + 1)
    accumulator.pop()
  }
}

console.log(backtracing(3))
console.log(backtracing(2))
