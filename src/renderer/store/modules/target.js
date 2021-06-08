import types from "../types.js";
import axios from "axios";
import targetPeriodObj from "@/store/modules/targetPeriod";

const state = {
    target: {
        id: 0,
        targets: [],
        initValue: 0,
        targetsIndex: 0,
        childTargetsIndex: null,
        operType: 1, // 1, 添加操作, 2, 更新操作
        targetObj: {
            id: 0,
            userId: 1,
            parentId: 0,
            targetThemeId: null,
            targetName: "",
            status: 1,
            createTime: new Date(),
            updateTime: null
        },
        oriTargetObj: {
            id: 0,
            userId: 1,
            parentId: 0,
            targetThemeId: null,
            targetName: "",
            status: 1,
            createTime: new Date(),
            updateTime: null
        }
    },
};

const getters = {
    target(state) {
        return state.target;
    },
};

const actions = {
    async getTargets({ commit, state }) {
        let target = state.target;
        let targetPeriod = targetPeriodObj.state.targetPeriod;
        let params = {
            "userId": target.targetObj.userId,
            "status": target.targetObj.status,
            "targetThemeId": targetPeriod.targetPeriodObj.targetThemeId
        }
        await axios({
            url: types.TEST_ENV + "/api/targets/list",
            method: "get",
            params: params
        }).then(resp => {
            commit(types.GETTARGETS, resp.data.data);
        }).catch(error => {
            console.log(error);
        })
    },
    resetTarget({ commit, state }) {
        commit(types.RESETTARGET);
    },
    addTarget({ commit, state }, param) {
        let thisObj = param.thisObj;
        let target = state.target;
        let targetPeriod = targetPeriodObj.state.targetPeriod;
        let targetObj = target.targetObj;
        targetObj.createTime = new Date();
        targetObj.targetThemeId = targetPeriod.targetPeriodObj.targetThemeId;
        if(targetObj.parentId == undefined || targetObj.parentId == null){
            targetObj.parentId = 0;
        }
        axios({
            url: types.TEST_ENV + "/api/targets",
            method: "post",
            data: targetObj
        }).then(resp => {
            commit(types.ADDTARGET, resp.data.data);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
    deleteTarget({ commit, state }, param) {
        let thisObj = param.thisObj;
        let target = state.target;
        let id = 0;
        if(target.childTargetsIndex == null){
            // 父节点
            id = target.targets[target.targetsIndex].id;
        } else {
            // 子节点
            id = target.targets[target.targetsIndex].childTargets[target.childTargetsIndex].id;
        }
        axios({
            url: types.TEST_ENV + "/api/targets",
            method: "delete",
            params: {
                "id": id
            }
        }).then(resp => {
            commit(types.DELETETARGET);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
    async updateTarget({ commit, state }, param) {
        let thisObj = param.thisObj;
        let target = state.target;
        let targetObj = null;
        if(target.childTargetsIndex == null){
            // 父节点
            targetObj = target.targets[target.targetsIndex];
        } else {
            // 子节点
            targetObj = target.targets[target.targetsIndex].childTargets[target.childTargetsIndex];
        }
        await axios({
            url: types.TEST_ENV + "/api/targets",
            method: "put",
            data: targetObj
        }).then(resp => {
            commit(types.UPDATETARGET);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
};

const mutations = {
    [types.UPDATETARGET](state) {
        let target = state.target;
        let tempTargetObj = JSON.parse(JSON.stringify(target.targetObj));
        if(target.childTargetsIndex == null){
            // 父节点
            target.targets.splice(target.targetsIndex, 1);
            target.targets[target.targetsIndex] = tempTargetObj;
        } else {
            // 子节点
            target.targets[target.targetsIndex].childTargets[target.childTargetsIndex] = tempTargetObj;
        }
    },
    [types.DELETETARGET](state) {
        let target = state.target;
        if(target.childTargetsIndex == null){
            // 父节点
            target.targets.splice(target.targetsIndex, 1);
        } else {
            // 子节点
            target.targets[target.targetsIndex].childTargets.splice(target.childTargetsIndex, 1);
        }
    },
    [types.ADDTARGET](state, data) {
        let target = state.target;
        target.targetObj.id = data;
        let tempTargetObj = JSON.parse(JSON.stringify(target.targetObj));
        if(target.targetObj.parentId == 0) {
            // 为父节点
            tempTargetObj.childTargets = [];
            target.targets.push(tempTargetObj);
        } else {
            // 不为父节点
            target.targets.forEach(element => {
                if(element.id == target.targetObj.parentId){
                    element.childTargets.push(tempTargetObj);
                }
            });
        }
    },
    [types.GETTARGETS](state, data) {
        let target = state.target;
        target.targets = [];
        target.targets = data;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};