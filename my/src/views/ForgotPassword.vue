<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Forgot your password?</v-toolbar-title>
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
                      <v-icon>person_add</v-icon>
                    </v-btn>
                    <span>Create an account</span>
                  </v-tooltip>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      v-model="email"
                      prepend-icon="person"
                      name="login"
                      label="Login"
                      type="text"
                      @click.prevent="reset"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn class="mx-auto" color="primary">Reset</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script lang="ts">
import firebase from 'firebase';
import Vue from 'vue';
import { ForgetPasswordModel } from '../types';

export default Vue.extend({
  name: 'ForgotPassword',
  data(): ForgetPasswordModel {
    return {
      drawer: null,
      email: null,
    };
  },
  methods: {
    signuppage() {
      this.$router.push({ name: 'Signup' });
    },
    async reset() {
      try {
        await firebase.auth().sendPasswordResetEmail(this.email as string);
        console.log('Email sent.');
        this.$router.push({ name: 'Login' });
      } catch (error) {
        console.log(error);
      }
    },
  },
  props: {
    source: String,
  },
});
</script>
