/**
 * Blog Listing Component
 *
 * Handles pagination with load-more and infinite scroll modes.
 *
 * Usage in Liquid:
 * <div x-data="blogListing"
 *      data-pagination-type="{{ section.settings.pagination_type | default: 'pagination' }}"
 *      data-blog-url="{{ blog.url }}"
 *      data-current-tag="{{ current_tags | first }}"
 *      data-current-page="{{ paginate.current_page }}"
 *      data-total-pages="{{ paginate.pages }}">
 */

export default function blogListing() {
  return {
    loading: false,
    currentPage: 1,
    totalPages: 1,
    hasMore: false,
    error: null,
    paginationType: 'pagination',
    blogUrl: '',
    currentTag: '',

    init() {
      // Read configuration from data attributes
      const el = this.$el
      this.paginationType = el.dataset.paginationType || 'pagination'
      this.blogUrl = el.dataset.blogUrl || ''
      this.currentTag = el.dataset.currentTag || ''
      this.currentPage = parseInt(el.dataset.currentPage) || 1
      this.totalPages = parseInt(el.dataset.totalPages) || 1
      this.hasMore = this.currentPage < this.totalPages

      if (this.paginationType === 'infinite') {
        this.setupInfiniteScroll()
      }
    },

    setupInfiniteScroll() {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && this.hasMore && !this.loading) {
          this.loadMore()
        }
      }, {
        rootMargin: '200px'
      })

      if (this.$refs.infiniteScrollTrigger) {
        observer.observe(this.$refs.infiniteScrollTrigger)
      }
    },

    async loadMore() {
      if (this.loading || !this.hasMore) return

      this.loading = true
      this.error = null
      const nextPage = this.currentPage + 1

      try {
        const url = this.currentTag
          ? `${this.blogUrl}/tagged/${this.currentTag}?page=${nextPage}`
          : `${this.blogUrl}?page=${nextPage}`

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const html = await response.text()

        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        const newArticles = doc.querySelectorAll('[x-ref="articleGrid"] > div')

        if (newArticles.length === 0) {
          this.hasMore = false
          return
        }

        newArticles.forEach(article => {
          this.$refs.articleGrid.appendChild(article.cloneNode(true))
        })

        this.currentPage = nextPage
        this.hasMore = this.currentPage < this.totalPages

      } catch (err) {
        console.error('Failed to load more articles:', err)
        this.error = 'Failed to load more articles. Please try again.'
        this.hasMore = true
      } finally {
        this.loading = false
      }
    }
  }
}
