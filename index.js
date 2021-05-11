/**
 * Router.
 */
export default class
{
    // Immutable.
    #routes = []

    /**
     * Parses the input routes.
     * @param {array} routes
     */
    constructor (routes)
    {
        for (const item of routes) {

            let route = item.route || item,
                attr  = item.attr,
                keys  = []

            // Wether the route query is dynamic.
            if (route.includes('{')) {
                const parsed = this.routeParser(route)

                route = parsed.route
                keys  = parsed.keys
            }

            this.#routes.push( { route, keys, attr } )
        }
    }

    /**
     * Generates a regex and seperates the route query keys.
     * @see https://github.com/nikic/FastRoute/blob/master/src/RouteParser/Std.php
     * @param {string} route
     * @returns { (string)route, (array)keys }
     */
    routeParser (route) {
        /*
            \{\s*([a-zA-Z_][a-zA-Z0-9_-]*)\s*(?::\s*([^{}]*
                (?:\{(?-1)\}[^{}]*)*
            ))?\}

            \{\s*([a-zA-Z_][a-zA-Z0-9_-]*)\s*(?::\s*([^{}]*))?\}

            /\{([a-zA-Z0-9]*)(?::([^{}]*))?\}/g
            /\{([a-zA-Z_][a-zA-Z0-9_-]*)(?::([^}]*))?\}/g
        */
        const regex = /\{([^:}]*)(?::([^}]*))?\}/g
        const found = route.matchAll(regex)

        let keys = []

        for (const match of found) {
            // e.g: .* || [0-9]+ || \d+
            const rgx = match[2]
                ? '(' + match[2] + ')' // {varName2:\d+} -> (\d+)
                : '([^/]+)'            // {varName}      -> ([^/]+)

            // Build matching regex.
            route = route.replace(match[0], rgx)
            // Saves the key name.
            keys.push(match[1])
        }

        // The route should start and end with the query.
        route = '^' + route + '$'

        return { route, keys }
    }

    /**
     * Returns the parsed routes. Useful for debugging.
     */
    get routes() {
        return this.#routes
    }

    /**
     * Match route.
     *
     * @param {string} pathname HTTP request URI.
     *
     * @returns { vars, attr } Matching route variables & custom attributes.
     * @returns {boolean} FALSE No matching route found.
     */
    match (pathname) {
        // Processes each route until a match is found.
        for (const item of this.#routes) {
            // Match static or dynamic route.
            const vars = this.find(item, pathname)

            // Returns an empty object or the found route variables.
            if (false !== vars) {
                return { vars, attr: item.attr }
            }
        }

        // No match found.
        return false
    }

    /**
     * Checks wether the route matches.
     *
     * @param {object} item     { route, keys, attr }
     * @param {string} pathname HTTP request URI.
     *
     * @returns {boolean} FALSE Route does not match.
     * @returns {object}  vars  Empty or parsed variables.
     */
    find (item, pathname)
    {
        let matched, vars = {}

        const { route, keys } = item

        // Regex match.
        if (keys.length) {
            matched = pathname.match(route)

            if ( ! matched )
                return false
        }
        // Strict match.
        else if (pathname !== route) {
            return false
        }

        if (matched) {
            // Calculate the length once.
            const len = keys.length
            // Link each key from parsed route with found route variable.
            for (let i = 0; i < len;)
                vars[ keys[i++] ] = matched[i]
        }

        return vars
    }
}
