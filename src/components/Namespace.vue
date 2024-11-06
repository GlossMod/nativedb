<script lang='ts' setup>
import { computed, ref } from 'vue'

const props = defineProps<{
    ns: {
        [key: string]: INative;
    }
    ns_name: any
}>()

const count = computed(() => {
    return Object.keys(props.ns).length
})

const collapse = ref([])

</script>
<template>
    <el-collapse-item :title="`${ns_name}[${count}]`">
        <v-lazy :options="{ 'threshold': 0.5 }" transition="fade-transition">
            <el-card>
                <el-collapse v-model="collapse" multiple>
                    <NativeName v-for="(na, key) in ns" :key="key" :na="na" :ns="ns" :ns_name="ns_name" :na_key="key">
                    </NativeName>
                </el-collapse>
            </el-card>
        </v-lazy>
    </el-collapse-item>
</template>
<script lang='ts'>

export default {
    name: 'Namespace',
}
</script>
<style lang='less' scoped>
li {
    &:hover {
        a {
            color: cadetblue;
            padding-left: 2px;
        }
    }
}
</style>