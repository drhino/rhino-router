/**
 * xRouter: Match route with defined expressions.
 */
export default class
{
    /**
     * Generate matching route expressions.
     *
     * @param routes
     */
    constructor (routes)
    {
        this._static = {}
        this._parser = []

        for ( const [route, handler] of Object.entries(routes) ) {
            // Parse route string (Based on: FastRoute\RouteParser\Std).
            // \{\s*([a-zA-Z_][a-zA-Z0-9_-]*)\s*(?::\s*([^{}]*))?\}
            if ( route.includes('{') ) {
                // /fixedRoutePart/{varName}/moreFixed/{varName2:[0-9]+}
                // -> \/fixedRoutePart\/([^/]+)\/moreFixed\/([0-9]+)
                const regex = /\{([a-zA-Z0-9]*)(?::([^{}]*))?\}/g
                const found = route.matchAll(regex)

                let find = route
                let keys = []

                for (const match of found) {
                    // undefined || .* || [0-9]+ || \d+
                    const rgx = match[2]
                        ? '(' + match[2] + ')' // {varName2:\d+} -> (\d+)
                        : '([^/]+)'            // {varName}      -> ([^/]+)

                    // Build matching regex.
                    find = find.replace(match[0], rgx)
                    keys.push(match[1])
                }

                this._parser.push( { find, keys, handler } )
            }
            else {
                // Strict route match.
                this._static[route] = handler
            }
        }
    }

    /**
     * Match static or dynamic route.
     *
     * @param String route Input.
     *
     * @return Array [
     *   0: {
     *     controller: <class>
     *     middleware: {before: [], after: []}  (optional)
     *   }
     *   1: {
     *     key: 'value'  (parsed route URI variables)
     *     , ...
     *   }
     * ]
     * @return Boolean(false) No match found.
     */
    find (route)
    {
        // Match static route by searching for key as route.
        const find = this._static[route]

        // Strict match route found.
        if (find) {
            // Handler with empty parsed URI.
            return [find, {}]
        }

        // Loop all dynamic routes until first match is found.
        for (const r of this._parser) {
            const match = route.match(r.find)

            if (match) {
                let vars = {}

                // Link each key from parsed route with found route variable.
                for ( let [i, k] of Object.entries(r.keys) ) {
                    i++
                    vars[k] = match[i]
                }

                // 0: { controller: <class> [, middleware: {before: [], after: []} ] }
                // 1: { key: 'value', ... }
                return [r.handler, vars]
            }
        }

        // No match found.
        return false
    }
}
