import Vue from 'vue';
import Vuetify from 'vuetify';
import firebase from 'firebase';
import VeeValidate from 'vee-validate';
import VueProgressBar from 'vue-progressbar';
import * as VueGoogleMaps from 'vue2-google-maps';

import App from './App.vue';
import store from './store';
import router from './router';
import gmaps_key from './private/gmaps_init';
import 'vuetify/dist/vuetify.min.css';

Vue.use(VeeValidate);

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px',
});

Vue.use(VueGoogleMaps, {
  load: {
    key: gmaps_key,
    libraries: 'places',
  },
});

Vue.config.productionTip = false;
Vue.use(Vuetify);

let app: Vue;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

// Start first time only after firebase is loaded
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});

// Lint command
// .\node_modules\.bin\eslint --fix . --ext .js,.vue src
