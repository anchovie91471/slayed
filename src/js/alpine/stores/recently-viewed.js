/**
 * Recently Viewed Products Store
 * Tracks products the user has viewed and stores them in localStorage
 */

export default {
  name: 'recentlyViewed',
  store() {
    return {
      products: [],
      maxProducts: 20, // Maximum to store in localStorage

      init() {
        this.loadFromStorage()
      },

      /**
       * Track a product view
       * @param {Object} product - Product object with id, handle, title, etc.
       */
      trackView(product) {
        if (!product || !product.id) return

        // Remove if already exists (to move to front)
        this.products = this.products.filter(p => p.id !== product.id)

        // Add to front
        this.products.unshift({
          id: product.id,
          handle: product.handle,
          title: product.title,
          featuredImage: product.featured_image,
          price: product.price,
          compareAtPrice: product.compare_at_price,
          available: product.available,
          timestamp: Date.now()
        })

        // Limit to max
        if (this.products.length > this.maxProducts) {
          this.products = this.products.slice(0, this.maxProducts)
        }

        this.saveToStorage()
      },

      /**
       * Get recently viewed products excluding a specific product ID
       * @param {number} excludeId - Product ID to exclude (e.g., current product)
       * @param {number} limit - Maximum number of products to return
       */
      getRecentProducts(excludeId = null, limit = 8) {
        let products = [...this.products]

        // Exclude specific product if provided
        if (excludeId) {
          products = products.filter(p => p.id !== excludeId)
        }

        // Return limited number
        return products.slice(0, limit)
      },

      /**
       * Clear all recently viewed products
       */
      clear() {
        this.products = []
        this.saveToStorage()
      },

      /**
       * Load products from localStorage
       */
      loadFromStorage() {
        try {
          const stored = localStorage.getItem('vast_recently_viewed')
          if (stored) {
            this.products = JSON.parse(stored)
          }
        } catch (error) {
          console.error('Error loading recently viewed products:', error)
          this.products = []
        }
      },

      /**
       * Save products to localStorage
       */
      saveToStorage() {
        try {
          localStorage.setItem('vast_recently_viewed', JSON.stringify(this.products))
        } catch (error) {
          console.error('Error saving recently viewed products:', error)
        }
      }
    }
  }
}
