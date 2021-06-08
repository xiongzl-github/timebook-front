<template>
    <div style="width:280px;height:730px;overflow:auto;float:left;display:inline-block;">
        <div style="text-align:left;width:265px;height:70px;line-height:40px;margin-left:15px;font-size:16px;font-weight:bold">
            <h3 style="height:30px;width:265px;text-align:center">
                <Poptip trigger="hover" placement="bottom" width="400">
                    <Icon type="ios-funnel" />
                    <div slot="title">Condition Filter</div>
                    <div style="height: 300px" slot="content">
                        <div style="width:368px;height:50px; line-height:50px;">
                            <h4 style="width:68px;height:30px;line-height:30px;display:inline-block;text-align:right;margin-right:6px;">是否隐藏:</h4>
                            <Select v-model="timeline.condition.display" clearable=true style="width:290px;height:30px;line-height:30px;text-align:left">
                                <Option :value=0>是</Option>
                                <Option :value=1>否</Option>
                            </Select>
                        </div>
                        <div style="width:368px;height:50px; line-height:50px;">
                            <h4 style="width:68px;height:30px;line-height:30px;display:inline-block;text-align:right;margin-right:6px;">是否处理:</h4>
                            <Select v-model="timeline.condition.handle" clearable=true style="width:290px;height:30px;line-height:30px;text-align:left">
                                <Option :value=1>是</Option>
                                <Option :value=0>否</Option>
                            </Select>
                        </div>
                        <div style="height:32px;width: 368px;margin-top:10px">
                            <Button @click="getTimelines" type="error" style="float: right;">确定</Button>
                        </div>
                    </div>
                </Poptip>
                Timeline
            </h3>
            <span style="float:left;height:32px;width:113px;line-height:32px;margin-right:5px">
                <DatePicker  @on-change="getTimelines" v-model="timeline.timelineObj.createTime" style="width: 115px;font-size:12px;font-weight:500;" size="small" type="date"></DatePicker>
            </span>
            <span @click="openTimelineModal(1, null)" style="float:right;height:32px;line-height:32px;margin-top:4px;cursor: pointer;"><Icon size="32" type="logo-buffer" /></span>
            <span @click="openTimelineWidgetModal" style="float:right;height:32px;line-height:32px;margin-top:4px;cursor: pointer;"><Icon size="32" custom="iconfont icontimeline" /></span>
            <span @click="openTimelineModal(1, null)" style="float:right;height:32px;line-height:32px;margin-top:4px;cursor: pointer;"><Icon size="32" custom="iconfont iconv-pie-graph" /></span>
            <span @click="openTimelineModal(1, null)" style="float:right;height:32px;line-height:32px;margin-top:4px;cursor: pointer;"><Icon size="32" type="md-add-circle" /></span>
        </div>
        <div style="width:280px;height:660px;overflow:auto;float:left;display:inline-block;">
            <vuescroll>
            <div style="text-align:left;width:265px;height:660px;padding-left:15px">
                <div v-for="(item, i) in timeline.timelines" style="width:250px;height:50px;line-height:50px;cursor: pointer;">
                    <div v-if="i == timeline.timelinesIndex" style="width:250px;height:50px;line-height:50px;cursor: pointer;background-color:#f8f8f9;border-radius: 10px;">
                        <div style="width:50px;height:50px;line-height:50px;display: inline-block;float: left;padding:5px 5px">
                            <Icon size="40" v-if="item.iconType == 1" :type=item.icon />
                            <Icon size="40" v-if="item.iconType == 2" :custom=item.icon />
                        </div>
                        <div @click="deleteTimeline(i)" style="width:50px;height:50px;line-height:50px;display: inline-block;float: right;padding:7px 7px;">
                            <Icon size="36" type="md-close-circle" />
                        </div>
                        <div @click="openTimelineModal(2, i)" style="width:150px;height:50px;display: inline-grid;float: right;">
                            <span style="width:150px;height:25px;line-height:25px;display: inline-block;font-weight:bolder;font-size:14px;">{{item.startTime}}~{{item.endTime}}</span>
                            <span style="width:150px;height:25px;line-height:25px;display: inline-block;font-weight:bolder;font-size:12px;">
                                {{item.taskname}}
                            </span>
                        </div>
                    </div>
                    <div v-else style="width:250px;height:50px;line-height:50px;cursor: pointer;">
                        <div style="width:50px;height:50px;line-height:50px;display: inline-block;float: left;padding:5px 5px">
                            <Icon size="40" v-if="item.iconType == 1" :type=item.icon />
                            <Icon size="40" v-if="item.iconType == 2" :custom=item.icon />
                        </div>
                        <div @click="deleteTimeline(i)" style="width:50px;height:50px;line-height:50px;display: inline-block;float: right;padding:10px 7px;">
                            <Icon size="36" type="md-close-circle" />
                        </div>
                        <div @click="openTimelineModal(2, i)" style="width:150px;height:50px;display: inline-grid;float: right;">
                            <span style="width:150px;height:25px;line-height:25px;display: inline-block;font-weight:bolder;font-size:14px;">{{item.startTime}}~{{item.endTime}}</span>
                            <span style="width:150px;height:25px;line-height:25px;display: inline-block;font-weight:bolder;font-size:12px;">
                                {{item.taskname}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            </vuescroll>
        </div>
        <Modal
            v-model="timeline.showTimelineModal"
            :title=timeline.modalTitle
            :mask-closable=false
            @on-ok="test"
            @on-cancel="closeTimelineModal"
            width="832px"
            footer-hide=true>
            <div v-if="timeline.modalType == 1" style="width:800px;height:700px">
                <CTimelineModal></CTimelineModal>
            </div>
            <div v-if="timeline.modalType == 2" style="width:800px;height:700px">
                <CTimelineCategory></CTimelineCategory>
            </div>
            <div v-if="timeline.modalType == 3" style="width:800px;height:700px">
                <CStudy></CStudy>
            </div>
            <div v-if="timeline.modalType == 4" style="width:800px;height:700px">
                <CDiary></CDiary>
            </div>
            <div v-if="timeline.modalType == 5" style="width:800px;height:700px">
                <CTimelineWidget></CTimelineWidget>
            </div>
        </Modal>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import vuescroll from 'vuescroll';
import CTimelineCategory from '@/components/CTimelineCategory';
import CTimelineModal from '@/components/CTimelineModal';
import CStudy from '@/components/CStudy';
import CDiary from '@/components/CDiary';
import CTimelineWidget from '@/components/CTimelineWidget';
import { format, toDate, parseISO } from 'date-fns';

export default {
    name: "CTimeline",
    components: {
        vuescroll, 
        CTimelineCategory,
        CTimelineModal,
        CStudy,
        CDiary,
        CTimelineWidget
    },
    computed: {
        ...mapGetters(["timeline", "timelineCategory", "setting"])
    },
    created() {
        console.log("CTimeline created====================================");
        this.getTimelines();
    },
    mounted: function() {
        console.log("CTimeline mounted====================================");
        this.$Message.config({ top: 400, duration: 3 });
    },
    data() {
        return {
        };
    },
    methods: {
        openTimelineWidgetModal(){
            console.log("openTimelineWidgetModal: ");
            this.timeline.showTimelineModal = true;
            this.timeline.modalType = 5;
            this.timeline.modalTitle = "Timeline View";
        },
        getTimelineCategories(){
            this.$store.dispatch({
                type: "getTimelineCategories"
            })
        },
        getTimelines(){
            this.$store.dispatch({
                type: "getTimelines"
            })
        },
        openTimelineModal(operType, index){
            let timeline = this.timeline;
            timeline.showTimelineModal = true;
            timeline.modalType = 1;
            timeline.operType = operType;
            timeline.modalTitle = "添加 TIMELINE";
            if(operType == 2){
                timeline.modalTitle = "更新 TIMELINE";
                timeline.timelinesIndex = index;
                let tempObj = JSON.parse(JSON.stringify(timeline.timelines[index]));
                if(!(tempObj.other instanceof Array)){
                    tempObj.other = JSON.parse(tempObj.other);
                    for (let i = 0; i < tempObj.other.length; i++) {
                        let ele = tempObj.other[i];
                        if(ele.timelineCategory == "笔记"){
                            timeline.timelineOtherStudyIndex = i;
                        } else if(ele.timelineCategory == "日记"){
                            timeline.timelineOtherDiaryIndex = i;
                        }
                    }
                }
                timeline.timeSlot = [];
                timeline.timeSlot.push(tempObj.startTime, tempObj.endTime);
                timeline.timelineObj = tempObj;
            } else {
                this.setTimeSlot();
            }
            this.getTimelineCategories();
            this.getSetting();
            this.getTimelineTodolists();
        },
        setTimeSlot(){
            let timeline = this.timeline;
            if(timeline.timelines.length > 0){
                timeline.timelineObj.startTime = timeline.timelines[timeline.timelines.length - 1].endTime;
            } else {
                timeline.timelineObj.startTime = "08:00";
            }
            let formatStr = "HH:mm";
            timeline.timelineObj.endTime = format(new Date(), formatStr);
            timeline.timeSlot = [];
            timeline.timeSlot.push(timeline.timelineObj.startTime, timeline.timelineObj.endTime);
        },
        getTimelineTodolists(){
            this.$store.dispatch({
                type: "getTimelineTodolists"
            })
        },
        getSetting(){
            this.$store.dispatch({
                type: "getSetting"
            })
        },
        deleteTimeline(i){
            this.timeline.timelinesIndex = i;
            this.$store.dispatch({
                type: "deleteTimeline",
                thisObj: this
            })
        },
        closeTimelineModal(){
            let tempObj = JSON.parse(JSON.stringify(this.timeline.oriTimelineObj));
            this.timeline.timelineObj = tempObj;
        },
        test(){
            console.log("test");
        }
    }
};
</script>
<style scoped lang='less' scoped>
/deep/ input.ivu-input.ivu-input-default.ivu-input-with-suffix{
    border:none;
    box-shadow: none
}
/deep/ input.ivu-input.ivu-input-small.ivu-input-with-suffix{
    border:none;
    box-shadow: none
}

</style>