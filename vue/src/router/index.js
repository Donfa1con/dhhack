import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Home3 from '../views/Home3.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/1',
    name: 'home',
    component: Home,
  },
  {
    path: '/',
    name: 'home3',
    component: Home3,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
