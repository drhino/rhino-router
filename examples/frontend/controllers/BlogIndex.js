import { template } from '../module/template.js'

/**
 * BlogIndexController
 */
export default class {
    /**
     * Handles a matching route.
     * @returns {string} html Main template contents.
     */
    static async handle() {

        let html = await template('blog-index.html', {
            title: 'My Blog !'
        })

        return html
    }
}
