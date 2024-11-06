<script lang='ts' setup>
import { useRoute } from 'vue-router';
import { watch } from 'vue';
import { useNativedb } from '@/stores/useNativedb';

const route = useRoute()
const usenativedb = useNativedb()

console.log(route);

watch(() => route.params.game, () => {
    // console.log(route.params.game);
    let game = ''
    console.log(route.params.game);

    if (route.params.game == '') game = 'GTAV'
    else game = route.params.game as string
    let url = `/data/${game}/natives.json`
    usenativedb.getNamespaces(url)

    document.title = `${game} - Native DB`

}, { immediate: true })

</script>
<template>
    <v-container fluid>
        <NativeDB></NativeDB>
    </v-container>
</template>
<script lang='ts'>

export default {
    name: 'HomeView',
}
</script>
<style lang='less' scoped></style>