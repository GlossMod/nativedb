<script lang='ts' setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';


const props = defineProps<{
    na: INative
    na_key: string
    ns: {
        [key: string]: INative
    },
    ns_name: string
}>()

const liRef = ref<HTMLDivElement>()

const show_funcbox = ref(false)

function copy(str: string) {
    navigator.clipboard.writeText(str)
    ElMessage.success("复制成功~")
}

</script>
<template>
    <li @click="show_funcbox = !show_funcbox" ref="liRef">
        <a class="nativeName" :id="`func-${na_key}`"> •
            <span class="datatype">{{ na.return_type }} </span> {{ na['name'] }}
            (<template v-for="(params, index) in na.params">
                <span class="datatype">{{ params.type }}</span>{{ " " }}
                <span class="parameterName">{{ params.name }}{{ (index != (na.params.length - 1)) ? "," : '' }}
                </span>
            </template>)
            <span class="hash">// {{ na_key }}</span>
        </a>
    </li>
    <div v-if="show_funcbox" style="padding-left: 1%;">
        <div class="funcbox">
            <p style="font-weight: bold; font-size: 20px;">{{ ns_name }}::{{ na.name }}</p>
            <hr>
            <div v-html="liRef?.innerHTML"></div>
            <hr>
            <div class="box-docs">
                <div class="box-comment">
                    <p style="white-space: pre-wrap; display: inline;">
                        <br>
                        <span v-if="na.unused"> native 未使用脚本.</span>
                        <span v-if="na.comment != ''">
                            <template v-if="na.unused"><br><br></template>
                            {{ na.comment }}
                        </span>
                        <span v-else-if="!na.unused"><i>暂无评论</i></span>
                        <br><br>
                    </p>
                </div>
                <div class="box-btn">
                    <el-button @click="copy(`${ns_name}::${na.name}`)">复制名称</el-button>
                    <el-button @click="copy(na_key)">复制Hash</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang='ts'>

export default {
    name: 'NativeName',
}
</script>
<style lang='less' scoped>
li {
    &:hover {
        a {
            color: cadetblue;
        }
    }
}

.nativeName {
    color: lightgray;
    font-family: consolas, "courier new", courier, monospace;
    font-size: 14px;
    text-indent: -50px;
    padding-left: 50px;
    display: block;

    .datatype {
        color: darkorange;
    }

    .hash {
        color: lightgreen;
    }
}

.funcbox {
    display: block;
    margin: 5px 0;
    width: 800px;
    padding: 5px 8px 5px 10px;
    border-radius: 4px;
    border: 3px darkorange solid;

    .box-docs {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>