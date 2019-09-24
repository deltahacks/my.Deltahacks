<template>
<div class="limiter">
  <head>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"
      integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt"
      crossorigin="anonymous"
    />
  </head>
  <v-snackbar v-model="successFeedback" top :color="bannerColor" :timeout="3000">
    Sucessfully created Admin Account
    <v-btn color="white" flat @click="successFeedback = false">Close</v-btn>
  </v-snackbar>
  <div
    class="container-login100"
    style="background-image: url('https://wallpapersite.com/images/pages/pic_w/14088.png');"
  >
    <div class="wrap-login100">
      <form class="login100-form validate-form">
        <span class="login100-form-logo">
          <img src="@/assets/logo.png" height="90" width="90" alt="DeltaHacks Logo" />
        </span>
        <span class="welcomeheader">DeltaHacks</span>
        <div class="wrap-input100 validate-input" data-validate="Enter username">
          <v-text-field
            prepend-icon="person"
            @keypress.enter="loginf()"
            name="login"
            label="Email"
            id="login"
            v-model="email"
            type="email"
            required
          ></v-text-field>
        </div>
        <div class="wrap-input100 validate-input" data-validate="Enter password">
          <v-text-field
            @keypress.enter="loginf()"
            prepend-icon="lock"
            name="password"
            label="Password"
            id="password"
            v-model="pass"
            type="password"
            required
          ></v-text-field>
        </div>
        <v-alert :value="feedback" type="error">{{ feedback }}</v-alert>
        <div class="container-login100-form-btn">
          <v-btn
            :loading="loading"
            :disabled="loading"
            class="login100-form-btn"
            type="submit"
            @click.prevent="login()"
          >
            LOGIN
            <v-icon right>lock_open</v-icon>
          </v-btn>
        </div>
        <div>
          <br />
        </div>
        <div class="container-login100-form-btn">
          <v-btn
            class="login100-form-btn"
            :href="source"
            target="_blank"
            slot="activator"
            to="/signup"
          >
            Signup
            <i class="fas fa-user-plus" />
          </v-btn>
        </div>
      </form>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import firebase from 'firebase';
import Vue from 'vue';

interface LoginData {
  email: string;
  pass: string;
  feedback: string;
  color: string;
  bannerColor: string;
  loader: string;
  loading: boolean;
}

export default Vue.extend({
  name: 'Login',
  props: {
    source: String,
    successFeedback: Boolean,
  },
  data(): LoginData {
    return {
      email: '',
      pass: '',
      feedback: '',
      color: 'success',
      bannerColor: 'success',
      loader: '',
      loading: false,
    };
  },
  methods: {
    signuppage() {
      this.$router.push({ name: 'Signup' });
    },
    async login() {
      this.loader = 'loading';
      if (this.email && this.pass) {
        try {
          await firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.pass);

          this.$router.push({ name: 'Dashboard' });
          console.log('logged in');
          this.feedback = '';
        } catch (error) {
          // Handle Errors here.
          const errorMessage = error.message;
          this.feedback = errorMessage;
          console.log(errorMessage, error.code);
        }
      }
    },
  },
  watch: {
    loader() {
      const l: string = this.loader;
      this[l] = !this[l];

      setTimeout(() => {
        this[l] = false;
      }, 3000);

      this.loader = '';
    },
  },
});
</script>

<style scoped src='../assets/css/login.css'>
</style>
