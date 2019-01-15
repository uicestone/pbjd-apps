import Vue from "vue";
import axios from "axios";
import adapter from "webrtc-adapter";
// import socketio from "socket.io-client";
// import VueSocketio from "vue-socket.io";
import iView from "iview";
import App from "./App";
import router from "./router";
import store from "./store";
import "./utils/recorder.js";
import * as request from "./utils/request";
import wx from 'jweixin-module';

Vue.filter("dt", (val, format) => (val >= 10 ? val : "0" + val));

// const SocketInstance = socketio("http://localhost:3000");
// Vue.use(VueSocketio, SocketInstance, store);
Vue.use(iView);

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

if (!process.env.IS_WEB) {
  require('electron').webFrame.setZoomLevelLimits(1, 1);
}

/* config js-api in wx web */
async function configWeixin() {
  const args = await request.getWxJsapiArgs(window.location.href);

  wx.config({jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'], ...args});
  wx.ready(function() {
    wx.onMenuShareTimeline({
      title: '嘉定区·洪德楼',
      link: 'https://pbjd-apps.hbird.com.cn',
      imgUrl: 'https://pbjd-www.hbird.com.cn/static/images/logo.png',
      success(data) {}
    });
    wx.onMenuShareAppMessage({ 
      title: '嘉定区·洪德楼',
      desc: '',
      link: 'https://pbjd-apps.hbird.com.cn',
      imgUrl: 'https://pbjd-www.hbird.com.cn/static/images/logo.png',
      success(data) {}
    });
  });
}

if (process.env.IS_WEB) {
  configWeixin();
}

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  store,
  template: "<App/>"
}).$mount("#app");
