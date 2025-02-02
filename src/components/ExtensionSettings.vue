<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ACTION_UPDATE_SETTINGS } from '@/constants/chrome-api';
import { TARGET_URL } from '@/constants/extension';

const currentSettings = ref<ExtensionSettings>({
    enabled: true,
    maxSaveCount: 0,
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
    <h1>Extension Settings</h1>

    <div class="flex-column-form">
        <div>
            Enabled
            <input v-model="currentSettings.enabled" type="checkbox" />
        </div>
        <div>
            Max Save Count (0 for unlimited)
            <input v-model="currentSettings.maxSaveCount" type="number" />
        </div>

        <button style="width: 100px" @click="saveSettings">Save</button>
    </div>
</template>

<style scoped>
.flex-column-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
