import Vue from 'vue';
import VueRouter from 'vue-router';
import authService from "@/features/auth/services/auth.service";

Vue.use(VueRouter);

const routes = [
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('../views/AuthLogin.vue'),
    meta: {
        title: 'Comin | Login'
    },
    async beforeEnter(to, from, next) {
      const isSession = !!authService.token;
      if (isSession){
        next({name: 'PersonList'});
      }
      else {
        next();
      }
    },
  },
  {
    path: '/person/list',
    name: 'PersonList',
    component: () => import('../views/PersonList.vue'),
    meta: {
        title: 'Comin | Personas'
    },
  },
  {
    path: '/person/:person/details',
    name: 'PersonDetail',
    component: () => import('../views/PersonDetail.vue'),
    meta: {
        title: 'Comin | Detalles de persona'
    },
  },
  // {
  //   path: '/deal/list',
  //   name: 'DealList',
  //   component: () => import('../views/DealList.vue'),
  //   meta: {
  //       title: 'Comin | Scraper'
  //   },
  // },
  // {
  //   path: '/rut/list',
  //   name: 'RutList',
  //   component: () => import('../views/RutList.vue'),
  //   meta: {
  //       title: 'Comin | Scraper'
  //   },
    // async beforeEnter(to, from, next) {
    //   const isSession = !!authService.token;
    //   if (isSession){
    //     next();
    //   }
    //   else {
    //     next({name: 'Login'});
    //   }
    // },
  // },
  {
    path: '*',
    redirect: {name: 'Login'}
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((toRoute, fromRoute, next) => {
  window.document.title = toRoute.meta && toRoute.meta.title ? toRoute.meta.title : 'Home';
  next();
});

export default router;
