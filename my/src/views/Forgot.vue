<template>
  <div class="limiter">
    <v-snackbar v-model="feedback" top :color="bannerColor" :timeout="bannerTimeout">
      {{bannerMessage}}
      <v-btn color="white" flat @click="feedback = false">
        Close
      </v-btn>
    </v-snackbar>
    <head>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
    </head>
    <div class="container-login100 background">
      <!-- "style="background-image: url('https://wallpapersite.com/images/pages/pic_w/14088.png');" -->
      <div class="wrap-login100">
        <form class="login100-form validate-form">
          <span class="login100-form-logo">
            <img src="@/assets/logo.png" height="90" width="90" alt="DeltaHacks Logo" />
          </span>
          <span class="welcomeheader">
            Forgot
          </span>
          <p>Please enter your email and a link will be sent to it.</p>
          <div class="wrap-input100 validate-input" data-validate="Enter username">
            <v-text-field prepend-icon="person" @keypress.enter="loginf()" name="login" label="Email" id="login" v-model="email" type="email" required></v-text-field>
          </div>
          <!-- <v-alert :value="feedback" type="error">
            {{ feedback }}
          </v-alert> -->
          <div><br></div>
          <div class="container-login100-form-btn">
            <v-btn :loading="loading" :disabled="loading" class="login100-form-btn" type="submit" @click.prevent="forgotPass()">
              Submit
              <v-icon right>lock_open</v-icon>
            </v-btn>
          </div>
          <br>
          <div class="container-login100-form-btn">
            <v-divider></v-divider><br>
            <p style="color: #525251; cursor: pointer;" @click="loginpage">
              <i class="fas fa-arrow-left" /> Go Back
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import firebase from 'firebase';
import Vue from 'vue';

export default Vue.extend({
  name: 'Login',
  data: () => ({
    drawer: null,
    email: null,
    pass: null,
    feedback: null,
    bannerMessage: 'Success',
    bannerTimeout: 2000,
    bannerColor: 'success',
    loader: null,
    loading: false,
    loaderSignup: null,
    loadingSignup: false,
  }),
  methods: {
    signuppage() {
      this.$router.push({ name: 'Forgot' });
    },
    loginpage() {
      this.$router.push({ name: 'Login' });
    },
    async forgotPass() {
      this.loader = 'loading';
      const parent = this;
      if (this.email) {
        try {
          await firebase
            .auth()
            .sendPasswordResetEmail(this.email);
          console.log('Email sent');
          // this.$router.push({ name: "Login" });
          this.feedback = true;
          this.bannerMessage = 'Password reset sent to email';
        } catch (error) {
          // Handle Errors here.
          //   const errorCode = error.code;
          const errorMessage = error.message;
          this.feedback = errorMessage;
          console.log(errorMessage);
        }
      }
    },
  },
  mounted() {},
  props: {
    source: String,
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);
      this.loader = null;
    },
  },
});
</script>
<style scoped src='../assets/css/login.css'>
</style>
