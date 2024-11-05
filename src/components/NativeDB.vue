<script lang='ts' setup>
import { useNativedb } from '@/stores/useNativedb'
import { ref, computed } from 'vue'

import '@/assets/ndb.less'

const loading = ref(true)
const nativedb = useNativedb()

nativedb.loadNativeInfo().then(() => {
    loading.value = false
})


const nCount = computed(() => {
    return Object.entries(nativedb.namespacesJson).reduce((count, [key, item]) => {
        return count + Object.values(item).length;
    }, 0);
})

const kCount = computed(() => {
    return Object.entries(nativedb.namespacesJson).reduce((count, [key, item]) => {
        return count + Object.values(item).filter(native => !native.name.startsWith("_")).length;
    }, 0);
})

const cCount = computed(() => {
    return Object.entries(nativedb.namespacesJson).reduce((count, [key, item]) => {
        return count + Object.values(item).filter(native => native.comment != "").length;
    }, 0);
})

const showAll = ref(false)

function collapseAll() {
    showAll.value = false
}

function expandAll() {
    showAll.value = true
}

</script>
<template>
    <div>
        <div id="title">Red Dead Redemption - Native DB</div>
        <br>
        <div id="mainwindow">
            <div class="infobox" style="padding-left: 2em;">
                <div class="btn-nohover">
                    Namespaces: {{ Object.keys(nativedb.namespacesJson).length }} |
                    Natives: {{ nCount }} |
                    评论: {{ cCount }} |
                    已知: {{ kCount }} |
                    <el-button link @click="nativedb.generateNativesFile">生成 natives.h</el-button>
                </div>
                <div class="box-btn">
                    <el-button link type="primary" @click="collapseAll">全部折叠</el-button>
                    <el-button link type="primary" @click="expandAll">全部展开</el-button>
                </div>
            </div>
            <br />
            <div id="loading" style="display:inline-block" v-if="loading">
                <i class="fa fa-refresh fa-spin fa-2x fa-fw"></i>
                <a style="font-size: 20px;">Loading</a>
            </div>
            <ul id="nname">
                <Namespace v-for="(ns, key) in nativedb.namespacesJson" :key="key" :ns="ns" :ns_name="key"
                    :show_na="showAll"></Namespace>
            </ul>
        </div>
    </div>
</template>
<script lang='ts'>

export default {
    name: 'NativeDB',
}
</script>
<style lang='less' scoped>
.infobox {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>