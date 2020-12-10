import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "babel-polyfill";
import "@/utils/flexible";
import axios from "./utils/request";
import Cookies from "js-cookie";
import echarts from "echarts";
import ElementUI from "element-ui";
import dataV from "@jiaminghi/data-view";
import * as filters from "./filters"; // global filters
import * as componetns from "./components";

Vue.use(ElementUI);
Vue.use(dataV);

Vue.prototype.$axios = axios;
Vue.prototype.$cookie = Cookies;
Vue.prototype.$echarts = echarts;

import "@/assets/style/element-variables.scss";
// import "normalize.css/normalize.css";
import "@/assets/css/reset.css";
import "@/assets/css/common.css";
//styles
import "@/assets/style/index.scss";

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
Object.keys(componetns).forEach(key => {
  Vue.component(componetns[key].name, componetns[key]);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
