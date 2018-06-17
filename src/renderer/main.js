import Vue from "vue";
import axios from "axios";
import adapter from "webrtc-adapter";
// import socketio from "socket.io-client";
// import VueSocketio from "vue-socket.io";
import iView from "iview";
import App from "./App";
import router from "./router";
import store from "./store";
import FastClick from "fastclick"
FastClick.attach(document.body);

import "./utils/recorder.js";


Vue.filter("dt", (val, format) => (val > 10 ? val : "0" + val));

// const SocketInstance = socketio("http://localhost:3000");
// Vue.use(VueSocketio, SocketInstance, store);
Vue.use(iView);

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