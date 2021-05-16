/**
 * rhino-router
 */

// Holds the defined routes.
let routes = []

/**
 * Adds a new route pattern.
 *
 * The `route` key is required.
 * The `vars` key is reserved.
 *
 * @param {object} input { route: '/', ...(custom) }
 *
 * @throws {Error} RR01xx: Required key missing.
 * @throws {Error} RR02xx: Disallowed key used in input.
 */
export const add = (input) =>
{
    // Please add a route key to your input object.
    if (typeof input.route === 'undefined')
        throw new Error('RR0100: `route` key required')

    // The key: "vars" is reserved by the router class.
    if (input.vars)
        throw new Error('RR0202: do not use `vars` key')

    routes.push( { input, ..._parse(input.route) } )
}

/**
 * Match route.
 *
 * @param {string} pathname Input to match with route pattern.
 *
 * @returns {object} { route, vars, ...(custom) }
 * @returns {boolean} FALSE  No matching route found.
 */
export const dispatch = (pathname) =>
{
    // Processes each route until a match is found.
    for (const item of routes) {

        // Returns FALSE || Object
        const vars = _match(item.pattern, item.placeholders, pathname)

        // Either an empty object (in the case of a fixed route pattern)
        // OR an object with the placeholders and their values was returned.
        if (false !== vars) {
            // Debug:
            // return { ...item, vars }
            return { ...item.input, vars }
        }
    }

    // Searched all routes — No match was found.
    return false
}

/**
 * Generates a regex and seperates the route placeholders.
 * ...except when the character: "{" is NOT found in the pattern, then
 * the value is used as-is. In that case, regex will NOT be used in _match().
 *
 * @param {string} pattern
 *
 * @returns { pattern, placeholders }
 *
 * {string} pattern      The same value in case of a fixed pattern.
 *                       OR the pattern with capture groups, without placeholders.
 * {array}  placeholders The placeholder keys or an empty array.
 */
const DEFAULT_RGX = '[^/]+'

const _parse = (pattern) =>
{
    // Found placeholders in dynamic route.
    let placeholders = []

    // Only build the regex when the route has a dynamic pattern.
    if (pattern.includes('{')) {

        const matchAll = pattern.matchAll(/\{([^:}]*)(?::([^}]*))?\}/g)
        // ...skips whitespace, tabs & line breaks:
        // /\{\s*([^:}]*)\s*(?::\s*([^}]*))?\}/g

        for (const match of matchAll) {
            // Uses the regex pattern in a capturing group.
            // {varName:[0-9]+} -> ([0-9]+)
            const rgx = '(' + (match[2] || DEFAULT_RGX) + ')'

            // Build regex.
            pattern = pattern.replace(match[0], rgx)
            
            // Saves the placeholder name.
            placeholders.push(match[1])
        }

        // The pathname should start and end with the pattern.
        pattern = '^' + pattern + '$'
    }

    return { pattern, placeholders }
}

/**
 * Checks wether the pathname matches the route pattern.
 *
 * @param {string} pattern      Regex or fixed pattern.
 * @param {array}  placeholders Found placeholders in dynamic route.
 * @param {string} pathname     Input to match with route pattern.
 *
 * @returns {boolean} FALSE Pathname does not match pattern.
 * @returns {object}  vars  Placeholders with matched values.
 * @returns {object}  vars  Empty object when a fixed pattern matches.
 */
const _match = (pattern, placeholders, pathname) =>
{
    let matched, vars = {}

    // Calculate the length once for the 'for' loop.
    const len = placeholders.length

    // Regex match.
    if (len) {
        matched = pathname.match(pattern)

        if (null === matched) {
            return false
        }
    }
    // Fixed pattern.
    else if (pathname !== pattern) {
        return false
    }

    // vars = { $placeholder: 'value', ... }
    if (matched) {
        for (let i = 0; i < len; ) {
            vars[ placeholders[i++] ] = matched[i]
        }
    }

    return vars
}
