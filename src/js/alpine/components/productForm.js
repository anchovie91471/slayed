export default {
  name: 'productForm',
  component() {
    return {
      quantity: 1,
      isProcessing: false,
      errorMessage: '',
      variantId: null,
      isAvailable: true,
      sectionId: null,

      init() {
        const productData = Alpine.store('productData')
        const currentVariant = productData.currentVariant
        this.sectionId = productData.sectionId
        this.variantId = currentVariant.id
        this.isAvailable = currentVariant.available

        // Listen for variant:change events
        document.addEventListener('variant:change', (event) => {
          if (event.detail.sectionId === this.sectionId) {
            this.handleVariantChange(event.detail.variant)
          }
        })

        // Listen for liquid-ajax-cart events
        document.addEventListener('liquid-ajax-cart:request-start', () => {
          this.isProcessing = true
        })

        document.addEventListener('liquid-ajax-cart:request-end', () => {
          this.isProcessing = false
        })
      },

      handleVariantChange(variant) {
        if (!variant) return

        this.variantId = variant.id
        this.isAvailable = variant.available
        this.errorMessage = ''

        // Update the add-to-cart button text/state
        this.$nextTick(() => {
          const addButton = this.$el.querySelector('button[type="submit"]')
          if (addButton) {
            addButton.disabled = !this.isAvailable
          }
        })
      },

      incrementQuantity() {
        this.quantity++
      },

      decrementQuantity() {
        if (this.quantity > 1) {
          this.quantity--
        }
      },

      buyNow() {
        if (!this.isAvailable) return
        window.location.href = `/cart/${this.variantId}:${this.quantity}`
      }
    }
  }
}
