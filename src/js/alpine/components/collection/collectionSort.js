/**
 * Collection Sort Component
 *
 * Sort dropdown for product collections that updates the URL.
 *
 * Usage in Liquid:
 * <div x-data="collectionSort"
 *      data-current-sort="{{ collection.sort_by | default: collection.default_sort_by }}"
 *      data-default-sort="{{ collection.default_sort_by }}">
 */

export default function collectionSort() {
  return {
    sortBy: '',
    defaultSort: '',

    init() {
      // Read initial values from data attributes
      const el = this.$el
      this.sortBy = el.dataset.currentSort || ''
      this.defaultSort = el.dataset.defaultSort || ''
    },

    updateSort() {
      const url = new URL(window.location.href)

      // Update or add sort_by parameter
      if (this.sortBy && this.sortBy !== this.defaultSort) {
        url.searchParams.set('sort_by', this.sortBy)
      } else {
        url.searchParams.delete('sort_by')
      }

      // Navigate to new URL
      window.location.href = url.toString()
    }
  }
}
