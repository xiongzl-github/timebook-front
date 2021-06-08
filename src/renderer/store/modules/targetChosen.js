import types from "../types.js";
import axios from "axios";

const state = {
    targetChosen: {
        allTargets: [], 
        targetKeys: []
    },
};

const getters = {
    targetChosen(state) {
        return state.targetChosen;
    },
};

const actions = {
    
};

const mutations = {
    

};

export default {
    state,
    getters,
    actions,
    mutations
};