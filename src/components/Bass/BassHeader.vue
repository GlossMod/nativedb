<script lang='ts' setup>
import { useMain } from '@/stores/useMain';
import { useNativedb } from '@/stores/useNativedb';
import { useRoute } from 'vue-router';

const usenativedb = useNativedb()
const usemain = useMain()
const route = useRoute()

function search() {
    usenativedb.expansion = Object.keys(usenativedb.getSearchResults)
}


</script>
<template>
    <v-app-bar>
        <v-app-bar-nav-icon variant="text" @click.stop="usemain.leftMenu = !usemain.leftMenu"></v-app-bar-nav-icon>
        <v-row class="title-bar">
            <v-col cols="12" md="6">
                <h1 class="title">{{ route.params.game || "GTA V" }} - Native DB</h1>
            </v-col>
            <v-col class="d-none d-md-block">
                <BaseHeaderActions></BaseHeaderActions>
            </v-col>
        </v-row>
    </v-app-bar>
    <v-app-bar>
        <div class="actions">
            <div class="search">
                <v-text-field v-model="usenativedb.searchText" hide-details="auto" label="搜索"
                    append-inner-icon="mdi-magnify" @click:appendInner="search" @keyup.enter="search"></v-text-field>
            </div>
            <div class="d-block d-md-none">
                <BaseHeaderActions></BaseHeaderActions>
            </div>
        </div>
    </v-app-bar>
</template>
<script lang='ts'>

export default {
    name: 'BassHeader',
}
</script>
<style lang='less' scoped>
.title-bar {
    display: flex;
    align-items: center;

    .title {
        font-size: 1.4rem;
        color: white;
        flex: 1 1 auto;
    }
}

.actions {
    display: flex;
    flex: 1 1 auto;
    justify-content: space-between;
    align-items: center;

    .search {
        flex: 1 1 auto;
        padding: 0 20px;
    }
}
</style>