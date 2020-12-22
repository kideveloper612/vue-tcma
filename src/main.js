import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import VueRouter from "vue-router";
import GullKit from "./plugins/gull.kit";
// import "babel-polyfill";
// import es6Promise from "es6-promise";
// es6Promise.polyfill();
import store from "./store";
import Breadcumb from "./components/breadcumb";
import PageTitle from "./components/pageTitle";
import firebase from "firebase/app";
import "firebase/auth";
import i18n from "./lang/lang";
import moment from "moment-timezone";
import Axios from "@/http";
import VSelect from 'vue-select';
import {VueEditor} from "vue2-editor";
import canAccess from "./auth/canAccess";

Vue.component("breadcumb", Breadcumb);
Vue.component("page-title", PageTitle);
Vue.component("v-select", VSelect);
Vue.component("v-select", VSelect);
Vue.component("vue-editor", VueEditor);

Vue.prototype.$moment = moment;
Vue.prototype.$http = Axios;
Vue.prototype.$canAccess = canAccess;

Vue.use(GullKit);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
