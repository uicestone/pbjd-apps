import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: require("@/views/test").default
    },
    {
      path: "/movie",
      name: "movie",
      component: require("@/views/movie").default
    },
    {
      path: "/motto",
      name: "motto",
      component: require("@/views/motto").default
    },
    {
      path: "/history",
      name: "history",
      component: require("@/views/history").default
    },
    {
      path: "/speak",
      name: "speak",
      component: require("@/views/speak").default
    },
    {
      path: "/join",
      name: "join",
      component: require("@/views/join/join").default,
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
    {
      path: "*",
      redirect: "/"
    }
  ]
});
