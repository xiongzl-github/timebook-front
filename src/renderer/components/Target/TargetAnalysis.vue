<template>
    <div style="width:1075px;height:936px;margin-top:-16px">
        <div style="width:1075px;height:936px">
            <div style="width: 300px;height:936px;background-color:#fff;display:inline-block;float: left;">
                <h3 style="width:300px;height:50px;line-height:50px;text-align:center">
                    <Dropdown @on-click="chooseTarget">
                        <a href="javascript:void(0)">
                            {{targetStage}}
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu  slot="list">
                            <DropdownItem name="正在执行的目标">正在执行的目标</DropdownItem>
                            <DropdownItem name="已经完成的目标">已经完成的目标</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </h3>
                <div style="height: 884px;width:300px;overflow: auto;padding:0 15px">
                    <div v-for="i in 10" style="width:270px;height:60px;line-height:60px;">
                        <div style="width:50px;height:60px;line-height:60px;display: inline-block;float: left;padding:10px 5px">
                            <Icon size="40" type="logo-android" />
                        </div>
                        <div style="width:50px;height:60px;line-height:60px;display: inline-block;float: right;padding:10px 7px;">
                            <Icon size="36" type="md-close-circle" />
                        </div>
                        <div style="width:170px;height:60px;display: inline-grid;float: right;">
                            <span style="width:170px;height:30px;line-height:30px;display: inline-block;font-weight:bolder;font-size:14px;margin-left:10px">学习 Java</span>
                            <span style="width:170px;height:30px;line-height:30px;display: inline-block;font-weight:bolder;font-size:12px;margin-left:10px">
                                <Tag color="success">第一期</Tag>
                                剩余时间: 125H
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div style="width:775px;height:936px;background-color:#fff;display:inline-block;float: right;">
                <div style="width:775px;height:436px;background-color:green;">

                </div>
                <div style="width:775px;height:500px;background-color:orange">
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "targetPlanning-Analysis",
    components: {},
    computed: {
        ...mapGetters(["targetAnalysis"])
    },
    data() {
        return {
            targetStage : "正在执行的目标",
        };
    },
    methods: {
        
        chooseTarget(name){
            this.targetStage = name;
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
