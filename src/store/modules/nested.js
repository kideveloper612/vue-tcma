const namespaced = true;

const state = {
  elements: [],
  editElement: {}
}

const mutations = {
  UPDATE_ElEMENTS: (state, payload) => {
    console.log('dd, ', payload);
    state.elements = payload;
  },
  UPDATE_EDIT_ELEMENT: (state, payload) => {
    state.editElement = payload;
  }
}

const actions = {
  updateElements: ({ commit }, payload) => {
    commit('UPDATE_ElEMENTS', payload);
  },
  updateEditElement: ({commit}, payload) => {
    commit('UPDATE_EDIT_ELEMENT', payload);
  }
}

const getters = {
  getEditElement: state => state.editElement,
  getElements: state => state.elements
}

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters
};
