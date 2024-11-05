<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="common-layout">
        <el-container>
            <BassHeader></BassHeader>
            <el-main>
                <RouterView />
            </el-main>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<style scoped></style>
