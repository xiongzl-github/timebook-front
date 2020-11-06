import types from "../types.js";


const state = {
    pages: {

    }
};

const getters = {
    pages(state) {
        return state.pages;
    }
};

const actions = {
    queryAllMottos({ state, commit }, param) {

    }
};

const mutations = {
    [types.QUERYALLMOTTOS](state, resultList) {

    },
};

export default {
    state,
    getters,
    actions,
    mutations
};