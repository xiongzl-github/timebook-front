import types from "../types.js";
import axios from "axios";
import targetPlanObj from "./targetPlanning";

const state = {
    targetSetting: {
        targetSettingObj: {
            "id": 0,
            "userId": 1,
            "theme": "",
            "target": "",
            "childTargets": "",
            "plan": "",
            "icon": "",
            "status": 1,
            "createTime": new Date(),
            "updateTime": new Date(),
        },
        targetCategory: "1",
        addTargetBtnStatus: true,
        updateTargetBtnStatus: false,
        targetsIndex: -1,
        childTargetsIndex: -1,
        childTargets: [{ "childTarget": "" }],
        targets: [],
        themesOfPlan: [],
    }
};

const getters = {
    targetSetting(state) {
        return state.targetSetting;
    }
};

const actions = {
    addTarget({ state, commit }, param) {
        let thisObj = param.thisObj;
        let ts = state.targetSetting;
        ts.targetSettingObj.createTime = new Date();
        ts.targetSettingObj.childTargets = JSON.stringify(ts.childTargets);
        axios({
            url: types.TEST_ENV + "/api/targets",
            method: "post",
            data: ts.targetSettingObj
        }).then(resp => {
            if (resp.data.code === 1) {
                thisObj.$Message.success("target add success!");
                console.log("target add success!");
                commit(types.ADDTARGET, resp.data.data);
                // commit(types.RESETTARGET);
            } else {
                thisObj.$Message.error("target add failure!");
            }
        }).catch(error => {
            console.log(error);
            thisObj.$Message.error("target add failure!");
        })
    },
    addChildTarget({ commit }) {
        commit(types.ADDCHILDTARGET);
    },
    deleteChildTarget({ commit }) {
        commit(types.DELETECHILDTARGET);
    },
    getTargets({ commit }) {
        console.log("getTargets: ");
        axios({
            url: types.TEST_ENV + "/api/targets",
            method: "get"
        }).then(resp => {
            if (resp.data.code === 1) {
                console.log("get target success!");
                commit(types.GETTARGETS, resp.data.data);
            } else {
                console.log("get target failure!");
            }
        }).catch(error => {
            console.log(error.message);
        })
    },
    assignTarget({ commit }) {
        commit(types.ASSIGNTARGET);
    },
    updateTarget({ state, commit }, param) {
        let thisObj = param.thisObj;
        let ts = state.targetSetting;
        ts.targetSettingObj.childTargets = JSON.stringify(ts.childTargets);
        axios({
            url: types.TEST_ENV + "/api/targets",
            method: "put",
            data: ts.targetSettingObj
        }).then(resp => {
            if (resp.data.code === 1) {
                thisObj.$Message.success("target update success!");
                console.log("target update success!");
                commit(types.UPDATETARGET);
                commit(types.RESETTARGET);
            } else {
                thisObj.$Message.error("target update failure!");
            }
        }).catch(error => {
            console.log(error);
            thisObj.$Message.error("target update failure!");
        })
    },
    resetTarget({ commit }) {
        commit(types.RESETTARGET);
    },
    deleteTarget({ state, commit }, param) {
        let thisObj = param.thisObj;
        let ts = state.targetSetting;
        let id = ts.targets[ts.targetsIndex].id;
        ts.targetSettingObj.childTargets = JSON.stringify(ts.childTargets);
        axios({
            url: types.TEST_ENV + "/api/targets/" + id,
            method: "delete"
        }).then(resp => {
            if (resp.data.code === 1) {
                thisObj.$Message.success("target delete success!");
                console.log("target delete success!");
                commit(types.DELETETARGET);
            } else {
                thisObj.$Message.error("target delete failure!");
            }
        }).catch(error => {
            console.log(error);
            thisObj.$Message.error("target delete failure!");
        })
    },
    getThemesByPlan({ commit }) {
        console.log("getThemesByPlan: ");
        axios({
            url: types.TEST_ENV + "/api/targets/plan",
            method: "get",
            params: { "plan": targetPlanObj.state.targetPlanning.planCategory }
        }).then(resp => {
            if (resp.data.code === 1) {
                console.log("get theme by plan success!");
                commit(types.GETTHEMESBYPLAN, resp.data.data);
            } else {
                console.log("get theme by plan failure!");
            }
        }).catch(error => {
            console.log(error.message);
        })
    }


};

const mutations = {
    [types.GETTHEMESBYPLAN](state, data) {
        let ts = state.targetSetting;
        ts.themesOfPlan = [];
        ts.themesOfPlan = data;
    },
    [types.DELETETARGET](state) {
        let ts = state.targetSetting;
        ts.targets.splice(ts.targetsIndex, 1);
    },
    [types.RESETTARGET](state) {
        let ts = state.targetSetting;
        let tsObj = ts.targetSettingObj;
        tsObj.id = 0;
        tsObj.theme = "";
        tsObj.target = "";
        tsObj.plan = "";
        tsObj.icon = "";
        ts.childTargets = [{ "childTarget": "" }];
        ts.addTargetBtnStatus = true;
        ts.updateTargetBtnStatus = false;
    },
    [types.UPDATETARGET](state) {
        let ts = state.targetSetting;
        let ele = ts.targets[ts.targetsIndex];
        let tsObj = ts.targetSettingObj;
        ele.theme = tsObj.theme;
        ele.target = tsObj.target;
        ele.plan = tsObj.plan;
        ele.icon = tsObj.icon;
        ele.childTargets = JSON.stringify(ts.childTargets);
    },
    [types.ASSIGNTARGET](state) {
        let ts = state.targetSetting;
        let ele = ts.targets[ts.targetsIndex];
        let tsObj = ts.targetSettingObj;
        tsObj.id = ele.id;
        tsObj.theme = ele.theme;
        tsObj.target = ele.target;
        tsObj.plan = ele.plan;
        tsObj.icon = ele.icon;
        ts.childTargets = JSON.parse(ele.childTargets);
        ts.addTargetBtnStatus = false;
        ts.updateTargetBtnStatus = true;
    },
    [types.GETTARGETS](state, data) {
        let ts = state.targetSetting;
        ts.targets = [];
        ts.targets = data;
    },
    [types.DELETECHILDTARGET]() {
        let ts = state.targetSetting;
        ts.childTargets.splice(ts.childTargetsIndex, 1);
    },
    [types.ADDCHILDTARGET](state) {
        let ts = state.targetSetting;
        ts.childTargets.push({ "childTarget": "" });
    },
    [types.ADDTARGET](state, data) {
        let ts = state.targetSetting;
        let ele = {
            "id": data,
            "userId": ts.targetSettingObj.userId,
            "theme": ts.targetSettingObj.theme,
            "target": ts.targetSettingObj.target,
            "childTargets": JSON.stringify(ts.childTargets),
            "plan": ts.targetSettingObj.plan,
            "icon": ts.targetSettingObj.icon,
            "status": ts.targetSettingObj.status,
            "createTime": ts.targetSettingObj.createTime,
            "updateTime": ts.targetSettingObj.updateTime,
        };
        ts.targets.push(ele);
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};