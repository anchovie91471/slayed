/**
 * Collection Filters Component
 *
 * Advanced filtering with mobile drawer, price ranges, and checkboxes.
 *
 * Usage in Liquid:
 * <div x-data="collectionFilters"
 *      data-active-filters-count="{{ active_filters_count | default: 0 }}">
 */

export default function collectionFilters() {
  return {
    mobileFiltersOpen: false,
    activeFiltersCount: 0,

    init() {
      // Read initial active filters count from data attribute
      const el = this.$el
      this.activeFiltersCount = parseInt(el.dataset.activeFiltersCount) || 0

      // Calculate active filters count from URL
      this.updateActiveFiltersCount()

      // Close mobile drawer on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.mobileFiltersOpen) {
          this.mobileFiltersOpen = false
        }
      })
    },

    updateActiveFiltersCount() {
      const url = new URL(window.location.href)
      let count = 0

      // Count filter parameters
      for (const [key, value] of url.searchParams) {
        if (key.startsWith('filter.')) {
          count++
        }
      }

      this.activeFiltersCount = count
    },

    toggleFilter(paramName, value) {
      const url = new URL(window.location.href)
      const currentValue = url.searchParams.get(paramName)

      if (currentValue === value) {
        // Remove filter if already applied
        url.searchParams.delete(paramName)
      } else {
        // Apply filter
        url.searchParams.set(paramName, value)
      }

      // Reset to page 1 when filtering
      url.searchParams.delete('page')

      // Navigate to new URL
      window.location.href = url.toString()
    },

    removeFilter(paramName, value) {
      const url = new URL(window.location.href)
      url.searchParams.delete(paramName)

      // Reset to page 1
      url.searchParams.delete('page')

      window.location.href = url.toString()
    },

    updatePriceFilter(paramName, type, value) {
      const url = new URL(window.location.href)

      // Construct filter parameter name (e.g., filter.v.price.gte or filter.v.price.lte)
      const filterParam = type === 'min' ? `${paramName}.gte` : `${paramName}.lte`

      if (value && parseFloat(value) > 0) {
        // Convert to cents for Shopify
        const cents = Math.round(parseFloat(value) * 100)
        url.searchParams.set(filterParam, cents)
      } else {
        url.searchParams.delete(filterParam)
      }

      // Reset to page 1
      url.searchParams.delete('page')

      // Navigate to new URL
      window.location.href = url.toString()
    },

    clearAllFilters() {
      const url = new URL(window.location.href)

      // Remove all filter parameters
      const paramsToDelete = []
      for (const [key] of url.searchParams) {
        if (key.startsWith('filter.')) {
          paramsToDelete.push(key)
        }
      }

      paramsToDelete.forEach(param => url.searchParams.delete(param))

      // Reset to page 1
      url.searchParams.delete('page')

      // Close mobile drawer
      this.mobileFiltersOpen = false

      // Navigate to new URL
      window.location.href = url.toString()
    }
  }
}
