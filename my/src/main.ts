/* eslint-disable */
import Vue from 'vue';
import Vuetify from 'vuetify';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';
import router from './router';
import store from './store';
import VueProgressBar from 'vue-progressbar';
import '@fortawesome/fontawesome-free/css/all.css';
const VueAnalytics = require('vue-analytics').default;

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px',
});

Vue.config.productionTip = false;
Vue.use(Vuetify);

let app: null | any = null;

//Google Analytics
Vue.use(VueAnalytics, {
  id: 'UA-105802545-2',
  router,
});

// Start first time only after firebase is loaded
firebase.auth().onAuthStateChanged(() => {
  if (!app)
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
});
//Lint command
//.\node_modules\.bin\eslint --fix . --ext .js,.vue src
