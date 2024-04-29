import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as fs from 'fs';

export default defineConfig({
    build: {
        rollupOptions: {
            preserveEntrySignatures: 'allow-extension', // Keep exports as defined in source
            input: 'src/main.ts',
            output: {
                format: 'system',
                entryFileNames: 'js/app.js',
            },
            external: ['single-spa'],
        },
    },
    preview: {
        port: 8080,
        https: {
            key: fs.readFileSync('./certs/server.key'),
            cert: fs.readFileSync('./certs/server.pem'),
        },
    },
    plugins: [vue()],
});
