/**
 * BlogArticleController
 */
export default class {
    /**
     * Handles a matching route.
     * @param {object} vars Parsed route variables.
     * @returns {string} html Main template contents.
     */
    static handle(vars) {
        // Fetch from API.
        const article = articles[vars.article]

        let html  = `<h1>${article.title}</h1>`
            html += `<p>${article.content}</p>`

        html += `<a data-handle href="/blog">&larr; Go back</a>`

        return html
    }
}

const articles = {
    'my-article-1': {
        title: 'Article 1',
        content: 'Contents of article one.'
    },
    'my-article-2': {
        title: 'Article 2',
        content: 'Contents of article two.'
    },
    'my-article-3': {
        title: 'Article 3',
        content: 'Contents of article three.'
    }
}
