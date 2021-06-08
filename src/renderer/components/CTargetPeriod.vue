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
                            <Select clearable=true style="width:290px;height:30px;line-height:30px;text-align:left">
                                <Option :value=0>是</Option>
                                <Option :value=1>否</Option>
                            </Select>
                        </div>
                        <div style="width:368px;height:50px; line-height:50px;">
                            <h4 style="width:68px;height:30px;line-height:30px;display:inline-block;text-align:right;margin-right:6px;">是否处理:</h4>
                            <Select  clearable=true style="width:290px;height:30px;line-height:30px;text-align:left">
                                <Option :value=1>是</Option>
                                <Option :value=0>否</Option>
                            </Select>
                        </div>
                        <div style="height:32px;width: 368px;margin-top:10px">
                            <Button @click="getTargetList" type="error" style="float: right;">确定</Button>
                        </div>
                    </div>
                </Poptip>
                Target
            </h3>
            <span @click="openTargetPeriodModal(1, null)" style="float:right;height:32px;line-height:32px;margin-top:4px;cursor: pointer;margin-right:5px" title="排序"><Icon size="32" custom="iconfont iconpaixuti" /></span>
            <span @click="openTargetPeriodModal(1, null)" style="float:right;height:32px;line-height:32px;margin-top:4px;cursor: pointer;margin-right:5px" title="进度"><Icon size="32" type="md-options" /></span>
            <span @click="openTargetPeriodModal(1, null)" style="float:right;height:32px;line-height:32px;margin-top:4px;cursor: pointer;margin-right:5px" title="复盘"><Icon size="32" custom="iconfont iconjianchazhibiao" /></span>
            <span @click="openTargetPeriodModal(1, null)" style="float:right;height:32px;line-height:32px;margin-top:4px;cursor: pointer;" title="添加"><Icon size="32" type="md-add-circle" /></span>
        </div>
        <div style="width:280px;height:660px;overflow:auto;float:left;display:inline-block;">
            <vuescroll>
            <div style="text-align:left;width:265px;height:660px;padding-left:15px">
                <div v-for="(item, i) in targetPeriod.targetPeriods" :key="i" style="width:250px;height:50px;line-height:60px;cursor: pointer;">
                    <div v-if="i == targetPeriod.targetPeriodsIndex" style="width:250px;height:50px;line-height:50px;cursor: pointer;background-color:#f8f8f9;border-radius: 10px;">
                        <div  style="width:50px;height:50px;line-height:50px;display: inline-block;float: left;padding:5px 5px">
                            <Icon size="40" v-if="item.iconType == 1" :type=item.icon />
                            <Icon size="40" v-if="item.iconType == 2" :custom=item.icon />
                        </div>
                        <div @click="deleteTargetPeriod(i)" style="width:50px;height:50px;line-height:50px;display: inline-block;float: right;padding:7px 7px;">
                            <Icon size="36" type="md-close-circle" />
                        </div>
                        <div @click="openTargetPeriodModal(2, i)" style="width:150px;height:50px;display: inline-grid;float: right;">
                            <span style="width:150px;height:25px;line-height:25px;display: inline-block;font-weight:bolder;font-size:14px;">{{item.targetPeriodName}}</span>
                            <span style="width:150px;height:25px;line-height:25px;display: inline-block;font-weight:bolder;font-size:12px;">
                                <Tag color="success">第{{item.periodNum}}期</Tag>
                                剩余天数: 5d
                            </span>
                        </div>
                    </div>
                    <div v-else style="width:250px;height:50px;line-height:50px;cursor: pointer;">
                        <div style="width:50px;height:50px;line-height:50px;display: inline-block;float: left;padding:5px 5px">
                            <Icon size="40" v-if="item.iconType == 1" :type=item.icon />
                            <Icon size="40" v-if="item.iconType == 2" :custom=item.icon />
                        </div>
                        <div @click="deleteTargetPeriod(i)" style="width:50px;height:50px;line-height:50px;display: inline-block;float: right;padding:10px 7px;">
                            <Icon size="36" type="md-close-circle" />
                        </div>
                        <div @click="openTargetPeriodModal(2, i)" style="width:150px;height:50px;display: inline-grid;float: right;">
                            <span style="width:160px;height:25px;line-height:25px;display: inline-block;font-weight:bolder;font-size:14px;">{{item.targetPeriodName}}</span>
                            <span style="width:160px;height:25px;line-height:25px;display: inline-block;font-weight:bolder;font-size:12px;">
                                <Tag color="success">第{{item.periodNum}}期</Tag>
                                剩余天数: 5d
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            </vuescroll>
        </div>
        <Modal
            v-model="targetPeriod.showTargetPeriodModal"
            :title=targetPeriod.modalTitle
            :mask-closable=false
            @on-ok="test"
            @on-cancel="closeTargetPeriodModal"
            width="632px"
            footer-hide=true>
            <div v-if="targetPeriod.modalType == 1" style="width:600px;height:700px">
                <div style="width:600px;">
                    <h3 style="margin-bottom: 5px;width:56px;display: inline-block;float: left;"></h3>
                    <h3 style="width: 488px;margin-bottom: 5px;text-align:center;display: inline-block;">TARGET</h3>
                    <Switch v-model="targetPeriod.targetPeriodObj.display" style="float: right;" size="large">
                        <span slot="close">隐藏</span>
                        <span slot="open">公开</span>
                    </Switch>
                </div>
                <div style="width: 600px;height:70px;float:left;">
                    <h4 style="margin-bottom: 5px">目标主题: </h4>
                    <Select type='number' @on-change="changeCategory" v-model="targetPeriod.targetPeriodObj.targetThemeId" style="width:560px;">
                        <Option v-for="(item, i) in category.categories" :key="i" :value=item.id >{{item.categoryName}}</Option>
                    </Select>
                    <span @click="openCategoryModal" style="vertical-align: -webkit-baseline-middle;cursor: pointer;"><Icon style="vertical-align:top" size="32" type="md-add-circle" /></span>
                </div>
                <div style="width: 560px;height:70px;float:left;">
                    <h4 style="margin-bottom: 5px">目标期数: </h4>
                    <Input v-model="targetPeriod.targetPeriodObj.periodNum" type="number" style="width:560px;">
                        <span slot="append">期</span>
                    </Input>
                </div>
                <div style="width: 600px;height:70px;float:left;">
                    <h4 style="margin-bottom: 5px">目标名称: </h4>
                    <Input v-model="targetPeriod.targetPeriodObj.targetPeriodName" style="width:560px;"/>
                    <span @click="openTargetModal" style="vertical-align: -webkit-baseline-middle;cursor: pointer;"><Icon style="vertical-align:top" size="32" custom="iconfont iconmubiao" /></span>
                </div>
                <div style="width: 560px;height:70px;float:left;">
                    <h4 style="margin-bottom: 5px">优先级: </h4>
                    <Select v-model="targetPeriod.targetPeriodObj.priority" type='number' style="width:560px;">
                        <Option :value=1 >重要且紧急</Option>
                        <Option :value=2 >紧急不重要</Option>
                        <Option :value=3 >重要不紧急</Option>
                        <Option :value=4 >不紧急不重要</Option>
                    </Select>
                </div>
                <div style="width: 560px;height:70px;float:left;">
                    <h4 style="margin-bottom: 5px">目标规划: </h4>
                    <Select v-model="targetPeriod.targetPeriodObj.targetPlan" type='number' style="width:560px;">
                        <Option :value=1 >明天开始</Option>
                        <Option :value=2 >以后再做</Option>
                    </Select>
                </div>
                <div style="width: 560px;height:70px;float:left;">
                    <h4 style="margin-bottom: 5px">目标周期: </h4>
                    <Select v-model="targetPeriod.targetPeriodObj.targetCycle" type='number' style="width:560px;">
                        <Option :value=1 >短</Option>
                        <Option :value=2 >中</Option>
                        <Option :value=2 >长</Option>
                    </Select>
                </div>
                <div style="width: 600px;height:70px;float:right;">
                    <h4 style="margin-bottom: 5px">目标制定: </h4>
                    <div style="width:560px;height:30px;padding:2px;overflow:hidden;display:inline-block">
                        <span v-for="(obj, j) in targetChosen.allTargets" :key="j">
                            <Tag v-if="obj.id == item.targetId" style="margin-right:5px" v-for="(item, i) in targetPeriod.targetPeriodObj.chosenTargets" :key="i" color="primary">{{obj.targetName}}</Tag>
                        </span>
                    </div>
                    <span @click="openTargetChosenModal" style="vertical-align: -webkit-baseline-middle;cursor: pointer;"><Icon style="vertical-align:top" size="32" type="md-checkmark-circle-outline" /></span>
                </div>
                <div style="width: 600px;height:70px;float:left;">
                    <h4 style="margin-bottom: 5px">截止时间: </h4>
                    <DatePicker v-model="targetPeriod.targetPeriodObj.deadline" type="date" style="width: 560px"></DatePicker>
                    <span @click="openTargetDeadlineModal" style="vertical-align: -webkit-baseline-middle;cursor: pointer;"><Icon style="vertical-align:top" size="32" type="md-calendar" /></span>
                </div>
                <div style="width: 560px;height:70px;float:left;">
                    <h4 style="margin-bottom: 5px">是否完成: </h4>
                    <Select v-model="targetPeriod.targetPeriodObj.completed" type='number' style="width:560px;">
                        <Option :value=1 >是</Option>
                        <Option :value=0 >否</Option>
                    </Select>
                </div>
                <div style="width: 600px;text-align:center">
                    <Button type="error" style="margin-right:20px" @click="resetTargetPeriod">重置</Button>
                    <Button v-if="targetPeriod.operType == 2" type="success" @click="updateTargetPeriod">更新</Button>
                    <Button v-if="targetPeriod.operType == 1" type="success" @click="addTargetPeriod">添加</Button>
                </div>
            </div>
            <div v-if="targetPeriod.modalType == 2" style="width:600px;height:560px">
                <CCategory></CCategory>
            </div>
            <div v-if="targetPeriod.modalType == 3" style="width:600px;height:560px">
                <CTarget></CTarget>
            </div>
            <div v-if="targetPeriod.modalType == 4" style="width:600px;height:560px">
                <CTargetChosen></CTargetChosen>
            </div>
            <div v-if="targetPeriod.modalType == 5" style="width:600px;height:560px">
                <CTargetCal></CTargetCal>
            </div>
        </Modal>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import vuescroll from 'vuescroll';
import CCategory from '@/components/CCategory';
import CTargetChosen from '@/components/CTargetChosen';
import CTargetCal from '@/components/CTargetCal';
import CTarget from '@/components/CTarget';
// import * as util from "@/store/util/util";

export default {
    name: "CTargetPeriod",
    components: {
        vuescroll,
        CCategory, 
        CTarget,
        CTargetChosen,
        CTargetCal
    },
    computed: {
        ...mapGetters(["targetPeriod", "target", "category", "targetChosen"])
    },
    created() {
        console.log("CTargetPeriod created====================================");
        this.getTargetPeriods();
    },
    mounted: function() {
        console.log("CTargetPeriod mounted====================================");
        this.$Message.config({ top: 400, duration: 3 });
    },
    data() {
        return {
        };
    },
    methods: {
        openTargetDeadlineModal(){
            // 需要满足两个条件 1: targetThemeId 不为 null, 2: targets不为空
            if(this.targetPeriod.targetPeriodObj.targetThemeId == null){
                this.$Message.warning('请选择一个主题!');
            } else if(this.target.targets.length == 0){
                this.$Message.warning('请添加一些子目标!');
            } else if(this.targetPeriod.targetPeriodObj.chosenTargets.length == 0){
                this.$Message.warning('请勾选一些子目标!');
            } else {
                this.targetPeriod.modalType = 5;
            }
        },
        openTargetChosenModal(){
            // 需要满足两个条件 1: targetThemeId 不为 null, 2: targets不为空
            if(this.targetPeriod.targetPeriodObj.targetThemeId == null){
                this.$Message.warning('请选择一个主题!');
            } else if(this.target.targets.length == 0){
                this.$Message.warning('请添加一些子目标!');
            } else {
                this.targetPeriod.modalType = 4;
            }
        },
        openTargetModal(){
            if(this.targetPeriod.targetPeriodObj.targetThemeId == null){
                this.$Message.warning('请选择一个主题!');
            } else {
                this.targetPeriod.modalType = 3;
            }
        },
        changeCategory(){
            this.getTargets();
        },
        async getTargets(){
            if(this.targetPeriod.targetPeriodObj.targetThemeId != null){
                await this.$store.dispatch({
                    type: "getTargets"
                })
            }
        },
        getCategories(){
            this.$store.dispatch({
                type: "getCategories",
                categoryType: 3
            })
        },
        openCategoryModal(){
            this.targetPeriod.modalType = 2;
            this.category.categoryObj.type = 3;
        },
        getTargetList(){
            console.log("getTargetList");
        },
        chooseTarget(i){
            this.targetPeriod.targetPeriodsIndex = i;
            this.targetPeriod.id = this.targetPeriod.targetPeriods[i].id;
            this.getElementsByTargetId();
        },
        getElementsByTargetId(){
            this.$store.dispatch({
                type: "getElementsByTargetId"
            })
        },
        async openTargetPeriodModal(operType, index){
            this.targetPeriod.showTargetPeriodModal = true;
            this.targetPeriod.operType = operType;
            this.targetPeriod.modalTitle = "添加目标";
            if(operType == 2){
                this.targetPeriod.modalTitle = "更新目标";
                this.targetPeriod.targetPeriodsIndex = index;
                let tempObj = JSON.parse(JSON.stringify(this.targetPeriod.targetPeriods[index]));
                if(!(tempObj.chosenTargets instanceof Array)){
                    tempObj.chosenTargets = JSON.parse(tempObj.chosenTargets);
                }
                this.targetPeriod.targetPeriodObj = tempObj;
                // 获取 targets
                await this.getTargets();
                await this.getTargetData();
            }
            this.getCategories();
        },
        getTargetData(){
            let allTargets = [];
            let target = this.target;
            let targetChosen = this.targetChosen;
            let targetPeriod = this.targetPeriod;
            target.targets.forEach(ele => {
                if(ele.childTargets.length > 0){
                    ele.childTargets.forEach(obj => {
                        obj.name = ele.targetName  + ' - ' + obj.targetName;
                        // 这个 key 是必须要的
                        obj.key = obj.id.toString();
                        // 这个是为了记录每个 target 预计要耗费的时间
                        obj.targetTime = 30;
                        allTargets.push(obj);
                    });
                } else {
                    ele.name = ele.targetName;
                    // 这个 key 是必须要的
                    ele.key = ele.id.toString();
                    // 这个是为了记录每个 target 预计要耗费的时间
                    ele.targetTime = 30;
                    allTargets.push(ele);
                }
            });
            targetChosen.allTargets = [];
            targetChosen.allTargets = allTargets;
            targetChosen.targetKeys = [];
            if(targetPeriod.targetPeriodObj.chosenTargets.length > 0){
                targetPeriod.targetPeriodObj.chosenTargets.forEach(ele => {
                    targetChosen.targetKeys.push(ele.targetId);
                });
            }
        },
        getTargetPeriods(){
            this.$store.dispatch({
                type: "getTargetPeriods"
            })
        },
        addTargetPeriod(){
            this.$store.dispatch({
                type: "addTargetPeriod",
                thisObj: this
            })
        },
        async updateTargetPeriod(){
            await this.$store.dispatch({
                type: "updateTargetPeriod",
                thisObj: this
            })
            await this.$forceUpdate();
        },
        deleteTargetPeriod(i){
            this.targetPeriod.targetPeriodsIndex = i;
            this.$store.dispatch({
                type: "deleteTargetPeriod",
                thisObj: this
            })
        },
        closeTargetPeriodModal(){
            let tempObj = JSON.parse(JSON.stringify(this.targetPeriod.oriTargetPeriodObj));
            this.targetPeriod.targetPeriodObj = tempObj;
        },
        test(){
            console.log("test");
        }
    }

};
</script>
<style lang='less'>
</style>