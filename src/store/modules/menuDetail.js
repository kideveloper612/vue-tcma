const state = {
    menuList: [],
    selectedMenu: {},
    currentThemeID: '',
}

const getters = {
    getThemeID: state => state.currentThemeID,
    getMenu: state => state.selectedMenu,
    getMenuList: state => state.menuList
}

const actions = {
    setThemeID({commit}, data) {
        commit('SET_THEME_ID', data);
    },
    setMenu({commit}, data) {
        commit('SET_MENU', data);
    },
    setMenuList({commit}, data) {
        commit('SET_MENU_LIST', data);
    }
}

const mutations = {
    SET_THEME_ID(state, data) {
        state.currentThemeID = data;
    },
    SET_MENU(state, data ){
        state.selectedMenu = data;
    },
    SET_MENU_LIST(state, data) {
        state.menuList = data;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}