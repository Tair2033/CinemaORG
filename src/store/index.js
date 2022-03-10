import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        popup: {
            search: true,
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
    mutations: {
        changePage(state, page) {
            state.Top250PageCount = page;
        },
        nextPage(state) {
            state.Top250PageCount += 1;
        }

    },
    actions: {},
    modules: {}
}) 