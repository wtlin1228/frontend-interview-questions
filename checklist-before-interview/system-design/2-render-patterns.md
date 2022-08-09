# Render Patterns

Make your decision based on the core web vitals:

- Time To First Byte
- First Contentful Paint
- Largest Contentful Paint
- Time To Interactive
- Cumulative Layout Shift
- First Input Delay

And you should also aware of developer experience:

- Fast build time
- Low server cost
- Dynamic content
- Easy rollbacks
- Reliable uptime
- Scalable infrastructure

Ok, those are the patterns you can choose from:

- SSG
- ISR
- SSR
- CSR
- Static Rendering
- Streaming SSR
- Edge Rendering
- React Server Components

## Static Rendering

Overall:

- HTML gets generated at build time
- Easily cacheable by CDN

Best for pages that:

- do not contain request-based data

### Plain Static Rendering

- HTML gets generated at build time
- Easily cacheable by CDN

Best for pages that:

- do not contain request-based data
- are not user-specific
- can be cached globally

### Static with Client-Side fetch

- HTML gets generated at build time
- Easily cacheable by CDN
- Dynamic data gets fetched client-side

Best for pages that:

- contain data that should refresh on every page load
- contain stable placeholder components

### Static with getStaticProps

- HTML gets generated at build time
- Easily cacheable by CDN
- `getStaticProps` method runs at build time to generate HTML containing data

Best for pages that:

- contain data that is available at build time
- are not user-specific
- can be cached globally

### Incremental Static Regeneration

- Generate some pages at build time, others on-demand
- Easily cacheable by CDN
- Automatically invalidate cache/regenerate pages
- Reduce build times

Best for pages that:

- should be regenerated on a certain interval or on-demand
- are not user-specific
- cab be cached globally

### On-demand Incremental Static Regeneration

- Generate some pages at build time, others on-demand
- Easily cacheable by CDN
- Invalidate cache/regenerate pages on-demand
- Reduce build times

Best for pages that:

- should be regenerated based on certain events
- are not user-specific
- cab be cached globally

|                          | Plain Static Rendering | Static with Client-Side fetch | Static with getStaticProps | Incremental Static Regeneration | On-demand Incremental Static Regeneration |
| ------------------------ | :--------------------: | :---------------------------: | :------------------------: | :-----------------------------: | :---------------------------------------: |
| Time To First Byte       |           ✅           |              ✅               |             ✅             |               ✅                |                    ✅                     |
| First Contentful Paint   |           ✅           |              ✅               |             ✅             |               ✅                |                    ✅                     |
| Largest Contentful Paint |           ✅           |              😖               |             ✅             |               ✅                |                    ✅                     |
| Time To Interactive      |           ✅           |              ✅               |             ✅             |               ✅                |                    ✅                     |
| Cumulative Layout Shift  |           ✅           |              😖               |             ✅             |               ✅                |                    ✅                     |
| First Input Delay        |           ✅           |              ✅               |             ✅             |               ✅                |                    ✅                     |
| Fast build time          |           ✅           |              ✅               |             😖             |               ✅                |                    ✅                     |
| Low server cost          |           ✅           |              😖               |             ✅             |               😖                |                    ✅                     |
| Easy rollbacks           |           ✅           |              ✅               |             ✅             |               ✅                |                    ✅                     |
| Reliable uptime          |           ✅           |              😖               |             ✅             |               ✅                |                    ✅                     |
| Dynamic content          |           😖           |              ✅               |             😖             |               ✅                |                    ✅                     |
| Scalable infrastructure  |           ✅           |              😖               |             ✅             |               ✅                |                    ✅                     |

## Server-Side Rendering

Overall:

- HTML page is generated on every request
- `getServerSideProps` runs on every request
- Returned content is always unique

Best for pages that:

- contain highly personalized content
- use request-based data, such as cookies
- should be render-blocking

✨ Optimizing SSR Performance ✨

- Avoid long `getServerSideProps` execution
- Deploy serverless functions in a region close to your database
- Add `Ceche-Control` headers (if you really can't use ISR)
- Upgrading your hardware

|                          | Plain Static Rendering |
| ------------------------ | :--------------------: |
| Time To First Byte       |           😖           |
| First Contentful Paint   |           😖           |
| Largest Contentful Paint |           😖           |
| Time To Interactive      |           😖           |
| Cumulative Layout Shift  |           ✅           |
| First Input Delay        |           😖           |
| Fast build time          |           ✅           |
| Low server cost          |           😖           |
| Easy rollbacks           |           😖           |
| Reliable uptime          |           😖           |
| Dynamic content          |           ✅           |
| Scalable infrastructure  |           ✅           |

## Streaming SSR + React Server Components

Overall:

- Zero client-side JavaScript needed
- Render React component on the server
- Combine a static page with dynamic components

Best for components that:

- use large dependencies
- require request-based data

# Reference

- Advanced Rendering Patterns: Lydia Hallie - https://www.youtube.com/watch?v=PN1HgvAOmi8
