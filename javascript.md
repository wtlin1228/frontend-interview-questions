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
