<template>
    <div style="width:600px;height:560px">
        <h3 style="text-align:center;width:600px;height:30px;margin-bottom:10px">
            <span style="float:left">
                <Icon @click="returnMainModal" style="cursor:pointer" size=30 type="md-arrow-round-back" />
            </span>
            选择子目标
        </h3>
        <Transfer
            :data="targetChosen.allTargets"
            :target-keys="targetChosen.targetKeys"
            :list-style="listStyle"
            :render-format="renderFormat"
            @on-change="handleTargetChange">
        </Transfer>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import vuescroll from 'vuescroll';

export default {
    name: "CTargetChosen",
    components: {
        vuescroll
    },
    computed: {
        ...mapGetters(["targetPeriod", "target", "targetChosen"])
    },
    created() {
        console.log("CTargetChosen created====================================");
        this.getTargetData();
    },
    mounted: function() {
        console.log("CTargetChosen mounted====================================");
        this.$Message.config({ top: 400, duration: 3 });
    },
    data() {
        return {
            listStyle: {
                width: '268px',
                height: '520px'
            },
        }
    },
    methods: {
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
        handleTargetChange (targetKeys, direction, moveKeys) {
            let targetChosen = this.targetChosen;
            let targetPeriod = this.targetPeriod;
            targetChosen.targetKeys = [];
            targetChosen.targetKeys = targetKeys;
            targetPeriod.targetPeriodObj.chosenTargets = [];
            targetKeys.forEach(ele => {
                targetPeriod.targetPeriodObj.chosenTargets.push({
                    "targetId": ele,
                    "targetTime": 30
                });
            });
        },
        renderFormat (item) {
            return item.name;
        },
        returnMainModal(){
            this.targetPeriod.modalType = 1;
        }
    }
};
</script>
<style lang='less'>
</style>