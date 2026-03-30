<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'

type FriendLink = {
    name: string
    url: string
}

const friendLinks = ref<FriendLink[]>([])
const pending = ref(true)
const failed = ref(false)

async function loadFriendLinks() {
    try {
        const response = await fetch('https://api.aoe.top/api/friendly/links')
        if (!response.ok) {
            throw new Error(`Failed to load links: ${response.status}`)
        }

        const data = await response.json()
        friendLinks.value = Array.isArray(data) ? data : []
    } catch (error) {
        console.error(error)
        failed.value = true
    } finally {
        pending.value = false
    }
}

onMounted(loadFriendLinks)
</script>

<template>
    <v-layout>
        <BassLeftMenu></BassLeftMenu>
        <BassHeader></BassHeader>
        <v-main style="min-height: 100vh;">
            <RouterView />
            <footer class="native-friendly-footer">
                <div class="native-friendly-footer__inner">
                    <p class="native-friendly-footer__title">友情链接</p>
                    <p class="native-friendly-footer__subtitle">同步站群最新友链，为 Native DB 页面底部补充统一入口。</p>

                    <div v-if="pending" class="native-friendly-footer__state">友链加载中...</div>
                    <div v-else-if="failed" class="native-friendly-footer__state">友链加载失败，请稍后重试。</div>
                    <div v-else class="native-friendly-footer__list">
                        <a
                            v-for="link in friendLinks"
                            :key="link.url"
                            :href="link.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="native-friendly-footer__link"
                        >
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
    margin-top: 48px;
    padding: 0 24px 32px;
}

.native-friendly-footer__inner {
    padding: 24px;
    border-radius: 28px;
    background: rgba(var(--v-theme-surface), 0.92);
    border: 1px solid rgba(var(--v-theme-on-surface), 0.08);
    box-shadow: 0 18px 50px rgba(15, 23, 42, 0.12);
}

.native-friendly-footer__title {
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: rgb(var(--v-theme-primary));
}

.native-friendly-footer__subtitle {
    margin: 10px 0 0;
    font-size: 14px;
    line-height: 1.7;
    color: rgba(var(--v-theme-on-surface), 0.66);
}

.native-friendly-footer__list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 18px;
}

.native-friendly-footer__link,
.native-friendly-footer__state {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 42px;
    padding: 0 16px;
    border-radius: 999px;
    border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
    background: rgba(var(--v-theme-background), 0.6);
    color: rgba(var(--v-theme-on-surface), 0.76);
    text-decoration: none;
    transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.native-friendly-footer__link:hover {
    transform: translateY(-2px);
    border-color: rgba(var(--v-theme-primary), 0.4);
    color: rgb(var(--v-theme-primary));
}

.native-friendly-footer__state {
    margin-top: 18px;
}

@media (max-width: 768px) {
    .native-friendly-footer {
        padding-left: 16px;
        padding-right: 16px;
    }

    .native-friendly-footer__inner {
        padding: 20px;
    }
}
</style>
