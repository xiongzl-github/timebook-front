<template>
<div style="width:1075px;height:936px;background-color:red;margin-top:-16px">
        <div style="width:1075px;height:936px">
            <div style="width: 300px;height:936px;background-color:#fff;display:inline-block;float: left;">
                <h3 style="width:300px;height:50px;line-height:50px;text-align:center">
                    <Dropdown @on-click="switchTarget">
                        <a href="javascript:void(0)">
                            {{targetStage}}
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu  slot="list">
                            <DropdownItem name="正在执行的目标">正在执行的目标</DropdownItem>
                            <!-- <DropdownItem name="计划去做的目标">计划去做的目标</DropdownItem> -->
                            <DropdownItem name="已经完成的目标">已经完成的目标</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <span style="float:right">
                        <Poptip placement="bottom" width="50">
                            <Icon size="24" type="md-more" />
                            <div slot="content">
                                <p>优先级</p>
                                <p>截止时间</p>
                            </div>
                        </Poptip>
                    </span>
                </h3>
                <div style="height: 884px;width:300px;overflow: auto;padding:0 15px">
                    <div v-for="(item, index) in targetPlanning.periods">
                        <div v-if="item.done === targetPlanning.doneStatus" style="width:270px;height:60px;line-height:60px;cursor: pointer;">
                            <div style="width:50px;height:60px;line-height:60px;display: inline-block;float: left;padding:10px 5px">
                                <Icon size="40" type="logo-android" />
                            </div>
                            <div @click="deletePeriod(index)" style="width:50px;height:60px;line-height:60px;display: inline-block;float: right;padding:10px 7px;">
                                <Icon size="36" type="md-close-circle" />
                            </div>
                            <div @click="assignPeriod(index)" style="width:170px;height:60px;display: inline-grid;float: right;">
                                <span style="width:170px;height:30px;line-height:30px;display: inline-block;font-weight:bolder;font-size:14px;margin-left:10px">{{item.target}}</span>
                                <span style="width:170px;height:30px;line-height:30px;display: inline-block;font-weight:bolder;font-size:12px;margin-left:10px">
                                    <Tag color="success">第{{item.nper}}期</Tag>
                                    剩余天数: {{item.remainDays}}d
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="width:775px;height:936;background-color:#fff;display:inline-block;float: right;">
                <h3 style="width:825px;height:50px;line-height:50px;text-align:center;">
                    Target
                </h3>
                <div style="width:775px;height:886px;padding:0 40px">
                    <div style="width:695px;height:886px;display: inline-block;float: left;">
                        <div style="width:695px;height:80px; line-height:80px;display: inline-grid;">
                            <h4 style="width:680px;height:40px;line-height:40px">主题:</h4>
                            <Select v-model="targetPlanning.themeName" @on-change="changeThemeOfTarget" @on-select="selectThemeOfTarget" style="width:680px;height:40px;line-height:40px">
                                <Option v-for="(item, index) in targetSetting.themesOfPlan" :cus="item.target" :value="item.value">{{item.label}}</Option>
                            </Select>
                        </div>
                        <div style="width:695px;height:80px; line-height:80px;display: inline-grid;">
                            <h4 style="width:680px;height:40px;line-height:40px">目标:</h4>
                            <Input readonly v-model="targetPlanning.targetName" style="width:680px;height:40px;line-height:40px" />
                        </div>
                        <div style="width:695px;height:80px; line-height:80px;display: inline-grid;">
                            <h4 style="width:680px;height:40px;line-height:40px">期数:</h4>
                            <Input readonly v-model="targetPlanning.periodObj.nper" style="width:680px;height:40px;line-height:40px" />
                        </div>
                        <div style="width:695px;height:80px; line-height:80px;display: inline-grid;">
                            <h4 style="width:680px;height:40px;line-height:40px">每天可用时间:</h4>
                            <Input @on-change="changeAvailableTime" v-model="targetPlanning.periodObj.availableTime" type="number" style="width:680px;">
                                <span slot="append">min</span>
                            </Input>
                        </div>
                        <div style="width:695px;height:80px; line-height:80px;display: inline-grid;">
                            <h4 style="width:680px;height:40px;line-height:40px">优先级:</h4>
                            <Select v-model="targetPlanning.periodObj.priority" style="width:680px;height:40px;line-height:40px">
                                <Option value="1">重要且紧急</Option>
                                <Option value="2">紧急不重要</Option>
                                <Option value="3">重要不紧急</Option>
                                <Option value="4">不紧急不重要</Option>
                            </Select>
                        </div>
                        <div style="width:695px;height:80px; line-height:80px;display: inline-grid;">
                            <h4 style="width:680px;height:40px;line-height:40px">子目标:</h4>
                            <div style="width:680px;height:40px;line-height:40px">
                                <Button @click="showChooseChildTargetModal" style="width:680px;" icon="md-barcode" type="success">子目标选择</Button>
                            </div>
                        </div>
                        <div style="width:695px;height:80px; line-height:80px;display: inline-grid;">
                            <h4 style="width:680px;height:40px;line-height:40px">总用时:</h4>
                            <Input @on-change="changeTotalTime" readonly v-model="targetPlanning.periodObj.totalTime" type="number" style="width:680px;">
                                <span slot="append">min</span>
                            </Input>
                        </div>
                        <div style="width:695px;height:80px; line-height:80px;display: inline-grid;">
                            <div style="width:695px;height:40px; line-height:40px;">
                                <h4 style="width:180px;display: inline-block;">截止时间:</h4>
                                <Button @click="handleDeadLine" size='small' style="display:inline-block; float:right; margin-top:8px;margin-right:15px">截止时间计算</Button>
                            </div>
                            <div style="width:680px;height:40px;line-height:40px">
                                <DatePicker v-model="targetPlanning.periodObj.deadline" type="date" style="width:440px;height:40px;line-height:40px;display:inline-block"></DatePicker>
                                <RadioGroup @on-change="handleDeadLine" v-model="targetPlanning.periodObj.deadlineType" style="width:225px;height:40px;line-height:40px;display:inline-block;float: right;margin-left:15px">
                                    <Radio label="1">每一天</Radio>
                                    <Radio label="2">工作日</Radio>
                                    <Radio label="3">节假日</Radio>
                                </RadioGroup>
                            </div>
                        </div>
                        <div style="width:695px;height:80px; line-height:80px;display: inline-grid;">
                            <h4 style="width:680px;height:40px;line-height:40px">是否完成:</h4>
                            <Select v-model="targetPlanning.periodObj.done" style="width:680px;height:40px;line-height:40px">
                                <Option value="0">还未完成</Option>
                                <Option value="1">已经完成</Option>
                            </Select>
                        </div>
                        <div style="width:695px;height:100px; line-height:100px;display: inline-block;text-align:center">
                            <Button @click="resetPeriod" type="warning">Reset</Button>
                            <Button @click="addPeriod" v-if="targetPlanning.addPeriodBtnStatus" type="success">Submit</Button>
                            <Button @click="updatePeriod" v-if="targetPlanning.updatePeriodBtnStatus" type="success">Update</Button>
                        </div>
                    </div>
                    
                </div>
                <Modal
                        v-model="targetPlanning.showChooseChildTargetModal"
                        title="Choose Child Target"
                        :mask-closable="false"
                        :z-index=9999
                        width="900px"
                        height="600px"
                        @on-ok=""
                        @on-cancel="">
                    <div style="width:868px;height:600px;">
                        <div style="width:508px;height:600px;display: inline-block;float: left;">
                            <Transfer style="width:468px;height:600px"
                                :titles="transferTitles"
                                :data="targetPlanning.childTargetsOfTheme"
                                :target-keys="targetPlanning.chooseChildTargetKeys"
                                :render-format="renderFormat"
                                @on-change="childTargetChange">
                            </Transfer>
                        </div>
                        <div style="width:360px;height:600px;display: inline-block;float: right;">
                            <Table show-summary :summary-method="handleSummary" height="550" :columns="targetPlanning.childTargetColumns" :data="targetPlanning.childTargetTable"></Table>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

import * as targetPlanningUtil from "@/store/util/targetPlanningUtil";

export default {
    name: "targetPlanning-page",
    components: {},
    computed: {
        ...mapGetters(["targetPlanning", "targetSetting"])
    },
    data() {
        return {
            transferTitles: ['All Targets', 'Choosed Targets'],
            targetStage : "正在执行的目标",
        };
    },
    created: function(){
        this.getThemesByPlan("1");
        this.getPeriods();
    },
    mounted: function(){

    },
    methods: {
        // 更新期数
        updatePeriod: function(){
            let flag = targetPlanningUtil.checkUpdatePeriodMethodParam(this.targetPlanning.periodObj, this);
            if(flag){
                this.$store.dispatch({
                    type: "updatePeriod",
                    thisObj: this
                })
            }
        },
        // 删除期数
        deletePeriod: function(index){
            this.$Modal.confirm({
                title: '确认删除 Period ?',
                content: '<p>如果删除当期目标, 与当期目标相关的数据都会删除...</p>',
                onOk: () => {
                    this.targetPlanning.periodsIndex= index;
                    this.$store.dispatch({
                        type: "deletePeriod",
                        thisObj: this
                    })
                }
            });
        },
        // 给期数信息赋值
        assignPeriod: function(index){
            console.log("assignPeriod: ");
            console.log(this.targetSetting.themesOfPlan);
            this.targetPlanning.periodsIndex = index;
            this.$store.dispatch({
                type: "assignPeriod"
            })
        },
        // 切换 target
        switchTarget: function(name){
            if(name === "正在执行的目标"){
                this.targetPlanning.doneStatus = "0";
                this.targetStage = "正在执行的目标";
            } else {
                this.targetPlanning.doneStatus = "1";
                this.targetStage = "已经完成的目标";
            }
        },
        // 获取所有的期数
        getPeriods: function(){
            this.$store.dispatch({
                type: "getPeriods"
            })
        },
        // 改变一共用时 
        changeTotalTime: function(){
            this.targetPlanning.periodObj.deadline = null;
        },
        // 改变每天可用时间
        changeAvailableTime: function(){
            this.targetPlanning.periodObj.deadline = null;
        },
        // 改变目标制定页面的 theme
        changeThemeOfTarget: function(){
            this.targetPlanning.chooseChildTargetKeys = [];
            this.targetPlanning.childTargetTable = [];
            this.targetPlanning.periodObj.totalTime = 0;
            this.targetPlanning.periodObj.deadline = null;
        },
        resetPeriod: function(){
            this.$store.dispatch({
                type: "resetPeriod"
            })
        },
        addPeriod: function(){
            let flag = targetPlanningUtil.checkAddPeriodMethodParam(this.targetPlanning.periodObj, this);
            if(flag){
                this.$store.dispatch({
                    type: "addPeriod",
                    thisObj: this
                })
            }
        },
        updatePeriod: function(){

        },
        // 处理 target 的截止日期
        handleDeadLine(){
            targetPlanningUtil.handleDeadLine(this.targetPlanning, this);
            // targetPlanningUtil.isHoliday(new Date());
        },
        // 我选择 theme 的时候应该自动带出 target
        selectThemeOfTarget: function(param){
            this.targetSetting.themesOfPlan.forEach(element => {
                if(element.value === param.value && element.label === param.label){
                    let datas = [];
                    this.targetPlanning.targetName = element.target;
                    this.targetPlanning.periodObj.targetId = element.value;
                    let arr = JSON.parse(element.childTargets);
                    for (let index = 0; index < arr.length; index++) {
                        let ele = arr[index];
                        let obj = {
                            "key": index,
                            "label": ele.childTarget
                        }
                        datas.push(obj);
                    }
                    this.targetPlanning.childTargetsOfTheme = datas;
                    this.getMaxNperByTargetId();
                }
            });
        },
        // 根据 targetID 获取最大的期数
        getMaxNperByTargetId: function(){
            this.$store.dispatch({
                type: "getMaxNperByTargetId"
            })
        },

        // 根据规划获取目标集合
        getThemesByPlan: function(plan){
            this.targetPlanning.planCategory = plan;
            this.$store.dispatch({
                type: "getThemesByPlan"
            })
        },
        
        chooseTarget(name){
            this.targetStage = name;
        },
        // 显示选择子目标模态框
        showChooseChildTargetModal(){
            // 判断 theme 有没有挑选
            if(this.targetPlanning.periodObj.targetId === 0) {
                this.$Message.info("请先挑选一个主题!");
            } else {
                this.targetPlanning.showChooseChildTargetModal = true;
            }
            
        },
        renderFormat (item) {
            return item.label;
        },
        // 在改变穿梭框的内容时, 动态改变 childTargetTable 中的数据
        childTargetChange(newTargetKeys, direction, moveKeys) {
            this.targetPlanning.chooseChildTargetKeys = newTargetKeys;
            // 动态显示 childTargetTable
            this.targetPlanning.childTargetTable = [];
            this.targetPlanning.chooseChildTargetKeys.forEach(ele => {
                this.targetPlanning.childTargetsOfTheme.forEach(obj => {
                    if(ele == obj.key){
                        let data = {
                            "childTarget": obj.label,
                            "consumeTime": 0
                        }
                        this.targetPlanning.childTargetTable.push(data);
                    }
                });
            });
        },
        // 结算 childTargetTable 中的数据
        handleSummary({ columns, data }){
            const sums = {};
            let totalTime = 0;
            columns.forEach((column, index) => {
                const key = column.key;
                if (index === 0) {
                    sums[key] = {
                        key,
                        value: data.length
                    };
                    return;
                }
                const values = data.map(item => Number(item[key]));
                if (!values.every(value => isNaN(value))) {
                    const v = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[key] = {
                        key,
                        value: v + ' min'
                    };
                    totalTime = v;
                }
            });
            this.targetPlanning.periodObj.totalTime = totalTime;
            return sums;
        },
    },
};
</script>

<style>
.ivu-transfer-list {
    display: inline-block;
    width: 200px !important;
    height: 600px !important;
    font-size: 14px;
    vertical-align: middle;
    position: relative;
    padding-top: 35px;
}
</style>
