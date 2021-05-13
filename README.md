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
import { add, dispatch } from 'rhino-router'
```

### CDN

```javascript
import { add, dispatch } from 'https://cdn.jsdelivr.net/npm/rhino-router@3'
```

## Usage

### Defining routes

By default the `route` key uses a syntax where `{foo}` specifies a placeholder with the name `foo` and matching the regex `[^/]+`. The pattern of the placeholder can be adjusted by specifying e.g:  `{bar:[0-9]+}`.

```javascript
add({
  route: '/blog/{category}/{article}',
    
  // Add anything you want.
  attr1: 'custom handler',
  attr2: '... or attributes'
})

add({
  // {id} must be a number.
  route: '/product/{id:[0-9]+}'
})
```

### Matching routes

The method `dispatch(pathname)` returns an `Object` or `FALSE` when no matching route is found.

example:
```javascript
const result = dispatch('/blog/my-category/my-article')
```
returns:
```javascript
const result = {
  // The matching route pattern.
  route: '/blog/{category}/{article}',

  // The placeholders with their values.
  vars: {
    category: 'my-category',
    article: 'my-article'
  },

  // All your custom attributes.
  attr1: 'custom handler',
  attr2: '... or attributes',
  // ...

  // Useful for debugging.
  placeholders: ['category', 'article'],
  pattern: '^/blog/([^/]+)/([^/]+)$'
}
```

example:
```javascript
// route: '/product/{id:[0-9]+}'
const result = dispatch('/product/my-title')
```
returns:
```javascript
const result = false

// {id}:'my-title' is not a number.
```

---

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

---

## Examples
- Browser Blog example

---

![Updated Badge](https://badges.pufler.dev/updated/drhino/rhino-router)
![Created Badge](https://badges.pufler.dev/created/drhino/rhino-router)
![Visits Badge](https://badges.pufler.dev/visits/drhino/rhino-router)

### Credits
<sup>This library is based on the PHP router: [FastRoute](https://github.com/nikic/FastRoute)</sup>
