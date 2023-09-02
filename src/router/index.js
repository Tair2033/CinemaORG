import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage.vue';
import MoviesPage from '../views/MoviesPage.vue';
import Filmtop from '../views/FilmTop.vue';
import CinemaPage from '../views/CinemaPage.vue';
import ActorPage from '../views/ActorPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/movies',
    name: 'Movies',
    component: MoviesPage
  },
  {
    path: '/movies/:name',
    name: 'Filmtop',
    component: Filmtop,
    params: {
      name: ':name'
    }
  },
  {
    path: '/film/:id',
    name: 'Title',
    component: CinemaPage,
    params: {
      id: ':id'
    }
  },
  {
    path: '/name/:id',
    name: 'Actor',
    component: ActorPage,
    params: {
      id: ':id'
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'active',
  base: process.env.BASE_URL,
  routes
});

export default router;
