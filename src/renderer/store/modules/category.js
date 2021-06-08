import types from "../types.js";
import axios from "axios";
// import moduleObj from "@/store/modules/module";

const state = {
    category: {
        id: 0,
        categories: [],
        initValue: 0,
        categoriesIndex: 0,
        operType: 1, // 1, 添加操作, 2, 更新操作
        categoryObj: {
            id: 0,
            userId: 1,
            categoryName: "",
            icon: "",
            type: 1,
            iconType: 1, // 1. iview, 2. iconfont
            status: 1,
            createTime: new Date(),
            updateTime: new Date()
        },
        oriCategoryObj: {
            id: 0,
            userId: 1,
            categoryName: "",
            icon: "",
            type: 1,
            iconType: 1, // 1. iview, 2. iconfont
            status: 1,
            createTime: new Date(),
            updateTime: new Date()
        }
    },
};

const getters = {
    category(state) {
        return state.category;
    },
};

const actions = {
    async getCategories({ commit, state }, param) {
        let category = state.category;
        let userId = category.categoryObj.userId;
        let type = param.categoryType;
        await axios({
            url: types.TEST_ENV + "/api/categories/userId",
            method: "get",
            params: {
                "userId": userId,
                "type": type
            }
        }).then(resp => {
            commit(types.GETCATEGORIES, resp.data.data);
        }).catch(error => {
            console.log(error);
        })
    },
    resetCategory({ commit, state }) {
        commit(types.RESETCATEGORY);
    },
    addCategory({ commit, state }, param) {
        let thisObj = param.thisObj;
        let category = state.category;
        let categoryObj = category.categoryObj;
        axios({
            url: types.TEST_ENV + "/api/categories",
            method: "post",
            data: categoryObj
        }).then(resp => {
            commit(types.ADDCATEGORY, resp.data.data);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
    deleteCategory({ commit, state }, param) {
        let thisObj = param.thisObj;
        let category = state.category;
        let id = category.categories[category.categoriesIndex].id;
        axios({
            url: types.TEST_ENV + "/api/categories",
            method: "delete",
            params: {
                "id": id
            }
        }).then(resp => {
            commit(types.DELETECATEGORY);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
    async updateCategory({ commit, state }, param) {
        let thisObj = param.thisObj;
        let category = state.category;
        let categoryObj = category.categoryObj;
        await axios({
            url: types.TEST_ENV + "/api/categories",
            method: "put",
            data: categoryObj
        }).then(resp => {
            commit(types.UPDATECATEGORY);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
};

const mutations = {
    [types.UPDATECATEGORY](state) {
        let category = state.category;
        let tempCategoryObj = JSON.parse(JSON.stringify(category.categoryObj));
        category.categories[category.categoriesIndex] = tempCategoryObj;
    },
    [types.DELETECATEGORY](state) {
        let category = state.category;
        category.categories.splice(category.categoriesIndex, 1);
    },
    [types.ADDCATEGORY](state, data) {
        let category = state.category;
        category.categoryObj.id = data;
        let tempCategoryObj = JSON.parse(JSON.stringify(category.categoryObj));
        category.categories.push(tempCategoryObj);
    },
    [types.GETCATEGORIES](state, data) {
        let category = state.category;
        category.categories = [];
        category.categories = data;
    },
    [types.RESETCATEGORY](state) {
        let category = state.category;
        let tempType = category.categoryObj.type;
        let tempCategoryObj = JSON.parse(JSON.stringify(category.oriCategoryObj));
        category.categoryObj = tempCategoryObj;
        category.operType = 1;
        category.categoryObj.type = tempType;
        console.log(category.categoryObj);
    },

};

export default {
    state,
    getters,
    actions,
    mutations
};