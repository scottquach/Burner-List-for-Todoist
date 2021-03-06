import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import store from './store';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
});

router.beforeEach((to, from ,next) => {
  // console.log(to);
  // console.log(from);
  if (!store.getters.authToken && to.name !== 'login') {
    // console.log(document.cookie);
    const cachedAuthToken = document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // console.log(cachedAuthToken);
    if (cachedAuthToken) {
      store.commit('setAuthToken', cachedAuthToken);
      next('home');
    } else {
      next('login');
    }
  } else {
    next();
  }
});


export default router