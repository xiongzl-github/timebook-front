<template>
    <div style="width:800px;height:700px;">
        <div style="width: 800px;text-align:center">
            <h3 style="width:100px;display:inline-block"></h3>
            <DatePicker @on-change="changeTimelineDatetime" v-model="timeline.curDatetime" style="width: 115px;font-size:12px;display:inline-block;vertical-align:top" size="small" type="date"></DatePicker>
            <h3 style="width: 88px;margin-bottom: 5px;text-align:center;display: inline-block;">TIMELINE</h3>
            <Switch v-model="timeline.timelineObj.display" style="float: right;" size="large">
                <span slot="close">隐藏</span>
                <span slot="open">公开</span>
            </Switch>
            <Poptip trigger="hover" placement="bottom" width="332" style="float: right;margin-right:5px">
                <Icon size=30 type="ios-settings" style="margin-top: -3px" />
                <div slot="title" style="font-weight:bolder">Timeline Setting</div>
                <div style="height: 300px" slot="content">
                    <div style="width:300px;height:50px; line-height:50px;">
                        <h4 style="width:68px;height:30px;line-height:30px;display:inline-block;text-align:right;margin-right:6px;">提醒间隔:</h4>
                        <Select v-model="setting.settingObj.timelineRemindDuration" clearable=true style="width:222px;height:30px;line-height:30px;text-align:left">
                            <Option :value=5>5</Option>
                            <Option :value=10>10</Option>
                            <Option :value=15>15</Option>
                            <Option :value=20>20</Option>
                            <Option :value=25>25</Option>
                            <Option :value=30>30</Option>
                            <Option :value=45>45</Option>
                            <Option :value=50>50</Option>
                            <Option :value=60>60</Option>
                        </Select>
                    </div>
                    <div style="height:32px;width: 300px;margin-top:30px">
                        <Button @click="updateSetting" type="error" style="float: right;">确定</Button>
                    </div>
                </div>
            </Poptip>
            <Tooltip placement="bottom" style="float: right;margin-right:5px">
                <span style="cursor: pointer;"><Icon size="30" style="margin-top: -3px" type="md-information-circle" /></span>
                <div slot="content">
                    <p @click="test" style="cursor:pointer" v-for="i in 15" :key="i">08:00~09:00 时间记录缺失!</p>
                </div>
            </Tooltip>
        </div>
        <div style="width: 560px;height:80px;float:left;margin-left:100px">
            <div style="width: 560px;font-weight:bolder;margin-bottom: 5px;" >
                <TimePicker @on-change="changeTimeSlot" :value="timeline.timeSlot" format="HH:mm" style="width: 128px; margin-right:2px; font-weight:bolder" :border=false :steps=[1,10] type="timerange" placement="bottom-start" placeholder="Select time"></TimePicker>
                做了什么?
            </div>
            <Select v-model="timeline.timelineObj.todolistId" type='number' style="width:560px;border:none">
                <Option v-for="(item, i) in timeline.todolists" :key="i" :value=item.id >{{item.taskname}}</Option>
            </Select>
        </div>
        <div style="width: 630px;height:60px;float:left;margin-left:100px">
            <div style="width: 560px;height:60px;display:inline-block;float: left;">
                <h4 style="margin-bottom: 5px;width:560px;display:inline-block">项目进度: </h4>
                <Progress style="width: 560px" :percent="timeline.timelineObj.progress" :stroke-width="24" status="active" text-inside />
            </div>
            <div style="width: 60px;height:30px;display:inline-block;float: left;margin-top:25px">
                <div style="width:30px;height:30px;cursor:pointer;display:inline-block">
                    <Icon @click="minusProgress" style="width:30px;height:30px;cursor:pointer;" size="30" type="ios-arrow-back" />
                </div>
                <div style="width:30px;height:30px;cursor:pointer;display:inline-block;float: right;">
                    <Icon @click="addProgress" style="width:30px;height:30px;cursor:pointer;" size="30" type="ios-arrow-forward" />
                </div>
            </div>
        </div>
        <div style="width: 600px;height:70px;float:left;margin-left:100px">
            <h4 style="margin-bottom: 5px">工作状态及干扰因素: </h4>
            <div style="width:200px;display:inline-block;height:32px;vertical-align:top;margin-right: 6px;">
                <Select v-model="timeline.timelineObj.workStatus" type='number' style="width:200px;">
                    <Option :value=1 >高效</Option>
                    <Option :value=2 >一般</Option>
                    <Option :value=3 >低效</Option>
                </Select>
            </div>
            <div style="width:350px;display:inline-block;height:32px;">
                <Select v-model="timeline.timelineObj.disturbFactor" type='number' style="width:350px;">
                    <Option :value=1 >没休息好</Option>
                    <Option :value=2 >情绪不稳定</Option>
                    <Option :value=3 >因手机分心</Option>
                    <Option :value=4 >因网页分心</Option>
                    <Option :value=5 >噪音</Option>
                    <Option :value=6 >临时任务</Option>
                    <Option :value=7 >被打断</Option>
                </Select>
            </div>
            <span @click="test" style="vertical-align: -webkit-baseline-middle;cursor: pointer;"><Icon style="vertical-align:top" size="32" type="md-add-circle" /></span>
        </div>
        <div style="width: 560px;height:70px;float:left;margin-left:100px">
            <h4 style="margin-bottom: 5px">情绪及感受: </h4>
            <div style="width:200px;display:inline-block;height:32px;vertical-align:top;margin-right: 6px;">
                <Select v-model="timeline.timelineObj.emotion" type='number' style="width:200px;">
                    <Option-group label="情绪正面心情起伏低">
                        <Option :value=1 >平静</Option>
                        <Option :value=11 >充实</Option>
                        <Option :value=12 >甜蜜</Option>
                        <Option :value=13 >暖心</Option>
                    </Option-group>
                    <Option-group label="情绪负面心情起伏高">
                        <Option :value=2 >愤怒</Option>
                        <Option :value=5 >焦虑</Option>
                        <Option :value=6 >难受</Option>
                        <Option :value=7 >烦躁</Option>
                    </Option-group>
                    <Option-group label="情绪正面心情起伏高">
                        <Option :value=3 >开心</Option>
                        <Option :value=8 >兴奋</Option>
                        <Option :value=14 >得意</Option>
                        <Option :value=15 >惊喜</Option>
                    </Option-group>
                    <Option-group label="情绪负面心情起伏低">
                        <Option :value=4 >疲惫</Option>
                        <Option :value=16 >低落</Option>
                        <Option :value=17 >孤独</Option>
                        <Option :value=18 >迷惘</Option>
                    </Option-group>
                    
                </Select>
            </div>
            <div style="width:350px;display:inline-block;height:32px">
                <Input v-model="timeline.timelineObj.feel" placeholder="说出来可能会好受一点儿!" style="width:350px;height:32px" />
            </div>
        </div>
        <div v-for="(item, i) in timeline.timelineObj.other" :key="i" style="width: 560px; float:left;" >
            <div v-if='item.timelineCategory == "消费"'style="width: 560px;height:70px;float:left;margin-left:100px">
                <h4 style="margin-bottom: 5px">消费: <Icon @click="deleteTimelineCategory(i)" style="float:right;cursor: pointer;" size=21 type="md-close" /></h4>
                <div style="width:100px;display:inline-block;height:32px;vertical-align:top;margin-right: 6px;">
                    <Poptip trigger="click" placement="bottom" width="332" style="float: left;margin-right:5px">
                        <Input v-model=item.consumeCategory placeholder="请选择一个消费类别!" style="width:100px;" />
                        <div slot="title" style="font-weight:bolder;text-align:center">Consume Category</div>
                        <div style="height: 300px;width:300px;" slot="content">
                            <CConsumeCategory></CConsumeCategory>
                        </div>
                    </Poptip>
                </div>
                <div style="width:450px;display:inline-block;height:32px">
                    <Input v-model=item.consumeAmount style="width:450px;">
                        <span slot="append">¥</span>
                    </Input>
                </div>
            </div>
            <div v-if='item.timelineCategory == "笔记"'style="width: 600px;height:90px;float:left;margin-left:100px">
                <h4 style="margin-bottom: 5px;width:560px">笔记: <Icon @click="deleteTimelineCategory(i)" style="float:right;cursor: pointer;" size=21 type="md-close" /></h4>
                <div style="width:560px;display:inline-block;height:52px;margin-right: 10px">
                    <Input v-model=item.mainContent type="textarea" style="width:560px;overflow:hidden" />
                </div>
                <div style="width: 30px;height:30px;display:inline-block;float: right;margin-top: 22px">
                    <Icon @click="openStudyModal" style="cursor:pointer;" size="30" type="md-list-box" />
                </div>
            </div>
            <div v-if='item.timelineCategory == "附件"'style="width: 600px;height:90px;float:left;margin-left:100px">
                <h4 style="margin-bottom: 5px;width:560px">附件: <Icon @click="deleteTimelineCategory(i)" style="float:right;cursor: pointer;" size=21 type="md-close" /></h4>
                <CUpload></CUpload>
            </div>
            <div v-if='item.timelineCategory == "日记"'style="width: 600px;height:90px;float:left;margin-left:100px">
                <h4 style="margin-bottom: 5px;width:560px">日记: <Icon @click="deleteTimelineCategory(i)" style="float:right;cursor: pointer;" size=21 type="md-close" /></h4>
                <div style="width:560px;display:inline-block;height:52px;margin-right: 10px">
                    <Input v-model=item.diary type="textarea" style="width:560px;overflow:hidden" />
                </div>
                <div style="width: 30px;height:30px;display:inline-block;float: right;margin-top: 22px">
                    <Icon @click="openDiaryModal" style="cursor:pointer;" size="30" type="ios-bookmarks" />
                </div>
            </div>
        </div>
        <div style="width: 560px;height:40px;text-align:center;float: right;height:40px;line-height:40px;margin-right:100px;margin-bottom:30px">
            <Tooltip theme="light" placement="bottom" style="float:right;margin-right:40px">
                <Icon size="40" type="md-add-circle" />
                <div slot="content">
                    <h3 style="margin-bottom: 2px;">Category</h3>
                    <p @click="setTimelineCategory(i)" style="font-weight:bolder;cursor: pointer;" v-for="(item, i) in timelineCategory.timelineCategories" :key="i">{{item.categoryName}}</p>
                    <a @click="openTimelineCategoryModal">其他...</a>
                </div>
            </Tooltip>
        </div>
        <div style="width: 600px;text-align:center;margin-left:100px;height:32px;line-height:32px;margin-left:100px;display:inline-block">
            <Button type="error" style="margin-right:20px" @click="resetTimeline">重置</Button>
            <Button v-if="timeline.operType == 2" type="success" @click="updateTimeline">更新</Button>
            <Button v-if="timeline.operType == 1" type="success" @click="addTimeline">添加</Button>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import vuescroll from 'vuescroll';
import CTimelineCategory from '@/components/CTimelineCategory';
import CConsumeCategory from '@/components/CConsumeCategory';
import CUpload from '@/components/CUpload';
import { format, toDate, parseISO } from 'date-fns';
// import * as util from "@/store/util/util";

export default {
    name: "CTimeline",
    components: {
        vuescroll, 
        CTimelineCategory,
        CConsumeCategory,
        CUpload
    },
    computed: {
        ...mapGetters(["timeline", "timelineCategory", "setting"])
    },
    created() {
        console.log("CTimeline created====================================");
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
        changeTimeSlot(data){
            this.timeline.timeSlot = data;
        },
        deleteTimelineCategory(i){
            let timeline = this.timeline;
            timeline.timelineObj.other.splice(i, 1);
        },
        openStudyModal(){
            this.timeline.modalType = 3;
        },
        openDiaryModal(){
            this.timeline.modalType = 4;
        },
        setTimelineCategory(i){
            let flag = false;
            let timeline = this.timeline;
            let timelineCategory = this.timelineCategory;
            let timelineCategoryObj = timelineCategory.timelineCategories[i];
            for (let i = 0; i < timeline.timelineObj.other.length; i++) {
                let ele = timeline.timelineObj.other[i];
                if(ele.timelineCategory == timelineCategoryObj.categoryName){
                    flag = true;
                    break;
                }
            }
            if(!flag){
                if(timelineCategoryObj.categoryName == "消费"){
                    timelineCategory.consumeCategoryModel.timelineCategory = timelineCategoryObj.categoryName;
                    timeline.timelineObj.other.push(timelineCategory.consumeCategoryModel);
                } else if(timelineCategoryObj.categoryName == "笔记"){
                    timelineCategory.noteCategoryModel.timelineCategory = timelineCategoryObj.categoryName;
                    timeline.timelineObj.other.push(timelineCategory.noteCategoryModel);
                    timeline.timelineOtherStudyIndex = timeline.timelineObj.other.length - 1;
                } else if(timelineCategoryObj.categoryName == "日记"){
                    timelineCategory.diaryCategoryModel.timelineCategory = timelineCategoryObj.categoryName;
                    timeline.timelineObj.other.push(timelineCategory.diaryCategoryModel);
                    timeline.timelineOtherDiaryIndex = timeline.timelineObj.other.length - 1;
                } else if(timelineCategoryObj.categoryName == "附件"){
                    timelineCategory.attachCategoryModel.timelineCategory = timelineCategoryObj.categoryName;
                    timeline.timelineObj.other.push(timelineCategory.attachCategoryModel);
                }
            }
        },
        minusProgress(){
            let timeline = this.timeline;
            if (timeline.timelineObj.progress <= 0) {
                return false;
            }
            timeline.timelineObj.progress -= 10;
        },
        addProgress(){
            let timeline = this.timeline;
            if (timeline.timelineObj.progress >= 100) {
                return false;
            }
            timeline.timelineObj.progress += 10;
        },
        updateSetting(){
            this.$store.dispatch({
                type: "updateSetting",
                thisObj: this
            })
        },
        openTimelineCategoryModal(){
            this.timeline.modalType = 2;
        },
        changeTimelineDatetime(){
            this.getTimelineTodolists();
        },
        getTimelineTodolists(){
            this.$store.dispatch({
                type: "getTimelineTodolists"
            })
        },
        addTimeline(){
            this.$store.dispatch({
                type: "addTimeline",
                thisObj: this
            })
        },
        updateTimeline(){
            this.$store.dispatch({
                type: "updateTimeline",
                thisObj: this
            })
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