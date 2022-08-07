# Implement the Built-in APIs

## reduce

```js
const reduce = (arr, callback, initialValue) => {
  let result = initialValue
  for (let i = 0; i < arr.length; i++) {
    result = callback(result, arr[i])
  }
  return result
}
```

## debounce

```js
const debounce = (callback, delay = 0) => {
  let timerId

  return (...args) => {
    if (timerId !== undefined) {
      clearTimeout(timerId)
    }

    timerId = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

const showName = (firstName, lastName) => {
  console.log(`${firstName}, ${lastName}`)
}

const debouncedShowName = debounce(showName, 1000)

debouncedShowName('Leo1', 'Lin1')
debouncedShowName('Leo2', 'Lin2')
debouncedShowName('Leo3', 'Lin3')
```

## throttle

```js
const throttle = (callback, delay = 0) => {
  let timerId

  return (...args) => {
    if (timerId === undefined) {
      callback(...args)

      timerId = setTimeout(() => {
        timerId = undefined
      }, delay)
    }
  }
}

const showName = (firstName, lastName) => {
  console.log(`${firstName}, ${lastName}`)
}

const throttledShowName = throttle(showName, 1000)

throttledShowName('Leo1', 'Lin1')
throttledShowName('Leo2', 'Lin2')
throttledShowName('Leo3', 'Lin3')
```

## shallow clone

```js
const shallowClone = (input) => {
  if (input === undefined || input === null || typeof input !== 'object') {
    return input
  }

  if (Array.isArray(input)) {
    return [...input]
  }

  if (input[Symbol.toStringTag] === 'Set') {
    return new Set(input)
  }

  if (input[Symbol.toStringTag] === 'Map') {
    return new Map(input)
  }

  return { ...input }
}

const toClone = [
  undefined,
  null,
  100,
  false,
  'hello',
  [1, 2, 3],
  new Set([1, 2, 3]),
  new Map([
    ['foo', 1],
    ['bar', 2],
  ]),
  { foo: 1, bar: 2 },
]

toClone.forEach((input) => {
  const clone = shallowClone(input)
  console.log(clone)
})
```

## deep clone

```js
const deepClone = (input) => {
  if (input === undefined || input === null || typeof input !== 'object') {
    return input
  }

  if (input[Symbol.toStringTag] === 'Set') {
    return new Set(JSON.parse(JSON.stringify(input)))
  }

  if (input[Symbol.toStringTag] === 'Map') {
    return new Map(JSON.parse(JSON.stringify(input)))
  }

  return JSON.parse(JSON.stringify(input))
}
```
