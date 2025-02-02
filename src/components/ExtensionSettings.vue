<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ACTION_UPDATE_SETTINGS } from '@/constants/chrome-api';
import { TARGET_URL } from '@/constants/extension';

const currentSettings = ref<ExtensionSettings>({
    template: 'This is template setting. Be sure to modify it.',
});

onMounted(async () => {
    const storageSettings = await chrome.storage.local.get();
    currentSettings.value = { ...currentSettings.value, ...storageSettings };
});

const saveSettings = async () => {
    await chrome.storage.local.set(currentSettings.value);

    const [tab] = await chrome.tabs.query({ url: TARGET_URL });
    if (tab && tab.id) {
        await chrome.tabs.sendMessage(tab.id, { action: ACTION_UPDATE_SETTINGS });
    }
};
</script>

<template>
    <t1>Extension Settings</t1>
    <button @click="saveSettings">SAVE</button>
</template>

<style scoped></style>
