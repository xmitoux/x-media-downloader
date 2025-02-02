import { ACTION_GET_SETTINGS } from '@/constants/chrome-api';

// ページ読み込み時に設定を取得する
chrome.runtime.sendMessage({ action: ACTION_GET_SETTINGS }, (response) => {
    if (!response || !response.settings) {
        return;
    }

    const extensionSettings = response.settings as ExtensionSettings;

    console.log('This extension is working properly! ');
    console.log('extensionSettings:');
    console.log(extensionSettings);
});
