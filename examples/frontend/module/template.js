/**
 * Fetch the template once.
 *
 * @param {string} template
 *
 * @returns {string} html
 */
export const template = async (template, vars) => {

    if ( ! templates[template] ) {

        const html = await fetch(`./templates/${template}`)

        templates[template] = await html.text()
    }

    if (vars) {
        return _compile(templates[template], vars)
    }

    return templates[template]
}

// Holds the fetched uncompiled templates.
let templates = {}

/**
 * Replace template variables.
 *
 * @param {string} html Template contents.
 * @param {object} vars Template variables. { key: 'value', ...}
 */
const _compile = (html, vars) => {

    // Searches all like "{{ key }}"
    const matchAll = html.matchAll(/\{\{\s*([^\s*}]*)\s*\}\}/g)

    // Replace all matches.
    for (const match of matchAll) {
        html = html.replace(match[0], vars[ match[1] ])
    }

    return html
}
