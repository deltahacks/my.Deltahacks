<template>
  <div id="app">
    <v-app id="inspire">
      <!-- <v-parallax height=900 src="https://vuetifyjs.com/static/doc-images/parallax/material.jpg"> -->
      <!-- <v-parallax height=1200 src="https://wallpapersite.com/images/pages/pic_w/9101.jpg">         -->
      <!-- <v-parallax height=1200 src="https://wallpapersite.com/images/pages/pic_w/14088.png"> -->
      <v-parallax height="100%" src="https://wallpapersite.com/images/pages/pic_w/13296.jpg">
        <v-container align-center justify-center>
          <v-layout row wrap align-center justify-center>
            <v-flex sm6>
              <v-flex>
                <v-card class="elevation-8">
                  <v-alert :value="feedback" type="error">
                    {{ feedback }}
                  </v-alert>
                </v-card>
              </v-flex>
              <v-card>

                <!-- Login/Signin -->
                <v-layout row align-center justify-center class="py-5">
                  <v-form>
                    <!-- <v-layout row> -->
                    <v-flex>
                      <img src="@/assets/logo.png" height="90" width="90" alt="DeltaHacks Logo" />
                      <h1 class="text-xs-center mb-5">
                        <h1>DeltaHacks V</h1>
                        <h2>Login Page</h2>
                      </h1>
                      <v-text-field prepend-icon="person" name="login" label="Email" id="login" v-model="email" type="email" required></v-text-field>
                    </v-flex>
                    <v-flex>
                      <v-text-field @keypress.enter="login()" prepend-icon="lock" name="password" label="Password" id="password" v-model="pass" type="password" required></v-text-field>
                    </v-flex>
                    <v-flex class="py-3">
                      <div class="text-xs-center">
                        <v-btn outline type="submit" :disabled="loading" :loading="loading" @click.prevent="login()">
                          Sign in
                          <v-icon right>lock_open</v-icon>
                          <span slot="loader" class="custom-loader">
                            <v-icon light>cached</v-icon>
                          </span>
                        </v-btn>
                      </div>
                      <div class="text-xs-center">
                        <v-btn color="info" dark :href="source" target="_blank" slot="activator" to="/signup">Sign Up
                          <v-icon right dark>person</v-icon>
                          <span slot="loader" class="custom-loader">
                            <v-icon light>cached</v-icon>
                          </span>
                        </v-btn>
                      </div>
                    </v-flex>
                  </v-form>
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-parallax>
    </v-app>
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
    feedback: null
  }),
  methods: {
    signuppage() {
      this.$router.push({ name: "Signup" });
    },
    login() {
      if (this.email && this.pass) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.pass)
          .then(() => {
            this.$router.push({ name: "Dashboard" });
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
    },
    htest() {
      this.$Progress.start();

      this.$http
        .jsonp(
          "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=7waqfqbprs7pajbz28mqf6vz"
        )
        .then(
          response => {
            this.$Progress.finish();
          },
          response => {
            this.$Progress.fail();
          }
        );
    }
  },
  mounted() {
    /*     window.addEventListener('keydown', (e) => {
      const key = e.which || e.keyCode;
      if (key === 13) {
        // alert("ay");
        this.login();
      }
    }); */
  },
  props: {
    source: String
  }
};
</script>

<style scoped>
#logo {
  margin-right: 40px;
}
</style>
