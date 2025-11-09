export default {
  name: 'productGallery',
  component() {
    return {
      currentMedia: null,
      sectionId: null,

      init() {
        const productData = Alpine.store('productData')
        const currentVariant = productData.currentVariant
        this.sectionId = productData.sectionId

        // Set initial media
        if (currentVariant && (currentVariant.featured_media || currentVariant.featured_image)) {
          this.currentMedia = currentVariant.featured_media || currentVariant.featured_image
        }

        // Listen for variant:change events
        document.addEventListener('variant:change', (event) => {
          if (event.detail.sectionId === this.sectionId) {
            this.updateMedia(event.detail.variant)
          }
        })
      },

      updateMedia(variant) {
        if (!variant) return

        const newMedia = variant.featured_media || variant.featured_image

        if (newMedia && newMedia.id !== this.currentMedia?.id) {
          this.currentMedia = newMedia

          // Update the image element
          const imgElement = this.$el.querySelector('img')
          if (imgElement && newMedia.src) {
            imgElement.src = this.getImageUrl(newMedia.src)
            imgElement.srcset = this.getImageSrcset(newMedia.src)
            imgElement.alt = newMedia.alt || ''
          }
        }
      },

      getImageUrl(src, width = null) {
        if (!src) return ''
        const baseUrl = src.split('?')[0]
        return width ? `${baseUrl}?width=${width}` : baseUrl
      },

      getImageSrcset(src) {
        if (!src) return ''
        const sizes = [800, 1000, 1426]
        return sizes.map(size => `${this.getImageUrl(src, size)} ${size}w`).join(', ')
      }
    }
  }
}
