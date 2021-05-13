# rhino-router

This library provides an implementation of a regular expression based router in ECMAScript.

[![Node.js CI](https://github.com/drhino/rhino-router/actions/workflows/node.js.yml/badge.svg)](https://github.com/drhino/rhino-router/actions/workflows/node.js.yml)
[![jsDelivr](https://badgen.net/jsdelivr/v/npm/rhino-router)](https://www.jsdelivr.com/package/npm/rhino-router)
[![npm version](https://badge.fury.io/js/rhino-router.svg)](https://npmjs.com/package/rhino-router)
[![MIT license](https://badgen.net/npm/license/rhino-router)](https://github.com/drhino/rhino-router/blob/main/LICENSE)

[![...](https://badgen.net/npm/node/rhino-router)](#)
[![...](https://badgen.net/npm/types/rhino-router)](#)
[![...](https://badgen.net/npm/dependents/rhino-router)](#)

## Install

### NPM

<sup>Requires Node 12 or newer.</sup>

```shell
npm install rhino-router
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
    route: '/blog/{category}/{article}',
    
    // When a route matches, the value of `attr` is returned.
    // Can be an Array, Object, Function, ... or undefined.
    attr: 'custom handler or attributes'
  },
  {
    // {id} must be a number.
    route: '/product/{id:[0-9]+}'
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
 *   vars: {
 *     category: 'my-category',
 *     article: 'my-article'
 *   },
 *   attr: 'custom handler or attributes'
 * }
 */
const result = router.match('/blog/my-category/my-article')
```

```javascript
/**
 * route: '/product/{id:[0-9]+}'
 *
 * returns: false
 * => {id}:'my-title' is not numeric.
 */
const result = router.match('/product/my-title')
```

### Example route patterns

Regex       | Example             | Info
------------|---------------------|---------------------------------------------------------
`[^/]+`     | `{myVar}`           | Default — Matches the value until the first found slash.
`[^-]+`     | `{from:[^-]+}-{to}` | Anything until the first dash.
`[0-9]+`    | `{id:[0-9]+}`       | Matches numeric values only.
`\d+`       | `{id:\\d+}`         | Same as above. Backslashes should be escaped.
`.*`        | `{route:.*}`        | Match everything.
`[a-zA-Z]+` | `{title:[a-zA-Z]+}` | Match uppercase and lowercase A-z only.
`[a-z-]+`   | `{title:[a-z-]+}`   | Match lowercase characters and a dash.
`[a-z0-9-]+`| `{title:[a-z0-9-]+}`| Match lowercase, numeric and a dash.
`en\|nl`    | `{lang:en\|nl}`     | Matches 'en' or 'nl'.
`(en\|nl)`  | `{lang:(en\|nl)}`   | Same as above.
`(?:en\|nl)`| `{lang:(?:en\|nl)}` | Same as above.

## Examples
- Browser Blog example

---

![Updated Badge](https://badges.pufler.dev/updated/drhino/rhino-router)
![Created Badge](https://badges.pufler.dev/created/drhino/rhino-router)
![Visits Badge](https://badges.pufler.dev/visits/drhino/rhino-router)

### Credits
<sup>This library is based on the PHP router: [FastRoute](https://github.com/nikic/FastRoute)</sup>
