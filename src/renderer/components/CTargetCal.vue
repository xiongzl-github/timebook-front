<template>
    <div style="width:600px;height:560px">
        <h3 style="text-align:center;width:600px;height:30px;margin-bottom:10px">
            <span style="float:left">
                <Icon @click="returnMainModal" style="cursor:pointer" size=30 type="md-arrow-round-back" />
            </span>
            截止时间计算
        </h3>
        <h4 style="width: 300px;display:inline-block;text-align:center;margin-bottom: 10px">目标名称</h4>
        <h4 style="width: 300px;display:inline-block;float: right;text-align:center;margin-bottom: 10px">目标耗时(min)</h4>
        <div style="width:600px;height: 280px;margin-bottom:10px">
            <vuescroll>
                <span v-for="(obj, j) in targetChosen.allTargets" :key="j">
                    <div v-if="obj.id == item.targetId" v-for="(item, i) in targetPeriod.targetPeriodObj.chosenTargets" :key="i" style="width:585px;height:30px;float: left;margin-bottom:10px">
                        <span style="width:300px;height:30px;line-height:30px;display:inline-block;text-align:left;font-weight:400">
                            {{obj.name}}
                        </span>
                        <InputNumber @on-change="changeTargetTime($event, obj)" v-model="item.targetTime" :min=0 :step=15  style="width:280px;"></InputNumber>
                    </div>
                </span>
            </vuescroll>
        </div>
        <div style="width: 600px;height:70px;float:left;">
            <h4 style="margin-bottom: 5px">时间安排: </h4>
            <Select v-model="targetPeriod.targetPeriodObj.deadlineType" type='number' style="width:600px;">
                <Option :value=1 >工作日</Option>
                <Option :value=2 >节假日</Option>
                <Option :value=3 >每一天</Option>
            </Select>
        </div>
        <div style="width: 600px;height:70px;float:left;">
            <h4 style="margin-bottom: 5px">每天可用时间: </h4>
            <Input v-model="targetPeriod.targetPeriodObj.availableTime" type="number" style="width:600px;">
                <span slot="append">min</span>
            </Input>
        </div>
        <div style="width: 600px;height:70px;float:left;">
            <h4 style="margin-bottom: 5px">截止时间:</h4>
            <DatePicker v-model="targetPeriod.targetPeriodObj.deadline" style="width: 564px;font-size:12px;font-weight:500;" type="date"></DatePicker>
            <span style="vertical-align: -webkit-baseline-middle;cursor: pointer;float: right;"><Icon style="vertical-align:top" size="32" type="md-calculator" /></span>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import vuescroll from 'vuescroll';

export default {
    name: "CTargetCal",
    components: {
        vuescroll
    },
    computed: {
        ...mapGetters(["targetPeriod", "targetChosen"])
    },
    created() {
        console.log("CTargetCal created====================================");
    },
    mounted: function() {
        console.log("CTargetCal mounted====================================");
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
        changeTargetTime(e, item){
            console.log("changeTargetTime");
            console.log(e);
            console.log(item);
        }
    }
};
</script>
<style lang='less'>

</style>