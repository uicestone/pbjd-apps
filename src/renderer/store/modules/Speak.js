const state = {
  videos: {
    "1": {
      value: "1",
      label: "我爱你中国",
      url: require("../../assets/test.mp3")
    }
  },
  currentIndex: "1"
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
