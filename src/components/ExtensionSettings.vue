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

const saved = ref(false);

const saveSettings = async () => {
    await chrome.storage.local.set(currentSettings.value);

    const [tab] = await chrome.tabs.query({ url: TARGET_URL });
    if (tab && tab.id) {
        await chrome.tabs.sendMessage(tab.id, { action: ACTION_UPDATE_SETTINGS });
    }

    saved.value = true;
    setTimeout(() => {
        saved.value = false;
    }, 2000);
};
</script>

<template>
    <div class="settings-container">
        <div class="title">Settings</div>

        <div class="flex-column-form">
            <div>
                <label for="check">Enabled</label>
                <input v-model="currentSettings.enabled" id="check" type="checkbox" />
            </div>
            <div>
                Max Save Count (0 for unlimited)
                <input v-model="currentSettings.maxSaveCount" type="number" />
            </div>

            <div>
                <button class="button" @click="saveSettings">Save</button>
                <span v-show="saved" style="color: red">Saved!✅️</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.settings-container {
    width: 200px;
    padding: 10px;
}
.title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}

.flex-column-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.button {
    width: 100px;
    margin-right: 12px;
}
</style>
