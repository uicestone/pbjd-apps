const state = {
  videos: [
    {
      value: "1",
      label: "我爱你中国",
      url: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
    }
  ],
  currentIndex: 0
};

const mutations = {
  SET_SPEAK_STATE(state, payload) {
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
