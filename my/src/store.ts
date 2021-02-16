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
  animationToggle: boolean,
}

// export the store
export default new Vuex.Store({
  // Vuex state variables appended with vuex in front
  state: {
    db,
    firebase,
    currentHackathon: 'DH7',
    animationToggle: window.localStorage.getItem('animationToggle') === 'true',
  } as StoreState,
  getters:{
    animateBackground: state => {
      return state.animationToggle;
    }
  },
  mutations:{
    changeAnimate (state, payload){
      state.animationToggle = payload;
      localStorage.setItem('animationToggle', payload);
      location.reload();
    }
  }
});
sessionStorage.clear();