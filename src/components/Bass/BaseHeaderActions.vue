<script lang='ts' setup>
import { useNativedb } from '@/stores/useNativedb';
const usenativedb = useNativedb()
function collapseAll() {
    usenativedb.expansion = []
}

function expandAll() {
    usenativedb.expansion = Object.keys(usenativedb.namespacesJson)
}
</script>
<template>
    <div class="box-btn">
        <el-button link type="primary" @click="collapseAll">全部折叠</el-button>
        <el-button link type="primary" @click="expandAll">全部展开</el-button>
        <a href="https://github.com/GlossMod/nativedb" target="_blank">
            <el-button link>
                <el-icon :size="24">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>github</title>
                        <path
                            d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                    </svg>
                </el-icon>
            </el-button>
        </a>
    </div>
</template>
<script lang='ts'>

export default {
    name: 'BaseHeaderActions',
}
</script>
<style lang='less' scoped>
.box-btn {
    text-align: right;
    margin-right: 15px;
}
</style>