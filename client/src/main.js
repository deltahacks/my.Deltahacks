/* eslint-disable */
import Vue from 'vue';
import Vuetify from 'vuetify';
import firebase from 'firebase';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Vuetify);

let app = null;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

// Start first time only after firebase is loaded
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    var app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});
//Lint command
//.\node_modules\.bin\eslint --fix . --ext .js,.vue src 
