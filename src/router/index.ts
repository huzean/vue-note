import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
  },
  {
    path: '/table',
    name: 'table',
    component: () => import(/* webpackChunkName: "about" */ '../views/Table.vue'),
  },
  {
    path: '*',
    redirect: '/table',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
