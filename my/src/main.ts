/* eslint-disable */
import Vue from 'vue';
import Vuetify from 'vuetify';
import firebase from 'firebase';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidate from 'vee-validate';
import VueProgressBar from 'vue-progressbar'
const VueAnalytics = require('vue-analytics').default

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})
Vue.use(VeeValidate);

Vue.config.productionTip = false;
Vue.use(Vuetify);

let app = null;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

//Google Analytics
Vue.use(VueAnalytics, {
  id: 'UA-105802545-2',
  router
})

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
