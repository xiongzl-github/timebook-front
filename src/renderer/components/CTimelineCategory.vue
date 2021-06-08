<template>
    <div style="width:800px;height:700px">
        <div style="width: 200px;height:700px;float:left;margin-right:15px;margin-left:100px">
            <Icon @click="returnMainModal" style="cursor:pointer;margin-bottom: 10px" size=30 type="md-arrow-round-back" />
            <div style="text-align:left;width:200px;height:660px;padding-left:0px">
                <vuescroll>
                    <div v-for="(item, i) in timelineCategory.timelineCategories" :key="i" style="width:200px;height:50px;line-height:60px;cursor: pointer;">
                        <div v-if="i == timelineCategory.timelineCategoriesIndex" style="width:200px;height:50px;line-height:50px;cursor: pointer;background-color:#f8f8f9;border-radius: 10px;">
                            <div style="width:50px;height:50px;line-height:50px;display: inline-block;float: right;padding:7px 7px;">
                                <Icon @click="deleteTimelineCategory(i)" size="36" type="md-close-circle" />
                            </div>
                            <div @click="setTimelineCategory(i)" style="width:150px;height:50px;display: inline-grid;float: right;padding-left:15px">
                                <span style="width:150px;height:30px;line-height:30px;display: inline-block;font-weight:bolder;font-size:14px;overflow:hidden;">
                                    {{item.categoryName}}
                                </span>
                                <span style="width:150px;height:20px;line-height:20px;display: inline-block;font-weight:bolder;font-size:12px;overflow:hidden">
                                    {{item.intro}}
                                </span>
                            </div>
                        </div>
                        <div v-else style="width:200px;height:50px;line-height:50px;cursor: pointer;">
                            <div style="width:50px;height:50px;line-height:50px;display: inline-block;float: right;padding:7px 7px;">
                                <Icon @click="deleteTimelineCategory(i)" size="36" type="md-close-circle" />
                            </div>
                            <div @click="setTimelineCategory(i)" style="width:150px;height:50px;display: inline-grid;float: right;padding-left:15px">
                                <span style="width:150px;height:30px;line-height:30px;display: inline-block;font-weight:bolder;font-size:14px;overflow:hidden">
                                    {{item.categoryName}}
                                </span>
                                <span style="width:150px;height:20px;line-height:20px;display: inline-block;font-weight:bolder;font-size:12px;overflow:hidden">
                                    {{item.intro}}
                                </span>
                            </div>
                        </div>
                    </div>
                </vuescroll>
            </div>
        </div>
        <div style="width: 385px;height:700px;float:right;margin-right:100px">
            <h3 style="margin-bottom: 10px;text-align:center">类别 </h3>
            <h4 style="margin-bottom: 5px">类别: </h4>
            <Input v-model="timelineCategory.timelineCategoryObj.categoryName" placeholder="请输入一个类别" style="width: 385px;margin-bottom: 15px"/>
            <h4 style="margin-bottom: 5px">组件类型: </h4>
            <Select v-model="timelineCategory.timelineCategoryObj.componentType" type='number' style="width:385px;margin-bottom: 15px">
                <Option :value=1 >Input</Option>
                <Option :value=2 >Select</Option>
                <Option :value=3 >Date</Option>
                <Option :value=4 >Attachment</Option>
                <Option :value=5 >MarkDown</Option>
            </Select>
            <h4 style="margin-bottom: 5px">简介: </h4>
            <Input v-model="timelineCategory.timelineCategoryObj.intro" placeholder="请输入简介" style="width: 385px;margin-bottom: 15px"/>
            <div style="width: 385px;height:75px"></div>
            <Button type="error" style="float:right;" @click="resetTimelineCategory">重置</Button>
            <Button v-if="timelineCategory.operType == 2" type="success" style="float:right;margin-right:20px" @click="updateTimelineCategory">更新</Button>
            <Button v-if="timelineCategory.operType == 1" type="success" style="float:right;margin-right:20px" @click="addTimelineCategory">添加</Button>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import vuescroll from 'vuescroll';

export default {
    name: "CTimelineCategory",
    components: {
        vuescroll
    },
    computed: {
        ...mapGetters(["timelineCategory", "timeline"])
    },
    created() {
        console.log("CTimelineCategory created====================================");
        
    },
    mounted: function() {
        console.log("CTimelineCategory mounted====================================");
        this.$Message.config({ top: 400, duration: 3 });
    },
    data() {
        return {
            
        }
    },
    methods: {
        returnMainModal(){
            this.timeline.modalType = 1;
        },
        chooseIcon(i){
            let icon = this.icon;
            let category = this.category;
            icon.iconsIndex = i;
            let iconObj = icon.icons[i];
            let tempIconObj = JSON.parse(JSON.stringify(iconObj));
            icon.iconObj = tempIconObj;
            timelineCategory.categoryObj.icon = iconObj.icon;
            timelineCategory.categoryObj.iconType = iconObj.type;
        },
        getIcons(){
            this.$store.dispatch({
                type: "getIcons"
            })
        },
        setTimelineCategory(i){
            let timelineCategory = this.timelineCategory;
            timelineCategory.timelineCategoriesIndex = i;
            let tempTimelineCategoryObj = JSON.parse(JSON.stringify(timelineCategory.timelineCategories[i]));
            timelineCategory.timelineCategoryObj = tempTimelineCategoryObj;
            timelineCategory.operType = 2;
        },

        addTimelineCategory(){
            this.$store.dispatch({
                type: "addTimelineCategory",
                thisObj: this
            })
        },
        async updateTimelineCategory(){
            await this.$store.dispatch({
                type: "updateTimelineCategory",
                thisObj: this
            })
            await this.$forceUpdate();
        },
        deleteTimelineCategory(index){
            let timelineCategory = this.timelineCategory;
            timelineCategory.timelineCategoriesIndex = index;
            this.$store.dispatch({
                type: "deleteTimelineCategory",
                thisObj: this
            })
        },
        resetTimelineCategory(){
            this.$store.dispatch({
                type: "resetTimelineCategory"
            })
        },
        test(){
            console.log("test");
        }
    }
};
</script>
<style lang='less'>
</style>