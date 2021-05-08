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
