/**
 * Recently Viewed Section Component
 *
 * Displays recently viewed products from Alpine store.
 *
 * Usage in Liquid:
 * <div x-data="recentlyViewedSection"
 *      data-current-product-id="{{ product.id | default: '' }}"
 *      data-limit="{{ section.settings.products_to_show | default: 4 }}"
 *      data-exclude-current="{{ section.settings.exclude_current_product | default: true }}"
 *      data-money-format="{{ shop.money_format | json | escape }}"
 *      data-product='{{ product | json | escape }}'>
 */

export default function recentlyViewedSection() {
  return {
    displayProducts: [],
    currentProductId: null,
    limit: 4,
    excludeCurrent: true,
    moneyFormat: '${{amount}}',

    init() {
      // Read configuration from data attributes
      const el = this.$el
      this.currentProductId = el.dataset.currentProductId || null
      this.limit = parseInt(el.dataset.limit) || 4
      this.excludeCurrent = el.dataset.excludeCurrent !== 'false'
      this.moneyFormat = el.dataset.moneyFormat || '${{amount}}'

      // Track current product view if on product page
      if (this.currentProductId && typeof Alpine.store('recentlyViewed') !== 'undefined') {
        this.trackCurrentProduct(el.dataset.product)
      }

      // Load and display recently viewed products
      this.loadRecentProducts()
    },

    trackCurrentProduct(productDataJson) {
      if (!productDataJson) return

      try {
        const productData = JSON.parse(productDataJson)

        // Use store to track view
        const store = Alpine.store('recentlyViewed')
        if (store && store.trackView) {
          store.trackView({
            id: productData.id,
            handle: productData.handle,
            title: productData.title,
            featured_image: productData.featured_image,
            price: productData.price,
            compare_at_price: productData.compare_at_price,
            available: productData.available
          })
        }
      } catch (e) {
        console.error('Error parsing product data:', e)
      }
    },

    loadRecentProducts() {
      const store = Alpine.store('recentlyViewed')
      if (!store) return

      // Get recent products (excluding current if needed)
      const excludeId = this.excludeCurrent ? this.currentProductId : null
      const recentProducts = store.getRecentProducts(excludeId, this.limit)

      this.displayProducts = recentProducts

      // Render products
      this.$nextTick(() => {
        this.renderProducts()
      })
    },

    renderProducts() {
      const grid = this.$refs.productsGrid
      if (!grid || this.displayProducts.length === 0) return

      // Clear existing content
      grid.innerHTML = ''

      // Render each product
      this.displayProducts.forEach(product => {
        const productCard = this.createProductCard(product)
        grid.appendChild(productCard)
      })
    },

    createProductCard(product) {
      const div = document.createElement('div')
      div.className = 'product-grid-item relative group border border-gray-200 p-4'

      // Get product image - handle both featuredImage and featured_image
      const imageUrl = product.featuredImage || product.featured_image || ''
      const imageSrc = imageUrl ? this.getImageUrl(imageUrl, 410) : ''

      // Format prices - handle both compareAtPrice and compare_at_price
      const price = this.formatMoney(product.price)
      const compareAt = product.compareAtPrice || product.compare_at_price
      const compareAtPrice = compareAt > product.price
        ? this.formatMoney(compareAt)
        : null

      // Check availability
      const isAvailable = product.available !== false

      // Build product card HTML matching product-grid-item snippet style
      div.innerHTML = `
        <a href="/products/${product.handle}" class="block">
          <div class="image-wrapper relative overflow-hidden rounded-lg bg-gray-100 mb-4" style="padding-top: 140%;">
            ${imageSrc ? `
              <img
                src="${imageSrc}"
                alt="${this.escapeHtml(product.title)}"
                class="absolute inset-0 object-cover h-full w-full transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                width="410"
                height="574"
              />
            ` : `
              <div class="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                No image
              </div>
            `}
            ${!isAvailable ? `
              <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span class="inline-block px-2 py-1 text-xs font-medium bg-red-100 text-red-800">Sold Out</span>
              </div>
            ` : ''}
          </div>

          <div class="content space-y-2">
            <div class="after:content-[''] after:inset-0 after:absolute">
              <h3 class="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                ${this.escapeHtml(product.title)}
              </h3>
            </div>

            <div class="flex flex-wrap items-center gap-2">
              ${product.price_varies ? '<span class="text-sm text-gray-600">From</span>' : ''}
              <span class="text-sm text-gray-900 font-medium">${price}</span>
              ${compareAtPrice ? `
                <span class="text-sm text-gray-500 line-through">${compareAtPrice}</span>
                <span class="inline-block px-2 py-1 text-xs font-medium bg-red-100 text-red-800">Sale</span>
              ` : ''}
            </div>
          </div>
        </a>
      `

      return div
    },

    getImageUrl(src, width = 600) {
      if (!src) return ''
      const baseUrl = src.split('?')[0]
      return `${baseUrl}?width=${width}`
    },

    formatMoney(cents) {
      if (window.vast && window.vast.helpers && window.vast.helpers.formatMoney) {
        return window.vast.helpers.formatMoney(cents, this.moneyFormat)
      }
      return `$${(cents / 100).toFixed(2)}`
    },

    escapeHtml(text) {
      const div = document.createElement('div')
      div.textContent = text
      return div.innerHTML
    }
  }
}
