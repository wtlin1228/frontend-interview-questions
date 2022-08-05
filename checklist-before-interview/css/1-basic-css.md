# Basic CSS

## box model

Every box is composed of four parts (or areas), defined by their respective edges: the content edge, padding edge, border edge, and margin edge.

box-sizing:

- content-box: If the box-sizing property is set to content-box (default) and if the element is a block element, the content area's size can be explicitly defined with the width, min-width, max-width, height, min-height, and max-height properties.
- padding-box: Extend the content area to include the element's padding.
- border-box: Extend the padding area to include the element's borders.
- margin-box: Extend the border area to include an empty area used to separate the element from its neighbors

## reset vs normalize CSS

Reset CSS: CSS resets aim to remove all built-in browser styling. For example margins, paddings, font-sizes of all elements are reset to be the same.

Normalize CSS: Normalize CSS aims to make built-in browser styling consistent across browsers. It also corrects bugs for common browser dependencies.

## inline vs inline-block vs block

`Block Element`: The block elements always start on a new line. They will also take space for an entire row or width. List of block elements are `<div>`, `<p>`.

`Inline Elements`: Inline elements don't start on a new line, they appear on the same line as the content and tags beside them. Some examples of inline elements are `<a>`, `<span>`, `<strong>`, and `<img>` tags.

`Inline Block Elements`: Inline-block elements are similar to inline elements, except they can have padding and margins and set height and width values.

## browser support

- `Can I use`: https://caniuse.com/
- `PostCSS`: Like `Babel` transforms the JS code. `PostCSS` transforms the CSS code.
- `@support`
- `normalize.css`

  ```css
  @supports (display: grid) {
    div {
      display: grid;
    }
  }
  ```

## Pseudo-elements vs Pseudo-classes

`Pseudo-elements` allows us to create items that do not normally exist in the document tree.

- `::before`
- `::after`
- `::first-letter`
- `::first-line`
- `::selection`

`Pseudo-classes` select regular elements but under certain conditions.

- `:link`
- `:visited`
- `:hover`
- `:active`
- `:focus`

## How are the CSS selectors matched against the elements by the browser?

The order of matching selectors goes from right to left of the selector expression. The elements in the DOM are filtered by browsers based on the key selectors and are then traversed up to the parent elements for determining the matches. The speed of determining the elements depends on the length of the chain of selectors.

```css
/*
When browser matches a `span`, it will traverse up to see whether the
parent element is a `p` or not.
*/
p span {
  color: black;
}
```

## How to center align a div inside another div?

1. with table

```css
.container {
  display: table-cell;
  vertical-align: middle;
  text-align: center;

  background-color: red;
  width: 500px;
  height: 500px;
}

.inner {
  background-color: pink;
  display: inline-block;
  width: 100px;
  height: 100px;
}
```

2. with transform

```css
.container {
  position: relative;

  background-color: red;
  width: 500px;
  height: 500px;
}

.inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: pink;
  width: 100px;
  height: 100px;
}
```

3. with flexbox

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: red;
  width: 500px;
  height: 500px;
}

.inner {
  background-color: pink;
  width: 100px;
  height: 100px;
}
```

4. with grid

```css
.container {
  display: grid;
  place-content: center;

  background-color: red;
  width: 500px;
  height: 500px;
}

.inner {
  background-color: pink;
  width: 100px;
  height: 100px;
}
```

## What is the grid system?

CSS Grid Layout is the most powerful layout system available in CSS. It is said to be a 2-dimensional system, meaning it can handle both columns and rows, unlike flexbox which is largely a 1-dimensional system.

## What is specificity? How to calculate specificity?

Specificity is the algorithm used by browsers to determine the CSS declaration that is the most relevant to an element, which in turn, determines the property value to apply to the element. The specificity algorithm calculates the weight of a CSS selector to determine which rule from competing CSS declarations gets applied to an element.

- ID column: 1-0-0
- CLASS column: 0-1-0
- TYPE column: 0-0-1
- No value: 0-0-0

```css
#myElement {
  color: yellow; /* 1-0-0  */
}
#myApp [id='myElement'] {
  color: green; /* 1-1-0  - WINS!! */
}
```
