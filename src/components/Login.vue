<template>
<div id="app">
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-alert :value="feedback" type="error">
              {{ feedback }}
            </v-alert>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <v-btn
                    icon
                    large
                    :href="source"
                    target="_blank"
                    slot="activator"
                    to="/signup"
                  >
                     <v-icon >person_add</v-icon>
                  </v-btn>
                  <span>Create an account </span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="email"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="pass"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn class="mx-auto" color="primary" v-on:keyup.enter="login" @click.prevent="login">Login</v-btn>
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
import firebase from 'firebase'
export default {
    name: 'Login',
    data: () => ({
        drawer: null,
        email: null,
        pass: null,
        feedback: null

    }),
    methods: {
      signuppage(){
        this.$router.push({name : "Signup"})
      },
      login(){
          if(this.email && this.pass){
              firebase.auth().signInWithEmailAndPassword(this.email, this.pass).then(() => {
                this.$router.push({name: 'Dashboard'})
                this.feedback = null;
              }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                this.feedback = errorMessage;
                console.log(errorMessage)
            });
          }
      }
    },
    props: {
        source: String
    }
}
</script>
