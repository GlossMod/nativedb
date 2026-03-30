<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { onMounted, ref } from "vue";

type FriendLink = {
    name: string;
    url: string;
};

const friendLinks = ref<FriendLink[]>([]);
const pending = ref(true);
const failed = ref(false);

async function loadFriendLinks() {
    try {
        const response = await fetch("https://api.aoe.top/api/friendly/links");
        if (!response.ok) {
            throw new Error(`Failed to load links: ${response.status}`);
        }

        const data = await response.json();
        friendLinks.value = Array.isArray(data) ? data : [];
    } catch (error) {
        console.error(error);
        failed.value = true;
    } finally {
        pending.value = false;
    }
}

onMounted(loadFriendLinks);
</script>

<template>
    <v-layout>
        <BassLeftMenu></BassLeftMenu>
        <BassHeader></BassHeader>
        <v-main style="min-height: 100vh">
            <RouterView />
            <footer class="native-friendly-footer">
                <div class="native-friendly-footer__inner">
                    <p class="native-friendly-footer__title">友情链接</p>

                    <div v-if="pending" class="native-friendly-footer__state">
                        友链加载中...
                    </div>
                    <div
                        v-else-if="failed"
                        class="native-friendly-footer__state">
                        友链加载失败，请稍后重试。
                    </div>
                    <div v-else class="native-friendly-footer__list">
                        <a
                            v-for="link in friendLinks"
                            :key="link.url"
                            :href="link.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="native-friendly-footer__link">
                            {{ link.name }}
                        </a>
                    </div>
                </div>
            </footer>
        </v-main>
    </v-layout>
</template>

<style scoped>
.native-friendly-footer {
    margin-top: 32px;
    padding: 0 24px 20px;
}

.native-friendly-footer__inner {
    padding: 0;
}

.native-friendly-footer__title {
    margin: 0;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.12em;
    color: rgba(var(--v-theme-on-surface), 0.62);
}

.native-friendly-footer__list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem 0.5rem;
    margin-top: 0.45rem;
}

.native-friendly-footer__link,
.native-friendly-footer__state {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 0;
    padding: 0.2rem 0.4rem;
    border-radius: 999px;
    border: 0;
    background: transparent;
    color: rgba(var(--v-theme-on-surface), 0.66);
    font-size: 12px;
    line-height: 1.4;
    text-decoration: none;
    transition: color 0.2s ease, opacity 0.2s ease;
}

.native-friendly-footer__link:hover {
    color: rgb(var(--v-theme-primary));
}

.native-friendly-footer__state {
    margin-top: 0.45rem;
}

@media (max-width: 768px) {
    .native-friendly-footer {
        padding-left: 16px;
        padding-right: 16px;
    }
}
</style>
