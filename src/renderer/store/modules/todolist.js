import types from "../types.js";
import axios from "axios";
import dayjs from 'dayjs';
import categoryObj from "@/store/modules/category";
import { format, toDate, parseISO } from 'date-fns';
// import moduleObj from "@/store/modules/module";

const state = {
    todolist: {
        id: 0,
        modalType: 1,
        todolists: [],
        todolistsIndex: 0,
        modalTitle: "添加 Todolist",
        showTodolistModal: false,
        showTodolistCalendarModal: false,
        showTodolistGantModal: false,
        operType: 1, // 1, 添加操作, 2, 更新操作
        dayOfWeek: dayjs().day(),
        dayOfMonth: dayjs().date(),
        monthOfYear: dayjs().month() + 1,
        curDatetime: new Date(),
        condition: {
            userId: 0,
            display: null,
            curDatetime: new Date(),
            status: 1
        },
        todolistObj: {
            id: 0,
            userId: 1,
            categoryId: 0,
            targetId: null,
            targetPeriodId: null,
            targetIds: [],
            taskname: "",
            repeatType: 1,
            estimatedTime: 30,
            startTime: null,
            deadline: new Date(),
            adjustDeadline: null,
            difficulty: 1,
            priority: 1,
            timeslotType: 1,
            reasonType: null,
            adjustType: null,
            display: true,
            completed: 0,
            core: 0,
            status: 1,
            createTime: new Date(),
            updateTime: null
        },
        oriTodolistObj: {
            id: 0,
            userId: 1,
            categoryId: 0,
            targetId: null,
            targetPeriodId: null,
            targetIds: [],
            taskname: "",
            repeatType: 1,
            estimatedTime: 30,
            startTime: null,
            deadline: new Date(),
            adjustDeadline: null,
            difficulty: 1,
            priority: 1,
            timeslotType: 1,
            reasonType: null,
            adjustType: null,
            display: true,
            completed: 0,
            core: 0,
            status: 1,
            createTime: new Date(),
            updateTime: null
        }
    },
};

const getters = {
    todolist(state) {
        return state.todolist;
    },
};

const actions = {
    addTodolist({ commit, state }, param) {
        let todolist = state.todolist;
        let todolistObj = todolist.todolistObj;
        let thisObj = param.thisObj;
        todolistObj.createTime = new Date();
        if(todolistObj.targetIds.length > 0){
            todolistObj.targetId = todolistObj.targetIds[todolistObj.targetIds.length - 1];
            todolistObj.targetPeriodId = todolistObj.targetIds[0];
        }
        todolistObj.startTime = new Date();
        axios({
            url: types.TEST_ENV + "/api/todolists",
            method: "post",
            data: todolistObj
        }).then(resp => {
            commit(types.ADDTODOLIST, resp.data.data);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
    updateTodolist({ commit, state }, param) {
        let todolist = state.todolist;
        let todolistObj = todolist.todolistObj;
        let thisObj = param.thisObj;
        if(todolistObj.targetIds.length > 0){
            todolistObj.targetId = todolistObj.targetIds[todolistObj.targetIds.length - 1];
            todolistObj.targetPeriodId = todolistObj.targetIds[0];
        }
        axios({
            url: types.TEST_ENV + "/api/todolists",
            method: "put",
            data: todolistObj
        }).then(resp => {
            commit(types.UPDATETODOLIST);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error)
            thisObj.$Message.error('Failure!');
        })
    },
    deleteTodolist({ commit, state }, param) {
        let todolist = state.todolist;
        let id = todolist.todolists[todolist.todolistsIndex].id;
        let thisObj = param.thisObj;
        axios({
            url: types.TEST_ENV + "/api/todolists",
            method: "delete",
            params: {
                "id": id
            }
        }).then(resp => {
            commit(types.DELETETODOLIST);
            thisObj.$Message.success('Success!');
        }).catch(error => {
            console.log(error);
            thisObj.$Message.error('Failure!');
        })
    },
    async getTodolists({ commit, state }) {
        let todolist = state.todolist;
        let formatStr = "yyyy-MM-dd";
        todolist.condition.userId = todolist.todolistObj.userId;
        if(todolist.curDatetime != null && todolist.curDatetime != "" && todolist.curDatetime != undefined){
            todolist.condition.curDatetime = format(todolist.curDatetime, formatStr);
        } else {
            todolist.condition.curDatetime = null;
        }
        await axios({
            url: types.TEST_ENV + "/api/todolists/list",
            method: "get",
            params: todolist.condition
        }).then(resp => {
            commit(types.GETTODOLISTS, resp.data.data);
        }).catch(error => {
            console.log(error);
        })
    },

};

const mutations = {
    [types.GETTODOLISTS](state, data) {
        let todolist = state.todolist; 
        todolist.todolists = [];
        todolist.todolists = data;
    },
    [types.DELETETODOLIST](state) {
        let todolist = state.todolist;
        todolist.todolists.splice(todolist.todolistsIndex, 1);
    },
    [types.ADDTODOLIST](state, data) {
        let todolist = state.todolist;
        todolist.todolistObj.id = data;
        let tempObj = JSON.parse(JSON.stringify(todolist.todolistObj));
        let category = categoryObj.state.category;
        let categories = category.categories;
        categories.forEach(element => {
            if (element.id == tempObj.categoryId) {
                tempObj.icon = element.icon;
                tempObj.iconType = element.iconType;
            }
        });
        todolist.todolists.push(tempObj);
    },
    [types.UPDATETODOLIST](state) {
        let todolist = state.todolist;
        let tempObj = JSON.parse(JSON.stringify(todolist.todolistObj));
        let category = categoryObj.state.category;
        let categories = category.categories;
        categories.forEach(element => {
            if (element.id == tempObj.categoryId) {
                tempObj.icon = element.icon;
                tempObj.iconType = element.iconType;
            }
        });
        todolist.todolists[todolist.todolistsIndex] = tempObj;
    },

};

export default {
    state,
    getters,
    actions,
    mutations
};