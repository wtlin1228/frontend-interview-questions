# Basic JS

## Closure

A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function's scope from an inner function. In JavaScript, closures are created every time a function is created, at function creation time.

Every closure has three scopes:

- Local scope (Own scope)
- Enclosing scope (can be block, function, or module scope)
- Global scope

A common mistake: No matter what field you focus on, the message about your age will be displayed.

```js
function showHelp(help) {
  document.getElementById('help').textContent = help
}

function setupHelp() {
  var helpText = [
    { id: 'email', help: 'Your e-mail address' },
    { id: 'name', help: 'Your full name' },
    { id: 'age', help: 'Your age (you must be over 16)' },
  ]

  for (var i = 0; i < helpText.length; i++) {
    // Culprit is the use of `var` on this line
    var item = helpText[i]
    document.getElementById(item.id).onfocus = function () {
      showHelp(item.help)
    }
  }
}

setupHelp()
```

This is because the variable item is declared with var and thus has function scope due to hoisting.

One solution in this case is to use more closures: in particular, to use a function factory as described earlier:

```js
function showHelp(help) {
  document.getElementById('help').textContent = help
}

function makeHelpCallback(help) {
  return function () {
    showHelp(help)
  }
}

function setupHelp() {
  var helpText = [
    { id: 'email', help: 'Your e-mail address' },
    { id: 'name', help: 'Your full name' },
    { id: 'age', help: 'Your age (you must be over 16)' },
  ]

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i]
    document.getElementById(item.id).onfocus = makeHelpCallback(item.help)
  }
}

setupHelp()
```

Or simply use `let` or `const` so every closure binds the block-scoped variable.

## Hoisting

JavaScript Hoisting refers to the process whereby the interpreter appears to move the declaration of functions, variables or classes to the top of their scope, prior to execution of the code.

### Function hoisting

```js
catName('Tiger')

function catName(name) {
  console.log("My cat's name is " + name)
}
```

### Variable hoisting

Hoisting works with variables too, so you can use a variable in code before it is declared and/or initialized.

However JavaScript only hoists declarations, not initializations! This means that initialization doesn't happen until the associated line of code is executed, even if the variable was originally initialized then declared, or declared and initialized in the same line.

```js
console.log(num) // Returns 'undefined' from hoisted var declaration (not 6)
var num // Declaration
num = 6 // Initialization
console.log(num) // Returns 6 after the line with initialization is executed.
```

### let and const hoisting

Variables declared with let and const are also hoisted but, unlike var, are not initialized with a default value. An exception will be thrown if a variable declared with let or const is read before it is initialized.

```js
console.log(num) // Throws ReferenceError exception as the variable value is uninitialized
let num = 6 // Initialization
```

A let or const variable is said to be in a "temporal dead zone" (TDZ) from the start of the block until code execution reaches the line where the variable is declared.

### class hoisting

Classes defined using a class declaration are hoisted, which means that JavaScript has a reference to the class. However the class is not initialized by default, so any code that uses it before the line in which it is initialized is executed will throw a ReferenceError.

## Scope

The scope is the current context of execution in which values and expressions are "visible" or can be referenced. If a variable or expression is not in the current scope, it will not be available for use. Scopes can also be layered in a hierarchy, so that child scopes have access to parent scopes, but not vice versa.

- Global scope: The default scope for all code running in script mode.
- Module scope: The scope for code running in module mode.
- Function scope: The scope created with a function.
- Block scope: The scope created with a pair of curly braces (a block).

Blocks only scope let and const declarations, but not var declarations.

```js
{
  const x = 1
}
console.log(x) // ReferenceError: x is not defined
```

```js
{
  var x = 1
}
console.log(x) // 1
```

## The event loop

Event Loop is responsible for executing the code, collecting and processing events, and executing queued sub-tasks.

```js
function foo(b) {
  let a = 10
  return a + b + 11
}

function bar(x) {
  let y = 3
  return foo(x * y)
}

const baz = bar(7) // assigns 42 to baz
```

Order of operations:

- When calling bar, a first frame is created containing references to bar's arguments and local variables.
- When bar calls foo, a second frame is created and pushed on top of the first one, containing references to foo's arguments and local variables.
- When foo returns, the top frame element is popped out of the stack (leaving only bar's call frame).
- When bar returns, the stack is empty.

### Heap

Objects are allocated in a heap which is just a name to denote a large (mostly unstructured) region of memory.

### Queue

A JavaScript runtime uses a message queue, which is a list of messages to be processed. Each message has an associated function that gets called to handle the message.

### Scheduling Tasks

ref: https://www.youtube.com/watch?v=8eHInw9_U8k

Node and browser environment has a little different -> the `nanotask`

```js
synchronous(() => console.log('Sync 1'))
task(() => console.log('Task 1'))
microtask(() => console.log('Microtask 1'))
task(() => console.log('Task 2'))
synchronous(() => console.log('Sync 2'))
microtask(() => console.log('Microtask 2'))

// Output:
// Sync1
// Sync2
// Microtask 1
// Microtask 2
// Task 1
// Task 2
```

```js
function synchronous(cb) {
  cb()
}

function microtask(cb) {
  Promise.resolve().then(() => cb())
}

// Correct and not correct, browser can add random delay for this task even you set the delay to 0.
function task(cb) {
  setTimeout(() => cb(), 0)
}

function task(cb) {
  const mc = new MessageChannel()
  mc.port1.postMessage(null)
  mc.port2.addEventListener(
    'message',
    () => {
      cb()
    },
    { once: true }
  )
  mc.port2.start()
}
```

## Arrow function expressions

### Arrow functions don't have `this`.

```js
'use strict'

const obj = {
  // does not create a new scope
  i: 10,
  b: () => console.log(this.i, this),
  c() {
    console.log(this.i, this)
  },
}

obj.b() // prints undefined, Window { /* … */ } (or the global object)
obj.c() // prints 10, Object { /* … */ }
```

Because a class's body has a this context, arrow functions as class fields close over the class's this context and the this inside the arrow function's body will correctly point to the instance (or the class itself, for static fields). However, because it is a closure, not the function's own binding, the value of this will not change based on the execution context.

```js
class C {
  a = 1
  autoBoundMethod = () => {
    console.log(this.a)
  }
  normalMethod() {
    console.log(this.a)
  }
}

const c = new C()
c.autoBoundMethod() // 1
c.normalMethod() // 1

const { autoBoundMethod, normalMethod } = c
autoBoundMethod() // 1
normalMethod() // Uncaught TypeError: Cannot read properties of undefined (reading 'a')

const obj = { a: 99 }
autoBoundMethod.call(obj) // still 1
normalMethod.call(obj) // 99
```

### No binding of arguments

Arrow functions do not have their own arguments object. Thus, in this example, arguments is a reference to the arguments of the enclosing scope:

```js
const arguments = [1, 2, 3]
const arr = () => arguments[0]

arr() // 1

function foo(n) {
  const f = () => arguments[0] + n // foo's implicit arguments binding. arguments[0] is n
  return f()
}

foo(3) // 3 + 3 = 6
```
