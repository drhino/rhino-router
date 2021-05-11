import { equal } from 'assert'
import RhinoRouter from '../index.js'

// { key [:regex] }
const routes = [
  {
    route: '/fixedRoutePart/{varName}/moreFixed/{varName2:[0-9]+}',
    attr: {
      mykey: 'any custom attributes',
      other: 'values...'
    }
  },
  {
    route: '/my/route',
    attr: {
      controller: 'MyController'
    }
  },
  {
    route: '/my/{key}',
    attr: 'Something'
  },
  {
    route: '/prefix/{route:.*}',
    attr: {
      controller: 'ProxyController'
    }
  },
  {
    route: '/product/{id:\\d+}',
    attr: {
      controller: 'ProductController'
    }
  },
  {
    route: '/test/{key1}/{key2:\\d+}/{key3:[A-Z]+}/{key4}',
    //attr: null
  },
]

const router = new RhinoRouter(routes)

// ---

const routes2 = [
  '/static/route',
  '/dynamic/route/{param}',
  '/blog/{article:[a-zA-Z][a-zA-Z-]+}',
  '/{mixed}/multiple/{params}',
]

const router2 = new RhinoRouter(routes2)

// ---

describe('Testing generated route query:', function() {

  describe('Validating first input route only:', function() {
    it('Should return a regex without the route keys.', function() {
      equal(router.routes[0].route, '^/fixedRoutePart/([^/]+)/moreFixed/([0-9]+)$')
    })
  })

})

describe('Testing route input:', function() {

  describe('Valid routes:', function() {
    it('Should return the parsed route variables and custom attributes.', function() {

      const tests = [
        {
          route: '/fixedRoutePart/dynamicRoutePart/moreFixed/123',
          result: {
            vars: {
              varName: 'dynamicRoutePart',
              varName2: '123'
            },
            attr: {
              mykey: 'any custom attributes',
              other: 'values...'
            }
          }
        },
        {
          route: '/my/route',
          result: {
            vars: {},
            attr: { controller: 'MyController' }
          }
        },
        {
          route: '/my/route-2',
          result: {
            vars: { key: 'route-2' },
            attr: 'Something'
          }
        },
        {
          route: '/prefix/my/custom/route',
          result: {
            vars: { route: 'my/custom/route' },
            attr: { controller: 'ProxyController' }
          }
        },
        {
          route: '/product/99',
          result: {
            vars: { id: '99' },
            attr: { controller: 'ProductController' }
          }
        },
        {
          route: '/test/val1/2/VALUE/val4',
          result: {
            vars: {
              key1: 'val1',
              key2: '2',
              key3: 'VALUE',
              key4: 'val4'
            },
            //attr: null
          }
        },
      ]

      for (const test of tests) {
        equal(
          JSON.stringify( router.match(test.route) ),
          JSON.stringify( test.result )
        )
      }

    })
  })

  describe('Invalid routes:', function() {
    it('Should return false when no matching route is found.', function() {

      const shouldFail = [
        '/test/val1/2/shouldFail/val4',
        '/fixedRoutePart/dynamicRoutePart/moreFixed/shouldFail',
        '/my2/shouldFail',
        '/prefix-shouldFail/my/custom/route',
        '/product/shouldFail',
        '/product/',
        '/shouldFail/route/which/is/way/too/long/to/be/found',
      ]

      for (const route of shouldFail) {
        equal(router.match(route), false)
      }

    })
  })

})

// ---

describe('Testing array of routes without attributes:', function() {

  describe('Valid routes:', function() {
    it('Should return the parsed route variables (if any).', function() {

      const tests = [
        {
          route: '/static/route',
          result: {
            vars: {}
          }
        },
        {
          route: '/dynamic/route/myParam',
          result: {
            vars: { param: 'myParam' }
          }
        },
        {
          route: '/blog/my-article',
          result: {
            vars: { article: 'my-article' }
          }
        },
        {
          route: '/blog/My-Article',
          result: {
            vars: { article: 'My-Article' }
          }
        },
        {
          route: '/var1/multiple/var2',
          result: {
            vars: {
              mixed: 'var1',
              params: 'var2'
            }
          }
        },
      ]

      for (const test of tests) {
        equal(
          JSON.stringify( router2.match(test.route) ),
          JSON.stringify( test.result )
        )
      }

    })
  })

  describe('Invalid routes:', function() {
    it('Should return false when no matching route is found.', function() {
      
      const shouldFail = [
        '/static/route2',
        '/dynamic/route',
        '/dynamic/route/',
        '/blog/-invalid-article',
        '/blog/invalid-article/',
        '/mixed/multiple/params/too-much',
        '/mixed/multiple/params/',
      ]

      for (const route of shouldFail) {
        equal(router2.match(route), false)
      }

    })
  })

})
