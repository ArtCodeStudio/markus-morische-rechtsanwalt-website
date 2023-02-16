import { defineConfig } from 'vite'
import { resolve } from 'path'
import pugVitePlugin from "vite-plugin-pug"
import pugRollupPlugin from 'rollup-plugin-pug';
import legacy from '@vitejs/plugin-legacy'

const __dirname = new URL('.', import.meta.url).pathname;

// TODO copy assets like the iconset

export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    mode,
    root: '.',
    server: {},
    build: {
      outDir: 'assets/scripts',
      emptyOutDir: true,
      rollupOptions: {
        input: resolve(__dirname, 'scripts/index.ts'),
        output: {
          entryFileNames: `[name].bundle.js`,
          chunkFileNames: `[name]-[hash].bundle.js`,
          assetFileNames: `[name]-[hash].bundle.[ext]`,
        },
        plugins: [
          pugRollupPlugin(),
        ]
      },
    },
    esbuild: {
      jsxFactory: 'jsxCreateElement',
      jsxFragment: 'jsxFragment',
    },
    plugins: [
      pugVitePlugin(),,
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
    ],
  }
});