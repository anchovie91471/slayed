export default {
  name: 'variantPicker',
  component() {
    return {
      selectedOptions: {},
      variantMap: {},
      availableOptions: {},
      sectionId: null,
      productData: null,

      init() {
        this.productData = Alpine.store('productData')
        const product = this.productData.product
        const currentVariant = this.productData.currentVariant
        this.sectionId = this.productData.sectionId

        // Initialize selectedOptions from current variant
        product.options_with_values.forEach((option, index) => {
          this.selectedOptions[option.name] = currentVariant.options[index]
        })

        this.createVariantMap(product)
        this.computeAvailableOptions(product)
        this.updateForm(this.getCurrentVariant())
      },

      createVariantMap(product) {
        this.variantMap = {}
        product.variants.forEach(variant => {
          const key = variant.options.join('|')
          this.variantMap[key] = {
            id: variant.id,
            available: variant.available,
            price: variant.price,
            compare_at_price: variant.compare_at_price || null,
            featured_media: variant.featured_media,
            featured_image: variant.featured_image,
          }
        })
      },

      computeAvailableOptions(product) {
        this.availableOptions = {}

        product.options_with_values.forEach((option) => {
          this.availableOptions[option.name] = {}

          option.values.forEach((value) => {
            this.availableOptions[option.name][value] = this.isOptionAvailable(option.name, value, product)
          })
        })
      },

      getCurrentVariant() {
        const product = this.productData.product
        const selectedValues = product.options.map(optionName => this.selectedOptions[optionName])
        const key = selectedValues.join('|')
        const variant = this.variantMap[key]

        // If no variant found and product has only one variant (default-only product), use that variant
        if (!variant && product.variants.length === 1) {
          const defaultVariant = product.variants[0]
          return {
            id: defaultVariant.id,
            available: defaultVariant.available,
            price: defaultVariant.price,
            compare_at_price: defaultVariant.compare_at_price || null,
            featured_media: defaultVariant.featured_media,
            featured_image: defaultVariant.featured_image,
          }
        }

        return variant || null
      },

      updateVariant(optionName, value) {
        this.selectedOptions[optionName] = value

        const product = this.productData.product

        this.computeAvailableOptions(product)

        const variant = this.getCurrentVariant()

        if (variant) {
          this.updateForm(variant)
        }
      },

      updateForm(variant) {
        if (!variant) return

        // Update store
        this.productData.currentVariant = variant

        // Update form ID input
        const form = document.querySelector('[data-product-form]')
        if (form) {
          const idInput = form.querySelector('input[name="id"]')
          if (idInput) {
            idInput.value = variant.id
          }
        }

        // Update URL with variant ID
        const searchParams = new URLSearchParams(window.location.search)
        searchParams.set('variant', variant.id)
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`
        window.history.replaceState({ path: newUrl }, '', newUrl)

        // Dispatch variant change event
        const event = new CustomEvent('variant:change', {
          detail: {
            variant: {
              id: variant.id,
              available: variant.available,
              price: variant.price,
              compare_at_price: variant.compare_at_price,
              featured_media: variant.featured_media,
              featured_image: variant.featured_image,
            },
            sectionId: this.sectionId
          },
          bubbles: true
        })
        this.$el.dispatchEvent(event)
      },

      isOptionAvailable(optionName, optionValue, product) {
        // Check if there's any available variant with this option value
        // that matches other currently selected options
        for (const variantKey in this.variantMap) {
          const variantData = this.variantMap[variantKey]
          if (!variantData.available) continue

          const optionValues = variantKey.split('|')
          let matchesOption = false
          let matchesOtherSelections = true

          product.options.forEach((optionTitle, index) => {
            if (optionTitle === optionName && optionValues[index] === optionValue) {
              matchesOption = true
            } else if (optionTitle !== optionName) {
              const currentSelection = this.selectedOptions[optionTitle]
              if (currentSelection && optionValues[index] !== currentSelection) {
                matchesOtherSelections = false
              }
            }
          })

          if (matchesOption && matchesOtherSelections) {
            return true
          }
        }
        return false
      }
    }
  }
}
