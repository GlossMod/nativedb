<script lang='ts' setup>
import { useI18n } from 'vue-i18n';
import Cookies from 'js-cookie';

const { locale } = useI18n()

let langs = [
    {
        name: "English",
        value: "en_US"
    },
    {
        name: "简体中文",
        value: "zh_CN"
    },
]

// 获取浏览器语言或 cookie 中的语言并设置默认语言
const browserLang = navigator.language.toLowerCase()
const cookieLang = Cookies.get('language')
const defaultLang = cookieLang || langs.find(lang => browserLang.includes(lang.value.split('_')[0]))?.value || 'en_US'
locale.value = defaultLang

function changeLang(lang: string) {
    locale.value = lang
    Cookies.set('language', lang, { expires: 365 }) // 设置 cookie 过期时间为 365 天
}

</script>
<template>
    <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props"><v-icon>mdi-web</v-icon></v-btn>
        </template>
        <v-list>
            <v-list-item v-for="(item, index) in langs" :key="index" :title="item.name" @click="changeLang(item.value)">
            </v-list-item>
        </v-list>
    </v-menu>
</template>
<script lang='ts'>
export default {
    name: 'Language',
}
</script>
<style lang='less' scoped></style>