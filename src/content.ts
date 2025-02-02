import { ACTION_GET_SETTINGS } from '@/constants/chrome-api';
import { ImageScraper } from './scripts/image-scraper';

// ページ読み込み時に設定を取得する
chrome.runtime.sendMessage({ action: ACTION_GET_SETTINGS }, (response) => {
    if (!response || !response.settings) {
        return;
    }

    const extensionSettings = response.settings as ExtensionSettings;

    console.log('This extension is working properly!🎉');
    console.log('extensionSettings⚙️', extensionSettings);

    if (!extensionSettings.enabled) {
        console.log('拡張機能がOFFだよ😪');
        return;
    }

    const scraper = new ImageScraper(extensionSettings.maxSaveCount);
    // 開始
    setTimeout(() => scraper.start(), 1500);

    // 停止したい時
    // scraper.stop();
});
