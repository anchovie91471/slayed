/**
 * Product Recommendations Component
 *
 * Fetches and displays product recommendations via Shopify API.
 *
 * Usage in Liquid:
 * <div x-data="productRecommendations"
 *      data-product-id="{{ product.id }}"
 *      data-limit="{{ section.settings.products_to_show | default: 4 }}"
 *      data-money-format="{{ shop.money_format | json | escape }}">
 */

export default function productRecommendations() {
  return {
    loading: true,
    recommendations: [],
    productId: null,
    limit: 4,
    moneyFormat: '${{amount}}',

    init() {
      // Read configuration from data attributes
      const el = this.$el
      this.productId = el.dataset.productId
      this.limit = parseInt(el.dataset.limit) || 4
      this.moneyFormat = el.dataset.moneyFormat || '${{amount}}'

      this.fetchRecommendations()
    },

    async fetchRecommendations() {
      if (!this.productId) {
        this.loading = false
        return
      }

      try {
        this.loading = true
        const url = `/recommendations/products.json?product_id=${this.productId}&limit=${this.limit}`

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch recommendations')
        }

        const data = await response.json()
        this.recommendations = data.products || []

        // Wait for DOM update then render products
        await this.$nextTick()
        this.renderProducts()
      } catch (error) {
        console.error('Error fetching product recommendations:', error)
        this.recommendations = []
      } finally {
        this.loading = false
      }
    },

    renderProducts() {
      const grid = this.$refs.productsGrid
      if (!grid || this.recommendations.length === 0) return

      // Clear existing content
      grid.innerHTML = ''

      // Render each product using the product card template
      this.recommendations.forEach(product => {
        const productCard = this.createProductCard(product)
        grid.appendChild(productCard)
      })
    },

    createProductCard(product) {
      const div = document.createElement('div')
      div.className = 'product-grid-item relative group border border-gray-200 p-4'

      // Get product image
      const imageUrl = product.featured_image || product.images[0] || ''
      const imageSrc = imageUrl ? this.getImageUrl(imageUrl, 410) : ''

      // Get product price
      const price = this.formatMoney(product.price)
      const compareAtPrice = product.compare_at_price > product.price
        ? this.formatMoney(product.compare_at_price)
        : null

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
      // Fallback if helper not available
      return `$${(cents / 100).toFixed(2)}`
    },

    escapeHtml(text) {
      const div = document.createElement('div')
      div.textContent = text
      return div.innerHTML
    }
  }
}
