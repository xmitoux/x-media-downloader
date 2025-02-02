import { ACTION_GET_SETTINGS } from './constants/chrome-api';

const defaultSettings: ExtensionSettings = {
    enabled: true,
    maxSaveCount: 0,
};

chrome.storage.local.get().then((settings) => {
    if (Object.keys(settings).length !== Object.keys(defaultSettings).length) {
        // 設定の数に差異があるときはデフォルト値を設定
        // (開発中に設定が増えたときやインストールのとき用)
        chrome.storage.local.set(defaultSettings);
    }
});

chrome.action.onClicked.addListener(() => {
    // 設定画面はポップアップで表示するので不要
    // chrome.tabs.create({ url: 'index.html' });
});

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
    if (request.action === ACTION_GET_SETTINGS) {
        chrome.storage.local.get().then((settings) => {
            sendResponse({ settings: settings });
        });
    }

    // 必須 ないと以下のエラーになって設定が読み込めない
    // Unchecked runtime.lastError: The message port closed before a response was received.
    return true;
});
