import types from "../types.js";
import axios from "axios";
import { format, toDate, parseISO } from 'date-fns';

let formatStr = "yyyy-MM-dd HH:mm:SS";
// import moduleObj from "@/store/modules/module";

const state = {
    inbox: {
        id: 0,
        inboxs: [],
        inboxsIndex: 0,
        modalTitle: "添加目标",
        showInboxModal: false,
        operType: 1, // 1, 添加操作, 2, 更新操作
        handleTime: null,
        condition: {
            userId: 0,
            display: null,
            handle: 0, // 1. 已处理, 0. 未处理
            handleTime: null,
            status: 1
        },
        inboxObj: {
            id: 0,
            userId: 1,
            remark: "",
            display: true,
            handle: 0,
            handleTime: null,
            status: 1,
            createTime: "",
            updateTime: ""
        },
        oriInboxObj: {
            id: 0,
            userId: 1,
            remark: "",
            display: true,
            handle: 0,
            handleTime: null,
            status: 1,
            createTime: "",
            updateTime: ""
        }
    },
};

const getters = {
    inbox(state) {
        return state.inbox;
    },
};

const actions = {
    addInbox({ commit, state }, param) {
        let inbox = state.inbox;
        let inboxObj = inbox.inboxObj;
        inboxObj.createTime = format(new Date(), formatStr);
        let thisObj = param.thisObj;
        axios({
            url: types.TEST_ENV + "/api/inboxs",
            method: "post",
            data: inboxObj
        }).then(resp => {
            commit(types.ADDINBOX, resp.data.data);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
    updateInbox({ commit, state }, param) {
        let inbox = state.inbox;
        let inboxObj = inbox.inboxObj;
        let thisObj = param.thisObj;
        axios({
            url: types.TEST_ENV + "/api/inboxs",
            method: "put",
            data: inboxObj
        }).then(resp => {
            commit(types.UPDATEINBOX);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
    deleteInbox({ commit, state }, param) {
        let inbox = state.inbox;
        let id = inbox.inboxs[inbox.inboxsIndex].id;
        let thisObj = param.thisObj;
        axios({
            url: types.TEST_ENV + "/api/inboxs/" + id,
            method: "delete"
        }).then(resp => {
            commit(types.DELETEPAGE);
            thisObj.$Message.success('Delete Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Delete Failure!');
        })
    },
    async getInboxs({ commit, state }) {
        let inbox = state.inbox;
        let formatStr = "yyyy-MM-dd";
        inbox.condition.userId = inbox.inboxObj.userId;
        if(inbox.handleTime != null && inbox.handleTime != "" && inbox.handleTime != undefined){
            inbox.condition.handleTime = format(inbox.handleTime, formatStr);
        } else {
            inbox.condition.handleTime = null;
        }
        await axios({
            url: types.TEST_ENV + "/api/inboxs/list",
            method: "get",
            params: inbox.condition
        }).then(resp => {
            commit(types.GETINBOXS, resp.data.data);
        }).catch(error => {
            console.log(error);
        })
    },
    handleInbox({ commit, state }) {
        let inbox = state.inbox;
        let formatStr = "yyyy-MM-dd";
        let inboxObj = inbox.inboxs[inbox.inboxsIndex];
        if(inboxObj.handle == 0) {
            inboxObj.handle = 1;
            inboxObj.handleTime = format(new Date(), formatStr);
        } else {
            inboxObj.handle = 0;
            inboxObj.handleTime = null;
        }
        axios({
            url: types.TEST_ENV + "/api/inboxs/handle",
            method: "put",
            data: inboxObj
        }).then(resp => {
            // commit(types.HANDLEINBOX);
        }).catch(error => {
            console.log(error)
        })
    },

};

const mutations = {
    [types.GETINBOXS](state, data) {
        let inbox = state.inbox;
        inbox.inboxs = [];
        inbox.inboxs = data;
    },
    [types.ADDINBOX](state, data) {
        let inbox = state.inbox;
        inbox.inboxObj.id = data;
        let tempObj = JSON.parse(JSON.stringify(inbox.inboxObj));
        inbox.inboxs.push(tempObj);
        let oriInboxObj = JSON.parse(JSON.stringify(inbox.oriInboxObj));
        inbox.inboxObj = oriInboxObj;
    },
    [types.UPDATEINBOX](state) {
        let inbox = state.inbox;
        let tempObj = JSON.parse(JSON.stringify(inbox.inboxObj));
        inbox.inboxs[inbox.inboxsIndex] = tempObj;
    },

};

export default {
    state,
    getters,
    actions,
    mutations
};