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
            db
        },
    mutations: {
        updateMessage (state, message) {
            state.vuex_name = message
            },
        update_vuex_msgs (state, message) {
            state.vuex_msgs = message
            }
        }      
})