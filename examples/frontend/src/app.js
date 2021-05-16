import { add, dispatch } from '../../../index.js'

let main, attr, base

/**
 * Handles a new destination.
 * @param {string} url Pathname
 */
const handle = async (url) => {
    // Returns the matching route.
    const { vars, controller } = dispatch(url)

    // Import controller and get handle function.
    const { handle } = await _load(controller)

    // Handles the controller.
    const html = handle(vars)

    // ---

    // Remove event listeners for current main contents.
    main.querySelectorAll(attr).forEach(
        item => item.removeEventListener('onclick', handler)
    )

    // Sets the returned HTML to the main of the page body.
    main.innerHTML = await html

    // Add event listeners to the new HTML contents.
    main.querySelectorAll(attr).forEach(item => item.onclick = handler)
}

/**
 * Handles 'href' behaviour.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
 * @param {Event} event
 */
const handler = event => {
    // Disables default behaviour.
    event.preventDefault()

    // Returns the destination from the clicked anchor.
    const href = event.target.getAttribute('href')

    // Changes the URL in the browser window without reloading.
    history.pushState({}, '', base + href)

    // Handles controller and sets new HTML contents.
    handle(href)
}

/**
 * Initiate application (constructor).
 * @param {string} id        Document ID for inner HTML contents.
 * @param {string} attribute Binds the handler to <a ${attribute} href="#">.
 * @param {string} prefix    *optional* Prefix routes with subdirectory path.
 */
export const init = async (id, attribute, prefix) => {
    // Blocks overwriting of variables once set.
    if (attr)
        throw new Error('Already initiated.')

    // Sets application constants.
    attr = 'a[' + attribute + ']'
    base = prefix

    // Import routes from JSON file.
    let routes = await fetch(base + '/routes.json')
        routes = await routes.json()

    for (const route of routes) {
        add(route)
    }

    // Returns the initial pathname from the browser window.
    let pathname = window.location.pathname

    // Strips the prefix (if any).
    if (base) {
        pathname = pathname.substr(base.length)
    }

    // Sets application constant.
    main = document.getElementById(id)
    
    // Add event listener to default html contents.
    document.querySelectorAll(attr).forEach(item => item.onclick = handler)

    // Handles the initial page.
    handle(pathname)
}

/**
 * Dynamic import the controller once.
 *
 * @see dev.mozilla.org/docs/Web/JavaScript/Reference/Statements/import
 *
 * @param {string} controller
 *
 * @returns {Class}
 */
const _load = async (controller) => {

    if ( ! controllers[controller] ) {

        const { default: fn } = await import(base + '/controllers/' + controller)

        controllers[controller] = fn
    }

    return controllers[controller]
}

// Holds the imported controllers.
let controllers = {}
