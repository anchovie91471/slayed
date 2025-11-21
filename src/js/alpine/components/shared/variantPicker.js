/**
 * Variant Picker Component
 *
 * Manages product variant selection via radio buttons or select dropdowns.
 * Dispatches variant:change events and updates URL with selected variant.
 *
 * Usage in Liquid:
 * <div x-data="variantPicker">
 */

export default function variantPicker() {
  return {
    selectedOptions: {},
    currentVariant: null,
    sectionId: null,

    initialize() {
      const productData = Alpine.store('productData')
      this.currentVariant = productData.currentVariant
      this.sectionId = productData.sectionId

      // Initialize selected options from current variant
      if (this.currentVariant && productData.optionsWithValues) {
        productData.optionsWithValues.forEach((option, index) => {
          const optionPosition = index + 1
          const selectedValue = this.currentVariant[`option${optionPosition}`]
          if (selectedValue) {
            this.selectedOptions[option.name] = selectedValue
          }
        })
      }

      // Listen for option changes
      this.$watch('selectedOptions', (value) => {
        this.updateVariant()
      })

      // Initialize URL if needed
      this.updateURL()
    },

    selectOption(optionName, value) {
      this.selectedOptions[optionName] = value
    },

    updateVariant() {
      const productData = Alpine.store('productData')
      const product = productData.product

      if (!product || !product.variants) return

      // Find variant that matches all selected options
      const matchingVariant = product.variants.find(variant => {
        return Object.keys(this.selectedOptions).every(optionName => {
          const optionIndex = product.options.indexOf(optionName) + 1
          return variant[`option${optionIndex}`] === this.selectedOptions[optionName]
        })
      })

      if (matchingVariant && matchingVariant.id !== this.currentVariant?.id) {
        this.currentVariant = matchingVariant

        // Dispatch variant change event
        document.dispatchEvent(new CustomEvent('variant:change', {
          detail: {
            variant: matchingVariant,
            sectionId: this.sectionId
          }
        }))

        // Update URL
        this.updateURL()
      }
    },

    updateURL() {
      if (!this.currentVariant) return

      const url = new URL(window.location.href)
      url.searchParams.set('variant', this.currentVariant.id)
      window.history.replaceState({}, '', url)
    },

    isOptionAvailable(optionName, value) {
      const productData = Alpine.store('productData')
      const product = productData.product

      if (!product || !product.variants) return true

      // Check if any variant with this option value is available
      const testOptions = { ...this.selectedOptions, [optionName]: value }

      return product.variants.some(variant => {
        const matches = Object.keys(testOptions).every(name => {
          const optionIndex = product.options.indexOf(name) + 1
          return variant[`option${optionIndex}`] === testOptions[name]
        })
        return matches && variant.available
      })
    }
  }
}
