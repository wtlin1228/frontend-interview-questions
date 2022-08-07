# Chaining API

Like jQuery:

```js
$('someCSSSelector')
  .someMethod()
  .someOtherMethod()
  .andSomeOtherMethod()
  .andYetSomeOtherMethod()
```

## Basic idea

This is all about `this`

```js
class Chainable {
  firstMethod() {
    console.log('firstMethod')
    return this
  }

  secondMethod() {
    console.log('secondMethod')
    return this
  }

  thirdMethod() {
    console.log('thirdMethod')
    return this
  }
}

const chainableInstance = new Chainable()
chainableInstance.firstMethod().secondMethod().thirdMethod()
```

## More example

```js
class Arithmetic {
  constructor(value) {
    this.value = value
  }

  add(value) {
    this.value += value
    return this
  }

  sub(value) {
    this.value -= value
    return this
  }
}

const arithmetic = new Arithmetic(5)

arithmetic.add(10).sub(1).sub(10)

console.log(arithmetic.value) // 4
```

## Set

It's a simplify version which can not use the `reference` as the key.

```js
class MySet {
  constructor(initialValue) {
    if (!initialValue) {
      this.data = {}
      this.size = 0
      return
    }

    if (Array.isArray(initialValue)) {
      this.data = initialValue.reduce((acc, curr) => {
        acc[curr] = true
        return acc
      }, {})
      this.size = initialValue.length
      return
    }

    if (initialValue instanceof MySet) {
      this.data = initialValue.data
      this.size = initialValue.size
      return
    }

    throw new Error('invalid initial value for new MySet()')
  }

  has(key) {
    return this.data[key] === true
  }

  add(key) {
    if (!this.has(key)) {
      this.data[key] = true
      this.size += 1
    }
  }

  delete(key) {
    if (this.has(key)) {
      this.data[key] = undefined
      this.size -= 1
    }
  }

  clear() {
    this.data = {}
    this.size = 0
  }

  forEach(callback) {
    return Object.keys(this.data).forEach(callback)
  }

  values() {
    return this[Symbol.iterator]()
  }

  keys() {
    return this.values()
  }

  [Symbol.iterator]() {
    return Object.keys(this.data)[Symbol.iterator]()
  }
}
```

## Map

It's a simplify version which can not use the `reference` as the key.
And it doesn't guarantee the insertion order.

```js
class MyMap {
  constructor(initialValue) {
    if (!initialValue) {
      this.data = {}
      this.size = 0
      return
    }

    if (Array.isArray(initialValue)) {
      this.data = initialValue.reduce((acc, ({ key, value })) => {
        acc[key] = value
        return acc
      }, {})
      this.size = initialValue.length
      return
    }

    if (initialValue instanceof MyMap) {
      this.data = initialValue.data
      this.size = initialValue.size
      return
    }

    throw new Error('invalid initial value for new MyMap()')
  }

  clear() {
    this.data = {}
    this.size = 0
  }

  delete(key) {
    if (this.has(key)) {
      this.data[key] = undefined
      this.size -= 1
    }
  }

  get(key) {
    return this.data[key]
  }

  has(key) {
    return this.data[key] !== undefined
  }

  set(key, value) {
    if (!this.has(key)) {
      this.size += 1
    }
    this.data[key] = value
  }
}
```
