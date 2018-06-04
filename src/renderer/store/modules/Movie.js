const state = {
  videos: {
    "1": {
      value: "1",
      label: "小兵张嘎",
      url: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
    }
  },
  currentIndex: "1"
};

const mutations = {
  SET_MOVIE_STATE(state, payload) {
    for (let [k, v] of Object.entries(payload)) {
      state[k] = v;
    }
  }
};

const actions = {
  someAsyncTask({ commit }) {
    // do something async
    commit("INCREMENT_MAIN_COUNTER");
  }
};

export default {
  state,
  mutations,
  actions
};
