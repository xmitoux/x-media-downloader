import { defineManifest } from '@crxjs/vite-plugin';
import pkg from './package.json';

const extensionName = 'TEMPLATE EXTENSION';

export const manifest = defineManifest((env) => ({
    manifest_version: 3,
    name: env.mode === 'production' ? extensionName : `[DEV] ${extensionName}`,
    description: 'This is template description. Be sure to modify it.',
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
            matches: ['https://this-is-template-url/be-sure-to-modify-it'],
            js: ['./src/content.ts'],
        },
    ],
}));
