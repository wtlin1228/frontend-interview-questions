# Critical Rendering Path

what happens in these intermediate steps between receiving the HTML, CSS, and JavaScript bytes and
the required processing to turn them into rendered pixels - that's the critical rendering path.

```

  ┌───────────┐
  │    DOM    ◄------------┐
  └─────┬─────┘            |
        │           ┌────────────┐
        │           │ JavaScript │
        │           └────────────┘
  ┌─────▼─────┐            |
  │   CSSOM   ◄------------┘
  └─────┬─────┘
        │
 ┌──────▼──────┐
 │ Render Tree │
 └──────┬──────┘
        │
  ┌─────▼─────┐
  │   Layout  │
  └─────┬─────┘
        │
  ┌─────▼─────┐
  │   Paint   │
  └───────────┘

```

## Render Blocking

1. HTML

   This is obvious, since without the DOM we would not have anything to render.

1. CSS

   The browser wouldn't render any processed content until the CSSOM is constructed.

   Media types and media queries allow us to mark some CSS resources as non-render blocking.

   ```html
   <link href="style.css" rel="stylesheet" />
   <link href="print.css" rel="stylesheet" media="print" />
   <link href="other.css" rel="stylesheet" media="(min-width: 40em)" />
   ```

ref: https://web.dev/critical-rendering-path-render-blocking-css/

## Parser Blocking

JavaScript is parser blocking.

Our script is executed at the exact point where it is inserted in the document. When the HTML parser encounters a script tag, it pauses its process of constructing the DOM and yields control to the JavaScript engine; after the JavaScript engine finishes running, the browser then picks up where it left off and resumes DOM construction.

JavaScript is blocked by CSSOM.

What if the browser hasn't finished downloading and building the CSSOM when we want to run our script? The answer is simple and not very good for performance: the browser delays script execution and DOM construction until it has finished downloading and constructing the CSSOM.

Therefore, if you have JavaScript, browser would need to wait for CSSOM ready -> Execute JavaScript -> Go back to construct DOM. That's delay the whole critical rendering path!

To make JavaScript non-parser blocking: use `async` or `defer`:

```html
<script src="foo.js" async></script>
<script src="bar.js" defer></script>
```

ref: https://web.dev/critical-rendering-path-adding-interactivity-with-javascript/

### Difference between async and defer

The way I understand it, async and defer both instruct the browser to download the script(s) in a separate thread, while the rest of the page (the DOM, etc.) is downloading…so the page loading is not blocked by the scripts. The difference is that the async scripts will run as soon as they are available, in whatever order they download, whereas the defer scripts will not run until the page has finished loading, and will run in the order they appear on the page.

So,

use `async` if you don't care the execution order and your script doesn't depend on the DOM.

use `defer` if you do care the execution order or your script depends on the DOM.

ref: https://discourse.mozilla.org/t/async-v-s-defer/53819

## Construct the Document Object Model

Bytes → Characters → Tokens → Nodes → DOM

So, the DOM is the full parts representation of the HTML markup.

## Construct the CSS Object Model

Bytes → Characters → Tokens → Nodes → CSSOM

ref: https://web.dev/critical-rendering-path-constructing-the-object-model/#css-object-model-cssom

## Construct the Render Tree

1. Starting at the root of the DOM tree, traverse each visible node.
1. For each visible node, find the appropriate matching CSSOM rules and apply them.
1. Emit visible nodes with content and their computed styles.

With the render tree in place, we can proceed to the "layout" stage.

ref: https://web.dev/critical-rendering-path-render-tree-construction/

## Optimize Critical Rendering Path

To deliver the fastest possible time to first render, we need to minimize three variables:

- The number of critical resources.
- The critical path length.
- The number of critical bytes.

ref: https://web.dev/critical-rendering-path-optimizing-critical-rendering-path/

## Analyzing Critical Rendering Path Performance

ref: https://web.dev/critical-rendering-path-analyzing-crp/#performance-patterns

## Incremental HTML delivery

Take google search as an example.

```
   ┌────────────┐           ┌─────────┬──────┐         ┌─────────┬──────┐
   │Request Page│           │Build DOM│Render│         │Build DOM│Render│
   └──────┬─────┘           └─────────┴──────┘         └─────────┴──────┘
          │
    ┌─────▼────┐           ┌───────────┐              ┌───────────────┐
    │ GET HTML ├───────────► Page Head ├──────────────► Search Result │
    └──────────┘           └───────────┘              └───────────────┘
```

the important part is that the server does not have wait to render the full response before returning
it to the client. The sooner you can flush some data, the sooner the browser can start building the DOM,
and discover and dispatch requests for other critical resources.
