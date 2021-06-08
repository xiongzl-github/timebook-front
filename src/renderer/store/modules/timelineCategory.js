import types from "../types.js";
import axios from "axios";
// import moduleObj from "@/store/modules/module";

const state = {
    timelineCategory: {
        id: 0,
        timelineCategories: [],
        initValue: 0,
        timelineCategoriesIndex: 0,
        operType: 1, // 1, 添加操作, 2, 更新操作
        consumeCategoryModel: {
            "timelineCategory": "",
            "consumeCategory": "",  // 消费类别
            "consumeCategoryIcon": "",
            "consumeAmount": 0     // 消费金额 
        },
        noteCategoryModel: {
            "timelineCategory": "",
            "mainContent": "",
        },
        diaryCategoryModel: {
            "timelineCategory": "",
            "diary": ""
        },
        attachCategoryModel: {
            "timelineCategory": "",
            "files":[]
        },
        timelineCategoryObj: {
            id: 0,
            userId: 1,
            categoryName: "",
            componentType: 1,
            intro: "", 
            status: 1,
            createTime: new Date(),
            updateTime: null
        },
        oriTimelineCategoryObj: {
            id: 0,
            userId: 1,
            categoryName: "",
            componentType: 1,
            intro: "", 
            status: 1,
            createTime: new Date(),
            updateTime: null
        }
    },
};

const getters = {
    timelineCategory(state) {
        return state.timelineCategory;
    },
};

const actions = {
    async getTimelineCategories({ commit, state }, param) {
        let timelineCategory = state.timelineCategory;
        let userId = timelineCategory.timelineCategoryObj.userId;
        await axios({
            url: types.TEST_ENV + "/api/timelineCategories/list",
            method: "get",
            params: {
                "userId": userId,
                "status": 1
            }
        }).then(resp => {
            commit(types.GETTIMELINECATEGORIES, resp.data.data);
        }).catch(error => {
            console.log(error);
        })
    },
    resetTimelineCategory({ commit, state }) {
        commit(types.RESETTIMELINECATEGORY);
    },
    addTimelineCategory({ commit, state }, param) {
        let thisObj = param.thisObj;
        let timelineCategory = state.timelineCategory;
        let timelineCategoryObj = timelineCategory.timelineCategoryObj;
        axios({
            url: types.TEST_ENV + "/api/timelineCategories",
            method: "post",
            data: timelineCategoryObj
        }).then(resp => {
            commit(types.ADDTIMELINECATEGORY, resp.data.data);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
    deleteTimelineCategory({ commit, state }, param) {
        let thisObj = param.thisObj;
        let timelineCategory = state.timelineCategory;
        let id = timelineCategory.timelineCategories[timelineCategory.timelineCategoriesIndex].id;
        axios({
            url: types.TEST_ENV + "/api/timelineCategories",
            method: "delete",
            params: {
                "id": id
            }
        }).then(resp => {
            commit(types.DELETETIMELINECATEGORY);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
    async updateTimelineCategory({ commit, state }, param) {
        let thisObj = param.thisObj;
        let timelineCategory = state.timelineCategory;
        let timelineCategoryObj = timelineCategory.timelineCategoryObj;
        await axios({
            url: types.TEST_ENV + "/api/timelineCategories",
            method: "put",
            data: timelineCategoryObj
        }).then(resp => {
            commit(types.UPDATETIMELINECATEGORY);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
};

const mutations = {
    [types.UPDATETIMELINECATEGORY](state) {
        let timelineCategory = state.timelineCategory;
        let tempTimelineCategoryObj = JSON.parse(JSON.stringify(timelineCategory.timelineCategoryObj));
        timelineCategory.timelineCategories[timelineCategory.timelineCategoriesIndex] = tempTimelineCategoryObj;
    },
    [types.DELETETIMELINECATEGORY](state) {
        let timelineCategory = state.timelineCategory;
        timelineCategory.timelineCategories.splice(timelineCategory.timelineCategoriesIndex, 1);
    },
    [types.ADDTIMELINECATEGORY](state, data) {
        let timelineCategory = state.timelineCategory;
        timelineCategory.timelineCategoryObj.id = data;
        let tempTimelineCategoryObj = JSON.parse(JSON.stringify(timelineCategory.timelineCategoryObj));
        timelineCategory.timelineCategories.push(tempTimelineCategoryObj);
    },
    [types.GETTIMELINECATEGORIES](state, data) {
        let timelineCategory = state.timelineCategory;
        timelineCategory.timelineCategories = [];
        timelineCategory.timelineCategories = data;
    },
    [types.RESETTIMELINECATEGORY](state) {
        let timelineCategory = state.timelineCategory;
        let tempTimelineCategoryObj = JSON.parse(JSON.stringify(timelineCategory.oriTimelineCategoryObj));
        timelineCategory.timelineCategoryObj = tempTimelineCategoryObj;
        timelineCategory.operType = 1;
    },

};

export default {
    state,
    getters,
    actions,
    mutations
};