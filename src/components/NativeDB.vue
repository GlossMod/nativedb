<script lang='ts' setup>
import { useNativedb } from '@/stores/useNativedb'
import { ref, computed } from 'vue'

const nativedb = useNativedb()

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


</script>
<template>
    <v-card>
        <v-card-title>
            <div class="infobox">
                {{ $t("Namespaces") }}: {{ Object.keys(nativedb.namespacesJson).length }} |
                {{ $t("Natives") }}: {{ nCount }} |
                {{ $t("Comments") }}: {{ cCount }} |
                {{ $t("Known names") }}: {{ kCount }} |
                <el-button link @click="nativedb.generateNativesFile">{{ $t("Generate natives.h") }}</el-button>
            </div>
        </v-card-title>
        <v-card-text>
            <el-collapse v-model="nativedb.expansion" multiple>
                <Namespace v-for="(ns, key) in nativedb.getSearchResults" :key="key" :ns="ns" :ns_name="key"
                    :name="key">
                </Namespace>
            </el-collapse>
        </v-card-text>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'NativeDB',
}
</script>
<style lang='less' scoped>
.infobox {
    // 自动换行
    white-space: pre-wrap;
}
</style>