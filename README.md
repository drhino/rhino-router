# rhino-router

This library provides an implementation of a regular expression based router in ECMAScript.

[![Node.js CI](https://github.com/drhino/rhino-router/actions/workflows/node.js.yml/badge.svg)](https://github.com/drhino/rhino-router/actions/workflows/node.js.yml)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/rhino-router/badge)](https://www.jsdelivr.com/package/npm/rhino-router)
[![npm version](https://badge.fury.io/js/rhino-router.svg)](https://npmjs.com/package/rhino-router)

## Install

### NPM

<sup>Requires Node 12 or newer.</sup>

```shell
npm i rhino-router
```
```javascript
import RhinoRouter from 'rhino-router'
```

### CDN

```javascript
import RhinoRouter from 'https://cdn.jsdelivr.net/npm/rhino-router@2'
```

## Usage

### Defining routes

By default the `route` key uses a syntax where `{foo}` specifies a placeholder with the name `foo` and matching the regex `[^/]+`. The pattern of the placeholder can be adjusted by specifying e.g:  `{bar:[0-9]+}`.

```javascript
const routes = [
  {
    route: '/my/route',
    // When a route matches, the value of `attr` is returned.
    // Can be an Array, Object, Function, ...
    attr: 'anything you want'
  },
  {
    route: '/blog/{category}/{article}',
    attr: {
      controller: 'BlogController'
    }
  },
  {
    // {id} must be a number (\d+)
    route: '/product/{id:\\d+}'
  }
]

const router = new RhinoRouter(routes)
```

### Matching routes

The method: `.match(pathname)` returns an `Object` or `FALSE` when no matching route is found.

```javascript
/**
 * route: '/blog/{category}/{article}'
 *
 * returns:
 * {
 *   attr: {
 *     controller: 'BlogController'
 *   },
 *   vars: {
 *     category: 'my-category',
 *     article: 'my-article'
 *   }
 * }
 */
const result = router.match('/blog/my-category/my-article')
```

```javascript
/**
 * route: '/product/{id:\\d+}'
 *
 * returns: false
 * => 'title' is not numeric.
 */
const result = router.match('/product/title')
```

### Example route patterns

Regex       | Example             | Info
------------|---------------------|---------------------------------------------------------
`[^/]+`     | `{myVar}`           | Default — Matches the value until the first found slash.
`[^-]+`     | `{from:[^-]+}-{to}` | Anything until the first dash.
`[0-9]+`    | `{id:[0-9]+}`       | Matches numeric values only.
`\d+`       | `{id:\\d+}`         | Same as above. Backslashes should be escaped.
`.*`        | `{route:.*}`        | Match everything.
`[a-zA-Z]+` | `{myVar:[a-zA-Z]+}` | Match uppercase and lowercase A-z only.
`[a-z-]+`   | `{title:[a-z-]+}`   | Match lowercase characters and a dash.

## Examples
- Browser Blog example

---

### Credits
<sup>This library is based on the PHP router: [FastRoute](https://github.com/nikic/FastRoute)</sup>
