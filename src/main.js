/* eslint-disable */
import Vue from 'vue';
import Vuetify from 'vuetify';
import firebase from 'firebase';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';
import router from './router';
import store from './store';
import gmaps_key from './private/gmaps_init'
import * as VueGoogleMaps from 'vue2-google-maps'
import VeeValidate from 'vee-validate';
import VueProgressBar from 'vue-progressbar'
import VueMouseParallax from 'vue-mouse-parallax'
 
Vue.use(VueMouseParallax)

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})
Vue.use(VeeValidate);

Vue.use(VueGoogleMaps, {
  load: {
    key: gmaps_key,
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
 
  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,
 
  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
})

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
