# Fast Load Times

## What is speed?

Users are looking for certain types of feedback:

1. Is it happened? map to `First Paint` and `First Contentul Paint`
1. Is it useful? map to `First Meaning Paint`
1. Is it usable? map to `Time to Interactive`
1. Is it delightful?

## How to measure speed?

1. Lighthouse
1. Chrome User Experience Report
1. PageSpeed Insights
1. Chrome Developer Tools

## How to stay fast?

Include performance budgets into the CI.

|                                   |              |           |
| --------------------------------- | ------------ | --------- |
| Time To Interactive on slow 3G    | Less than    | 5 seconds |
| First Contentful Paint on slow 3G | Less than    | 2 seconds |
| Lighthouse performance score      | Greater than | 80        |
| Total JavaScript size             | Less than    | 170 kb    |

## Measure performance with the RAIL model

RAIL:

1. Response (process events in under 50ms)
1. Animation (produce a frame in 10 ms)
1. Idle (maximize idle time)
1. Load (deliver content and become interactive in under 5 seconds)

|                 |                                 |
| --------------- | ------------------------------- |
| 0 to 16 ms      | Animation                       |
| 0 to 100 ms     | Respond                         |
| 100 to 1000 ms  | loading pages or changing views |
| 1000 ms or more | 💔                              |

## Optimize your images

### Choose the right image format

| Vector                                     | Raster                                                                  |
| ------------------------------------------ | ----------------------------------------------------------------------- |
| logos, text, or icons                      | complex photo                                                           |
| sharp at every resolution and zoom setting | need to save multiple versions of a raster image at various resolutions |
| good for high resolution screen            | image size becomes big in high resolution screen                        |
| SVG                                        | PNG, JPEG, WebP, or AVIF                                                |

### Choose the correct level of compression

- reduce the "bit-depth" - 8 bits per channel gives us 256 values per channel and 16,777,216 (256 ^ 3) colors in total. What if you reduce the palette to 256 colors? Then you would only need 8 bits in total for the RGB channels and immediately save two bytes per pixel—that's 50% compression savings over the original 4 bytes per pixel format!
- delta encoding - instead of storing the individual values for each pixel, you can store the difference between nearby pixels: if the adjacent pixels are the same, then the delta is "zero" and you only need to store a single bit!
- lossy & lossless image compression - prefer WebP and AVIF images.

### Serve responsive images

Can use something like `Sharp` to automatically convert the images. If you are AWS S3, you can setup AWS lamda to subscribe the upload event of images. Then resize the images into different sizes.

| Before                         | After                                                                                              |
| ------------------------------ | -------------------------------------------------------------------------------------------------- |
| `<img src="flower-large.jpg">` | `<img src="flower-large.jpg" srcset="flower-small.jpg 480w, flower-large.jpg 1080w" sizes="50vw">` |

## Lazy-load images and videos

Medium loads lightweight placeholder images at page load, and replaces them with lazily-loaded images as they're scrolled into the viewport.

## Optimize your JavaScript

### Apply instant loading with the PRPL pattern

PRPL is an acronym that describes a pattern used to make web pages load and become interactive, faster:

- Push (or preload) the most important resources.

  Preload critical resources

  ```js
  <link rel="preload" as="style" href="css/style.css">
  ```

- Render the initial route as soon as possible.

  To improve First Paint, Lighthouse recommends inlining critical JavaScript and deferring the rest using async,
  as well as inlining critical CSS used above-the-fold.

  Another approach to improve First Paint is to server-side render the initial HTML of your page.
  However, this can increase the payload of the HTML file significantly, which can harm Time to Interactive,
  or the time it takes for your application to become interactive and can respond to user input.

- Pre-cache remaining assets.

  Service workers can fetch assets directly from the cache rather than the server on repeat visits.
  You can use Workbox to create and maintain a service worker to cache assets.

- Lazy load other routes and non-critical assets.

  Split the entire bundle and lazy load chunks on demand.

### Reduce JavaScript payloads with code splitting

Popular module bundlers like webpack, Parcel, and Rollup allow you to split your
bundles using dynamic imports.

Splitting on the route or component level when using a client-side framework is
a simpler approach to lazy loading different parts of your application.

### Remove unused code

The Coverage tab in DevTools will also tell you how much CSS and JS code in your application is unused.

### Publish, ship, and install modern JavaScript for faster applications

```
{
  "name": "foo",
  "exports": "./modern.js",
  "main": "./legacy.cjs",
  "module": "./module.js"
}
```

## Optimize your resource delivery

### Content delivery networks (CDNs)

For AWS, you can use CloudFront which is a global service (deploy to edge locations).
For static files, you can setup TTL=3600. And for dynamic files, you can setup TTL=0 since
CloudFront sends your request by the private internet to your servers. That's faster.

CDN implementations of HTTP/2 resource prioritization vary wildly.

### Enable HTTP/2

- Multiplexing

  Multiplexing enables a single TCP connection to serve multiple request-response pairs at the same time.

  Multiplexing theoretically removes the need for HTTP/1 optimizations like concatenation and sprite sheets - however, in practice, these techniques will remain relevant given that larger files compress better.

- Stream prioritization

  Multiplexing enables multiple concurrent streams; stream prioritization provides an interface for communicating relative priority of each of these streams. This helps the server to send the most important resources first - even if they weren't requested first.

### Enable HTTP/3

- Elimination of head-of-line blocking

  Because HTTP/3 uses UDP instead of TCP

- Reduced connection setup time

## Prioritize resources

it's useful to know Chrome's priority for each resource.

So what can you do if you find any resources that are marked with a different priority than the one you'd want?

- `<link rel="preload">` informs the browser that a resource is needed as part of the current navigation, and that it should start getting fetched as soon as possible.

- `<link rel="preconnect">` informs the browser that your page intends to establish a connection to another origin, and that you'd like the process to start as soon as possible.

- `<link rel="prefetch">` is somewhat different from `<link rel="preload">` and `<link rel="preconnect">`, in that it doesn't try to make something critical happen faster; instead, it tries to make something non-critical happen earlier, if there's a chance.

### Preload critical assets to improve loading speed

- Preloading resources defined in CSS.

  ex: fonts defined inside the CSS. It won't be requested until browser parses the CSS file

- Preloading CSS files.

  If you are using the critical CSS approach, you split your CSS into two parts. The critical CSS required for rendering the above-the-fold content is inlined in the `<head>` of the document and non-critical CSS is usually lazy-loaded with JavaScript.

- Preloading JavaScript files.

  Because browsers don't execute preloaded files, preloading is useful to separate fetching from execution which can improve metrics such as Time to Interactive. Preloading works best if you split your JavaScript bundles and only preload critical chunks.
