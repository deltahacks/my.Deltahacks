<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>

          <v-layout align-center justify-center>
            <parallax-container id="logo" class="horizontal-card">
              <parallax-element class="text-container" :parallaxStrength="-5" :type="'translation'">
              </parallax-element>
              <parallax-element class="background-image" :parallaxStrength="-20" :type="'translation'">
                <img id="logo" src="http://deltahacks.com/img/logolarge.png" alt="">
              </parallax-element>
            </parallax-container>
            <v-flex xs12 sm8 md4>
              <v-alert :value="feedback" type="error">
                {{ feedback }}
              </v-alert>
              <v-card class="elevation-12">
                <v-toolbar dark color="teal lighten-2">
                  <v-toolbar-title>Login</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-tooltip bottom>
                    <v-btn icon large :href="source" target="_blank" slot="activator" to="/signup">
                      <v-icon>person_add</v-icon>
                    </v-btn>
                    <span>Create an account </span>
                  </v-tooltip>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="email">
                    </v-text-field>
                    <v-text-field @keypress.enter="login()" prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="pass">
                    </v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn class="mx-auto" color="yellow lighten-2" @click.prevent="login()">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
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
