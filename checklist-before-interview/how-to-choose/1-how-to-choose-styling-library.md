# How to choose styling library

Sass -> CSS in JS -> Zero runtime CSS in JS

CSS in JS:

- styled-component
- Emotion

Zero runtime CSS in JS:

- Linaria
- Treat

ref:

- [How does airbnb choose theirs?](https://medium.com/airbnb-engineering/airbnbs-trip-to-linaria-dc169230bd12)

## Linaria

- no JS bundle or runtime CPU overhead
- provide caching benefits since these static CSS files may change at a different cadence than the JS files
- support Atomic CSS
- support injecting the critical CSS for server-side rendering
- use CSS syntax instead of JS object
