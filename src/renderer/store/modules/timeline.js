import types from "../types.js";
import axios from "axios";
import { format, toDate, parseISO } from 'date-fns';
// import moduleObj from "@/store/modules/module";

const state = {
    timeline: {
        id: 0,
        timeSlot: ['09:41', '12:00'],
        timelines: [],
        modalType: 1,
        timelinesIndex: 0,
        todolists: [],
        modalTitle: "添加时间段",
        showTimelineModal: false,
        curDatetime: new Date(),
        operType: 1, // 1, 添加操作, 2, 更新操作
        timelineOtherStudyIndex:null,
        timelineOtherDiaryIndex:null,
        condition: {
            userId: 0,
            display: null,
            handle: 0, // 1. 已处理, 0. 未处理
            handleTime: null,
            status: 1
        },
        timelineObj: {
            id: 0,
            userId: 1,
            startTime: "",
            endTime: "",
            todolistId: null,
            targetId: null,
            targetPeriodId: null,
            progress: 60,
            workStatus: 2,
            disturbFactor: 1,
            emotion: 1,
            feel: "",
            display: true,
            other: [],
            status: 1,
            createTime: new Date(),
            updateTime: null
        },
        oriTimelineObj: {
            id: 0,
            userId: 1,
            startTime: new Date(),
            endTime: new Date(),
            todolistId: null,
            targetId: null,
            targetPeriodId: null,
            progress: 60,
            workStatus: 2,
            disturbFactor: 1,
            emotion: 1,
            feel: "",
            display: true,
            other: [],
            status: 1,
            createTime: new Date(),
            updateTime: null
        }
    },
};

const getters = {
    timeline(state) {
        return state.timeline;
    },
};

const actions = {
    addTimeline({ commit, state }, param) {
        let timeline = state.timeline;
        let timelineObj = timeline.timelineObj;
        let thisObj = param.thisObj;
        timelineObj.createTime = new Date();
        timelineObj.startTime = timeline.timeSlot[0];
        timelineObj.endTime = timeline.timeSlot[1];
        for (let i = 0; i < timeline.todolists.length; i++) {
            let ele = timeline.todolists[i];
            if(ele.id == timelineObj.todolistId){
                timelineObj.targetId = ele.targetId;
                timelineObj.targetPeriodId = ele.targetPeriodId;
                break;
            }
        }
        axios({
            url: types.TEST_ENV + "/api/timelines",
            method: "post",
            data: timelineObj
        }).then(resp => {
            commit(types.ADDTIMELINE, resp.data.data);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
    updateTimeline({ commit, state }, param) {
        let timeline = state.timeline;
        let timelineObj = timeline.timelineObj;
        let thisObj = param.thisObj;
        axios({
            url: types.TEST_ENV + "/api/timelines",
            method: "put",
            data: timelineObj
        }).then(resp => {
            commit(types.UPDATETIMELINE);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
    deleteTimeline({ commit, state }, param) {
        let timeline = state.timeline;
        let id = timeline.timelines[timeline.timelinesIndex].id;
        let thisObj = param.thisObj;
        axios({
            url: types.TEST_ENV + "/api/timelines",
            method: "delete", 
            params: {
                "id": id
            }
        }).then(resp => {
            commit(types.DELETETIMELINE);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
    async getTimelineTodolists({ commit, state }) {
        let timeline = state.timeline;
        let formatStr = "yyyy-MM-dd";
        let userId = timeline.timelineObj.userId;
        let curDatetime = null;
        if(timeline.curDatetime != null && timeline.curDatetime != "" && timeline.curDatetime != undefined){
            curDatetime = format(timeline.curDatetime, formatStr);
        }
        await axios({
            url: types.TEST_ENV + "/api/timelines/todolists",
            method: "get",
            params: {
                "userId": userId,
                "curDatetime": curDatetime,
                "completed": 0,
                "status": 1
            }
        }).then(resp => {
            commit(types.GETTIMELINETODOLISTS, resp.data.data);
        }).catch(error => {
            console.log(error);
        })
    },
    async getTimelines({ commit, state }) {
        let timeline = state.timeline;
        let formatStr = "yyyy-MM-dd";
        let userId = timeline.timelineObj.userId;
        let curDatetime = null;
        if(timeline.timelineObj.createTime != null && timeline.timelineObj.createTime != "" && timeline.timelineObj.createTime != undefined){
            curDatetime = format(timeline.timelineObj.createTime, formatStr);
        }
        await axios({
            url: types.TEST_ENV + "/api/timelines/list",
            method: "get",
            params: {
                "userId": userId,
                "curDatetime": curDatetime,
                "status": 1
            }
        }).then(resp => {
            commit(types.GETTIMELINES, resp.data.data);
        }).catch(error => {
            console.log(error);
        })
    },
};

const mutations = {
    [types.GETTIMELINES](state, data) {
        let timeline = state.timeline;
        timeline.timelines = [];
        timeline.timelines = data;
    },
    [types.GETTIMELINETODOLISTS](state, data) {
        let timeline = state.timeline;
        timeline.todolists = [];
        timeline.todolists = data;
    },
    [types.DELETETIMELINE](state) {
        let timeline = state.timeline;
        timeline.timelines.splice(timeline.timelinesIndex, 1);
    },
    [types.ADDTIMELINE](state, data) {
        let timeline = state.timeline;
        timeline.timelineObj.id = data;
        let tempObj = JSON.parse(JSON.stringify(timeline.timelineObj));
        for (let i = 0; i< timeline.todolists.length; i++) {
            let ele = timeline.todolists[i];
            if(ele.id == tempObj.todolistId){
                tempObj.taskname = ele.taskname;
                tempObj.icon = ele.icon;
                tempObj.iconType = ele.iconType;
                break;
            }
        }
        timeline.timelines.push(tempObj);
        console.log("types.ADDTIMELINE");
        console.log(timeline.timelines);
    },
    [types.UPDATETIMELINE](state) {
        let timeline = state.timeline;
        let tempObj = JSON.parse(JSON.stringify(timeline.timelineObj));
        timeline.timelines[timeline.timelinesIndex] = tempObj;
    },

};

export default {
    state,
    getters,
    actions,
    mutations
};