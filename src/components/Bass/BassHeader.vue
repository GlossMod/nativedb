<script lang='ts' setup>
import { useNativedb } from '@/stores/useNativedb';
import { ref, watch } from 'vue';

const usenativedb = useNativedb()

let game_list = [
    {
        name: "Red Dead Redemption",
        url: "https://raw.githubusercontent.com/GlossMod/nativedb/refs/heads/main/data/RER/natives.json"
    },
    {
        name: "GTA V",
        url: "https://raw.githubusercontent.com/GlossMod/nativedb/refs/heads/main/data/GTAV/natives.json"
    }
]

const game = ref(game_list[0])


watch(game, () => {
    usenativedb.getNamespaces(game.value.url)

    document.title = `${game.value.name} - Native DB`

}, { immediate: true })

</script>
<template>
    <el-header class="header">
        <el-select v-model="game" style="width: 240px;">
            <template #label="{ label, value }">
                <span>{{ value.name }} </span>
            </template>
            <el-option v-for="item in game_list" :label="item.name" :value="item"></el-option>
        </el-select>
        <h1 class="title">{{ game.name }} - Native DB</h1>
    </el-header>
</template>
<script lang='ts'>

export default {
    name: 'BassHeader',
}
</script>
<style lang='less' scoped>
.header {
    display: flex;
    align-items: center;

    .title {
        font-size: 2.4rem;
        color: white;
        flex: 1 1 auto;
        text-align: center;
    }
}
</style>