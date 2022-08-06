# Force Synchronous Layout

A flow when you change some style with script:

JavaScript -> Style -> Layout -> Paint -> Composite

## What CSS triggers?

See: https://csstriggers.com/

## Causes of Forced Synchronous Layout

When you read -> write -> read -> write ..., browser needs to re-layout many
times before your read. That causes forced synchronous layout.

```js
const paragraphs = document.querySelectorAll('p')
paragraphs.forEach((p) => {
  const originalWidth = p.offsetWidth
  p.style.width = originalWidth + 1 + 'px'
})
```
