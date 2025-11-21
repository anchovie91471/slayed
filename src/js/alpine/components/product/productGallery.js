/**
 * Product Gallery Component
 *
 * Manages product image gallery with thumbnail navigation, zoom functionality,
 * and lightbox support. Responds to variant changes to update the main image.
 *
 * Usage in Liquid:
 * <div x-data="productGallery"
 *      data-images='{{ product.images | json }}'
 *      data-gallery-layout="{{ section.settings.gallery_layout | default: 'bottom' }}"
 *      data-thumbnail-size="{{ section.settings.gallery_thumbnail_size | default: 80 }}"
 *      data-zoom-enabled="{{ section.settings.enable_zoom | default: true }}"
 *      data-zoom-type="{{ section.settings.zoom_type | default: 'hover' }}"
 *      data-zoom-level="{{ section.settings.zoom_level | default: 2 }}"
 *      data-product-title="{{ product.title | json }}">
 */

export default function productGallery() {
  return {
    currentImageIndex: 0,
    images: [],
    sectionId: null,
    galleryLayout: 'bottom',
    thumbnailSize: 80,
    zoomEnabled: true,
    zoomType: 'hover',
    zoomLevel: 2,
    productTitle: '',

    init() {
      // Read configuration from data attributes
      const el = this.$el
      this.images = JSON.parse(el.dataset.images || '[]')
      this.galleryLayout = el.dataset.galleryLayout || 'bottom'
      this.thumbnailSize = parseInt(el.dataset.thumbnailSize) || 80
      this.zoomEnabled = el.dataset.zoomEnabled === 'true'
      this.zoomType = el.dataset.zoomType || 'hover'
      this.zoomLevel = parseFloat(el.dataset.zoomLevel) || 2
      this.productTitle = el.dataset.productTitle || ''

      const productData = Alpine.store('productData')
      const currentVariant = productData.currentVariant
      this.sectionId = productData.sectionId

      // Set initial image index based on variant or featured image
      if (currentVariant && (currentVariant.featured_media || currentVariant.featured_image)) {
        const variantMedia = currentVariant.featured_media || currentVariant.featured_image
        // Images array contains URL strings, not objects with id
        // Compare by URL instead of id
        const variantMediaSrc = variantMedia.src || variantMedia
        const index = this.images.findIndex(img => {
          const imgSrc = typeof img === 'string' ? img : img.src
          return imgSrc && variantMediaSrc && imgSrc.includes(variantMediaSrc.split('?')[0].split('/').pop())
        })
        if (index !== -1) {
          this.currentImageIndex = index
        }
      }

      // Listen for variant:change events
      document.addEventListener('variant:change', (event) => {
        if (event.detail.sectionId === this.sectionId) {
          this.updateMediaForVariant(event.detail.variant)
        }
      })
    },

    selectImage(index) {
      if (index >= 0 && index < this.images.length) {
        this.currentImageIndex = index
        this.updateMainImage(this.images[index])
      }
    },

    updateMediaForVariant(variant) {
      if (!variant) return

      const newMedia = variant.featured_media || variant.featured_image
      if (newMedia) {
        // Images array contains URL strings, not objects with id
        // Compare by URL instead of id
        const newMediaSrc = newMedia.src || newMedia
        const index = this.images.findIndex(img => {
          const imgSrc = typeof img === 'string' ? img : img.src
          return imgSrc && newMediaSrc && imgSrc.includes(newMediaSrc.split('?')[0].split('/').pop())
        })
        if (index !== -1) {
          this.selectImage(index)
        }
      }
    },

    updateMainImage(image) {
      if (!image) return

      const imgElement = this.$refs.mainImage

      // Handle both string URLs and image objects
      const imageSrc = typeof image === 'string' ? image : image.src
      const imageAlt = typeof image === 'object' && image.alt ? image.alt : this.productTitle

      if (imgElement && imageSrc) {
        imgElement.src = this.getImageUrl(imageSrc, 1426)
        imgElement.srcset = this.getImageSrcset(imageSrc)
        imgElement.alt = imageAlt
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
    },

    // Zoom Methods
    handleZoomMove(event) {
      if (!this.zoomEnabled || (this.zoomType !== 'hover' && this.zoomType !== 'both')) return
      if (window.innerWidth < 768) return // Skip on mobile

      const imgElement = this.$refs.mainImage
      if (!imgElement) return

      const rect = event.currentTarget.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100

      imgElement.style.transformOrigin = `${x}% ${y}%`
      imgElement.style.transform = `scale(${this.zoomLevel})`
    },

    resetZoom() {
      const imgElement = this.$refs.mainImage
      if (imgElement) {
        imgElement.style.transform = 'scale(1)'
      }
    },

    openLightbox() {
      if (!this.zoomEnabled) return
      window.dispatchEvent(new CustomEvent('open-lightbox', {
        detail: {
          imageIndex: this.currentImageIndex,
          images: this.images
        }
      }))
    }
  }
}
