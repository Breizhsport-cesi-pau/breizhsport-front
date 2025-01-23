import { configDefaults, defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  // @ts-expect-error
  plugins: [sveltekit()],

  test: {
    include: ['tests/unit/**/*.{test,spec}.{js,ts}', 'tests/integration/**/*.{test,spec}.{js,ts}'],
    coverage: {
      include: ['src/**/*.{ts,svelte}'],
      exclude: ['src/lib/components/ui**', 'src/**/index.ts'],
      reporter: 'lcov',
      reportsDirectory: './coverage'
    },
    reporters: ['github-actions', 'html'],
    outputFile: { html: './tests-result/vitest/index.html' }
  }
});
