import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/home",
      name: "home",
      component: require("@/views/home").default
    },
    {
      path: "/",
      name: "test",
      component: require("@/views/test").default
    },
    {
      path: "/movie",
      name: "movie",
      component: require("@/views/movie/root").default,
      children: [
        {
          path: "index",
          name: "movieIndex",
          component: require("@/views/movie/index").default
        },
        {
          path: "detail",
          name: "movieDetail",
          component: require("@/views/movie/detail").default
        }
      ]
    },
    {
      path: "/motto",
      name: "motto",
      component: require("@/views/motto/root").default,
      children: [
        {
          path: "index",
          name: "mottoIndex",
          component: require("@/views/motto/index").default
        },
        {
          path: "detail",
          name: "mottoDetail",
          component: require("@/views/motto/detail").default
        }
      ]
    },
    {
      path: "/history",
      name: "history",
      component: require("@/views/history").default
    },
    {
      path: "/speak",
      name: "speak",
      component: require("@/views/speak/root").default,
      children: [
        {
          path: "index",
          name: "speakIndex",
          component: require("@/views/speak/index").default
        },
        {
          path: "detail",
          name: "speakDetail",
          component: require("@/views/speak/detail").default
        }
      ]
    },
    // join
    {
      path: "/join",
      name: "join",
      component: require("@/views/join/root").default,
      children: [
        {
          path: "index",
          name: "joinIndex",
          component: require("@/views/join/index").default
        },
        {
          path: "detail",
          name: "joinDetail",
          component: require("@/views/join/detail").default
        }
      ]
    },
    // map
    {
      path: "/map",
      name: "map",
      component: require("@/views/map").default
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
