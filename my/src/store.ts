/* eslint-disable camelcase */
import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import db from "./private/firebase_init";

// Use vuex with Vue
Vue.use(Vuex);

interface StoreState {
  //TODO(typing) type these as firebase objects
  db: any;
  firebase: any;
}

// export the store
export default new Vuex.Store({
  // Vuex state variables appended with vuex in front
  state: {
    db,
    firebase,
  } as StoreState,
});
