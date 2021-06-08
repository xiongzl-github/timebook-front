import types from "../types.js";
import axios from "axios";
import categoryObj from "@/store/modules/category";

const state = {
    targetPeriod: {
        id: 0,
        modalType: 1,
        targetPeriods: [],
        targetPeriodsIndex: 0,
        modalTitle: "添加目标",
        showTargetPeriodModal: false,
        operType: 1, // 1, 添加操作, 2, 更新操作
        condition: {
            userId: 1,
            display: null,
            status: 1
        },
        todolistCascaderOfTargetPeriods: [],
        targetPeriodObj: {
            id: 0,
            userId: 1,
            targetThemeId: null,
            targetPeriodName: "",
            periodNum: 1,
            availableTime: 30,
            priority: 1,
            chosenTargets: [],
            deadline: null,
            deadlineType: 1,
            targetPlan: 1,
            targetCycle: 1,
            completed: 0,
            display: true,
            expectTargetPeriod: null,
            status: 1,
            createTime: new Date(),
            updateTime: null
        },
        oriTargetPeriodObj: {
            id: 0,
            userId: 1,
            targetThemeId: null,
            targetPeriodName: "",
            periodNum: 1,
            availableTime: 30,
            priority: 1,
            chosenTargets: [],
            deadline: null,
            deadlineType: 1,
            targetPlan: 1,
            targetCycle: 1,
            completed: 0,
            display: true,
            expectTargetPeriod: null,
            status: 1,
            createTime: new Date(),
            updateTime: null
        }
    },
};

const getters = {
    targetPeriod(state) {
        return state.targetPeriod;
    },
};

const actions = {
    addTargetPeriod({ commit, state }, param) {
        let targetPeriod = state.targetPeriod;
        let targetPeriodObj = targetPeriod.targetPeriodObj;
        let thisObj = param.thisObj;
        targetPeriodObj.createTime = new Date();
        axios({
            url: types.TEST_ENV + "/api/targetPeriods",
            method: "post",
            data: targetPeriodObj
        }).then(resp => {
            commit(types.ADDTARGETPERIOD, resp.data.data);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
    updateTargetPeriod({ commit, state }, param) {
        let targetPeriod = state.targetPeriod;
        let targetPeriodObj = targetPeriod.targetPeriodObj;
        let thisObj = param.thisObj;
        axios({
            url: types.TEST_ENV + "/api/targetPeriods",
            method: "put",
            data: targetPeriodObj
        }).then(resp => {
            commit(types.UPDATETARGETPERIOD);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
    deleteTargetPeriod({ commit, state }, param) {
        let targetPeriod = state.targetPeriod;
        let targetPeriodObj = targetPeriod.targetPeriods[targetPeriod.targetPeriodsIndex];
        let thisObj = param.thisObj;
        axios({
            url: types.TEST_ENV + "/api/targetPeriods",
            method: "delete",
            params: {
                "id": targetPeriodObj.id
            }
        }).then(resp => {
            commit(types.DELETETARGETPERIOD);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
    async getTargetPeriods({ commit, state }) {
        let targetPeriod = state.targetPeriod;
        targetPeriod.condition.userId = targetPeriod.targetPeriodObj.userId;
        await axios({
            url: types.TEST_ENV + "/api/targetPeriods/list",
            method: "get",
            params: targetPeriod.condition
        }).then(resp => {
            commit(types.GETTARGETPERIODS, resp.data.data);
        }).catch(error => {
            console.log(error);
        })
    },
    async getTargetPeriodsOfTodolistCascader({ commit, state }) {
        let targetPeriod = state.targetPeriod;
        let condition = {
            "userId": targetPeriod.targetPeriodObj.userId,
            "status": 1,
            "completed": 0
        }
        await axios({
            url: types.TEST_ENV + "/api/targetPeriods/todolist/cascader",
            method: "get",
            params: condition
        }).then(resp => {
            commit(types.GETTARGETPERIODSOFTODOLISTCASCADER, resp.data.data);
        }).catch(error => {
            console.log(error);
        })
    },

};

const mutations = {
    [types.GETTARGETPERIODSOFTODOLISTCASCADER](state, data) {
        let targetPeriod = state.targetPeriod;
        targetPeriod.todolistCascaderOfTargetPeriods = [];
        targetPeriod.todolistCascaderOfTargetPeriods = data;
    },
    [types.GETTARGETPERIODS](state, data) {
        let targetPeriod = state.targetPeriod;
        targetPeriod.targetPeriods = [];
        targetPeriod.targetPeriods = data;
    },
    [types.DELETETARGETPERIOD](state) {
        let targetPeriod = state.targetPeriod;
        targetPeriod.targetPeriods.splice(targetPeriod.targetPeriodsIndex, 1);
    },
    [types.ADDTARGETPERIOD](state, data) {
        let targetPeriod = state.targetPeriod;
        targetPeriod.targetPeriodObj.id = data;
        let tempObj = JSON.parse(JSON.stringify(targetPeriod.targetPeriodObj));
        let category = categoryObj.state.category;
        let categories = category.categories;
        categories.forEach(element => {
            if (element.id == tempObj.targetThemeId) {
                tempObj.icon = element.icon;
                tempObj.iconType = element.iconType;
            }
        });
        targetPeriod.targetPeriods.push(tempObj);
    },
    [types.UPDATETARGETPERIOD](state) {
        let targetPeriod = state.targetPeriod;
        let tempObj = JSON.parse(JSON.stringify(targetPeriod.targetPeriodObj));
        let category = categoryObj.state.category;
        let categories = category.categories;
        categories.forEach(element => {
            if (element.id == tempObj.targetThemeId) {
                tempObj.icon = element.icon;
                tempObj.iconType = element.iconType;
            }
        });
        targetPeriod.targetPeriods[targetPeriod.targetPeriodsIndex] = tempObj;
    },

};

export default {
    state,
    getters,
    actions,
    mutations
};