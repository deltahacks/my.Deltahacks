import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase/init'

//Use vuex with Vue
Vue.use(Vuex)

//export the store 
export const store = new Vuex.Store({
    state:{
            vuex_msgs: [],
            vuex_name: null,
            user_name: "Kumail",
            vuex_email: null,
            vuex_password: null,
            db
        },
    mutations: {
        update_vuex_email (state, email) {
            state.vuex_email = email
            },
        update_vuex_password (state, pass) {
            state.vuex_password = pass
            }
        }      
})