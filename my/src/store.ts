/* eslint-disable camelcase */
import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase/app';
import db from './firebase_init';

// Use vuex with Vue
Vue.use(Vuex);

interface StoreState {
  // TODO(typing) type these as firebase objects
  db: firebase.firestore.Firestore;
  firebase: any;
  currentHackathon: string;
}

// export the store
export default new Vuex.Store({
  // Vuex state variables appended with vuex in front
  state: {
    db,
    firebase,
    currentHackathon: 'DH7',
  } as StoreState,
});
