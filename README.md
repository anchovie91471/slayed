# VAST - Shopify Starter Theme

**V**ite + **A**lpine + **S**chematic + **T**ailwind

A bare-bones, modern Shopify starter theme built for speed and developer experience.

## Key Technologies

- **[Vite v7](https://vitejs.dev/)** - Blazing-fast HMR during development and optimized production builds that keep your workflow smooth and your bundles lean
- **[AlpineJS v3](https://alpinejs.dev/)** - Powerful reactivity with minimal overhead—build interactive components without the framework bloat
- **[Tailwind CSS v4](https://tailwindcss.com/)** - The latest generation of utility-first CSS with native cascade layers, improved performance, and zero-config styling
- **[Schematic v2](https://www.npmjs.com/package/@anchovie/schematic)** - Define section schemas once in JavaScript and deploy everywhere—eliminate JSON duplication and streamline your workflow
- **[Liquid AJAX Cart v2](https://liquid-ajax-cart.js.org/v2/)** - Production-ready cart with zero configuration—dynamic updates, minicart, and seamless Shopify integration out of the box
- **[Shopify Vite Plugin v4](https://github.com/barrel/shopify-vite)** - Rock-solid integration between Vite and Shopify CLI with SSL support and intelligent asset handling

## Features

### Core Architecture

- **Minimal Foundation**: A lean starting point that's easy to customize and extend without unnecessary bloat
- **AlpineJS Components**: Lightweight, reactive components with automatic registration from modular directories
- **Schema-Driven Development**: JavaScript-based schema definitions with Schematic—define once, deploy everywhere
- **Tailwind CSS v4**: Latest utility-first CSS with enhanced performance and modern class names
- **Complete Theme Templates**: Production-ready templates including polished account pages and checkout flows
- **Modular Structure**: Clean separation of concerns with organized directory structure for maintainability

### Built-in Functionality

- **AJAX Cart** - Fully functional minicart with Liquid AJAX Cart v2
- **Predictive Search** - Shopify's native predictive search with custom web component
- **Auto-registered Components** - AlpineJS components, stores, and directives auto-load from their directories
- **Live Reload** - Hot module replacement for CSS/JS and page reload for Liquid changes
- **SSL Development** - HTTPS-enabled local development environment
- **SEO Optimized** - Complete Open Graph, Twitter Cards, and meta tag implementation
- **Accessibility First** - Semantic HTML, ARIA labels, skip links, and keyboard navigation
- **Customer Account Pages** - Complete account management templates (login, register, addresses, orders)
- **Gift Card Support** - Dedicated gift card template included

## Project Structure

```
├── src/
│   ├── entrypoints/       # Vite entry points (theme.js, theme.css)
│   ├── js/
│   │   ├── alpine/        # AlpineJS stores (global utilities)
│   │   │   └── stores/    # Alpine.store() global state
│   │   └── helpers.js     # Utility functions
│   ├── css/
│   │   └── global.css     # Global styles (not tree-shaken)
│   ├── schema/            # Schematic schema definitions (.cjs files)
│   ├── images/            # Image assets
│   └── fonts/             # Font files
├── public/                # Static assets (copied to /assets on build)
├── sections/              # Liquid section files
├── snippets/              # Liquid snippet files
├── templates/             # Liquid template files
├── layout/                # Theme layouts
├── config/                # Theme settings
└── locales/               # Translation files
```

## What's Included

### Sections (20+)

**Page Layout**
- `header.liquid` - Sticky header with navigation, cart, search, and mobile menu
- `footer.liquid` - Footer with links and copyright

**Product & Collection**
- `main-product.liquid` - Full product page with gallery, variants, pricing, and add-to-cart
- `main-collection.liquid` - Collection listing with pagination
- `featured-product-grid.liquid` - Featured collection showcase
- `main-search.liquid` - Search results grouped by type (products, articles, pages)

**Content Pages**
- `main-page.liquid` - Generic page content
- `main-page-contact.liquid` - Contact form with validation
- `main-blog.liquid` - Blog listing
- `main-article.liquid` - Blog post display
- `main-list-collections.liquid` - All collections listing

**Shopping**
- `main-cart.liquid` - Shopping cart with AJAX updates
- `minicart.liquid` - Slide-in mini cart

**Features**
- `faq.liquid` - Collapsible FAQ/accordion section
- `modal.liquid` - Reusable modal dialog with Alpine.js
- `predictive-search-main.liquid` - Search overlay
- `predictive-search-results.liquid` - Live search results

**Utility**
- `main-password.liquid` - Password-protected store
- `main-404.liquid` - 404 error page
- `promo-bar.liquid` - Promotional banner with scroll-collapse

### Components & Snippets (23+)

**Icons** - Complete SVG icon set (cart, search, user, close, hamburger, spinner, plus, minus, caret, error, bubble)

**Product Components**
- `product-variant-picker.liquid` - Smart variant selector with availability tracking
- `product-variant-options.liquid` - Radio buttons or dropdowns for variants
- `product-grid-item.liquid` - Product card for grids

**Navigation**
- `header-menu.liquid` - Desktop navigation
- `mobile-menu.liquid` - Mobile menu drawer
- `collections-list.liquid` - Collection navigation
- `pagination-navigation.liquid` - Pagination controls

**Utilities**
- `head-meta.liquid` - SEO meta tags, Open Graph, Twitter Cards
- `head-css.liquid` - Critical CSS and x-cloak styling
- `head-scripts.liquid` - Inline scripts and design mode detection
- `liquid-ajax-cart.liquid` - Cart initialization

### Templates (12+)

**Main Templates**
- `index.json` - Homepage
- `product.json` - Product detail page
- `collection.json` - Collection listing
- `search.json` - Search results
- `cart.json` - Shopping cart
- `blog.json` / `article.json` - Blog pages
- `page.json` / `page.contact.json` - Content pages
- `list-collections.json` - All collections
- `404.json` / `password.json` - Utility pages

**Customer Account Templates**
- `customers/account.liquid` - Account dashboard
- `customers/login.liquid` / `register.liquid` - Authentication
- `customers/addresses.liquid` - Address management
- `customers/order.liquid` - Order history
- `customers/activate_account.liquid` / `reset_password.liquid` - Account recovery

**Gift Cards**
- `gift_card.liquid` - Gift card display

### JavaScript Features

**Alpine.js Components** (inline in Liquid)
- `productGallery` - Variant-aware product image gallery
- `priceComponent` - Dynamic pricing with flash animation
- `productForm` - Add to cart with quantity management
- `variantPicker` - Intelligent variant selection with availability
- `modal` - Dialog management with click-outside-to-close

**Global Store** (`src/js/alpine/stores/global.js`)
- Mobile menu state management
- Minicart visibility control
- Predictive search toggle
- Promo bar scroll-collapse
- Cart data synchronization

**Helper Utilities** (`src/js/helpers.js`)
- `emitEvent()` - Custom event dispatcher
- `fetchHTML()` - Async HTML fetching
- `throttle()` / `debounce()` - Performance utilities
- `truncateLongTitle()` - String manipulation
- Body class and random number helpers

**Web Components**
- `PredictiveSearch` - Custom element for live search (in `public/predictive-search.js`)

**Custom Event System**
- `variant:change` - Product variant selection
- `liquid-ajax-cart:*` - Cart operation events
- `show-modal` / `close-modal` - Modal controls

### CSS Architecture

**Tailwind v4 Layers**
- `src/css/base.css` - Base element styles
- `src/css/components.css` - Reusable component classes (`.btn`, `.input-select`, `.pill-button`)
- `src/css/utilities.css` - Custom utility classes
- `src/css/global.css` - Non-tree-shaken global styles

**Alpine.js Plugins Included**
- `@alpinejs/collapse` - Smooth collapse/expand animations (used in FAQ, promo bar)
- `@alpinejs/focus` - Focus management for modals and dialogs
- `@alpinejs/morph` - DOM morphing for dynamic content updates

### Theme Settings

Configurable via Shopify theme customizer (`config/settings_schema.json`):
- Logo image upload
- Promo bar (toggle, content, scroll behavior)
- Predictive search (enable/disable)
- Modal configuration (title, description)

Individual sections have additional settings for:
- Collection selection
- Color schemes
- Layout options
- Content blocks (FAQ items, collapsible rows, etc.)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- [Shopify CLI](https://shopify.dev/docs/themes/tools/cli)
- A Shopify development store

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anchovie91471/vast-shopify-theme <theme-directory>
   cd <theme-directory>
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

   > **Note**: The `--legacy-peer-deps` flag is required due to a peer dependency conflict between Vite 7 and `@by-association-only/vite-plugin-shopify-clean` (which currently only supports Vite 5-6). The plugin works correctly with Vite 7 despite the version mismatch.

3. **Configure Shopify CLI**

   Create a `shopify.theme.toml` file in the root directory:

   ```toml
   [environments.development]
   store = "your-store-name"
   theme = "123456789"  # Your theme ID

   [environments.staging]
   store = "your-store-name"
   theme = "987654321"
   ignore = ["templates/*", "config/*"]

   [environments.production]
   store = "your-store-name"
   theme = "111222333"
   ignore = ["templates/*", "config/*"]
   ```

4. **Start development**
   ```bash
   npm run dev
   ```

   This runs Vite dev server (port 3000) and Shopify CLI dev server concurrently.

### SSL/HTTPS Setup

The theme uses self-signed SSL certificates for local development. If assets aren't loading:

1. Visit `https://127.0.0.1:3000` in your browser
2. Click "Advanced" and proceed past the security warning
3. Return to your Shopify dev server at `http://127.0.0.1:9292`

### CORS for Custom Domains

If using a custom domain (not `*.myshopify.com`), add it to `vite.config.js`:

```javascript
server: {
  cors: {
    origin: [
      /^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/,
      /^https:\/\/[^\/]+\.myshopify\.com$/,
      'https://yourcustomdomain.com'  // Add your domain
    ]
  }
}
```

## Development Workflow

### NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite + Shopify CLI dev servers with live reload |
| `npm run build` | Build assets and compile schemas |
| `npm run deploy` | Build and push to production environment (interactive) |
| `npm run deploy:dev` | Build and push to development environment |
| `npm run deploy:staging` | Build and push to staging environment |
| `npm run deploy:new` | Build and publish as new theme on Shopify |

For all Shopify CLI commands, see [Shopify CLI documentation](https://shopify.dev/docs/themes/tools/cli/commands).

### Working with Schematic

[Schematic](https://www.npmjs.com/package/@anchovie/schematic) eliminates JSON duplication by letting you define section schemas in JavaScript.

**Schema files location**: `src/schema/`

**Example schema** (`src/schema/header.cjs`):

```javascript
const { app } = require('@anchovie/schematic');

module.exports = {
    ...app.section("header", {
        class: "section-header sticky top-0 z-20 shadow-md",
        tag: "header"
    }),
    "settings": [
        app.paragraph("t:sections.header.settings.paragraph"),
    ]
}
```

**Compiling schemas**:

```bash
npx schematic
```

This compiles all `.cjs` files in `src/schema/` to their corresponding Liquid section files, injecting the JSON schema.

**Note**: The build and deploy scripts automatically run Schematic, so manual compilation is only needed during development.

**Learn more**: [@anchovie/schematic documentation](https://www.npmjs.com/package/@anchovie/schematic)

### Working with AlpineJS

VAST uses an **inline-first** approach where Alpine components are defined directly in Liquid files using `<script>` tags. This makes the theme more beginner-friendly and easier to understand.

**Example inline component** (`sections/modal.liquid`):

```liquid
<div x-data="modal">
  <button @click="open">Open Modal</button>
  <div x-show="isOpen" @click.away="close">
    Modal content
  </div>
</div>

<script>
  document.addEventListener('alpine:init', () => {
    Alpine.data('modal', () => ({
      isOpen: false,

      init() {
        // Initialization code
      },

      open() {
        this.isOpen = true
      },

      close() {
        this.isOpen = false
      }
    }))
  })
</script>
```

**Real-world examples**:
- Product page components: `sections/main-product.liquid` (productGallery, priceComponent, productForm)
- Variant picker: `snippets/product-variant-picker.liquid`
- Modal: `sections/modal.liquid`

**Global utilities** in `src/js/alpine/`:
- `stores/` - Global Alpine stores auto-registered (e.g., cart state, mobile menu)

Auto-registration happens in `src/js/alpine/index.js` using Vite's glob imports.

**Event-driven architecture**:
The theme uses custom events for component communication:
- Product components listen to `variant:change` events to update gallery and pricing
- Modal components respond to `show-modal` and `close-modal` events
- Cart components listen to `liquid-ajax-cart:*` events for state updates

This decoupled approach keeps components modular and easier to maintain.

**Variant management**:
The `variantPicker` component provides sophisticated variant handling:
- Tracks all possible variant combinations and availability
- Disables unavailable options based on current selection
- Updates URL parameters for shareable variant links
- Dispatches events when variants change for other components to react

### Dynamic Imports for Performance

VAST uses two strategies for code splitting to optimize Core Web Vitals:

**1. Liquid conditionals for page-type splitting** (Preferred for CWV)

Use Liquid to conditionally load page-specific JavaScript:

```liquid
{% if template contains 'product' %}
  <script src="{{ 'product-features.js' | asset_url }}" defer></script>
{% endif %}
```

**Why this is better**: The browser only loads the script on product pages, reducing JavaScript execution on other pages. This is more efficient than loading the code and checking page type in JavaScript.

**2. Dynamic imports for interaction-based lazy loading**

Use dynamic imports to load code only when users interact with features:

```javascript
// Load image zoom only when user hovers product image
document.querySelector('.product-image')?.addEventListener('mouseenter', async () => {
  const { initZoom } = await import('./image-zoom.js')
  initZoom()
}, { once: true })
```

**Good use cases**:
- Image zoom/lightbox (triggered by hover or click)
- Video players (triggered by play button)
- Complex product configurators (triggered by "customize" button)
- Heavy third-party libraries only needed after user interaction

**Key principle**: Use Liquid conditionals for page-type splitting, dynamic imports for user-interaction splitting. This minimizes JavaScript execution during initial page load, improving Core Web Vitals metrics.

### CSS and Tailwind

**Tailwind v4** is configured via the `@tailwindcss/vite` plugin.

**Entry point**: `src/entrypoints/theme.css`

**Global styles**: `src/css/global.css` - For styles not tree-shaken, supports nesting via `@tailwindcss/nesting`

For more information on Tailwind v4's features and syntax, see the [Tailwind v4 documentation](https://tailwindcss.com/docs).

### JavaScript Entry Points

**Main entry**: `src/entrypoints/theme.js`

Additional entry points can be added in `vite.config.js`:

```javascript
shopify({
  additionalEntrypoints: [
    'src/js/custom-module.js'
  ]
})
```

**Dynamic imports**: Use for code-splitting and lazy-loading features.

### Public Directory

Static assets in the `public/` directory are automatically copied to `assets/` on build. This is a [Vite convention](https://vitejs.dev/guide/assets.html#the-public-directory).

During development, a custom Vite plugin watches `public/` and syncs changes to `assets/` in real-time.

## Build and Deployment

### Building for Production

```bash
npm run build
```

This command:
1. Runs Vite build (compiles and minifies JS/CSS)
2. Runs Schematic (compiles all schema files)

**Output**:
- JavaScript: `assets/[name].[hash].min.js`
- CSS: `assets/[name].[hash].min.css`
- Vite snippet: `snippets/vite.liquid` (auto-generated, gitignored)

### Deploying

**To development environment**:
```bash
npm run deploy:dev
```

**To staging environment**:
```bash
npm run deploy:staging
```

**To production environment** (interactive):
```bash
npm run deploy
```

**As new unpublished theme**:
```bash
npm run deploy:new
```

**Important**: Deployment commands can overwrite live themes. Always double-check your `shopify.theme.toml` configuration.

## Configuration Files

### `vite.config.js`

Main Vite configuration including:
- Shopify Vite plugin setup
- SSL configuration
- CORS settings
- Tailwind v4 plugin
- Public directory syncing
- Liquid file change detection for HMR

### `tailwind.config.js`

Tailwind v4 no longer requires extensive configuration. Most settings are now CSS-based via `@theme` in your CSS files.

### `jsconfig.json` / `tsconfig.json`

JavaScript and TypeScript configurations for better IDE support and module resolution.

## AJAX Cart

The theme uses [Liquid AJAX Cart v2](https://liquid-ajax-cart.js.org/v2/) for cart functionality.

**Features**:
- AJAX add-to-cart without page refreshes
- Slide-in minicart with live updates
- Automatic cart state synchronization
- Event-driven updates across all cart UI
- Quantity adjustments from both cart page and minicart
- Processing states during cart operations

**Implementation**:
- Cart state initialized via `liquid-ajax-cart.liquid` snippet
- Minicart section (`sections/minicart.liquid`) shows/hides automatically on cart changes
- Product form component listens to `liquid-ajax-cart:request-start/end` events for loading states
- Global store synchronizes cart data across components

**Note**: v2 has API differences from v1. See [migration guide](https://liquid-ajax-cart.js.org/v2/differences-from-v1/).

## Predictive Search

Shopify's predictive search is included with a custom web component implementation.

**Features**:
- Live search-as-you-type with debouncing (300ms)
- Custom `PredictiveSearch` web component (`public/predictive-search.js`)
- Results grouped by product type
- Keyboard navigation support
- ARIA-compliant for accessibility
- Opens in overlay with escape-to-close

**Configuration**:
- Enable/disable via theme customizer settings
- Customizable prompt text in section settings
- To remove entirely, delete the reference in `layout/theme.liquid`

**Technical details**:
- Uses Shopify's native `/search/suggest` API
- Implements `HTMLElement` custom element
- Results render in `predictive-search-results.liquid` section
- Alpine store controls overlay visibility

## Accessibility Features

VAST is built with accessibility in mind:

**Semantic HTML**:
- Proper use of `<header>`, `<nav>`, `<main>`, `<footer>` landmarks
- Heading hierarchy (h1, h2, h3) throughout templates
- Lists and navigation marked up correctly

**ARIA Support**:
- ARIA labels on interactive elements (buttons, links, form controls)
- ARIA roles for dynamic content (listbox for search results, navigation for menus)
- ARIA expanded/hidden states for collapsible elements
- Live regions for dynamic cart updates

**Keyboard Navigation**:
- Skip-to-content link (visible on focus)
- Full keyboard support for modals and dialogs
- Focus management with `@alpinejs/focus` plugin
- Escape key to close overlays and modals

**Visual Accessibility**:
- High contrast color scheme
- Focus indicators on interactive elements
- Accessible form validation with error messages
- Loading states for async operations

## SEO Features

Built-in SEO optimization for better search engine visibility:

**Meta Tags** (`snippets/head-meta.liquid`):
- Dynamic page titles with shop name
- Meta descriptions from page/product content
- Canonical URLs to prevent duplicate content
- Charset and viewport meta tags

**Open Graph Tags**:
- og:title, og:url, og:type, og:description, og:image
- Dynamic og:type based on template (product, article, website)
- Product-specific pricing meta tags
- Featured images for social sharing

**Twitter Cards**:
- Summary card with large image
- Twitter site handle support
- Product and article-specific metadata

**Structured Data**:
- Proper HTML5 semantic structure
- Breadcrumb-ready navigation
- Product schema-ready markup (price, availability, variants)

**Performance**:
- Preconnect to Shopify CDN
- Optimized asset loading via Vite
- Responsive images with srcset
- Lazy loading support

## Contributing

Contributions are welcome! If you'd like to contribute or report issues, please open an issue or pull request.

## License

MIT

## Credits

- Built and maintained by [anchovie91471](https://github.com/anchovie91471)
- Inspired by [james0r/slayed](https://github.com/james0r/slayed)
- Powered by modern tooling and best practices for Shopify theme development

## Support

For questions about:
- **Vite**: [Vite documentation](https://vitejs.dev/)
- **AlpineJS**: [Alpine documentation](https://alpinejs.dev/)
- **Tailwind v4**: [Tailwind documentation](https://tailwindcss.com/)
- **Schematic**: [@anchovie/schematic](https://www.npmjs.com/package/@anchovie/schematic)
- **Shopify CLI**: [Shopify theme tools](https://shopify.dev/docs/themes/tools/cli)
