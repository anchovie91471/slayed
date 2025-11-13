# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ IMPORTANT: Git Policy

**NEVER create git commits without explicit user request.** The user will decide when to commit changes. Do NOT use `git commit` unless the user explicitly asks you to commit. This applies to all situations, including after completing tasks, fixing bugs, or making any code changes.

**NEVER revert the repository as a way to fix issues.** Do NOT use `git reset`, `git revert`, or any other git commands that undo commits or changes. If there are issues with code, fix them by making forward-progress changes, not by reverting history.

## Repository Contributor Setup

If you're contributing to this repository (not just using the theme), you'll need to configure local git ignore rules to prevent build artifacts from showing up in git status.

**Add to `.git/info/exclude`:**
```
/assets/*
!/assets/.gitkeep
/snippets/vite.liquid
```

**Why this approach?**
- The `.gitignore` file intentionally does NOT ignore `assets/` or `snippets/vite.liquid`
- This allows theme developers to use Shopify's GitHub integration (which deploys from git)
- Contributors use `.git/info/exclude` for local-only ignore rules that won't be committed
- Best of both worlds: clean repo for contributors, working GitHub integration for users

## Known Issues & Solutions

### Vite Build Watch Rebuild Loop (Fixed)

The default `npm run dev` command uses `vite build --watch` mode, which writes assets to disk for Shopify CLI upload. This configuration has been carefully tuned to prevent infinite rebuild loops.

**Root Cause:**
- `vite-plugin-shopify` writes `snippets/vite.liquid` on every build (in the `closeBundle()` hook)
- File writes can trigger Vite's watcher, causing another rebuild
- Without proper exclusions, this creates an infinite loop

**Solution Implemented:**

Three layers of protection prevent the rebuild loop:

1. **Monkey-patch fs.writeFileSync** (vite.config.js lines 11-40)
   - Intercepts all file writes to `snippets/vite.liquid`
   - Only writes when content has actually changed
   - Prevents unnecessary file system events

2. **Function-based watch ignore** (vite.config.js lines 149-169)
   - Explicit path checking for `snippets/vite.liquid` and `assets/**`
   - Uses `awaitWriteFinish` to stabilize file writes
   - Prevents watch triggers on excluded paths

3. **Rollup watch exclusions** (vite.config.js lines 171-180)
   - Excludes `snippets/vite.liquid` (not all snippets)
   - Excludes `assets/**` directory
   - Ensures Rollup's internal watcher also ignores these paths

**What Triggers Rebuilds:**
- ✅ Source files in `src/` directory
- ✅ Snippet files in `snippets/` (except vite.liquid)
- ✅ Section files in `sections/`
- ✅ Layout files in `layout/`
- ❌ `snippets/vite.liquid` (only writes when content changes)
- ❌ Files in `assets/**` directory

**Testing:**
The fix has been tested to ensure:
- Source code changes trigger single rebuild (no loop)
- Snippet changes trigger single rebuild (no loop)
- Section changes trigger single rebuild (no loop)
- Public directory changes copy files without triggering rebuilds
- One-time builds (`npm run build`) complete without hanging

## Project Overview

This is a Shopify theme starter called "VAST" built with Vite, Alpine.js, TailwindCSS, and the Shopify Vite plugin. It includes Liquid Ajax Cart for AJAX cart functionality and Schematic for schema management.

## Development Commands

### Essential Commands

- `npm run dev` - **Recommended:** Start local development with Shopify CLI dev server and Vite build watch mode (runs on http://127.0.0.1:9292). Uses `vite build --watch` to write files to disk, enabling theme editor and preview URLs to work properly.
- `npm run dev:vite-server` - **Alternative:** Start development with Vite dev server instead of build watch. Faster HMR but theme editor/preview URLs won't have styling/JS (serves from memory at https://127.0.0.1:3000, not uploaded to Shopify).
- `npm run build` - Build assets with Vite and compile schema with Schematic
- `npx schematic` - Compile schema files from `src/schema/` to `sections/` and `locales/`

**When to use each dev mode:**
- Use `npm run dev` (build watch) when working with theme editor or testing preview URLs - assets are written to disk and uploaded to Shopify
- Use `npm run dev:vite-server` when you need faster HMR and only work with local preview (127.0.0.1:9292) - faster rebuilds but editor won't work

### Deployment Commands

- `npm run deploy` - Build and push to production (interactive, CAN overwrite live theme)
- `npm run deploy:dev` - Build and push to development environment (requires `shopify.theme.toml`)
- `npm run deploy:staging` - Build and push to staging environment (requires `shopify.theme.toml`)
- `npm run deploy:new` - Build and publish to new unpublished theme (interactive)

### Shopify CLI Commands

- `npm run shopify:pull` - Pull theme files from Shopify
- `npm run shopify:pull-dev` - Pull development theme files
- `shopify theme dev` - Start Shopify dev server manually
- `shopify theme push` - Push theme to Shopify

Note: Configure environments in `shopify.theme.toml` (not tracked in git) to use non-interactive deployment commands.

## Architecture

### Build System (Vite + Shopify)

**Entrypoints:**
- Main entrypoint: `src/entrypoints/theme.js` and `src/entrypoints/theme.css`
- Vite outputs hashed assets to `assets/` directory with pattern `[name].[hash].min.js`
- Assets are referenced in Liquid via the `vite.liquid` snippet generated by vite-plugin-shopify

**Key Vite Plugins:**
- `vite-plugin-shopify` - Core integration, configured with `sourceCodeDir: "src"` and `entrypointsDir: 'src/entrypoints'`
- `@vitejs/plugin-basic-ssl` - Generates untrusted cert for local HTTPS (visit https://127.0.0.1:3000 and accept warning if assets don't load)
- `vite-plugin-page-reload` - Watches `/tmp/theme.update` file for Shopify CLI reload triggers
- Custom `copyPublicToAssetsPlugin` - Watches `public/` directory in dev mode and syncs to `assets/`
- Custom liquid-tailwind-refresh plugin - Prevents full page refresh on .liquid file changes during HMR

**Public Directory:**
Static files in `public/` are copied to `assets/` on build (Vite convention). Use for images, fonts, and other static assets that don't need processing.

### Alpine.js Architecture

**Inline-First Approach:**
VAST uses an inline-first Alpine.js architecture where components are defined directly in Liquid files using `<script>` tags. This makes the theme more beginner-friendly and view-source discoverable.

**Pattern:** Components are defined inline using `Alpine.data()` within `<script>` tags:
```liquid
<div x-data="myComponent">
  <!-- Component markup -->
</div>

<script>
  document.addEventListener('alpine:init', () => {
    Alpine.data('myComponent', () => ({
      // Component logic here
      init() {
        // Initialization code
      }
    }))
  })
</script>
```

**Examples:**
- Product components: `sections/main-product.liquid` (productGallery, priceComponent, productForm)
- Variant picker: `snippets/product-variant-picker.liquid` (variantPicker)
- Modal: `sections/modal.liquid` (modal)

**Auto-Registration System** (`src/js/alpine/index.js`):
Only global utilities are auto-registered:
- **Stores**: Files in `src/js/alpine/stores/*.js` are auto-registered as Alpine.store() (e.g., global state for menu, cart, scroll)

**Alpine Plugins Included:**
- @alpinejs/collapse
- @alpinejs/focus
- @alpinejs/morph

**Global Namespace:**
Window namespace is `window.vast` containing helper functions from `src/js/helpers.js`

### CSS/Styling

**TailwindCSS Configuration:**
- Content sources: All `.liquid` files and `src/**/*.{js,jsx,ts,tsx}`
- Custom variants: `scrolled` and `mobile-menu-visible` for dynamic state styling
- Custom fonts: 'Open Sans' via `src/fonts/`
- Container centered by default with custom breakpoint screens

**CSS Entry Points:**
- `src/entrypoints/theme.css` - Main CSS entrypoint that imports base, components, utilities
- `src/css/global.css` - Global styles, NOT tree-shaken, supports @apply and nesting via @tailwindcss/nesting
- `src/css/base.css` - Base layer styles
- `src/css/components.css` - Component layer styles
- `src/css/utilities.css` - Utility layer styles

### Schema Management (Schematic)

This project uses [`@anchovie/schematic`](https://www.npmjs.com/package/@anchovie/schematic) for schema management. Schema files in `src/schema/` are JavaScript/CommonJS modules that export schema objects. Schematic compiles these to JSON and injects them into corresponding section files or locale files.

**Key Schema Files:**
- Section schemas: `src/schema/*.cjs` files correspond to sections in `sections/`
- Locale schemas: `src/schema/locales/*.cjs` files compile to `locales/`
- Settings schema: `src/schema/settings_schema.cjs`

Run `npx schematic` after making changes to schema files. The build command runs this automatically.

### Liquid Ajax Cart Integration

Liquid Ajax Cart v2 is initialized in `src/entrypoints/theme.js` and provides AJAX cart functionality throughout the theme. The minicart section (`sections/minicart.liquid`) and related snippets use Liquid Ajax Cart directives.

**Important:** This theme uses v2 which has different API from v1. See https://liquid-ajax-cart.js.org/v2/differences-from-v1/

### File Structure

```
src/
├── entrypoints/          # Vite entrypoints (theme.js, theme.css)
├── js/
│   ├── alpine/           # Alpine.js stores (global utilities)
│   │   ├── stores/       # Global Alpine stores (auto-registered)
│   │   └── index.js      # Auto-registration system
│   └── helpers.js        # Utility functions (available on window.vast.helpers)
├── css/                  # CSS files (base, components, utilities, global)
├── fonts/                # Custom fonts
└── schema/               # Schematic schema definitions (compiled to sections/locales)

sections/                 # Shopify section files (Alpine components defined inline here)
snippets/                 # Shopify snippet files (Alpine components defined inline here)
layout/                   # Shopify layout files
assets/                   # Built assets (generated by Vite, don't edit directly)
public/                   # Static assets (copied to assets/ by Vite)
```

## Development Notes

### SSL/HTTPS in Development

Vite serves assets on https://127.0.0.1:3000 with untrusted cert. If assets don't load:
1. Visit https://127.0.0.1:3000 directly in browser
2. Click "Advanced" and proceed past security warning
3. Navigate back to http://127.0.0.1:9292 (Shopify dev server)

### Making Schema Changes

After editing any file in `src/schema/`, run `npx schematic` to compile changes into section/locale JSON. The build command does this automatically.

### Adding Alpine Components

Components are defined inline in Liquid files using `<script>` tags. Add a script tag to your section/snippet:

```liquid
<div x-data="myComponent">
  <!-- Your component markup -->
  <button @click="doSomething">Click me</button>
</div>

<script>
  document.addEventListener('alpine:init', () => {
    Alpine.data('myComponent', () => ({
      // Component state
      count: 0,

      // Initialization
      init() {
        console.log('Component initialized')
      },

      // Methods
      doSomething() {
        this.count++
      }
    }))
  })
</script>
```

**Why Inline?**
- View-source friendly for developers
- No build step needed to modify component logic
- Self-contained sections - easier to understand and debug
- Perfect for a starter theme where learning is a priority

**When to use src/js/alpine/ files:**
- **Stores**: Global state needed across multiple sections (e.g., cart, menu)

### Dynamic Imports

See example in `src/entrypoints/theme.js` for interaction-based lazy loading pattern:
```javascript
// Load image zoom only when user hovers product image
document.querySelector('.product-image')?.addEventListener('mouseenter', async () => {
  const { initZoom } = await import('./image-zoom.js')
  initZoom()
}, { once: true })
```

**For page-type code splitting, use Liquid conditionals instead:**
```liquid
{% if template contains 'product' %}<script src="{{ 'product-features.js' | asset_url }}"></script>{% endif %}
```

This approach is better for Core Web Vitals as it avoids loading unnecessary JavaScript on pages where it's not needed.

### Shopify Preview Bar

Hidden in development mode via inline styles injected in `src/entrypoints/theme.js`.

### Custom Tailwind Variants

Use `scrolled:` and `mobile-menu-visible:` prefixes for conditional styling based on JavaScript-added body classes.