<script lang='ts' setup>
import { computed, ref, watch } from 'vue'

const props = defineProps<{
    ns: {
        [key: string]: INative;
    }
    ns_name: any
    show_na: boolean
}>()

const show_na = ref(props.show_na)
const count = computed(() => {
    return Object.keys(props.ns).length
})

watch(() => props.show_na, (newVal) => {
    show_na.value = newVal
})

</script>
<template>
    <li @click="show_na = !show_na">
        <a class='namespace' :id='`ns-${ns_name}`'>{{ ns_name }}[{{ count }}]</a>
    </li>
    <ul v-if="show_na">
        <NativeName v-for="(na, key) in ns" :key="key" :na="na" :ns="ns" :ns_name="ns_name" :na_key="key"></NativeName>
    </ul>
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