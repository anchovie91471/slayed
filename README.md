# VAST - Shopify Starter Theme

**V**ITE + **A**LPINE + **S**CHEMATIC + **T**AILWIND

A bare-bones, modern Shopify starter theme built for speed and developer experience.

If you're looking to create a custom Shopify theme and want to save the headache of setting up tooling and boilerplate, this is the theme for you.

---

## 🎨 Live Demo

**[View Demo Store](https://vast-theme.myshopify.com/)**
Password: `vast.me`

See VAST in action with a fully configured store showcasing all features and components.

---

## 📚 Documentation

Complete documentation is available on the [GitHub Wiki](https://github.com/anchovie91471/vast-shopify-theme/wiki):

- **[Getting Started](https://github.com/anchovie91471/vast-shopify-theme/wiki/Getting-Started)** - Installation, prerequisites, SSL setup, deployment strategies
- **[Development Guide](https://github.com/anchovie91471/vast-shopify-theme/wiki/Development-Guide)** - Development workflow, NPM scripts, working with tools
- **[Build & Deployment](https://github.com/anchovie91471/vast-shopify-theme/wiki/Build-and-Deployment)** - Building for production, deployment options
- **[Features Reference](https://github.com/anchovie91471/vast-shopify-theme/wiki/Features-Reference)** - Detailed documentation for all theme features
- **[What's Included](https://github.com/anchovie91471/vast-shopify-theme/wiki/Whats-Included)** - Complete reference of sections, snippets, templates, components
- **[Accessibility Features](https://github.com/anchovie91471/vast-shopify-theme/wiki/Accessibility-Features)** - WCAG compliance, semantic HTML, ARIA labels
- **[SEO Features](https://github.com/anchovie91471/vast-shopify-theme/wiki/SEO-Features)** - Meta tags, Open Graph, structured data, performance
- **[Architecture](https://github.com/anchovie91471/vast-shopify-theme/wiki/Architecture)** - Project structure, Alpine.js architecture, component organization

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Shopify CLI](https://shopify.dev/docs/themes/tools/cli)
- A Shopify development store

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anchovie91471/vast-shopify-theme <theme-directory>
   cd <theme-directory>
   ```

2. **Run the setup wizard**
   ```bash
   npm run setup
   ```

   The interactive setup wizard will:
   - Install dependencies automatically
   - Connect to your Shopify store
   - Guide you through three setup options:
     - **Auto-create** (recommended): Let Shopify CLI automatically create a development theme
     - **Use existing**: Select from themes already on your store
     - **Create new**: Create a permanent unpublished theme with a custom name
   - Generate your `shopify.theme.toml` configuration
   - Run an initial build to create the assets

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Accept the SSL certificate**

   When Vite starts, visit `https://127.0.0.1:3000` in your browser:
   - Click "Advanced" and accept the security warning
   - Once accepted, navigate to `http://127.0.0.1:9292` to see your theme preview

That's it! Your theme is now running and ready for development.

---

## 🎯 Understanding Setup Paths

The setup wizard offers three ways to configure your development theme:

### Auto-create Development Theme (Recommended)

**What it does:**
- Creates a minimal `shopify.theme.toml` with only your store name
- Shopify CLI automatically creates a temporary development theme when you run `npm run dev`
- No manual theme selection or configuration required

**Best for:**
- First-time setup or quick starts
- Solo developers who want the simplest workflow
- When you don't have an existing development theme

**Note:** Development themes are temporary and deleted when you run `shopify auth logout`.

### Use Existing Theme

**What it does:**
- Fetches all themes from your store
- Lets you select an existing theme (development, unpublished, or live)
- Adds the theme ID to your `shopify.theme.toml`

**Best for:**
- Teams working on the same development theme
- When you already have a development theme set up
- Switching between multiple theme projects

**Note:** Choose carefully—selecting a live theme requires extra confirmation to prevent accidental overwrites.

### Create New Unpublished Theme

**What it does:**
- Prompts for a custom theme name
- Builds your theme assets and pushes to Shopify
- Creates a new unpublished theme with your chosen name
- Adds the theme ID to your `shopify.theme.toml`

**Best for:**
- Long-term development themes that persist after logout
- Creating named themes for specific features or branches
- Permanent staging environments

**Note:** This option runs a full build and push, which may take a minute on first setup.

### Which Path Should I Choose?

| Situation | Recommended Path |
|-----------|------------------|
| First time installing VAST | **Auto-create** |
| Solo developer, quick start | **Auto-create** |
| Team development | **Use existing** |
| Feature branch workflow | **Create new** |
| Need theme to persist after logout | **Create new** |
| Already have a dev theme | **Use existing** |

For more detailed information about these options, see the [Getting Started guide](https://github.com/anchovie91471/vast-shopify-theme/wiki/Getting-Started).

---

## 🔧 Key Technologies

- **[Vite v7](https://vitejs.dev/)** - Blazing-fast HMR during development and optimized production builds
- **[AlpineJS v3](https://alpinejs.dev/)** - Powerful reactivity with minimal overhead
- **[Schematic v2](https://www.npmjs.com/package/@anchovie/schematic)** - Define section schemas once in JavaScript
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Latest generation utility-first CSS with native cascade layers
- **[Liquid AJAX Cart v2](https://liquid-ajax-cart.js.org/v2/)** - Production-ready cart with zero configuration
- **[Shopify Vite Plugin v4](https://github.com/barrel/shopify-vite)** - Rock-solid integration between Vite and Shopify CLI

This modern stack provides a minimal, customizable foundation with auto-registered components, complete theme templates (including account pages and checkout), and a clean, modular structure that's easy to maintain and extend.

---

## ✨ Features

### For Developers

- **Auto-registered Components** - AlpineJS components automatically load from modular directories
- **Live Reload** - Hot module replacement for CSS/JS, page reload for Liquid changes
- **SSL Development** - HTTPS-enabled local development environment
- **Reusable Component Library** - Pre-built alert, badge, button, and form-input components
- **Complete Theme Templates** - Production-ready account pages and checkout flows included
- **Schema-Driven Development** - JavaScript-based schemas via Schematic (no JSON duplication)
- **Modular Structure** - Clean separation of concerns with organized directory structure

### For End Users

- **AJAX Cart** - Add to cart without page refresh, slide-in minicart with live updates
- **Predictive Search** - Live search-as-you-type with keyboard navigation
- **Quick View Modal** - View product details without leaving collection pages
- **Recently Viewed Products** - Automatic product tracking with localStorage persistence
- **Product Recommendations** - Shopify's native recommendation engine
- **Breadcrumb Navigation** - SEO-optimized with structured data
- **Enhanced Blog System** - Featured posts, grid layouts, social sharing, related articles
- **SEO Optimized** - Complete Open Graph, Twitter Cards, and meta tag implementation
- **Accessibility First** - WCAG compliant with semantic HTML, ARIA labels, keyboard navigation

For detailed feature documentation, see the [Features Reference](https://github.com/anchovie91471/vast-shopify-theme/wiki/Features-Reference).

---

## 📦 What's Included

- **30+ Sections** - Header, footer, hero, product, collection, blog, FAQ, and more
- **35+ Components & Snippets** - Reusable components, icons, navigation, utilities
- **12+ Templates** - Complete set including customer account pages and gift cards
- **JavaScript Features** - Extracted Alpine.js components with auto-registration
- **CSS Architecture** - Tailwind v4 with organized layer system

For complete reference of all included files, see [What's Included](https://github.com/anchovie91471/vast-shopify-theme/wiki/Whats-Included).

---

## 🚢 Deployment

VAST supports two deployment approaches:

### GitHub Integration (Automatic)
Push code to GitHub → Shopify automatically syncs changes to your theme. Great for teams and CI/CD workflows.

### CLI Push (Manual)
Run deployment commands → Theme pushed directly to Shopify. Great for solo developers and manual control.

```bash
npm run deploy        # Push to production (interactive)
npm run deploy:dev    # Push to development environment
npm run deploy:staging # Push to staging environment
npm run deploy:new    # Create new unpublished theme
```

For detailed deployment instructions, see [Build & Deployment](https://github.com/anchovie91471/vast-shopify-theme/wiki/Build-and-Deployment).

---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute or report issues, please open an issue or pull request.

For contributors working on VAST itself, see `CLAUDE.md` for development guidelines and git configuration instructions.

---

## 📄 License

MIT

---

## 👏 Credits

- Built and maintained by [anchovie91471](https://github.com/anchovie91471)
- Inspired by [james0r/slayed](https://github.com/james0r/slayed)
- Powered by modern tooling and best practices for Shopify theme development

---

## 💪 Support

For questions about:
- **VAST Theme**: [GitHub Issues](https://github.com/anchovie91471/vast-shopify-theme/issues) or [Wiki](https://github.com/anchovie91471/vast-shopify-theme/wiki)
- **Vite**: [Vite documentation](https://vitejs.dev/)
- **AlpineJS**: [Alpine documentation](https://alpinejs.dev/)
- **Tailwind v4**: [Tailwind documentation](https://tailwindcss.com/)
- **Schematic**: [@anchovie/schematic](https://www.npmjs.com/package/@anchovie/schematic)
- **Shopify CLI**: [Shopify theme tools](https://shopify.dev/docs/themes/tools/cli)
