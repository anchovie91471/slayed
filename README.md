# Slayed Shopify Starter Theme

## Demo

[https://slayed-starter.myshopify.com/](https://slayed-starter.myshopify.com/)

Password: sprite

## Chat

Discord chat at #slayed on 

[![](https://dcbadge.vercel.app/api/server/shopify-developers-597504637167468564)](https://discord.gg/shopify-developers-597504637167468564)

## Shopify CLI

To easily log into your preferred store and theme, create a `shopify.theme.toml` in the root directory and define your environement details.

Example:

```toml
[environments.development]
store = "slayed-starter"
theme = "123123123"

[environments.staging]
store = "slayed-starter"
theme = "123123123"
ignore = ["templates/*", "config/*"]

[environments.production]
store = "slayed-starter"
theme = "123123123"
ignore = ["templates/*", "config/*"]
```

### Commands

| Command       | Purpose           | Notes  |
| ------------- |:-------------:| :-----:|
| `npm run dev`   | Develop with local dev server with live reload| See [Development Themes](https://shopify.dev/docs/themes/tools/cli#development-themes) |
| `npm run deploy`     | Build and push to production environment theme (interactive)      | Command produces a menu to choose theme and confirm. This CAN overwrite the live theme! |
| `npm run deploy:dev` | Build and push to development environment theme (non-interactive)     | Uses **shopify.theme.toml** config |
| `npm run deploy:staging` | Build and push to staging environment theme (non-interactive)  | Does overrite remote themes section/theme content |
| `npm run deploy:new` | Build and publish to new theme on Shopify (interactive) |     |

For all other NPM scripts and Shopify CLI theme commands reference **package.json** and [Shopify CLI commands for themes](https://shopify.dev/docs/themes/tools/cli/commands)

## Vite
Slayed uses [Vite](https://vitejs.dev/) and the [Shopify Vite Plugin](https://github.com/barrel/shopify-vite). See vite-plugin-shopify [config options](https://github.com/barrel/shopify-vite/tree/main/packages/vite-plugin-shopify#usage).

### HTTPS/SSL

Slayed uses [@vitejs/plugin-basic-ssl](https://www.npmjs.com/package/@vitejs/plugin-basic-ssl). This plugin generates an untrusted certificate which allows access to the Vite client from the Shopify dev server after proceeding past the browsers warning screen.

If your assets aren't loading due to ssl errors, visit https://127.0.0.1:3000, click Advanced and proceed, then navigate back to your Shopify CLI dev server at http://127.0.0.1:9292 and you should see your assets loaded properly.

## CSS

The standard Tailwind boilerplate is provided.

Additionally, **src/css/global.css** can be used for global styles and is not tree-shaken. Layers and @apply can also be used in this file. This is made possible via [@tailwindcss/nesting](https://www.npmjs.com/package/@tailwindcss/nesting).

## Javascript

### Alpine.js
[Alpine.js](https://alpinejs.dev/start-here) is included and Alpine magic properties, components, stores, and directives directories exist in **src/js/alpine**. The modules are auto-registered within **src/js/alpine/index.js**. Reference **src/js/alpine/components/dropdown.js** to see an example of how to export your module.

> By no means do you need to register your Alpine components in this way, and to reduce bundle size it would be advantageous to register components within a section or snippet.

## Public Directory
The **public** directory in the project root is a [Vite convention](https://vitejs.dev/guide/assets.html#the-public-directory) for placing your static assets. The *vite-plugin-shopify* Vite plugin moves these static files over to the **assets** on build, so you can serve them up just as you would if you placed them in **assets**. 

## Included Goodies

### Liquid Ajax Cart
[Liquid Ajax Cart]() library is installed and its directives are used throughout the Slayed sections. With the help of Liquid Ajax Cart you have an out-of-the-box working AJAX cart, aka "minicart".

> Slayed uses v2 of Liquid Ajax Cart which has slightly different API than v1. See [differences-from-v1](https://liquid-ajax-cart.js.org/v2/differences-from-v1/)

### Predictive Search
The Shopify provided predictive search is already included and just needed to be enabled in the themes customizer. To prevent it from being rendered remove the reference from **theme.liquid**.

### Prodify
Prodify is a Slayed rework of the Shopify Dawn theme's custom element logic for handling variant pickers on the PDP. See **src/js/prodify**

### Dynamic Import

Dynamically import scripts. See demo in **src/entrypoints/theme.js**

### Schematic
[Schematic](https://www.npmjs.com/package/@anchovie/schematic) is a Javascript-driven, Shopify CLI-friendly, vite/grunt/webpack/etc-friendly schema management tool. Define schema with javascript and compile it. No more duplicated JSON!

All the schema for this theme can be found in **src/schema**. Run `npx schematic` to re-compile after you make changes.
