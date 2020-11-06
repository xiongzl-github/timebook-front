<template>
    <div style="width:1075px;height:936px;background-color:red;margin-top:-16px">
        <div style="width:1075px;height:936px">
            <div style="width: 250px;height:936px;background-color:#fff;display:inline-block;float: left;">
                <h3 style="width:250px;height:50px;line-height:50px;text-align:center">
                    <Dropdown @on-click="chooseTarget">
                        <a href="javascript:void(0)">
                            {{targetStage}}
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu  slot="list">
                            <DropdownItem name="正在执行的目标">正在执行的目标</DropdownItem>
                            <DropdownItem name="计划去做的目标">计划去做的目标</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </h3>
                <div style="height: 884px;width:250px;overflow: auto;padding:0 15px">
                    <div v-for="(item, index) in targetSetting.targets" :key="index">
                        <div v-if="targetSetting.targetCategory === item.plan" style="width:220px;height:60px;line-height:60px;">
                            <div style="width:50px;height:60px;line-height:60px;display: inline-block;float: left;padding:10px 5px">
                                <Icon size="40" :type="item.icon" />
                            </div>
                            <div @click="deleteTarget(index)" style="width:50px;height:60px;line-height:60px;display: inline-block;float: right;padding:10px 7px;">
                                <Icon size="36" type="md-close-circle" />
                            </div>
                            <div @click="assignTarget(index)" style="width:120px;height:60px;display: inline-grid;float: right;cursor: pointer;">
                                <span style="width:120px;height:30px;line-height:30px;display: inline-block;font-weight:bolder;font-size:14px;margin-left:10px;">{{item.theme}}</span>
                                <span style="width:120px;height:30px;line-height:30px;display: inline-block;font-weight:bolder;font-size:12px;margin-left:10px;">{{item.target}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="width:825px;height:936;background-color:#fff;display:inline-block;float: right;">
                <h3 style="width:825px;height:50px;line-height:50px;text-align:center;">
                    Target
                </h3>
                <div style="width:825px;height:886px;padding:0 100px">
                    <div style="width:625px;height:80px; line-height:80px;display: inline-grid;">
                        <h4 style="width:610px;height:40px;line-height:40px">主题:</h4>
                        <Input v-model="targetSetting.targetSettingObj.theme" style="width:610px;height:40px;line-height:40px" />
                    </div>
                    <div style="width:625px;height:80px; line-height:80px;display: inline-grid;">
                        <h4 style="width:610px;height:40px;line-height:40px">目标:</h4>
                        <Input v-model="targetSetting.targetSettingObj.target" style="width:610px;height:40px;line-height:40px" />
                    </div>
                    <div style="width:625px;height:80px; line-height:80px;display: inline-grid;">
                        <h4 style="width:610px;height:40px;line-height:40px">规划:</h4>
                        <Select v-model="targetSetting.targetSettingObj.plan" style="width:610px;height:40px;line-height:40px">
                            <Option value="1">现在就做</Option>
                            <Option value="2">以后再做</Option>
                        </Select>
                    </div>
                    <div style="width:625px;height:80px; line-height:80px;display: inline-grid;">
                        <h4 style="width:610px;height:40px;line-height:40px">图标:</h4>
                        <Input v-model="targetSetting.targetSettingObj.icon" style="width:610px;height:40px;line-height:40px" />
                    </div>
                    <div style="width:625px;height:466px;display: inline-block;overflow: auto;margin-top:10px">
                        <div v-for="(item, index) in targetSetting.childTargets" :key="index" style="width:610px;height:50px;line-height:50px;display: inline-block;">
                            <h4 style="width:55px;height:50px;line-height:50px;display:inline-block;float: left;">子目标: </h4>
                            <Input v-model="item.childTarget" style="width:500px;height:50px;line-height:50px;display: inline-block;float:left;" />
                            <span @click="deleteChildTarget(index)" style="cursor:pointer;float: right;"><Icon size="40" style="margin-top:7px" type="md-close-circle" /></span>
                        </div>
                        <div style="width:610px;height:50;">
                            <!-- <Icon custom="iconfont iconjava" size="24" /> -->
                            <span @click="addChildTarget" style="cursor:pointer;float: right;"><Icon size="50" type="md-add-circle" /></span>
                        </div>
                    </div>
                    <div style="width:625px;height:100px; line-height:100px;display: inline-block;text-align:center">
                        <Button @click="resetTarget" type="warning">Reset</Button>
                        <Button v-if="targetSetting.addTargetBtnStatus" @click="addTarget" type="success">Submit</Button>
                        <Button v-if="targetSetting.updateTargetBtnStatus" @click="updateTarget" type="success">Update</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import * as targetSettingUtil from "@/store/util/targetSettingUtil";

export default {
    name: "targetSetting-page",
    computed: {
        ...mapGetters(["targetSetting"])
    },
    components: {},
    data() {
        return {
            targetStage : "正在执行的目标",
        };
    },
    created: function(){
        this.$Message.config({top: 300, duration: 3});
        this.getTargets();
    },
    mounted: function(){
        
    },
    methods: {
        // 删除 target
        deleteTarget: function(index){
            this.$Modal.confirm({
                title: '确认删除 Target ?',
                content: '<p>如果删除此目标, 与此目标相关的数据都会删除...</p>',
                onOk: () => {
                    this.targetSetting.targetsIndex = index;
                    this.$store.dispatch({
                        type: "deleteTarget",
                        thisObj: this
                    })
                }
            });
        },
        // 更新 target
        updateTarget: function(){
            console.log("updateTarget");
            // 校验 target 参数
            let flag = targetSettingUtil.checkUpdateTargetMethodParam(this.targetSetting.targetSettingObj, this);
            // 调用 addTarget 方法
            if(flag){
                this.$store.dispatch({
                    type: "updateTarget",
                    thisObj: this
                })
            }
        },
        // 给目标赋值
        assignTarget: function(index) {
            this.targetSetting.targetsIndex = index;
            this.$store.dispatch({
                type: "assignTarget"
            })
        },
        // 查询所有的 target
        getTargets: function(){
            this.$store.dispatch({
                type: "getTargets"
            })
        },
        // 删除子目标
        deleteChildTarget: function(index){
            console.log("deleteChildTarget");
            this.targetSetting.childTargetsIndex = index;
            this.$store.dispatch({
                type: "deleteChildTarget"
            })
        },
        // 添加子目标
        addChildTarget: function(){
            console.log("addChildTarget");
            this.$store.dispatch({
                type: "addChildTarget"
            })
        },
        // 添加 target
        addTarget: function(){
            console.log("addTarget");
            // 校验 target 参数
            let flag = targetSettingUtil.checkAddTargetMethodParam(this.targetSetting.targetSettingObj, this);
            // 调用 addTarget 方法
            if(flag){
                this.$store.dispatch({
                    type: "addTarget",
                    thisObj: this
                })
            }
        },
        // 重置 target
        resetTarget: function(){
            console.log("resetTarget");
            this.$store.dispatch({
                type: "resetTarget",
                thisObj: this
            })
        },
        // 选择 target
        chooseTarget(name){
            this.targetStage = name;
            if(name === "正在执行的目标"){
                this.targetSetting.targetCategory = "1";
            } else {
                this.targetSetting.targetCategory = "2";
            }
        }
    },
};
</script>

<style>
    
</style>
