import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: true,
    isBurger: false,
    popup: {
      search: false,
      user: false
    },
    loading: {
      films: true,
      titlePage: true,
      topPage: false,
      popupSearch: true,
      MoviesPage: false,
      actorPage: false
    },
    filmsPageCount: 1,
    topPageCount: 1,
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
