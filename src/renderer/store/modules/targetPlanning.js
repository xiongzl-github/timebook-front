import types from "../types.js";
import axios from "axios";
import { toDate } from 'date-fns';
import ts from '../modules/targetSetting';

const state = {
    targetPlanning: {
        periodObj: {
            id: 0,
            userId: 1,
            targetId: 0,
            nper: 1, // 期数
            availableTime: 30, // 可用时间
            priority: "3", // 优先级
            childTargets: "", // 子目标
            totalTime: 0, // 总用时
            deadline: null, // 截止时间
            deadlineType: "2", // 截止时间类型 1: 每一天, 2: 工作日, 3: 节假日
            done: "0", // 0: 未完成, 1: 已完成
            status: 1,
            createTime: new Date(),
            updateTime: new Date()
        },
        periods: [],
        periodsIndex: -1,
        doneStatus: "0", // 0: 未完成, 1: 已完成
        childTargetsOfTheme: [], // 主题下所有的 childTarget
        chooseChildTargetKeys: [], // 已挑选的 childTarget 的 key
        themeName: "",
        targetName: "", // 目标名称
        planCategory: "1", // 首次进入到目标制定页面, 需要用到这个参数, 用于查询正在执行的 target, theme
        showChooseChildTargetModal: false, // 时候显示设置 childTargets 页面 modal
        addPeriodBtnStatus: true, // 添加周期对象btn
        updatePeriodBtnStatus: false, // 更新周期对象btn
        childTargetTable: [], // 子目标 table 数据结构
        childTargetColumns: [{ // 子目标 columns
                title: 'ChildTarget',
                key: 'childTarget'
            },
            {
                title: 'ConsumeTime',
                key: 'consumeTime',
                render: (h, params) => {
                    return h('Input', {
                        props: {
                            value: actions.getConsumeTimeValue(params),
                            size: "default",
                            clearable: true,
                        },
                        on: {
                            'on-blur': (event) => {
                                actions.inputConsumeTime(params, event.target.value)
                            }
                        },
                    });
                }
            }
        ],
    }
};

const getters = {
    targetPlanning(state) {
        return state.targetPlanning;
    }
};

const actions = {
    addPeriod({ state, commit }, param) {
        let thisObj = param.thisObj;
        let tp = state.targetPlanning;
        tp.periodObj.childTargets = JSON.stringify(tp.childTargetTable);
        tp.periodObj.createTime = new Date();
        axios({
            url: types.TEST_ENV + "/api/periods",
            method: "post",
            data: tp.periodObj
        }).then(resp => {
            if (resp.data.code === 1) {
                thisObj.$Message.success("period add success!");
                // commit(types.ADDPERIOD, resp.data.data);
                this.getPeriods({ commit });
                commit(types.RESETTARGET);
            } else {
                thisObj.$Message.error("period add failure!");
            }
        }).catch(error => {
            console.log(error.message);
            thisObj.$Message.error("period add failure!");
        })
    },
    getConsumeTimeValue(param) {
        let tp = state.targetPlanning;
        return tp.childTargetTable[param.row._index].consumeTime;
    },
    inputConsumeTime(param, value) {
        let tp = state.targetPlanning;
        tp.childTargetTable[param.row._index].consumeTime = value;
    },
    // selectMenuItem({ commit }, param) {
    //     commit(types.SELECTMENUITEM, param.name);
    // }
    resetPeriod({ commit }) {
        commit(types.RESETPERIOD);
    },
    getPeriods({ commit }) {
        console.log("getPeriods: ");
        axios({
            url: types.TEST_ENV + "/api/periods",
            method: "get"
        }).then(resp => {
            if (resp.data.code === 1) {
                console.log("get periods success!");
                commit(types.GETPERIODS, resp.data.data);
            } else {
                console.log("get periods failure!");
            }
        }).catch(error => {
            console.log(error.message);
        })
    },
    assignPeriod({ commit }) {
        commit(types.ASSIGNPERIOD);
    },
    deletePeriod({ state, commit }, param) {
        let thisObj = param.thisObj;
        let tp = state.targetPlanning;
        let id = tp.periods[tp.periodsIndex].id;
        // tp.periodObj.childTargets = JSON.stringify(tp.childTargetTable);
        axios({
            url: types.TEST_ENV + "/api/periods/" + id,
            method: "delete"
        }).then(resp => {
            if (resp.data.code === 1) {
                thisObj.$Message.success("period delete success!");
                console.log("period delete success!");
                commit(types.DELETEPERIOD);
            } else {
                thisObj.$Message.error("period delete failure!");
            }
        }).catch(error => {
            console.log(error);
            thisObj.$Message.error("period delete failure!");
        })
    },
    updatePeriod({ state, commit }, param) {
        let thisObj = param.thisObj;
        let tp = state.targetPlanning;
        tp.periodObj.childTargets = JSON.stringify(tp.childTargetTable);
        tp.periodObj.updateTime = new Date();
        axios({
            url: types.TEST_ENV + "/api/targets",
            method: "put",
            data: tp.periodObj
        }).then(resp => {
            if (resp.data.code === 1) {
                thisObj.$Message.success("period update success!");
                console.log("period update success!");
                // commit(types.UPDATETARGET);
                this.getPeriods({ commit });
                commit(types.RESETTARGET);
            } else {
                thisObj.$Message.error("period update failure!");
            }
        }).catch(error => {
            console.log(error);
            thisObj.$Message.error("period update failure!");
        })
    },
    getMaxNperByTargetId({ state, commit }) {
        console.log("getMaxNperByTargetId: ");
        let targetId = state.targetPlanning.periodObj.targetId
        axios({
            url: types.TEST_ENV + "/api/periods/maxNper",
            method: "get",
            params: {
                "targetId": targetId
            }
        }).then(resp => {
            if (resp.data.code === 1) {
                console.log("get max nper success!");
                commit(types.GETMAXNPERBYTARGETID, resp.data.data);
            } else {
                console.log("get max nper failure!");
            }
        }).catch(error => {
            console.log(error.message);
        })
    }
};

const mutations = {
    [types.GETMAXNPERBYTARGETID](state, data) {
        let tp = state.targetPlanning;
        tp.periodObj.nper = data + 1;
    },
    [types.DELETEPERIOD](state) {
        let tp = state.targetPlanning;
        tp.periods.splice(tp.periodsIndex, 1);
    },
    [types.ASSIGNPERIOD](state) {
        let tp = state.targetPlanning;
        let periodObj = tp.periodObj;
        let ele = tp.periods[tp.periodsIndex];
        periodObj.id = ele.id;
        periodObj.userId = ele.userId;
        periodObj.targetId = ele.targetId;
        periodObj.nper = ele.nper; // 期数
        periodObj.priority = ele.priority; // 优先级
        periodObj.childTargets = ele.childTargets; // 子目标
        periodObj.totalTime = ele.totalTime; // 总用时
        periodObj.deadline = toDate(ele.deadline); // 截止时间
        periodObj.deadlineType = ele.deadlineType; // 截止时间类型 1: 每一天, 2: 工作日, 3: 节假日
        periodObj.done = ele.done; // 0: 未完成, 1: 已完成
        periodObj.status = ele.status;
        periodObj.createTime = ele.createTime;
        periodObj.updateTime = ele.updateTime;
        tp.themeName = ele.targetId;
        tp.targetName = ele.target;
        tp.chooseChildTargetKeys = [];
        tp.childTargetTable = JSON.parse(ele.childTargets);
        tp.addPeriodBtnStatus = false; // 添加周期对象btn
        tp.updatePeriodBtnStatus = true;
        let tsObj = ts.state.targetSetting;
        tsObj.themesOfPlan.forEach(element => {
            if (element.value === ele.targetId && element.label === ele.theme) {
                let datas = [];
                let arr = JSON.parse(element.childTargets);
                for (let index = 0; index < arr.length; index++) {
                    let ele = arr[index];
                    let obj = {
                        "key": index,
                        "label": ele.childTarget
                    }
                    datas.push(obj);
                }
                tp.childTargetsOfTheme = datas;
            }
        });
        tp.childTargetTable.forEach(ele => {
            tp.childTargetsOfTheme.forEach(obj => {
                if (ele.childTarget === obj.label) {
                    tp.chooseChildTargetKeys.push(obj.key);
                }
            });
        });
    },
    [types.GETPERIODS](state, data) {
        let tp = state.targetPlanning;
        tp.periods = [];
        tp.periods = data;
    },
    [types.RESETPERIOD](state) {
        let tp = state.targetPlanning;
        tp.childTargetTable = [];
        tp.addPeriodBtnStatus = true;
        tp.updatePeriodBtnStatus = false;
        tp.childTargetsOfTheme = []; // 主题下所有的 childTarget
        tp.chooseChildTargetKeys = []; // 已挑选的 childTarget 的 key
        tp.targetName = "";
        let tpObj = tp.periodObj;
        tpObj.id = 0;
        tpObj.targetId = 0;
        tpObj.availableTime = 30; // 可用时间
        tpObj.priority = "3"; // 优先级
        tpObj.childTargets = ""; // 子目标
        tpObj.totalTime = 0; // 总用时
        tpObj.deadline = null; // 截止时间
        tpObj.deadlineType = "2"; // 截止时间类型 1: 每一天, 2: 工作日, 3: 节假日
        tpObj.done = "0"; // 0: 未完成, 1: 已完成
    },
    [types.ADDPERIOD](state, data) {
        console.log("types.ADDPERIOD");
        // let tp = state.targetPlanning;
        // let periodObj = tp.periodObj;
        // let ele = {
        //     id: data,
        //     userId: periodObj.userId,
        //     targetId: periodObj.targetId,
        //     nper: periodObj.nper, // 期数
        //     availableTime: periodObj.availableTime, // 可用时间
        //     priority: periodObj.priority, // 优先级
        //     childTargets: periodObj.childTargets, // 子目标
        //     totalTime: periodObj.totalTime, // 总用时
        //     deadline: periodObj.deadline, // 截止时间
        //     deadlineType: periodObj.deadlineType, // 截止时间类型 1: 每一天, 2: 工作日, 3: 节假日
        //     done: periodObj.done, // 0: 未完成, 1: 已完成
        //     status: periodObj.status,
        //     createTime: periodObj.createTime,
        //     updateTime: periodObj.updateTime
        // };
        // tp.periods.push(ele);
    }
    // [types.SELECTMENUITEM](state, name) {
    //     let tabs = state.home.tabs;
    //     if (tabs.indexOf(name) === -1) {
    //         tabs.push(name);
    //     }
    //     state.home.tabName = name;
    // },
};

export default {
    state,
    getters,
    actions,
    mutations
};