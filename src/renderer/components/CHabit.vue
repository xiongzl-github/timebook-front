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
                            <Select v-model="habit.condition.display" clearable=true style="width:290px;height:30px;line-height:30px;text-align:left">
                                <Option :value=0>是</Option>
                                <Option :value=1>否</Option>
                            </Select>
                        </div>
                        <div style="width:368px;height:50px; line-height:50px;">
                            <h4 style="width:68px;height:30px;line-height:30px;display:inline-block;text-align:right;margin-right:6px;">是否处理:</h4>
                            <Select v-model="habit.condition.handle" clearable=true style="width:290px;height:30px;line-height:30px;text-align:left">
                                <Option :value=1>是</Option>
                                <Option :value=0>否</Option>
                            </Select>
                        </div>
                        <div style="height:32px;width: 368px;margin-top:10px">
                            <Button @click="getHabitList" type="error" style="float: right;">确定</Button>
                        </div>
                    </div>
                </Poptip>
                Habit
            </h3>
            <span style="float:left;height:32px;width:113px;line-height:32px;margin-right:5px">
                <DatePicker  @on-change="getHabitList" v-model="habit.time" style="width: 115px;font-size:12px;font-weight:500;" size="small" type="date"></DatePicker>
            </span>
            <span @click="openHabitModal(1, null)" style="float:right;height:32px;line-height:32px;margin-top:4px;cursor: pointer;"><Icon size="32" custom="iconfont iconpaixuti" /></span>
            <span @click="openHabitModal(1, null)" style="float:right;height:32px;line-height:32px;margin-top:4px;cursor: pointer;"><Icon size="32" custom="iconfont iconrili1" /></span>
            <span @click="openHabitModal(1, null)" style="float:right;height:32px;line-height:32px;margin-top:4px;cursor: pointer;"><Icon size="32" custom="iconfont iconv-pie-graph" /></span>
            <span @click="openHabitModal(1, null)" style="float:right;height:32px;line-height:32px;margin-top:4px;cursor: pointer;"><Icon size="32" type="md-add-circle" /></span>
        </div>
        <div style="width:280px;height:660px;overflow:auto;float:left;display:inline-block;">
            <vuescroll>
            <div style="text-align:left;width:265px;height:660px;padding-left:15px;">
                <div v-for="(item, i) in habit.habits" style="width:250px;height:50px;line-height:50px;cursor: pointer;">
                    <div v-if="i == habit.habitsIndex" style="width:250px;height:50px;line-height:50px;cursor: pointer;background-color:#f8f8f9;border-radius: 10px;box-shadow:0px 15px 20px -20px #000;">
                        <div style="width:50px;height:50px;line-height:50px;display: inline-block;float: left;padding:5px 5px">
                            <!-- <Icon size="40" type="md-walk" /> -->
                            <Icon size="40" v-if="item.iconType == 1" :type=item.icon />
                            <Icon size="40" v-if="item.iconType == 2" :custom=item.icon />
                        </div>
                        <div @click="checkHabit(i)" style="width:50px;height:50px;line-height:50px;display: inline-block;float: right;padding:7px 7px;">
                            <Icon v-if="item.habitResult == null" size="36" type="md-help-circle" />
                            <Icon v-if="item.habitResult == 1" size="36" type="md-checkmark-circle" />
                            <Icon v-if="item.habitResult == 0" size="36" type="md-close-circle" />
                        </div>
                        <div @click="openHabitModal(2, i)" style="width:150px;height:50px;display: inline-grid;float: right;">
                            <span style="width:150px;height:25px;line-height:25px;display: inline-block;font-weight:bolder;font-size:14px;">{{item.categoryName}}</span>
                            <span :title="item.habit" style="width:150px;height:25px;line-height:25px;display: inline-block;font-weight:bolder;font-size:12px;overflow:hidden;text-overflow: ellipsis;">
                                {{item.habit}}
                            </span>
                        </div>
                    </div>
                    <div v-else style="width:250px;height:50px;line-height:50px;cursor: pointer;">
                        <div style="width:50px;height:50px;line-height:50px;display: inline-block;float: left;padding:5px 5px">
                            <Icon size="40" v-if="item.iconType == 1" :type=item.icon />
                            <Icon size="40" v-if="item.iconType == 2" :custom=item.icon />
                        </div>
                        <div @click="checkHabit(i)" style="width:50px;height:50px;line-height:50px;display: inline-block;float: right;padding:7px 7px;">
                            <Icon v-if="item.habitResult == null" size="36" type="md-help-circle" />
                            <Icon v-if="item.habitResult == 1" size="36" type="md-checkmark-circle" />
                            <Icon v-if="item.habitResult == 0" size="36" type="md-close-circle" />
                        </div>
                        <div @click="openHabitModal(2, i)" style="width:150px;height:50px;display: inline-grid;float: right;">
                            <span style="width:150px;height:25px;line-height:25px;display: inline-block;font-weight:bolder;font-size:14px;">{{item.categoryName}}</span>
                            <span :title="item.habit" style="width:150px;height:25px;line-height:25px;display: inline-block;font-weight:bolder;font-size:12px;overflow:hidden;text-overflow: ellipsis;">
                                {{item.habit}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            </vuescroll>
        </div>
        <Modal
                v-model="habit.showHabitModal"
                :title=habit.modalTitle
                :mask-closable=false
                @on-ok="test"
                @on-cancel="closeHabitModal"
                width="632px"
                footer-hide=true>
                <div v-if="habit.modalType == 1" style="width:600px;height:630px">
                    <div style="width:600px;">
                        <h3 style="margin-bottom: 5px;width:56px;display: inline-block;float: left;"></h3>
                        <h3 style="width: 488px;margin-bottom: 5px;text-align:center;display: inline-block;">HABIT</h3>
                        <Switch v-model="habit.habitObj.display" style="float: right;" size="large">
                            <span slot="close">隐藏</span>
                            <span slot="open">公开</span>
                        </Switch>
                    </div>
                    <div style="width: 600px;height:70px;float:right;">
                        <h4 style="margin-bottom: 5px">类别: </h4>
                        <Select @on-change="categoryChange" v-model="habit.habitObj.categoryId" style="width:560px;">
                            <Option v-for="(item, i) in category.categories" :key="i" :value=item.id >{{item.categoryName}}</Option>
                        </Select>
                        <span @click="openCategoryModal" style="vertical-align: -webkit-baseline-middle;cursor: pointer;"><Icon size="32" type="md-add-circle" /></span>
                    </div>
                    <div style="width: 600px;height:70px;float:right;">
                        <h4 style="margin-bottom: 5px">习惯: </h4>
                        <div style="width:560px;display:inline-block;height:32px;vertical-align:top">
                            <Input v-model="habit.habitObj.habit" placeholder="请输入一个习惯" style="width: 560px;"/>
                        </div>
                        <div style="display:inline-block;height:32px;vertical-align:top">
                            <Tooltip placement="top">
                                <span style="cursor: pointer;"><Icon size="32" type="md-list-box" /></span>
                                <div slot="content">
                                    <p v-for="(item, i) in habit.habitsOfCategory" :key="i">{{item}}</p>
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                    <div style="width: 560px;height:70px;float:left;">
                        <h4 style="margin-bottom: 5px">周期: </h4>
                        <Select type='number' v-model="habit.habitObj.cycle" style="width:560px;">
                            <Option :value=1 >天</Option>
                            <Option :value=2 >周</Option>
                            <Option :value=3 >月</Option>
                            <Option :value=4 >季</Option>
                            <Option :value=5 >年</Option>
                        </Select>
                    </div>
                    <div style="width: 560px;height:70px;float:left;">
                        <h4 style="margin-bottom: 5px">频次: </h4>
                        <Input v-model="habit.habitObj.frequency" type="number" style="width:560px;">
                            <span slot="append">次</span>
                        </Input>
                    </div>
                    <div style="width: 560px;height:70px;float:left;">
                        <h4 style="margin-bottom: 5px">刷新频率: </h4>
                        <Select v-model="habit.habitObj.refreshRate" style="width:560px;">
                            <Option :value=1 >天</Option>
                            <Option :value=2 >周</Option>
                            <Option :value=3 >月</Option>
                            <Option :value=4 >季</Option>
                            <Option :value=5 >年</Option>
                        </Select>
                    </div>
                    <div style="width: 560px;height:70px;float:left;">
                        <h4 style="margin-bottom: 5px">期待达成率: </h4>
                        <div style="width:100px;display:inline-block;height:32px;vertical-align:top">
                            <Select v-model="habit.habitObj.comparator" style="width:100px;height:32px">
                                <Option :value=1 >大于等于</Option>
                                <Option :value=2 >小于等于</Option>
                                <Option :value=3 >大于</Option>
                                <Option :value=4 >小于</Option>
                            </Select>
                        </div>
                        <div style="width:455px;display:inline-block;height:32px">
                            <Input v-model="habit.habitObj.expectAchievingRate" type="number" style="width:455px;height:32px">
                                <span slot="append">%</span>
                            </Input>
                        </div>
                    </div>
                    <div style="width: 560px;height:70px;float:left;margin-bottom:5px">
                        <h4 style="margin-bottom: 5px">是否重要: </h4>
                        <Select v-model="habit.habitObj.keyHabit" style="width:560px;">
                            <Option :value=1 >是</Option>
                            <Option :value=0 >否</Option>
                        </Select>
                    </div>
                    <div style="width: 560px;height:70px;float:left;margin-bottom:5px">
                        <h4 style="margin-bottom: 5px">是否使用: </h4>
                        <Select v-model="habit.habitObj.apply" style="width:560px;">
                            <Option :value=1 >是</Option>
                            <Option :value=0 >否</Option>
                        </Select>
                    </div>
                    <div style="width: 600px;text-align:center">
                        <Button type="error" style="margin-right:20px" @click="resetHabit">重置</Button>
                        <Button v-if="habit.operType == 2" type="success" @click="updateHabit">更新</Button>
                        <Button v-if="habit.operType == 1" type="success" @click="addHabit">添加</Button>
                    </div>
                </div>
                <div v-if="habit.modalType == 2" style="width:600px;height:560px">
                    <CCategory></CCategory>
                </div>
        </Modal>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import vuescroll from 'vuescroll';
// import types from "@/store/types.js";
import CCategory from '@/components/CCategory';

// import * as util from "@/store/util/util";

export default {
    name: "CHabit",
    components: {
        vuescroll,
        CCategory
    },
    computed: {
        ...mapGetters(["habit", "category"]),
    },
    created() {
        console.log("CHabit created====================================");
        this.getHabitList();
    },
    mounted: function() {
        console.log("CHabit mounted====================================");
        this.$Message.config({ top: 400, duration: 3 });
    },
    data() {
        return {
        };
    },
    methods: {
        categoryChange(item){
            let habit = this.habit;
            habit.habitsOfCategory = [];
            habit.habits.forEach(element => {
                if(element.categoryId == item){
                    habit.habitsOfCategory.push(element.habit);
                }
            });
        },
        checkHabit(i){
            let habit = this.habit;
            habit.habitsIndex = i;
            let habitObj = habit.habits[i];
            if(habitObj.habitResult == null){
                this.addHabitReport();
            } else {
                this.updateHabitReport();
            }
        },
        async addHabitReport(){
            await this.$store.dispatch({
                type: "addHabitReport"
            })
            await this.$forceUpdate();
        },
        async updateHabitReport(){
            await this.$store.dispatch({
                type: "updateHabitReport"
            })
            await this.$forceUpdate();
        },
        closeHabitModal(){
            let habit = this.habit;
            let tempObj = JSON.parse(JSON.stringify(habit.oriHabitObj));
            habit.habitObj = tempObj;
            this.$forceUpdate();
        },
        getCategories(){
            this.$store.dispatch({
                type: "getCategories",
                categoryType: 2
            })
        },
        getHabitList(){
            this.$store.dispatch({
                type: "getHabitList"
            })
        },
        openCategoryModal(){
            this.habit.modalType = 2;
            this.category.categoryObj.type = 2;
        },
        chooseHabit(i){
            this.habit.habitsIndex = i;
            this.habit.id = this.habit.habits[i].id;
            this.getElementsByHabitId();
        },
        getElementsByHabitId(){
            this.$store.dispatch({
                type: "getElementsByHabitId"
            })
        },
        openHabitModal(operType, index){
            let habit = this.habit;
            habit.showHabitModal = true;
            habit.operType = operType;
            habit.modalTitle = "添加习惯";
            if(operType == 2){
                habit.modalTitle = "更新习惯";
                habit.habitsIndex = index;
                let tempObj = JSON.parse(JSON.stringify(habit.habits[index]));
                habit.habitObj = tempObj;
            }
            this.getCategories();
            this.categoryChange(habit.habitObj.categoryId);
        },
        addOrUpdateHabit(){
            if(this.habit.operType == 1) {
                this.addHabit();
            } else {
                this.updateHabit();
            }
        },
        async addHabit(){
            await this.$store.dispatch({
                type: "addHabit",
                thisObj: this
            })
            await this.$forceUpdate();
        },
        async updateHabit(){
            await this.$store.dispatch({
                type: "updateHabit",
                thisObj: this
            })
            await this.$forceUpdate();
        },
        deleteHabit(i){
            this.habit.habitsIndex = i;
            this.$store.dispatch({
                type: "deleteHabit",
                thisObj: this
            })
        },
        closeHabitModal(){
            console.log("closeHabitModal");
            let tempObj = JSON.parse(JSON.stringify(this.habit.oriHabitObj));
            this.habit.habitObj = tempObj;
        },
        test(){
            console.log("test");
        }
    }

};
</script>
<style lang='less'>
</style>