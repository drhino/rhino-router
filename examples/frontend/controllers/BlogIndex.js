/**
 * BlogIndexController
 */
export default class {
    /**
     * Handles a matching route.
     * @returns {string} html Main template contents.
     */
    static async handle() {

        const html = `<h1>BlogIndexController</h1>
        <ul>
            <li>
                <a data-handle href="/blog/my-article-1">Article 1</a>
            </li>
            <li>
                <a data-handle href="/blog/my-article-2">Article 2</a>
            </li>
            <li>
                <a data-handle href="/blog/my-article-3">Article 3</a>
            </li>
        </ul>`

        return html
    }
}
