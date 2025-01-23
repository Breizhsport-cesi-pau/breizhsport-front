import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  // @ts-expect-error
  plugins: [sveltekit()],

  test: {
    include: ['tests/unit/**/*.{test,spec}.{js,ts}', 'tests/integration/**/*.{test,spec}.{js,ts}'],
    reporters: ['github-actions', 'html'],
    outputFile: { html: './tests-result/vitest/index.html' }
  }
});
