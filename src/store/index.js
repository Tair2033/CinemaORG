import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    popup: {
      search: false,
      user: false
    },
    loading: {
      films: true,
      titlePage: true,
      top: true,
      popular: true,
      awaiting: true,
      popupSearch: true
    },
    Top250PageCount: 1,
    popularPageCount: 1,
    awaitingPageCount: 1,
    searchPage: 1
  },
  getters: {},
  mutations: {
    changePage(state, page) {
      state.Top250PageCount = page;
    },
    nextPage(state) {
      state.Top250PageCount += 1;
    },
    toggleUserPopup(state) {
      state.popup.user = !state.popup.user;
    }
  },
  actions: {
    toggleUserPopup(context) {
      context.commit('toggleUserPopup');
    }
  }
});
