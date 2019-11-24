import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Home1 from '../views/Home1.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/1',
    name: 'home',
    component: Home,
  },
  {
    path: '/',
    name: 'home2',
    component: Home2,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
