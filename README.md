# rhino-router

This library provides an implementation of a regular expression based router in ECMAScript.

[![Node.js CI](https://github.com/drhino/rhino-router/actions/workflows/node.js.yml/badge.svg)](https://github.com/drhino/rhino-router/actions/workflows/node.js.yml)
[![MIT license](https://badgen.net/npm/license/rhino-router)](https://github.com/drhino/rhino-router/blob/main/LICENSE)
[![...](https://badgen.net/npm/types/rhino-router)](#)
[![npm version](https://badge.fury.io/js/rhino-router.svg)](https://npmjs.com/package/rhino-router)
[![...](https://badgen.net/npm/node/rhino-router)](#)
[![jsDelivr](https://badgen.net/jsdelivr/v/npm/rhino-router)](https://www.jsdelivr.com/package/npm/rhino-router)

## Install

```shell
npm install rhino-router
```
```shell
yarn add rhino-router
```

## Usage

### Defining routes

Dynamic patterns use the syntax: `{myVar}` or `{myVar:regex}`

```javascript
import { add, dispatch } from 'rhino-router'

add({
  route: '/blog/{category}/{article}',
    
  // Add anything you want.
  something: 'custom handler or attributes'
})

add({
  // {id} must be a number.
  route: '/product/{id:[0-9]+}'
})

const result = dispatch('/product/99')
```

By default the `route` key uses a syntax where `{foo}` specifies a placeholder with the name `foo` and matching the regex `[^/]+`. The pattern of the placeholder can be adjusted by specifying e.g:  `{bar:[0-9]+}`.

This means that `{foo}` is exactly the same as `{foo:[^/]+}`.
Please note that the colon `:` is not part of the regex.

---

### Matching routes

The method `dispatch(pathname)` returns an `Object` or `FALSE` when no matching route is found.

The method `dispatch(pathname)` returns an `Object`. When no match is found, a `NotFoundException` is thrown.

example:
```javascript
// route: '/blog/{category}/{article}'
const result = dispatch('/blog/my-category/my-article')
```
returns:
```javascript
{
  // The matching route pattern.
  route: '/blog/{category}/{article}',

  // The placeholders with their values.
  vars: {
    category: 'my-category',
    article: 'my-article'
  },

  // Custom attributes.
  something: 'custom handler or attributes'
  // ...
}
```

returns `FALSE`:
```javascript
// route: '/product/{id:[0-9]+}'
const result = dispatch('/product/Not-A-Number')

// Placeholder: "id" with value: "my-title" is not a number.
```

---

### Example route patterns

Regex       | Example             | Info
------------|---------------------|---------------------------------------------------------
`[^/]+`     | `{myVar}`           | Default — Matches the value until the first found slash.
`[^-]+`     | `{from:[^-]+}-{to}` | Anything until the first dash.
`[0-9]+`    | `{id:[0-9]+}`       | Matches numeric values only.
`\d+`       | `{id:\\d+}`         | Same as above. Backslashes must be escaped.
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
