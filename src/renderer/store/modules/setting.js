import types from "../types.js";
import axios from "axios";
import { format, toDate, parseISO } from 'date-fns';

let formatStr = "yyyy-MM-dd HH:mm:SS";
// import moduleObj from "@/store/modules/module";

const state = {
    setting: {
        settingObj: {
            id: 0,
            userId: 1,
            timelineRemindDuration: 50,
            createTime: new Date(),
            updateTime: null
        }
    },
};

const getters = {
    setting(state) {
        return state.setting;
    },
};

const actions = {
    addSetting({ commit, state }, param) {
        let setting = state.setting;
        let settingObj = setting.settingObj;
        settingObj.createTime = format(new Date(), formatStr);
        let thisObj = param.thisObj;
        axios({
            url: types.TEST_ENV + "/api/settings",
            method: "post",
            data: settingObj
        }).then(resp => {
            commit(types.ADDSETTING, resp.data.data);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
    updateSetting({ commit, state }, param) {
        let setting = state.setting;
        let settingObj = setting.settingObj;
        let thisObj = param.thisObj;
        axios({
            url: types.TEST_ENV + "/api/settings",
            method: "put",
            data: settingObj
        }).then(resp => {
            // commit(types.UPDATESETTING);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
    async getSetting({ commit, state }) {
        let setting = state.setting;
        let userId = setting.settingObj.userId;
        await axios({
            url: types.TEST_ENV + "/api/settings",
            method: "get",
            params: {
                "userId": userId
            }
        }).then(resp => {
            commit(types.GETSETTING, resp.data.data);
        }).catch(error => {
            console.log(error);
        })
    }

};

const mutations = {
    [types.GETSETTING](state, data) {
        let setting = state.setting;
        setting.settingObj = null;
        setting.settingObj = data;
    },
    [types.ADDSETTING](state, data) {
        let setting = state.setting;
        setting.settingObj.id = data;
    },

};

export default {
    state,
    getters,
    actions,
    mutations
};