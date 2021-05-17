Question: What is the answer of each output? And why?

Concept: short circuit

Reference: JavaScript: The Definitive Guide, 7th Edition

```js
const a = { b: {} }

a.b.c.d // Throws TypeError
a.b?.c.d // Throws TypeError
a.b.c?.d // undefined
a.b?.c?.d // undefined
```

---

Question: index = ? And why?

Concept: short circuit

Reference: JavaScript: The Definitive Guide, 7th Edition

```js
let a
let index = 0

a[index++]
a?.[index++]

console.log(index) // 1
```

```js
let f = null
let index = 0

f(index++)
f?.(index++)

console.log(index) // 1
```

---

Question: What will be log to console? And why?

Concept: function expression is evaluated before argument expressions

Reference: JavaScript: The Definitive Guide, 7th Edition

```js
class Foo {
  constructor() {}

  get bar() {
    console.log('get function bar from Foo class')
    return function (x) {
      console.log(x)
    }
  }
}

function generateArgs() {
  console.log('generate arguments...')
  return 500
}

const foo = new Foo()
foo.bar(generateArgs())
// get function bar from Foo class
// generate arguments...
// 500
```

---

Question: What is the output of each invocation?

Concept: short circuit

Reference: JavaScript: The Definitive Guide, 7th Edition

```js
const o = {}

o.m() // Throws TypeError: o.m is not a function
o?.m() // Throws TypeError: o?.m is not a function
o.m?.() // undefined

const p = null
p.m() // TypeError: Cannot read property 'm' of null
p?.m() // undefined
p.m?.() // TypeError: Cannot read property 'm' of null
```

---

Question: What is the output of each expression?

Concept: the `in` operator

Reference: JavaScript: The Definitive Guide, 7th Edition

```js
let point = { x: 1, y: 1 } // Define an object
'x' in point // => true: object has property named "x"
'z' in point // => false: object has no "z" property.
'toString' in point // => true: object inherits toString method
```

```js
let data = [7, 8, 9] // An array with elements (indices) 0, 1, and 2
'0' in data // => true: array has an element "0"
1 in data // => true: numbers are converted to strings
3 in data // => false: no element 3
9 in data // => false: no element 9
```

---

Question: What is the output of each expression?

Concept: The instance operator

Reference: JavaScript: The Definitive Guide, 7th Edition

```js
let d = new Date() // Create a new object with the Date() constructor
d instanceof Date // => true: d was created with Date()
d instanceof Object // => true: all objects are instances of Object
d instanceof Number // => false: d is not a Number object

let a = [1, 2, 3] // Create an array with array literal syntax
a instanceof Array // => true: a is an array
a instanceof Object // => true: all arrays are objects
a instanceof RegExp // => false: arrays are not regular expressions
```

---

Question: Implement your own `instanceof`

Concept: The instance operator

Reference: JavaScript: The Definitive Guide, 7th Edition

```js
function myInstanceOf(o, target) {
  let navigator = o.__proto__

  while (navigator) {
    if (navigator === target.prototype) {
      return true
    }

    navigator = navigator.__proto__
  }

  return false
}
```

Question: What is the difference between for/of and for/in? And why people prefer for/of instead of for/in?

Concept: Loop

Reference: JavaScript: The Definitive Guide, 7th Edition

Difference:

- for/of: It works with iterable objects. So any types that implements the iterable interface can be used in for/of.
- for/in: It will iterate the enumerable properties of an object.

People prefer for/of because for/in will iterate the properties which are inherited from parents. It can be overcome by using `obj.hasOwnProperty(prop)`

---

Question: Can you make object `o` iterable?

Concept: Loop

Reference: JavaScript: The Definitive Guide, 7th Edition, [MDN Iteration Protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)

```js
// Question
const o = {
  data: [1, 2, 3, 4, 5],
}

for (let x of o) {
  console.log(x)
}
// 1
// 2
// 3
// 4
// 5
```

```js
// Answer
const o = {
  data: [1, 2, 3, 4, 5],
  position: 0,
  next() {
    if (this.position === this.data.length) {
      this.position = 0
      return {
        done: true,
      }
    }

    return {
      value: this.data[this.position++],
      done: false,
    }
  },
  [Symbol.iterator]() {
    return this
  },
}
```

```js
// Better Answer
const o = {
  data: [1, 2, 3, 4, 5],
  [Symbol.iterator]() {
    return this.data[Symbol.iterator]()
  },
}
```

Question: Can you iterate through the iterable `stream` and get `Hi, I am Leo` in order?

Concept: Loop

Reference: JavaScript: The Definitive Guide, 7th Edition

```js
// Question
async function iterateStream(stream) {
  // your code
}

async function main() {
  const stream = [
    new Promise((resolve) => setTimeout(() => resolve('Hi,'), 3000)),
    new Promise((resolve) => setTimeout(() => resolve("I'm"), 1000)),
    new Promise((resolve) => setTimeout(() => resolve('Leo.'), 2000)),
  ]

  const result = await iterateStream(stream)
  console.log(result)
}

main()
```

```js
// Answer
async function iterateStream(stream) {
  let result = ''

  for await (let chunk of stream) {
    result += ` ${chunk}`
  }

  return result
}
```

Question: What's the difference between `const a = Object.create({})`, `const b = Object.create(null)` and `const c = {}`?
And how to create an object equivalent to `const c = {}` with `Object.create()`?

Concept: Object

Reference: JavaScript: The Definitive Guide, 7th Edition

- `a.__proto__.__proto__` is `Object.prototype`
- `b` inherits no props or methods
- `c.__proto__` is `Object.prototype`
- `Object.create(Object.prototype)` is equivalent to `{}`

---

Question: In what situation will you use `Object.create()`?

Concept: Object

Reference: JavaScript: The Definitive Guide, 7th Edition

Guard against unintended modification of an object by a library function.

```js
let o = { x: "don't change this value" }
library.function(Object.create(o)) // Guard against accidental modifications
library.function({ ...o }) // Not exact the same, but can achieve the same goal
```
