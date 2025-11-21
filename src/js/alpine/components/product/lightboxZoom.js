/**
 * Lightbox Zoom Component
 *
 * Full-screen image lightbox with keyboard navigation (arrow keys, escape).
 * Integrates with productGallery component via custom events.
 *
 * Usage in Liquid:
 * <div x-data="lightboxZoom"
 *      data-product-title="{{ product.title | json }}">
 */

export default function lightboxZoom() {
  return {
    isOpen: false,
    currentIndex: 0,
    images: [],
    productTitle: '',

    init() {
      // Read product title from data attribute
      const el = this.$el
      this.productTitle = el.dataset.productTitle || ''

      // Listen for open-lightbox events from gallery
      window.addEventListener('open-lightbox', (event) => {
        this.open(event.detail.imageIndex, event.detail.images)
      })

      // Listen for escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close()
        }
      })

      // Listen for left/right arrow keys
      document.addEventListener('keydown', (e) => {
        if (!this.isOpen) return
        if (e.key === 'ArrowLeft') {
          this.previousImage()
        } else if (e.key === 'ArrowRight') {
          this.nextImage()
        }
      })
    },

    open(index, images) {
      this.currentIndex = index
      this.images = images
      this.isOpen = true
      this.updateLightboxImage()

      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    },

    close() {
      this.isOpen = false
      document.body.style.overflow = ''
    },

    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length
      this.updateLightboxImage()
    },

    previousImage() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length
      this.updateLightboxImage()
    },

    updateLightboxImage() {
      const image = this.images[this.currentIndex]
      if (image && this.$refs.lightboxImage) {
        // Handle both string URLs and image objects
        const imageSrc = typeof image === 'string' ? image : image.src
        const imageAlt = typeof image === 'object' && image.alt ? image.alt : this.productTitle

        this.$refs.lightboxImage.src = this.getImageUrl(imageSrc, 2000)
        this.$refs.lightboxImage.alt = imageAlt
      }
    },

    getImageUrl(src, width = null) {
      if (!src) return ''
      const baseUrl = src.split('?')[0]
      return width ? `${baseUrl}?width=${width}` : baseUrl
    }
  }
}
