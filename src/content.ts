import { ACTION_GET_SETTINGS } from '@/constants/chrome-api';
import { ImageScraper } from './scripts/image-scraper';

// ページ読み込み時に設定を取得する
chrome.runtime.sendMessage({ action: ACTION_GET_SETTINGS }, (response) => {
    if (!response || !response.settings) {
        return;
    }

    const extensionSettings = response.settings as ExtensionSettings;

    console.log('This extension is working properly! ');
    console.log('extensionSettings:');
    console.log(extensionSettings);

    const scraper = new ImageScraper();
    // 開始
    setTimeout(() => scraper.start(), 3000);
    // 停止したい時
    // scraper.stop();
});
