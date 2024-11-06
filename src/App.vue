<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <v-layout>
        <BassLeftMenu></BassLeftMenu>
        <BassHeader></BassHeader>
        <v-main style="min-height: 100vh;">
            <RouterView />
        </v-main>
    </v-layout>
</template>

<style scoped></style>
