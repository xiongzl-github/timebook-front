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
                            <Select v-model="todolist.condition.display" clearable=true style="width:290px;height:30px;line-height:30px;text-align:left">
                                <Option :value=0>是</Option>
                                <Option :value=1>否</Option>
                            </Select>
                        </div>
                        <div style="height:32px;width: 368px;margin-top:10px">
                            <Button @click="getTodolists" type="error" style="float: right;">确定</Button>
                        </div>
                    </div>
                </Poptip>
                Todolist
            </h3>
            <span style="float:left;height:32px;width:113px;line-height:32px;margin-right:5px">
                <DatePicker  @on-change="getTodolists" v-model="todolist.curDatetime" style="width: 115px;font-size:12px;font-weight:500;" size="small" type="date"></DatePicker>
            </span>
            <span @click="openTodolistModal(1, null)" style="float:right;height:32px;line-height:32px;margin-top:4px;cursor: pointer;"><Icon size="32" custom="iconfont iconpaixuti" /></span>
            <span @click="openTodolistCalendarModal" style="float:right;height:32px;line-height:32px;margin-top:4px;cursor: pointer;"><Icon size="32" custom="iconfont iconrili1" /></span>
            <span @click="openTodolistGantModal" style="float:right;height:32px;line-height:32px;margin-top:4px;cursor: pointer;"><Icon size="32" custom="iconfont iconjianchazhibiao" /></span>
            <span @click="openTodolistModal(1, null)" style="float:right;height:32px;line-height:32px;margin-top:4px;cursor: pointer;"><Icon size="32" type="md-add-circle" /></span>
        </div>
        <div style="width:280px;height:660px;overflow:auto;float:left;display:inline-block;">
            <vuescroll>
            <div style="text-align:left;width:265px;height:660px;padding-left:15px">
                <div v-for="(item, i) in todolist.todolists" :key="i" style="width:250px;height:50px;line-height:50px;cursor: pointer;">
                    <div v-if="i == todolist.todolistsIndex" style="width:250px;height:50px;line-height:50px;cursor: pointer;background-color:#f8f8f9;border-radius: 10px;">
                        <div style="width:50px;height:50px;line-height:50px;display: inline-block;float: left;padding:5px 5px">
                            <Icon size="40" v-if="item.iconType == 1" :type=item.icon />
                            <Icon size="40" v-if="item.iconType == 2" :custom=item.icon />
                        </div>
                        <div @click="deleteTodolist(i)" style="width:50px;height:50px;line-height:50px;display: inline-block;float: right;padding:7px 7px;">
                            <Icon size="36" type="md-close-circle" />
                        </div>
                        <div @click="openTodolistModal(2, i)" style="width:150px;height:50px;display: inline-grid;float: right;">
                            <span style="width:150px;height:25px;line-height:25px;display: inline-block;font-weight:bolder;font-size:14px;overflow:hidden" :title="item.taskname">{{item.taskname}}</span>
                            <span style="width:150px;height:25px;line-height:25px;display: inline-block;font-weight:bolder;font-size:12px;">
                                截止日期: {{formatDeadline(item.deadline)}}
                            </span>
                        </div>
                    </div>
                    <div v-else style="width:250px;height:50px;line-height:50px;cursor: pointer;">
                        <div style="width:50px;height:50px;line-height:50px;display: inline-block;float: left;padding:5px 5px">
                            <Icon size="40" v-if="item.iconType == 1" :type=item.icon />
                            <Icon size="40" v-if="item.iconType == 2" :custom=item.icon />
                        </div>
                        <div @click="deleteTodolist(i)" style="width:50px;height:50px;line-height:50px;display: inline-block;float: right;padding:7px 7px;">
                            <Icon size="36" type="md-close-circle" />
                        </div>
                        <div @click="openTodolistModal(2, i)" style="width:150px;height:50px;display: inline-grid;float: right;">
                            <span style="width:150px;height:25px;line-height:25px;display: inline-block;font-weight:bolder;font-size:14px;overflow: hidden;" :title="item.taskname">{{item.taskname}}</span>
                            <span style="width:150px;height:25px;line-height:25px;display: inline-block;font-weight:bolder;font-size:12px;">
                                截止日期: {{formatDeadline(item.deadline)}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            </vuescroll>
        </div>
        <Modal
            v-model="todolist.showTodolistModal"
            :title=todolist.modalTitle
            :mask-closable=false
            @on-ok="test"
            @on-cancel="closeTodolistModal"
            width="632px"
            footer-hide=true>
            <div v-if="todolist.modalType == 1" style="width:600px;height:770px">
                <div style="width:600px;">
                    <h3 style="margin-bottom: 5px;width:56px;display: inline-block;float: left;"></h3>
                    <h3 style="width: 488px;margin-bottom: 5px;text-align:center;display: inline-block;">TODOLIST</h3>
                    <Switch v-model="todolist.todolistObj.display" style="float: right;" size="large">
                        <span slot="close">隐藏</span>
                        <span slot="open">公开</span>
                    </Switch>
                </div>
                <div style="width: 600px;height:70px;float:left;">
                    <h4 style="margin-bottom: 5px">类别: </h4>
                    <Select type='number' @on-change="changeCategory" v-model="todolist.todolistObj.categoryId" style="width:560px;">
                        <Option v-for="(item, i) in category.categories" :key="i" :value=item.id >{{item.categoryName}}</Option>
                    </Select>
                    <span @click="openCategoryModal" style="vertical-align: -webkit-baseline-middle;cursor: pointer;"><Icon style="vertical-align:top" size="32" type="md-add-circle" /></span>
                </div>
                <div style="width: 560px;height:70px;float:left;">
                    <h4 style="margin-bottom: 5px">选择目标: </h4>
                    <Cascader v-model="todolist.todolistObj.targetIds" :data="targetPeriod.todolistCascaderOfTargetPeriods" style="width:560px;"></Cascader>
                </div>
                <div style="width: 560px;height:70px;float:left;">
                    <h4 style="margin-bottom: 5px">任务名称: </h4>
                    <Input v-model="todolist.todolistObj.taskname" style="width:560px;"/>
                </div>
                <div style="width: 560px;height:70px;float:left;">
                    <h4 style="margin-bottom: 5px">重复: </h4>
                    <Select v-model="todolist.todolistObj.repeatType" type='number' style="width:560px;">
                        <Option :value=1 >一次性活动</Option>
                        <Option :value=2 >每天</Option>
                        <Option :value=3 >每天(工作日)</Option>
                        <Option :value=4 >每天(节假日)</Option>
                        <Option :value=5 >每周(每周星期&nbsp;{{todolist.dayOfWeek}})</Option>
                        <Option :value=6 >每月(每月 {{todolist.dayOfMonth}} 号)</Option>
                        <Option :value=7 >每年(每年 {{todolist.monthOfYear}} 月 {{todolist.dayOfMonth}} 号)</Option>
                    </Select>
                </div>
                <div style="width: 560px;height:70px;float:left;">
                    <h4 style="margin-bottom: 5px">计划用时: </h4>
                    <Input v-model="todolist.todolistObj.estimatedTime" type="number" style="width:560px;">
                        <span slot="append">min</span>
                    </Input>
                </div>
                <div style="width: 560px;height:70px;float:left;">
                    <h4 style="margin-bottom: 5px">截止时间: </h4>
                    <DatePicker v-model="todolist.todolistObj.deadline" type="date" style="width: 560px"></DatePicker>
                </div>
                <div style="width: 560px;height:70px;float:left;">
                    <h4 style="margin-bottom: 5px">难度: </h4>
                    <Select v-model="todolist.todolistObj.difficulty" type='number' style="width:560px;">
                        <Option :value=1 >容易</Option>
                        <Option :value=2 >偏易</Option>
                        <Option :value=3 >适中</Option>
                        <Option :value=4 >偏难</Option>
                        <Option :value=5 >困难</Option>
                    </Select>
                </div>
                <div style="width: 560px;height:70px;float:left;">
                    <h4 style="margin-bottom: 5px">优先级: </h4>
                    <Select v-model="todolist.todolistObj.priority" type='number' style="width:560px;">
                        <Option :value=1 >重要且紧急</Option>
                        <Option :value=2 >紧急不重要</Option>
                        <Option :value=3 >重要不紧急</Option>
                        <Option :value=4 >不紧急不重要</Option>
                    </Select>
                </div>
                <div style="width: 560px;height:70px;float:left;">
                    <h4 style="margin-bottom: 5px">核心任务: </h4>
                    <Select v-model="todolist.todolistObj.core" type='number' style="width:560px;">
                        <Option :value=1 >是</Option>
                        <Option :value=0 >否</Option>
                    </Select>
                </div>
                <div style="width: 560px;height:70px;float:left;">
                    <h4 style="margin-bottom: 5px">安排时间: </h4>
                    <Select v-model="todolist.todolistObj.timeslotType" type='number' style="width:560px;">
                        <Option :value=1 >早晨(06:00~08:00)</Option>
                        <Option :value=2 >上午(08:00~12:00)</Option>
                        <Option :value=3 >中午(12:00~14:00)</Option>
                        <Option :value=4 >下午(14:00~18:00)</Option>
                        <Option :value=5 >晚上(18:00~20:00)</Option>
                        <Option :value=6 >傍晚(20:00 以后)</Option>
                    </Select>
                </div>
                <div style="width: 600px;text-align:center">
                    <Button type="error" style="margin-right:20px" @click="resetTodolist">重置</Button>
                    <Button v-if="todolist.operType == 2" type="success" @click="updateTodolist">更新</Button>
                    <Button v-if="todolist.operType == 1" type="success" @click="addTodolist">添加</Button>
                </div>
            </div>
            <div v-if="todolist.modalType == 2" style="width:600px;height:560px">
                <CCategory></CCategory>
            </div>
        </Modal>
        <Modal
            v-model="todolist.showTodolistCalendarModal"
            :title=todolist.modalTitle
            :mask-closable=false
            @on-ok="test"
            @on-cancel="closeTodolistModal"
            width="1032px"
            footer-hide=true>
            <div style="width:1000px;height:800px">
                <CCalendar></CCalendar>
            </div>
        </Modal>
        <Modal
            v-model="todolist.showTodolistGantModal"
            :title=todolist.modalTitle
            :mask-closable=false
            @on-ok="test"
            @on-cancel="closeTodolistModal"
            width="1032px"
            footer-hide=true>
            <div style="width:1000px;height:800px">
                <CGant></CGant>
            </div>
        </Modal>
    </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import vuescroll from 'vuescroll';
import CCategory from '@/components/CCategory';
import CCalendar from '@/components/CCalendar';
import CGant from '@/components/CGant';
import dayjs from 'dayjs'
import { format, toDate, parseISO } from 'date-fns';
// import * as util from "@/store/util/util";
var formatStr = "yyyy-MM-dd";
export default {
    name: "CTodolist",
    components: {
        vuescroll,
        CCategory,
        CCalendar,
        CGant
    },
    computed: {
        ...mapGetters(["todolist", "category", "targetPeriod"])
    },
    created() {
        console.log("CTodolist created====================================");
        this.getTodolists();
    },
    mounted: function() {
        console.log("CTodolist mounted====================================");
        this.$Message.config({ top: 400, duration: 3 });
    },
    data() {
        return {
            
        }
    },
    methods: {
        openTodolistCalendarModal(){
            this.todolist.showTodolistCalendarModal = true;
        },
        openTodolistGantModal(){
            this.todolist.showTodolistGantModal = true;
        },
        formatDeadline(deadline){
            return dayjs(deadline).format('YYYY-MM-DD');
        },
        chooseTodolist(i){
            this.todolist.todolistsIndex = i;
            this.todolist.id = this.todolist.todolists[i].id;
            this.getElementsByTodolistId();
        },
        openTodolistModal(operType, index){
            this.todolist.showTodolistModal = true;
            this.todolist.operType = operType;
            this.todolist.modalTitle = "添加 Todolist";
            if(operType == 2){
                this.todolist.modalTitle = "更新 Todolist";
                this.todolist.todolistsIndex = index;
                let tempObj = JSON.parse(JSON.stringify(this.todolist.todolists[index]));
                if(!(tempObj.targetIds instanceof Array)){
                    tempObj.targetIds = JSON.parse(tempObj.targetIds);
                }
                this.todolist.todolistObj = tempObj;
            }
            this.getCategories();
            this.getTargetPeriodsOfTodolistCascader();
        },
        getTargetPeriodsOfTodolistCascader(){
            this.$store.dispatch({
                type: "getTargetPeriodsOfTodolistCascader",
            })
        },
        getCategories(){
            this.$store.dispatch({
                type: "getCategories",
                categoryType: 1
            })
        },
        openCategoryModal(){
            this.todolist.modalType = 2;
            this.category.categoryObj.type = 1;
        },
        addTodolist(){
            this.$store.dispatch({
                type: "addTodolist",
                thisObj: this
            })
        },
        getTodolists(){
            this.$store.dispatch({
                type: "getTodolists"
            })
        },
        updateTodolist(){
            this.$store.dispatch({
                type: "updateTodolist",
                thisObj: this
            })
        },
        deleteTodolist(i){
            this.todolist.todolistsIndex = i;
            this.$store.dispatch({
                type: "deleteTodolist",
                thisObj: this
            })
        },
        closeTodolistModal(){
            let tempObj = JSON.parse(JSON.stringify(this.todolist.oriTodolistObj));
            this.todolist.todolistObj = tempObj;
        },
        test(){
            console.log("test");
        }
    }

};
</script>
<style lang='less'>
</style>