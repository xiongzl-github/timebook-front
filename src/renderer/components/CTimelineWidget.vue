<template>
    <div id="timelineWidget" style="width:800px;height:700px">
        <div style="height:32px;width:800px;line-height:32px;text-align:center;">
            <DatePicker  @on-change="getTimelines" v-model="timeline.timelineObj.createTime" style="width: 113px;font-size:14px;font-weight:500;" size="small" type="date"></DatePicker>
            <span style="font-weight: bolder;font-size: 16px;cursor: pointer;">Timeline</span>
        </div>
        <div style="width: 800px; height: 668px">
            <vuescroll>
                <div style="width: 800px; height: 668px">
                    <div style="width: 800px;height: 15px"></div>
                    <a-timeline mode="alternate">
                        <a-timeline-item color="#515a6e" v-for="(item, i) in timeline.timelines" :key="i">
                            <Icon slot="dot" size="40" v-if="item.iconType == 1" :type=item.icon />
                            <Icon slot="dot" size="40" v-if="item.iconType == 2" :custom=item.icon />
                            <h4 style="margin: 0 10px">{{item.startTime}}~{{item.endTime}}</h4>
                            <h4 style="margin: 0 10px">{{item.taskname}}
                                <!-- Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. -->
                            </h4>
                            <!-- <img style="max-width: 360px;margin: 0 10px" src="https://cdn.pixabay.com/photo/2020/08/18/06/06/extreme-5497194__340.jpg"> -->
                        </a-timeline-item>
                    </a-timeline>
                </div>
            </vuescroll>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapGetters, mapState } from "vuex";
import vuescroll from 'vuescroll';
import { Timeline } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

Vue.use(Timeline);

export default {
    name: "CTimelineWidget",
    components: {
        vuescroll
    },
    computed: {
        ...mapGetters(["timeline", "timelineCategory"])
    },
    created() {
        console.log("CTimelineWidget created====================================");
    },
    mounted: function() {
        console.log("CTimelineWidget mounted====================================");
    },
    data() {
        return {
            
        }
    },
    methods: {
        test1(){
            let node = document.getElementById('timelineWidget');
            console.log(node);
            console.log(node.scrollHeight);
            console.log(node.scrollWidth);
            domtoimage.toBlob(document.getElementById('timelineWidget'), {bgcolor: "#fff", height: node.scrollHeight, width: node.scrollWidth})
                .then(function (blob) {
                    saveAs(blob, "hello world.png");
                });
        },
        test(){
            console.log("test");
            var ele = document.getElementById('timelineWidget');
            let eleW = ele.offsetWidth;// 获得该容器的宽
            //   let eleH = ele.offsetHeight // 获得该容器的高
            let eleH = ele.scrollHeight;// 获得该容器的高
            let eleOffsetTop = ele.offsetTop;// 获得该容器到文档顶部的距离
            let eleOffsetLeft = ele.offsetLeft;// 获得该容器到文档最左的距离
            var canvas = document.createElement("canvas");
            var abs = 0;
            let win_in = document.documentElement.clientWidth || document.body.clientWidth;// 获得当前可视窗口的宽度（不包含滚动条）
            let win_out = window.innerWidth;// 获得当前窗口的宽度（包含滚动条）
            if (win_out>win_in) {
                // abs = (win_o - win_i)/2;    // 获得滚动条长度的一半
                abs = (win_out - win_in) / 2;// 获得滚动条宽度的一半
            }
            canvas.width = eleW * 2;// 将画布宽&&高放大两倍
            canvas.height = eleH * 2;
            var context = canvas.getContext("2d");
            context.scale(2, 2); // 增强图片清晰度
            context.translate(-eleOffsetLeft - abs, -eleOffsetTop);
            html2canvas(ele, {
               dpi:300,
               useCORS:true//允许canvas画布内可以跨域请求外部链接图片, 允许跨域请求。
            }).then(canvas => {
                var contentWidth = canvas.width;
                var contentHeight = canvas.height;
                //一页pdf显示html页面生成的canvas高度;
                var pageHeight = (contentWidth / 592.28) * 841.89; // 这样写的目的在于保持宽高比例一致 pageHeight/canvas.width = a4纸高度/a4纸宽度// 宽度和canvas.width保持一致
                //未生成pdf的html页面高度
                var leftHeight = contentHeight;
                //页面偏移
                var position = 0;
                //a4纸的尺寸[595.28,841.89],单位像素，html页面生成的canvas在pdf中图片的宽高
                var imgWidth = 595.28;
                var imgHeight = (595.28 / contentWidth) * contentHeight;
                var pageData = canvas.toDataURL("image/jpeg", 1.0);
                var pdf = new jsPDF("", "pt", "a4");
                //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                //当内容未超过pdf一页显示的范围，无需分页
               if (leftHeight<pageHeight) {
                   //在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
                   pdf.addImage(pageData, "JPEG", 5, 0, imgWidth, imgHeight);
                   // pdf.addImage(pageData, 'JPEG', 20, 40, imgWidth, imgHeight);
               } else {
                   // 分页
                   while (leftHeight>0) {
                       pdf.addImage(pageData, "JPEG", 5, position, imgWidth, imgHeight);
                       leftHeight -= pageHeight;
                       position -= 841.89;
                       //避免添加空白页
                       if (leftHeight>0) {
                           pdf.addPage();
                       }
                   }
               }
            pdf.save("a4.pdf");
            })
        },

        getTimelines(){
            this.$store.dispatch({
                type: "getTimelines"
            })
        }
    }
};
</script>
<style lang='less'>
</style>