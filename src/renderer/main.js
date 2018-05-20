import Vue from "vue";
import axios from "axios";
import adapter from "webrtc-adapter";
// import './index.less'

import {
  Input,
  Button,
  Card,
  Row,
  Col,
  Table
} from 'iview';
const Cps = {
  Input,
  Button,
  Card,
  Row,
  Col,
  Table
}
for (let [key, val] of Object.entries(Cps)) {
  Vue.component(key, val)
}

import App from "./App";
import router from "./router";
import store from "./store";

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  store,
  template: "<App/>"
}).$mount("#app");