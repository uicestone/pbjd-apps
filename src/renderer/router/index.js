import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "home",
      component: require("@/views/home").default
    },
    {
      path: "/video",
      name: "home",
      component: require("@/views/video").default
    },
    {
      path: "/motto",
      name: "home",
      component: require("@/views/motto").default
    },
    {
      path: "/history",
      name: "home",
      component: require("@/views/history").default
    },
    {
      path: "/audio",
      name: "home",
      component: require("@/views/audio").default
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});