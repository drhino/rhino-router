import { equal } from 'assert'
import { add, dispatch } from '../dist/index.min.js'

// Route patterns.
const routes = [
    '/',
    '/fixed/route/pattern',
    // { key [:regex] }
    '/blog/{category}/{article:[-0-9A-Za-z]+}',
    '/flight/{from:[^-]+}-{to}',
    '/{lang:en|nl}',
    '/prefix/{route:.*}/suffix',
]

const shouldFail = [
    '/way/too/long/and/undefined/should/not/work',
    '/fixed/route/pattern/',        // Does not match trailing slash.
    '/blog/my-category/my_article', // Pattern does not allow underscores.
    '/flight/LAX',                  // No dash in URL.
    '/fr',                          // Only 'en' or 'nl' allowed.
    '/prefix/complete/path',        // Requires '/suffix' at the end.
]

// Matches the index of ${routes} for the returned route pattern.
const shouldWork = [
    // The route key here is the input. The returned value is the route pattern.
    // e.g:  input: '/blog/my-category', pattern: '/blog/{category}'.
    // An empty object for `vars` is returned when a fixed pattern is used.
    { route: '/', vars: {} },
    { route: '/fixed/route/pattern', vars: {} },
    { route: '/blog/my-category/my-article', 
        vars: { category: 'my-category', article: 'my-article' } },
    { route: '/flight/LAX-BRU', vars: { from: 'LAX', to: 'BRU' } },
    { route: '/nl', vars: { lang: 'nl' } },
    { route: '/prefix/complete/path/suffix', vars: { route: 'complete/path' } }
]

// Dummy data to return for each `shouldWork` route.
const returns = { something: 'handler', somethingElse: ['something'] }

// Add routes with dummy data to router.
for (const route of routes) {
    add({ ...returns, route })
}

/**
 * Detects wether the input routes WORK as expected.
 */
describe('Valid routes:', function() {
    it('Should return the route variables and custom attributes.', function() {
        
        let index = 0
        
        for (const route of shouldWork) {
            const result = JSON.stringify( dispatch(route.route) )
            const equals = JSON.stringify( { ...returns, route: routes[index], vars: route.vars } )

            equal(result, equals)

            index++
        }
    })
})

/**
 * Detects wether the input routes FAIL as expected.
 */
describe('Invalid routes', function() {
    it('Should return false when no matching route is found.', function() {
        
        for (const route of shouldFail) {
            const result = dispatch(route)
            equal(result, false)
        }
    })
})

/**
 * @throws {Error}
 */
describe('Catch Error Exceptions RR0100 & RR0202.', function() {

    it('(RR0100) Should throw an Error when the `route` key is missing.', function() {
        // The key `route` is required.
        try {
            add()
        } catch (e) {
            equal(e.message, 'RR0100: `route` key required')
        }
    })

    it('(RR0202) Should throw an Error when the `vars` key is defined.', function() {
        // The key `vars` should not be used.
        try {
            add({ route: '/', vars: {} })
        } catch (e) {
            equal(e.message, 'RR0202: do not use `vars` key')
        }
    })
})
