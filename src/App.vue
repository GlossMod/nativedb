<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <v-layout>
        <BassHeader></BassHeader>
        <BassLeftMenu></BassLeftMenu>
        <v-main style="min-height: 100vh;">
            <RouterView />
        </v-main>
    </v-layout>
    <!-- <div class="common-layout">
        <el-container>
            <el-main>
            </el-main>
            <el-footer></el-footer>
        </el-container>
    </div> -->
</template>

<style scoped></style>
