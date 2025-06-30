/* eslint-disable import/namespace */
/// <reference types="vitest" />
import { mergeConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config.mts';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      setupFiles: ['test/unit.setup.ts'],
      globals: true,
      environment: 'jsdom',
      coverage: {
        provider: 'istanbul' // or 'c8'
      },
      reporters: 'junit',
      outputFile: {
        junit: 'reports/ut-results.xml'
      }
    }
  })
);
