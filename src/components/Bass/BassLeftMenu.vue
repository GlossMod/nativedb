<script lang='ts' setup>
import { useMain } from '@/stores/useMain';

const usemain = useMain()

let lists = [
    {
        title: "GTA V",
        path: "/"
    },
    {
        title: "RDR 2",
        path: "/RDR2"
    },
    {
        title: "RDR 1",
        path: "/RDR1"
    },
]


</script>
<template>
    <v-navigation-drawer v-model="usemain.leftMenu">
        <v-list>
            <v-list-item v-for="item in lists" :key="item.path" :to="item.path" link :title="item.title">
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
<script lang='ts'>

export default {
    name: 'BassLeftMenu',
}
</script>
<style lang='less' scoped></style>