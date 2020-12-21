import Vuex from "vuex";
import Vue from "vue";
import largeSidebar from "./modules/largeSidebar";
import compactSidebar from "./modules/compactSidebar";
import config from "./modules/config";
import authData from "./modules/authData";
import invoice from "./modules/invoice";
import verticalSidebar from "./modules/verticalSidebar";
import menuDetail from "./modules/menuDetail";
import nested from "./modules/nested";

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    largeSidebar,
    compactSidebar,
    config,
    authData,
    invoice,
    verticalSidebar,
    menuDetail,
    nested
  }
});
