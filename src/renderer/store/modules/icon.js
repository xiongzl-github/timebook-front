import types from "../types.js";
import axios from "axios";

const state = {
    icon: {
        icons: [],
        iconsIndex: 0,
        iconObj: {
            id: 0,
            icon: "",
            iconName: "",
            status: 1,
            type: 1
        },
        oriIconObj: {
            id: 0,
            icon: "",
            iconName: "",
            status: 1,
            type: 1
        }
    },
};

const getters = {
    icon(state) {
        return state.icon;
    },
};

const actions = {
    async getIcons({ commit, state }) {
        let icon = state.icon;
        let userId = icon.iconObj.userId;
        await axios({
            url: types.TEST_ENV + "/api/icons",
            method: "get"
        }).then(resp => {
            commit(types.GETICONS, resp.data.data);
        }).catch(error => {
            console.log(error);
        })
    },

};

const mutations = {
    [types.GETICONS](state, data) {
        let icon = state.icon;
        icon.icons = [];
        icon.icons = data;
    },

};

export default {
    state,
    getters,
    actions,
    mutations
};