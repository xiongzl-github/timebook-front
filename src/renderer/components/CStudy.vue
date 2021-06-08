<template>
    <div style="width:800px;height:700px">
        <h3 style="width:800px;height:30px;line-height:30px;display:inline-block;text-align:center">
            <Icon @click="returnMainModal" style="cursor:pointer;float: left;" size=30 type="md-arrow-round-back" />
            如何创建 Java 多线程?</h3>
        <div id="main" style="width:800px;height:670px">
            <mavon-editor @fullScreen="$fullScreen" style="border-radius: inherit;width:100%;height:100%" defaultOpen="preview" fontSize="14px" :toolbarsFlag=true :tabSize=4 :subfield=false :toolbars=toolbars v-model="timeline.timelineObj.other[timeline.timelineOtherStudyIndex].mainContent"/>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import vuescroll from 'vuescroll';

export default {
    name: "CStudy",
    components: {
        vuescroll
    },
    computed: {
        ...mapGetters(["timeline", "timelineCategory"])
    },
    created() {
        console.log("CStudy created====================================");
    },
    mounted: function() {
        console.log("CStudy mounted====================================");
    },
    data() {
        return {
            value: "请输入主要内容...",
            toolbars: {
                bold: true, // 粗体
                italic: false, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: false, // 上角标
                subscript: false, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: true, // 全屏编辑
                readmodel: false, // 沉浸式阅读
                htmlcode: false, // 展示html源码
                help: true, // 帮助
                /* 1.3.5 */
                undo: false, // 上一步
                redo: false, // 下一步
                trash: false, // 清空
                save: false, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: false, // 导航目录
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                subfield: false, // 单双栏模式
                preview: true, // 预览
            }
        }
    },
    methods: {
        $fullScreen(flag, data){
            console.log("fullScreen");
            console.log(flag);
            console.log(data);
        },
        returnMainModal(){
            this.timeline.modalType = 1;
        }
    }
};
</script>
<style lang='less'>
</style>