<template>
  <div class="limiter">

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
            DeltaHacks
          </span>
          <div class="wrap-input100 validate-input" data-validate="Enter username">
            <v-text-field prepend-icon="person" @keypress.enter="loginf()" name="login" label="Email" id="login" v-model="email" type="email" required></v-text-field>
          </div>
          <div class="wrap-input100 validate-input" data-validate="Enter password">
            <v-text-field @keypress.enter="loginf()" prepend-icon="lock" name="password" label="Password" id="password" v-model="pass" type="password" required></v-text-field>
          </div>
          <v-alert :value="feedback" type="error">
            {{ feedback }}
          </v-alert>
          <div class="container-login100-form-btn">
            <v-btn :loading="loading" :disabled="loading" class="login100-form-btn" type="submit" @click.prevent="login()">
              LOGIN
              <v-icon right>lock_open</v-icon>
            </v-btn>
          </div>
          <div class="container-login100-form-btn">
            <v-btn :loading="loadingSignup" :disabled="loadingSignup" class="login100-form-btn" :href="source" target="_blank" slot="activator" @click="signuppage">Signup &nbsp;
              <i class="fas fa-user-plus" />
            </v-btn>
          </div>
          <div class="container-login100-form-btn">
            <v-divider></v-divider>
            <v-btn flat large class="login100-form-btn" :loading="loadingSignup" :disabled="loadingSignup" :href="source" target="_blank" slot="activator" @click="forgotpage">
              Forgot Password?
            </v-btn>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";

export default {
  name: "Login",
  data: () => ({
    drawer: null,
    email: null,
    pass: null,
    feedback: null,
    loader: null,
    loading: false,
    loaderSignup: null,
    loadingSignup: false
  }),
  methods: {
    signuppage() {
      this.$router.push({ name: "Signup" });
    },
    forgotpage() {
      this.$router.push({ name: "Forgot" });
    },
    login() {
      this.loader = "loading";
      let parent = this;
      if (this.email && this.pass) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.pass)
          .then(() => {
            this.$router.push({ name: "Status" });
            console.log("logged in");
            this.feedback = null;
          })
          .catch(error => {
            // Handle Errors here.
            //   const errorCode = error.code;
            const errorMessage = error.message;
            this.feedback = errorMessage;
            console.log(errorMessage);
          });
      }
    }
  },
  mounted() {},
  props: {
    source: String
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);
      this.loader = null;
    }
  }
};
</script>
<style scoped src='../assets/css/login.css'>
</style>
