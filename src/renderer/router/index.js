import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [{
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
      children: [{
          path: "index",
          name: "movieIndex",
          component: require("@/views/movie/index").default,
          meta: {
            homeName: 'home'
          }
        },
        {
          path: "detail",
          name: "movieDetail",
          component: require("@/views/movie/detail").default,
          meta: {
            homeName: 'home'
          }
        }
      ]
    },
    {
      path: "/motto",
      name: "motto",
      component: require("@/views/motto/root").default,
      children: [{
          path: "index",
          name: "mottoIndex",
          component: require("@/views/motto/index").default,
          meta: {
            homeName: 'home'
          }
        },
        {
          path: "detail",
          name: "mottoDetail",
          component: require("@/views/motto/detail").default,
          meta: {
            homeName: 'home'
          }
        }
      ]
    },
    {
      path: "/history",
      name: "history",
      component: require("@/views/history").default,
      meta: {
        homeName: 'home'
      }
    },
    {
      path: "/speak",
      name: "speak",
      component: require("@/views/speak/root").default,
      children: [{
          path: "index",
          name: "speakIndex",
          component: require("@/views/speak/index").default,
          meta: {
            homeName: 'home'
          }
        },
        {
          path: "detail",
          name: "speakDetail",
          component: require("@/views/speak/detail").default,
          meta: {
            homeName: 'home'
          }
        }
      ]
    },
    // join
    {
      path: "/join",
      name: "join",
      component: require("@/views/join/root").default,
      children: [{
          path: "index",
          name: "joinIndex",
          component: require("@/views/join/index").default
        },
        {
          path: "detail",
          name: "joinDetail",
          component: require("@/views/join/detail").default,
          meta: {
            homeName: 'joinIndex'
          }
        }
      ]
    },
    // map
    {
      path: "/map",
      name: "map",
      component: require("@/views/map/root").default,
      children: [{
          path: "index",
          name: "mapIndex",
          component: require("@/views/map/index").default
        },
        {
          path: "detail",
          name: "mapDetail",
          component: require("@/views/map/detail").default,
          meta: {
            homeName: 'mapIndex'
          }
        },
        {
          path: "group",
          name: "mapGroup",
          component: require("@/views/map/group").default,
          meta: {
            homeName: 'mapIndex'
          }
        },
        {
          path: "groupList",
          name: "mapGroupList",
          component: require("@/views/map/groupList").default,
          meta: {
            homeName: 'mapIndex'
          }
        },
        {
          path: "groupDetail",
          name: "mapGroupDetail",
          component: require("@/views/map/groupDetail").default,
          meta: {
            homeName: 'mapIndex'
          }
        }
      ]
    },
    // floor
    {
      path: "/floor",
      name: "floor",
      component: require("@/views/floor/root").default,
      children: [
        {
          path: "index",
          name: "floorIndex",
          component: require("@/views/floor/index").default,
          meta: {
            homeName: 'mapIndex'
          }
        },
        {
          path: "guide",
          name: "floorGuide",
          component: require("@/views/floor/guide").default,
          meta: {
            homeName: 'mapIndex'
          }
        },
        {
          path: "detail",
          name: "floorDetail",
          component: require("@/views/floor/detail").default,
          meta: {
            homeName: 'mapIndex'
          }
        }
      ],
      meta: {
        homeName: 'mapIndex'
      }
    },
    {
      path: "/road",
      name: "road",
      component: require("@/views/road/root").default,
      children: [
        {
          path: "index",
          name: "roadIndex",
          component: require("@/views/road/index").default,
          meta: {
            homeName: "mapIndex"
          }
        }
      ]
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});