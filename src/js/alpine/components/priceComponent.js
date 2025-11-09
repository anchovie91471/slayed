export default {
  name: 'priceComponent',
  component() {
    return {
      displayPrice: 0,
      compareAtPrice: null,
      flash: false,
      sectionId: null,

      init() {
        const productData = Alpine.store('productData')
        const currentVariant = productData.currentVariant
        this.sectionId = productData.sectionId
        this.displayPrice = currentVariant.price
        this.compareAtPrice = currentVariant.compare_at_price

        // Listen for variant:change events
        document.addEventListener('variant:change', (event) => {
          if (event.detail.sectionId === this.sectionId) {
            this.updatePrice(event.detail.variant)
          }
        })
      },

      updatePrice(variant) {
        if (!variant) return

        const newPrice = variant.price
        const newCompareAtPrice = variant.compare_at_price

        if (newPrice !== this.displayPrice) {
          // Trigger flash animation
          this.flash = false
          void this.$el.offsetWidth // force reflow

          this.displayPrice = newPrice
          this.compareAtPrice = newCompareAtPrice
          this.flash = true

          setTimeout(() => {
            this.flash = false
          }, 400)
        } else {
          this.compareAtPrice = newCompareAtPrice
        }
      },

      formatMoney(cents) {
        return window[window.slayedNamespace].helpers.formatMoney ?
          window[window.slayedNamespace].helpers.formatMoney(cents) :
          Shopify.formatMoney(cents, theme.moneyFormat || '${{amount}}')
      }
    }
  }
}
