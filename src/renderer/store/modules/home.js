import types from "../types.js";


const state = {
    home: {
        tabs: [],
        tabName: "",
    }
};

const getters = {
    home(state) {
        return state.home;
    }
};

const actions = {
    selectMenuItem({ commit }, param) {
        commit(types.SELECTMENUITEM, param.name);
    }
};

const mutations = {
    [types.SELECTMENUITEM](state, name) {
        let tabs = state.home.tabs;
        if (tabs.indexOf(name) === -1) {
            tabs.push(name);
        }
        state.home.tabName = name;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};