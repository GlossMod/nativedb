<script lang='ts' setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';


const props = defineProps<{
    na: INative
    na_key: string
    ns: {
        [key: string]: INative
    },
    ns_name: string
}>()

const { t } = useI18n()

const liRef = ref<HTMLDivElement>()

const show_funcbox = ref(false)

function copy(str: string) {
    navigator.clipboard.writeText(str)
    ElMessage.success(t("Copyed~"))
}

</script>
<template>
    <el-collapse-item>
        <template #title>
            <div class="" ref="liRef">
                <div class="nativeName">
                    <span class="datatype">{{ na.return_type }} </span> {{ na['name'] }}
                    (<template v-for="(params, index) in na.params">
                        <span class="datatype">{{ params.type }}</span>{{ " " }}
                        <span class="parameterName">{{ params.name }}{{ (index != (na.params.length - 1)) ? "," : '' }}
                        </span>
                    </template>)
                    <span class="hash">{{ `// ${na_key} ${na.jhash || ''} ${na.build ? `b${na.build}` : ''}` }}</span>
                </div>
            </div>
        </template>
        <div class="funcbox">
            <p style="font-weight: bold; font-size: 20px;">{{ ns_name }}::{{ na.name }}</p>
            <hr>
            <div v-html="liRef?.innerHTML"></div>
            <hr>
            <div class="box-docs">
                <div class="box-comment">
                    <p style="white-space: pre-wrap; display: inline;">
                        <br>
                        <span v-if="na.unused"> {{ $t("This native is not used in the scripts") }}</span>
                        <span v-if="na.comment != ''">
                            <template v-if="na.unused"><br><br></template>
                            {{ na.comment }}
                        </span>
                        <span v-else-if="!na.unused"><i>{{ $t("No comment available") }}</i></span>
                        <br><br>
                    </p>
                </div>
                <div class="box-btn">
                    <el-button @click="copy(`${ns_name}::${na.name}`)">{{ $t("Copy Name") }}</el-button>
                    <el-button @click="copy(na_key)">{{ $t("Copy Hash") }}</el-button>
                </div>
            </div>
        </div>
    </el-collapse-item>
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
    font-size: 14px;
    display: block;

    // 超出后不换行，隐藏并显示...
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    // 添加 li 前面的点
    &::before {
        content: "•";
        color: lightgray;
        margin-right: 5px;
    }

    .datatype {
        color: darkorange;
    }

    .parameterName {
        margin-right: 5px;
    }

    .hash {
        color: lightgreen;
    }
}

.funcbox {
    display: block;
    margin: 5px 0;
    // width: 800px;
    padding: 5px 8px 5px 10px;
    border-radius: 4px;
    border: 3px darkorange solid;

    .box-docs {
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        .box-btn {
            text-align: right;
        }
    }

    .nativeName {
        // 取消 超出后不换行，隐藏并显示...
        white-space: normal;
        overflow: visible;
        text-overflow: clip;

    }
}
</style>