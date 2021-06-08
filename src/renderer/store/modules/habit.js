import types from "../types.js";
import axios from "axios";
import { format } from 'date-fns';
import categoryObj from "@/store/modules/category";

let formatStr = "yyyy-MM-dd";

const state = {
    habit: {
        id: 0,
        habits: [],
        habitsIndex: 0,
        modalTitle: "添加习惯",
        showHabitModal: false,
        operType: 1, // 1. 添加操作, 2. 更新操作
        modalType: 1, // 1. habit modal, todolist moadal , 2. category modal
        time: new Date(),
        habitsOfCategory: [],
        condition: {
            userId: 0,
            display: null,
            handle: 0, // 1. 已处理, 0. 未处理
            handleTime: null,
            status: 1
        },
        habitObj: {
            id: 0,
            userId: 1,
            categoryId: 1,
            habit: "",
            cycle: 2,
            frequency: 1,
            refreshRate: 1,
            expectAchievingRate: 80,
            comparator: 1,
            keyHabit: 1,
            display: true,
            apply: 1,
            stopUseTime: "",
            status: 1,
            createTime: new Date(),
            updateTime: new Date()
        },
        oriHabitObj: {
            id: 0,
            userId: 1,
            categoryId: 1,
            habit: "",
            cycle: 2,
            frequency: 1,
            refreshRate: 1,
            expectAchievingRate: 80,
            comparator: 1,
            keyHabit: 1,
            display: true,
            apply: 1,
            stopUseTime: "",
            status: 1,
            createTime: new Date(),
            updateTime: new Date()
        }
    },
};

const getters = {
    habit(state) {
        return state.habit;
    },
};

const actions = {
    async getHabitList({ commit, state }) {
        let habit = state.habit;
        let userId = habit.habitObj.userId;
        await axios({
            url: types.TEST_ENV + "/api/habits/list",
            method: "get",
            params: {
                "userId": userId,
                "time": format(habit.time, formatStr)
            }
        }).then(resp => {
            commit(types.GETHABITLIST, resp.data.data);
        }).catch(error => {
            console.log(error);
        })
    },
    async addHabit({ commit, state }, param) {
        let habit = state.habit;
        let habitObj = habit.habitObj;
        let thisObj = param.thisObj;
        habitObj.createTime = new Date();
        await axios({
            url: types.TEST_ENV + "/api/habits",
            method: "post",
            data: habitObj
        }).then(resp => {
            commit(types.ADDHABIT, resp.data.data);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
    updateHabit({ commit, state }, param) {
        let habit = state.habit;
        let habitObj = habit.habitObj;
        let thisObj = param.thisObj;
        axios({
            url: types.TEST_ENV + "/api/habits",
            method: "put",
            data: habitObj
        }).then(resp => {
            commit(types.UPDATEHABIT);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
    deleteHabit({ commit, state }, param) {
        let habit = state.habit;
        let id = habit.habits[habit.habitsIndex].id;
        let thisObj = param.thisObj;
        axios({
            url: types.TEST_ENV + "/api/habits/" + id,
            method: "delete"
        }).then(resp => {
            commit(types.DELETEHABIT);
            thisObj.$Message.success('Delete Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Delete Failure!');
        })
    },
    async addHabitReport({ commit, state }) {
        let habit = state.habit;
        let habitReportObj = {
            "habitId": habit.habits[habit.habitsIndex].id,
            "habitResult": 1,
            "habitTime": habit.time
        }
        await axios({
            url: types.TEST_ENV + "/api/habitReports",
            method: "post",
            data: habitReportObj
        }).then(resp => {
            commit(types.ADDHABITREPORT, resp.data.data);
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
    async updateHabitReport({ commit, state }) {
        let habit = state.habit;
        let habitObj = habit.habits[habit.habitsIndex];
        let habitResult = 1;
        if (habitObj.habitResult == 1) {
            habitResult = 0;
        } else {
            habitResult = 1;
        }
        let habitReportObj = {
            "habitId": habit.habits[habit.habitsIndex].id,
            "habitResult": habitResult,
            "habitTime": habit.time,
            "id": habitObj.habitReportId
        }
        await axios({
            url: types.TEST_ENV + "/api/habitReports",
            method: "put",
            params: habitReportObj
        }).then(resp => {
            commit(types.UPDATEHABITREPORT, habitResult);
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    }

};

const mutations = {
    [types.GETHABITLIST](state, data) {
        let habit = state.habit;
        habit.habits = [];
        habit.habits = data;
    },
    [types.DELETEHABIT](state) {
        let habit = state.habit;
        habit.habits.splice(habit.habitsIndex, 1);
    },
    [types.ADDHABIT](state, data) {
        let habit = state.habit;
        habit.habitObj.id = data;
        let tempObj = JSON.parse(JSON.stringify(habit.habitObj));
        let category = categoryObj.state.category;
        let categories = category.categories;
        categories.forEach(element => {
            if (element.id == tempObj.categoryId) {
                tempObj.categoryName = element.categoryName;
                tempObj.icon = element.icon;
                tempObj.iconType = element.iconType;
            }
        });
        tempObj.habitReportId = 0;
        tempObj.habitResult = null;
        habit.habits.push(tempObj);
    },
    [types.ADDHABITREPORT](state, data) {
        let habit = state.habit;
        let habitObj = habit.habits[habit.habitsIndex];
        habitObj.habitResult = 1;
        habitObj.habitReportId = data;
    },
    [types.UPDATEHABITREPORT](state, data) {
        let habit = state.habit;
        let habitObj = habit.habits[habit.habitsIndex];
        habitObj.habitResult = data;
    },
    [types.UPDATEHABIT](state) {
        let habit = state.habit;
        let tempObj = JSON.parse(JSON.stringify(habit.habitObj));
        let category = categoryObj.state.category;
        let categories = category.categories;
        categories.forEach(element => {
            if (element.id == tempObj.categoryId) {
                tempObj.categoryName = element.categoryName;
                tempObj.icon = element.icon;
                tempObj.iconType = element.iconType;
            }
        });
        habit.habits[habit.habitsIndex] = tempObj;
    },

};

export default {
    state,
    getters,
    actions,
    mutations
};