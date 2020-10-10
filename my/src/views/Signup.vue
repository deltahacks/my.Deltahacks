<template>
  <div class="limiter">
    <div class="container-signup100 background">
      <div class="wrap-signup100">
        <form class="signup100-form validate-form">
          <span class="signup100-form-logo">
            <img
              src="@/assets/logo.png"
              height="90"
              width="90"
              alt="DeltaHacks Logo"
            />
          </span>
          <span class="welcomeheader">
            DeltaHacks Signup
          </span>
          <div
            class="wrap-input100 validate-input"
            data-validate="Enter username"
          >
            <v-text-field
              prepend-icon="email"
              name="email"
              label="Email"
              type="email"
              v-model="vuex_email"
            ></v-text-field>
          </div>
          <div
            class="wrap-input100 validate-input"
            data-validate="Enter password"
          >
            <v-text-field
              prepend-icon="lock"
              name="password"
              label="Password"
              id="password"
              type="password"
              @keypress.enter="signUpFirebase"
              v-model="vuex_password"
            ></v-text-field>
          </div>
          <div
            class="wrap-input100 validate-input"
            data-validate="Enter password"
          >
            <v-text-field
              prepend-icon="lock"
              name="password2"
              label="Retype Password"
              id="password2"
              type="password"
              @keypress.enter="signUpFirebase"
              v-model="password_repeat"
            ></v-text-field>
          </div>
          <div class="container-signup100-form-btn">
            <v-alert :value="feedback" type="error">
              {{ feedback }}
            </v-alert>
            <v-btn class="signup100-form-btn" @click.prevent="signUpFirebase">
              Signup &nbsp;
              <i class="fas fa-user-plus" />
            </v-btn>
          </div>
          <br />
          <div class="container-login100-form-btn">
            <v-divider></v-divider>
            <br />
            <p style="color: #525251; cursor: pointer;" @click="loginpage">
              <i class="fas fa-arrow-left" />
              Go Back
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Vue from 'vue';
import { SignupModel } from '../types';

export default Vue.extend({
  name: 'Signup',
  data(): SignupModel {
    return {
      drawer: null,
      email: null,
      password: null,
      password_repeat: null,
      feedback: null,
      ip_address: null,
      geo: null,
    };
  },
  props: {
    source: String,
  },
  methods: {
    loginpage() {
      this.$router.push({ name: 'Login' });
    },
    tester() {
      console.log(this.vuex_email);
    },
    // eslint-disable-next-line consistent-return
    async signUpFirebase() {
      if (this.vuex_email && this.vuex_password && this.password_repeat) {
        if (this.vuex_password !== this.password_repeat) {
          this.feedback = 'Passwords must match';
          return this.feedback;
        }
        try {
          const user = await firebase
            .auth()
            .createUserWithEmailAndPassword(
              this.vuex_email,
              this.vuex_password,
            );
          // console.log(user.user.uid, 'ID');
          // console.log(this.$store.state.db, 'DB');
          this.$store.state.db
            .collection('DH7')
            .doc('users')
            .collection('all')
            .doc(this.vuex_email)
            .set({
              email: this.vuex_email,
              // geo: this.geo,
              user_id: user.user!.uid,
              ip: null,
              is_admin: false,
            });
          const response = await axios.get('https://api.ipify.org?format=json');
          // console.log(response.data.ip);
          const ipp = response.data.ip;
          const data = await axios.get(`https://ipapi.co/${ipp}/json/`);
          // console.log(data.data);
          this.geo = data.data;
          this.$store.state.db
            .collection('DH7')
            .doc('users')
            .collection('all')
            .doc(this.vuex_email)
            .set({
              email: this.vuex_email,
              geo: this.geo,
              user_id: user.user!.uid,
              ip: ipp,
              is_admin: false,
            });
          // this.vuex_current_user = firebase.auth().currentUser
          // console.log('success');
          this.$router.push({ name: 'Status' });
        } catch (err) {
          this.feedback = err.message;
        }
      } else {
        this.feedback = 'You need to enter all the fields';
      }
    },
  },
  computed: {
    vuex_email: {
      get(): string {
        return this.$store.state.vuex_email;
      },
      set(value: string) {
        this.$store.commit('update_vuex_email', value);
      },
    },
    vuex_password: {
      get(): string {
        return this.$store.state.vuex_password;
      },
      set(value: string) {
        this.$store.commit('update_vuex_password', value);
      },
    },
    vuex_current_user: {
      get(): string {
        return this.$store.state.vuex_current_user;
      },
      set(value: string) {
        this.$store.commit('update_vuex_current_user', value);
      },
    },
  },
});
</script>
<style scoped src='../assets/css/signup.css'>
</style>
