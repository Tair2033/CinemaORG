import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: true,
    popup: {
      search: false,
      user: false
    },
    loading: {
      films: true,
      filmList: false,
      titlePage: true,
      top: true,
      popular: true,
      awaiting: true,
      popupSearch: true,
      MoviesPage: false
    },
    Top250PageCount: 1,
    popularPageCount: 1,
    awaitingPageCount: 1,
    filmsPageCount: 1,
    pageCounter: 1,
    searchPage: 1
  },
  getters: {},
  mutations: {
    login(state) {
      state.isAuth = !state.isAuth;
    },
    changePage(state, page) {
      state.pageCounter = page;
    },
    previousPage(state) {
      state.pageCounter -= 1;
    },
    nextPage(state) {
      state.pageCounter += 1;
    },
    toggleUserPopup(state) {
      state.popup.user = !state.popup.user;
    },
    toggleMoviesPageStatus(state) {
      state.loading.MoviesPage = true;
    },
    disableMoviesPageStatus(state) {
      state.loading.MoviesPage = false;
    },
    toggleFilmList(state) {
      state.loading.filmList = !state.loading.filmList;
    }
  },
  actions: {
    login(context) {
      context.commit('login');
    },
    changePage(context, page) {
      context.commit('changePage', page);
    },
    previousPage(context) {
      context.commit('previousPage');
    },
    nextPage(context) {
      context.commit('nextPage');
    },
    toggleUserPopup(context) {
      context.commit('toggleUserPopup');
    },
    toggleMoviesPageStatus(content) {
      content.commit('toggleMoviesPageStatus');
    },
    disableMoviesPageStatus(content) {
      content.commit('disableMoviesPageStatus');
    },
    toggleFilmList(context) {
      context.commit('toggleFilmList');
    }
  }
});
