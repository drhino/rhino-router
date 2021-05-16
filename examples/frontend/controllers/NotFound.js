/**
 * NotFoundController
 */
export default class {
    /**
     * Handles a matching route.
     * @param {object} vars Parsed route variables.
     * @returns {string} html Main template contents.
     */
    static handle(vars) {
        const { route } = vars

        const html = `<h1>NotFoundController: ${route}</h1>`

        return html
    }
}
