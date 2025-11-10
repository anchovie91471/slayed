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
- **Predictive Search** - Shopify's native predictive search ready to enable
- **Auto-registered Components** - AlpineJS components, stores, and directives auto-load from their directories
- **Live Reload** - Hot module replacement for CSS/JS and page reload for Liquid changes
- **SSL Development** - HTTPS-enabled local development environment

## Project Structure

```
├── src/
│   ├── entrypoints/       # Vite entry points (theme.js, theme.css)
│   ├── js/
│   │   └── alpine/        # AlpineJS modules
│   │       ├── components/   # Alpine.data() components
│   │       ├── stores/       # Alpine.store() state management
│   │       ├── directives/   # Alpine.directive() custom directives
│   │       └── magic/        # Alpine.magic() magic properties
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

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- [Shopify CLI](https://shopify.dev/docs/themes/tools/cli)
- A Shopify development store

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <theme-directory>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

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

AlpineJS components are auto-registered from `src/js/alpine/` directories.

**Component structure** (`src/js/alpine/components/dropdown.js`):

```javascript
export default {
  name: 'dropdown',  // Used as x-data="dropdown()"
  component: () => ({
    open: false,
    toggle() {
      this.open = !this.open
    }
  })
}
```

**Usage in Liquid**:

```liquid
<div x-data="dropdown()">
  <button @click="toggle">Toggle</button>
  <div x-show="open">Dropdown content</div>
</div>
```

**Directory structure**:
- `components/` - `Alpine.data()` components
- `stores/` - `Alpine.store()` global state
- `directives/` - `Alpine.directive()` custom directives (commented out by default)
- `magic/` - `Alpine.magic()` magic properties (commented out by default)

All modules are auto-registered in `src/js/alpine/index.js` using Vite's glob imports.

**AlpineJS plugins included**:
- `@alpinejs/collapse` - Collapse/expand animations
- `@alpinejs/focus` - Focus management utilities
- `@alpinejs/morph` - DOM morphing for dynamic content

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
- AJAX add-to-cart
- Minicart with live updates
- No page refreshes needed

**Note**: v2 has API differences from v1. See [migration guide](https://liquid-ajax-cart.js.org/v2/differences-from-v1/).

## Predictive Search

Shopify's predictive search is included and ready to enable in the theme customizer.

To remove it, delete the reference in `layout/theme.liquid`.

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
