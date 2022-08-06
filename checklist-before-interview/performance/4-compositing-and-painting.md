# Compositing and Painting

More layers could reduce the paint time but increase the composite time. It's a trad-off.

Generally speaking, you should let the browser manages the layers cause it knows what it's doing.
But if you are hitting some paint issues, you might want to hint the browser to promote some
elements to some layers.

## Hint the browser to create a new layer

```css
will-change: transform;
```
