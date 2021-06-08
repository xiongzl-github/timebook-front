import types from "../types.js";
import axios from "axios";
// import moduleObj from "@/store/modules/module";

const state = {
    motto: {
        id: 0,
        mottos: [],
        initValue: 0,
        mottosIndex: 0,
        modalTitle: "编辑座右铭",
        showMottoModal: false,
        operType: 2, // 1, 添加操作, 2, 更新操作
        mottoObj: {
            id: 0,
            userId: 1,
            motto: "",
            author: "",
            display: 0,
            status: 1,
            createTime: new Date(),
            updateTime: new Date()
        },
        oriMottoObj: {
            id: 0,
            userId: 1,
            motto: "",
            author: "",
            display: 0,
            status: 1,
            createTime: new Date(),
            updateTime: new Date()
        }
    },
};

const getters = {
    motto(state) {
        return state.motto;
    },
};

const actions = {
    async getMottos({ commit, state }) {
        let motto = state.motto;
        let userId = motto.mottoObj.userId;
        await axios({
            url: types.TEST_ENV + "/api/mottos/userId",
            method: "get",
            params: {
                "userId": userId
            }
        }).then(resp => {
            commit(types.GETMOTTOS, resp.data.data);
        }).catch(error => {
            console.log(error);
        })
    },
    resetMotto({ commit, state }) {
        commit(types.RESETMOTTO);
    },
    addMotto({ commit, state }, param) {
        let thisObj = param.thisObj;
        let motto = state.motto;
        let mottoObj = motto.mottoObj;
        axios({
            url: types.TEST_ENV + "/api/mottos",
            method: "post",
            data: mottoObj
        }).then(resp => {
            console.log(resp);
            commit(types.ADDMOTTO, resp.data.data);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
    deleteMotto({ commit, state }, param) {
        let thisObj = param.thisObj;
        let motto = state.motto;
        let id = motto.mottos[motto.mottosIndex].id;
        axios({
            url: types.TEST_ENV + "/api/mottos",
            method: "delete",
            params: {
                "id": id
            }
        }).then(resp => {
            commit(types.DELETEMOTTO);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
    updateMotto({ commit, state }, param) {
        let thisObj = param.thisObj;
        let motto = state.motto;
        let mottoObj = motto.mottoObj;
        axios({
            url: types.TEST_ENV + "/api/mottos",
            method: "put",
            data: mottoObj
        }).then(resp => {
            commit(types.UPDATEMOTTO);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
};

const mutations = {
    [types.UPDATEMOTTO](state) {
        let motto = state.motto;
        let tempMottoObj = JSON.parse(JSON.stringify(motto.mottoObj));
        motto.mottos[motto.mottosIndex] = tempMottoObj;
    },
    [types.DELETEMOTTO](state) {
        let motto = state.motto;
        motto.mottos.splice(motto.mottosIndex, 1);
    },
    [types.ADDMOTTO](state, data) {
        let motto = state.motto;
        motto.mottoObj.id = data;
        motto.mottos.push(motto.mottoObj);
    },
    [types.GETMOTTOS](state, data) {
        let motto = state.motto;
        motto.mottos = [];
        motto.mottos = data;
    },
    [types.RESETMOTTO](state) {
        let motto = state.motto;
        let tempMottoObj = JSON.parse(JSON.stringify(motto.oriMottoObj));
        motto.mottoObj = tempMottoObj;
        motto.operType = 1;
    },

};

export default {
    state,
    getters,
    actions,
    mutations
};