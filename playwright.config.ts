import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: 'tests/e2e',
    use: {
        video: 'retain-on-failure',
        headless: true,
        baseURL: 'http://127.0.0.1:3000'
    },
    outputDir: 'tests-result/playwright'
});
