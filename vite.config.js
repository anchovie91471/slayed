import shopify from 'vite-plugin-shopify'
import cleanup from '@by-association-only/vite-plugin-shopify-clean'
import pageReload from 'vite-plugin-page-reload'
import basicSsl from '@vitejs/plugin-basic-ssl'
import tailwindcss from "@tailwindcss/vite"

import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';

function copyFile(src, dest) {
    fs.mkdirSync(path.dirname(dest), {recursive: true});
    fs.copyFileSync(src, dest);
}

function removeFile(dest) {
    if (fs.existsSync(dest)) {
        try {
            fs.unlinkSync(dest);
        } catch (err) {
            console.error(`Failed to remove file: ${dest}`);
        }
    }
}

function copyPublicToAssetsPlugin() {
    let config;
    let watcher;

    return {
        name: 'vite-plugin-copy-public',
        configResolved(resolvedConfig) {
            config = resolvedConfig;
        },
        closeBundle() {
            // This runs after each build completes (both initial and watch rebuilds)
            const publicDir = path.resolve(config.root, 'public');
            const assetsDir = path.resolve(config.root, 'assets');

            // Detect if we're in watch mode (dev server or vite build --watch)
            const isWatchMode = config.command === 'serve' || config.build.watch;

            if (!watcher && isWatchMode) {
                // In watch mode: Set up file watcher
                watcher = chokidar.watch(publicDir, {ignoreInitial: false});

                watcher.on('add', (filePath) => {
                    const relativePath = path.relative(publicDir, filePath);
                    const destPath = path.resolve(assetsDir, relativePath);
                    copyFile(filePath, destPath);
                });

                watcher.on('change', (filePath) => {
                    const relativePath = path.relative(publicDir, filePath);
                    const destPath = path.resolve(assetsDir, relativePath);
                    console.log(`[public] Updated: ${relativePath}`);
                    copyFile(filePath, destPath);
                });

                watcher.on('unlink', (filePath) => {
                    const relativePath = path.relative(publicDir, filePath);
                    const destPath = path.resolve(assetsDir, relativePath);
                    console.log(`[public] Removed: ${relativePath}`);
                    removeFile(destPath);
                });
            } else if (!isWatchMode && !watcher) {
                // In regular build mode: Do one-time copy and exit cleanly
                if (fs.existsSync(publicDir)) {
                    const files = fs.readdirSync(publicDir, { recursive: true });
                    files.forEach(file => {
                        const srcPath = path.resolve(publicDir, file);
                        if (fs.statSync(srcPath).isFile()) {
                            const destPath = path.resolve(assetsDir, file);
                            copyFile(srcPath, destPath);
                        }
                    });
                }
            }
        },
    };
}

export default {
    clearScreen: false,
    server: {
        host: '127.0.0.1',
        https: true,
        port: 3000,
        hmr: true,
        cors: {
            origin: [
                /^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/,
                /^https:\/\/[^\/]+\.myshopify\.com$/
            ]
        }
    },
    publicDir: 'public',
    build: {
        manifest: false,
        emptyOutDir: false,
        minify: process.env.NODE_ENV === 'production', // Skip minification in development for faster builds
        sourcemap: process.env.NODE_ENV === 'development', // Add sourcemaps in development for debugging
        watch: process.argv.includes('--watch') ? {
            ignored: [
                '**/assets/**',
                '**/snippets/vite.liquid'
            ] // Prevent infinite rebuild loop in watch mode
        } : null, // Disable watch mode for one-time builds
        rollupOptions: {
            output: {
                entryFileNames: '[name].[hash].min.js',
                chunkFileNames: '[name].[hash].min.js',
                assetFileNames: '[name].[hash].min[extname]',
            },
        }
    },
    plugins: [
        // Enable Chrome's Private Network Access for requests from public Shopify domains to local dev server
        {
            name: 'configure-response-headers',
            configureServer: (server) => {
                server.middlewares.use((_req, res, next) => {
                    res.setHeader('Access-Control-Allow-Private-Network', 'true');
                    next();
                });
            }
        },
        basicSsl(),
        cleanup(),
        copyPublicToAssetsPlugin(),
        tailwindcss(),
        shopify({
            sourceCodeDir: "src",
            entrypointsDir: 'src/entrypoints',
            snippetFile: "vite.liquid",
        }),
        pageReload('/tmp/theme.update', {
            delay: 2000
        }),
        {
            name: 'vite-plugin-liquid-tailwind-refresh',
            handleHotUpdate(ctx) {
                if (ctx.file.endsWith('.liquid')) {
                    // Filter out the liquid module to prevent a full refresh
                    return [...ctx.modules[0]?.importers ?? [], ...ctx.modules.slice(1)]
                }
            }
        }
    ],
}
