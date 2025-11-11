export default {
    /**
     * Check if document.body has a specific class
     * @param {string} className - The class name to check for
     * @returns {boolean} True if body has the class, false otherwise
     */
    hasBodyClass(className) {
        return document.body.classList.contains(className)
    },

    /**
     * Emit a custom event
     * @param {string} type - The event type
     * @param {Object} detail - Any details to pass along with the event
     * @param {Node} elem - The element to attach the event to
     * @returns {boolean} Returns the result of dispatchEvent
     */
    emitEvent(type, detail = {}, elem = document) {
        if (!type) return false

        let event = new CustomEvent(type, {
            bubbles: true,
            cancelable: true,
            detail: detail,
        })

        return elem.dispatchEvent(event)
    },

    /**
     * Generate a random integer between min and max (inclusive)
     * @param {number} min - Minimum value (default: 0)
     * @param {number} max - Maximum value (default: 1000)
     * @returns {number} Random integer between min and max
     */
    randomNumber(min = 0, max = 1000) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    },

    /**
     * Truncate long titles to 18 characters with ellipsis
     * @param {string} input - The string to truncate
     * @returns {string} Truncated string with "..." appended if longer than 18 chars
     */
    truncateLongTitle(input) {
        if (!input || typeof input !== 'string') return ''
        return input.length > 18 ? `${input.substring(0, 18)}...` : input
    },

    /**
     * Fetch and parse HTML from an endpoint
     * @param {string} endpoint - URL to fetch HTML from
     * @returns {Promise<Document>} Parsed HTML document
     * @throws {Error} If fetch fails or response is not ok
     */
    async fetchHTML(endpoint) {
        try {
            const response = await fetch(endpoint)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const responseText = await response.text()
            return new DOMParser().parseFromString(responseText, 'text/html')
        } catch (error) {
            console.error('fetchHTML error:', error)
            throw error
        }
    },

    /**
     * Throttle function execution to limit how often it can run
     * @param {Function} func - Function to throttle
     * @param {number} limit - Minimum time between executions in milliseconds
     * @returns {Function} Throttled function
     */
    throttle(func, limit) {
        let lastFunc
        let lastRan
        return function (...args) {
            const context = this
            if (!lastRan) {
                func.apply(context, args)
                lastRan = Date.now()
            } else {
                clearTimeout(lastFunc)
                lastFunc = setTimeout(function () {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args)
                        lastRan = Date.now()
                    }
                }, limit - (Date.now() - lastRan))
            }
        }
    },

    /**
     * Debounce function execution to delay until after wait period has elapsed
     * @param {Function} func - Function to debounce
     * @param {number} wait - Time to wait in milliseconds before executing
     * @returns {Function} Debounced function
     */
    debounce(func, wait) {
        let timeout
        return function (...args) {
            const context = this
            clearTimeout(timeout)
            timeout = setTimeout(() => func.apply(context, args), wait)
        }
    }
}
