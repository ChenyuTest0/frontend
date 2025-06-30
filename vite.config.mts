import path from 'path';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import strip from '@rollup/plugin-strip';
import tailwindcss from '@tailwindcss/vite';
import Vue from '@vitejs/plugin-vue';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type PluginOption } from 'vite';

// HACK: vendor.jsとして外部ライブラリを分けたい場合は、このプラグインをrollupOptionsに差し込む
// https://vitejs.dev/guide/build.html#chunking-strategy
// import { splitVendorChunkPlugin } from 'vite'

// HACK: Productionビルド時の動作をrollupOptionsに記載
// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  build: {
    sourcemap: process.env.NODE_ENV === 'production' ? false : true,
    rollupOptions: {
      plugins: [
        // ビルド時にconsole.logなどをソースから消す
        strip({
          include: '**/*.+(vue|ts|js)',
          exclude: 'src/core/**/*',
          functions: ['console.*']
        }) as PluginOption,
        visualizer({
          filename: 'reports/rollup-visualizer.html'
        }) as PluginOption
      ]
      // https://rollupjs.org/guide/en/#big-list-of-options
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern'
      }
    }
  },
  envDir: './environments/',
  plugins: [
    VueI18nPlugin({
      include: path.resolve(__dirname, './src/assets/i18n/**'),
      compositionOnly: false
    }),
    Vue(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      '@core': path.resolve('./src/core'),
      '@shared': path.resolve('./src/shared')
    }
  },
  server: { port: 3000 }
});
