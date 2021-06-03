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

Dynamic route patterns use the syntax: `{myVar}` or `{myVar:regex}`

```javascript
import { add, dispatch } from 'rhino-router'

add({
  // The route key is required.
  route: '/blog/{category}/{article}',
  
  // Optionally, add HTTP methods.
  // methods: ['GET'],
    
  // Add anything else you want.
  something: 'custom handler or attributes'
  // ...
})

add({
  // {id} must be a number.
  route: '/product/{id:[0-9]+}',
  methods: ['GET', 'POST']
})

const result = dispatch('/product/99')
```

By default the `route` key uses a syntax where `{foo}` specifies a placeholder with the name `foo` and matching the regex `[^/]+`. The pattern of the placeholder can be adjusted by specifying e.g:  `{bar:[0-9]+}`.

This means that `{foo}` is exactly the same as `{foo:[^/]+}`.
Please note that the colon `:` is not part of the regex.

The `methods` key is optional and defaults to `[GET, HEAD]`. When explicitly defining `GET` you SHOULD also add a `HEAD`.

---

### Matching routes

The method `dispatch(pathname)` returns an `Object`. When no match is found, a `NotFoundException` is thrown.

`dispatch(pathname, httpMethod)` can also throw a `MethodNotAllowedException`.

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

throws `NotFoundException`:
```javascript
try {
    // route: '/product/{id:[0-9]+}'
    const result = dispatch('/product/Not-A-Number')
}
catch (exception) {

    if (exception.name === 'NotFoundException') {
        // ...
    }
    else {
        // Re-throw other exceptions.
        throw exception
    }
}
```

throws `MethodNotAllowedException`:
```javascript
try {
    // route: '/blog/{category}/{article}'
    const result = dispatch('/blog/my-category/my-article', 'DELETE')
}
catch (exception) {

    if (exception.name === 'MethodNotAllowedException') {

        const header = {
          'Allow': exception.allowedMethods.join(', ')
        }
        
        // ...
    }
    else {
        throw exception
    }
}
```

---

### Example route patterns

Regex             | Example                  | Info
------------------|--------------------------|---------------------------------------------------------
`[^/]+`           | `{myVar}`                | Default — Matches the value until the first found slash.
`[^-]+`           | `{from:[^-]+}-{to}`      | Anything until the first dash.
`[0-9]+`          | `{id:[0-9]+}`            | Matches numeric values only.
`.*`              | `{route:.*}`             | Match everything.
`[A-Za-z]+`       | `{title:[A-Za-z]+}`      | Match uppercase and lowercase a-z.
`[-0-9A-Za-z]+`   | `{title:[-0-9A-Za-z]+}`  | Match e.g: "My-Article-1", not "My_Article_1".
`[-.0-9A-Z_a-z]+` | `{file:[-.0-9A-Z_a-z]+}` | Matches a filename e.g: "My-filename_1.ext".
`en\|nl\|fr`      | `{lang:en\|nl\|fr}`      | Matches 'en' or 'nl' or 'fr'.

---

## Examples
- [Browser module](https://github.com/drhino/rhino-router/blob/main/examples/browser.html)
- [Frontend router](https://github.com/drhino/rhino-router/tree/main/examples/frontend)
- Cloudflare Workers

---

![Updated Badge](https://badges.pufler.dev/updated/drhino/rhino-router)
![Created Badge](https://badges.pufler.dev/created/drhino/rhino-router)
![Visits Badge](https://badges.pufler.dev/visits/drhino/rhino-router)

### Credits
<sup>This library is based on the PHP router: [FastRoute](https://github.com/nikic/FastRoute)</sup>
