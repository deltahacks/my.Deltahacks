import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import db from './private/firebase_init';

// Use vuex with Vue
Vue.use(Vuex);

// export the store
export default new Vuex.Store({
  // Vuex state variables appended with vuex in front
  state: {
    currentAdminUserName: null,
    allAdmins: null,
    vuex_current_user: null,
    vuex_msgs: [],
    vuex_name: null,
    user_name: 'Kumail',
    vuex_email: null,
    vuex_password: null,
    vuex_user_has_applied: false,
    vuex_user_role: 'none',
    db,
    firebase,
    test: 'test1',
    vuex_user_application: null,
    DataTable: {
      lastVisible: null,
    },
  },
  getters: {
    get_vuex_email(state) {
      return state.vuex_email;
    },
    get_vuex_user_application(state) {
      return state.vuex_user_application;
    },
  },
  // TODO: Implement Getters and Setters
  mutations: {
    update_vuex_email(state, email) {
      state.vuex_email = email;
    },
    update_vuex_role(state, role) {
      state.vuex_user_role = role;
    },
    update_vuex_password(state, pass) {
      state.vuex_password = pass;
    },
    update_vuex_current_user(state, usr) {
      state.vuex_current_user = usr;
    },
    update_DataTable_lastVisible(state, change) {
      state.DataTable.lastVisible = change;
    },
  },
});
