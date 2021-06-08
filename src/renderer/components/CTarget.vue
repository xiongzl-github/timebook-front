<template>
    <div style="width:600px;height:560px">
        <h3 style="text-align:center;width:600px;height:30px;margin-bottom:10px">
            <span style="float:left">
                <Icon @click="returnMainModal" style="cursor:pointer" size=30 type="md-arrow-round-back" />
            </span>
            制定子目标
        </h3>
        <div style="width: 600px;height:520px;float:left;margin-right:15px">
            <div style="width: 600px;height:70px;float:left;">
                <h4 style="margin-bottom: 5px">子目标: </h4>
                <div style="width:200px;display:inline-block;height:32px;vertical-align:top">
                    <Select clearable=true v-model="target.targetObj.parentId" style="width:200px;height:32px">
                        <Option v-for="(item, i) in target.targets" :key="i" :value=item.id >{{item.targetName}}</Option>
                    </Select>
                </div>
                <div style="width:334px;display:inline-block;height:32px">
                    <Input v-model="target.targetObj.targetName" style="width:334px;height:32px" />
                </div>
                <Button @click="addTarget" type="primary" style="float:right">Add</Button>
            </div>
            <div style="width: 600px; height: 450px;overflow:auto;">
                <vuescroll>
                    <span v-for="(item, i) in target.targets" :key="i" style="float:left;width:585px;height:auto;display:inline-block;line-height:24px;font-weight:bolder;font-size:14px">
                        <Input :value="item.targetName" @on-change="targetChange($event, i, null)" :border="false" style="display:inline-block;width:530px;" />
                        <span style="float:right;cursor: pointer;" @click="deleteTarget(i, null)"><Icon size=24  type="md-close-circle" /></span><span style="float:right;cursor: pointer;" @click="updateTarget(i, null)"><Icon size=24  type="md-create" /></span>
                        <span v-for="(ele, j) in item.childTargets" :key="j" style="float:left;width:585px;height:auto;display:inline-block;line-height:20px;font-weight:bolder;font-size:12px">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Input :value="ele.targetName" @on-change="targetChange($event, i, j)" :border="false" size="small" style="display:inline-block;width:500px;" />
                            <span style="float:right;cursor: pointer;" @click="deleteTarget(i, j)"><Icon size=20  type="md-close-circle" /></span><span style="float:right;cursor: pointer;" @click="updateTarget(i, j)"><Icon size=20  type="md-create" /></span>
                        </span>
                    </span>
                </vuescroll>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import vuescroll from 'vuescroll';

export default {
    name: "CTarget",
    components: {
        vuescroll
    },
    computed: {
        ...mapGetters(["target", "targetPeriod", "category"])
    },
    created() {
        console.log("CTarget created====================================");
        this.getTargets();
    },
    mounted: function() {
        console.log("CTarget mounted====================================");
        this.$Message.config({ top: 400, duration: 3 });
    },
    data() {
        return {
            
        }
    },
    methods: {
        returnMainModal(){
            this.targetPeriod.modalType = 1;
        },
        targetChange(e, i, j){
            let target = this.target;
            if(j == null){
                // 父节点
                target.targets[i].targetName = e.target.value;
            } else {
                // 子节点
                target.targets[i].childTargets[j].targetName = e.target.value;
            }
        },
        updateTarget(i, j){
            let target = this.target;
            target.targetsIndex = i;
            target.childTargetsIndex = j;
            this.$store.dispatch({
                type: "updateTarget", 
                thisObj: this
            })
        },
        deleteTarget(i, j){
            let target = this.target;
            target.targetsIndex = i;
            target.childTargetsIndex = j;
            this.$store.dispatch({
                type: "deleteTarget", 
                thisObj: this
            })
        },
        addTarget(){
            this.$store.dispatch({
                type: "addTarget",
                thisObj: this
            })
        },
        changeCategory(){
            this.getTargets();
        },
        getTargets(){
            if(this.targetPeriod.targetPeriodObj.targetThemeId != null){
                this.$store.dispatch({
                    type: "getTargets"
                })
            }
        },
        test(){
            console.log("test");
        }
    }
};
</script>
<style lang='less'>
</style>