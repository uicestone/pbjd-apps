const state = {
  connect: false,
  message: null
};

const mutations = {
  SOCKET_CONNECT: (state, status) => {
    state.connect = true;
  },
  SOCKET_DISCONNECT(state) {
    state.connect = false;
  },
  SOCKET_USER_MESSAGE: (state, message) => {
    state.message = message;
  },
  SOCKET_TEST: (state, message) => {
    console.log(message);
  }
};

const actions = {
  socket_userMessage: (context, message) => {
    context.dispatch("newMessage", message);
    context.commit("NEW_MESSAGE_RECEIVED", message);
    if (message.is_important) {
      context.dispatch("alertImportantMessage", message);
    }
  }
};

export default {
  state,
  mutations,
  actions
};
