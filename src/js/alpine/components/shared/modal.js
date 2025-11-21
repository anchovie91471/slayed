/**
 * Modal Component
 *
 * Generic modal dialog with auto-open delay and ARIA accessibility.
 *
 * Usage in Liquid:
 * <dialog x-data="modal"
 *         data-auto-open="{{ section.settings.auto_open }}"
 *         data-delay="{{ section.settings.delay }}">
 */

export default function modal() {
  return {
    autoOpen: false,
    delay: 0,

    init() {
      const el = this.$el
      const delay = parseInt(el.dataset.delay) || 0
      this.autoOpen = delay > 0
      this.delay = delay * 1000

      // Listen for custom 'show-modal' event from global store
      document.addEventListener('show-modal', () => {
        this.open()
      })

      // Auto-open after delay if configured
      if (this.autoOpen) {
        setTimeout(() => {
          this.open()
        }, this.delay)
      }
    },

    open() {
      // Use native dialog showModal() method
      this.$el.showModal()
    },

    close(event) {
      // Only close if clicking on the backdrop (not the content)
      if (event && event.target === this.$el) {
        this.$el.close()
      } else if (!event) {
        // Direct close call from button
        this.$el.close()
      }
    }
  }
}
