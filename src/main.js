import Vue from 'vue';
import YmapPlugin from 'vue-yandex-maps'
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(YmapPlugin, {
  apiKey: '1a7faacc-6e90-4cca-a2d2-5330e29dba7b',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1',
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
