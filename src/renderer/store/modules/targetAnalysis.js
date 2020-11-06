import types from "../types.js";


const state = {
    targetAnalysis: {

    }
};

const getters = {
    targetAnalysis(state) {
        return state.targetAnalysis;
    }
};

const actions = {
    // selectMenuItem({ commit }, param) {
    //     commit(types.SELECTMENUITEM, param.name);
    // }
};

const mutations = {
    // [types.SELECTMENUITEM](state, name) {
    //     let tabs = state.home.tabs;
    //     if (tabs.indexOf(name) === -1) {
    //         tabs.push(name);
    //     }
    //     state.home.tabName = name;
    // },
};

export default {
    state,
    getters,
    actions,
    mutations
};