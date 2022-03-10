import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Movies from '../views/Movies.vue'
import Filmtop from '../views/FilmTop.vue'
import Title from '../views/Title.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies
  },
  {
    path: '/movies/:name',
    name: 'Filmtop',
    component: Filmtop,
    params: {
      'name': ':name'
    }
  },
  { 
    path: '/film/:id', 
    name: 'Title',
    component: Title,
    params: {
      'id': ':id'
    }
  }
] 
 
const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'active',
  base: process.env.BASE_URL,
  routes
})

export default router
