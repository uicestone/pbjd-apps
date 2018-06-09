const state = {
  name: "",
  motto: "",
  photoUrl: ""
};

const mutations = {
  SET_MOTO_STATE(state, payload) {
    for (let [k, v] of Object.entries(payload)) {
      state[k] = v;
    }
  }
};

const actions = {
  someAsyncTask({
    commit
  }) {
    // do something async
    commit("INCREMENT_MAIN_COUNTER");
  }
};

export default {
  state,
  mutations,
  actions
};