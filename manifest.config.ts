import { defineManifest } from '@crxjs/vite-plugin';
import pkg from './package.json';

const extensionName = 'X Media Downloader';

export const manifest = defineManifest((env) => ({
    manifest_version: 3,
    name: env.mode === 'production' ? extensionName : `[DEV] ${extensionName}`,
    description: 'Download media from X website.',
    version: pkg.version,
    // icons: {
    //     '128': 'icon.png',
    // },
    permissions: ['activeTab', 'storage', 'unlimitedStorage'],
    options_page: 'index.html',
    background: {
        service_worker: './src/background.ts',
    },
    action: {
        // default_icon: {
        //     '128': 'icon.png',
        // },
    },
    content_scripts: [
        {
            matches: ['https://x.com/*'],
            js: ['./src/content.ts'],
        },
    ],
}));
