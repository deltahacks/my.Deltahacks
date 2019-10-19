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
  <div class="container-login100 background">
    <!-- "style="background-image: url('https://wallpapersite.com/images/pages/pic_w/14088.png');" -->
    <div class="wrap-login100">
      <div class="card">
        <img src="../assets/sidebar.png" draggable="false" alt="Sidebar+Logo" class="sidebar" />
      </div>
      <form ref="form" class="login100-form validate-form">
        <!-- <span class="login100-form-logo">
            <img src="@/assets/logo.png" height="90" width="90" alt="DeltaHacks Logo" />
        </span>-->
          <img src="../assets/vi.png" draggable="false" class="back-vi" />
          <div class="bigdiv">
            <template v-if="counter === 0">
              <div class="spanText">
                <span class="txt1">my</span>
                <span class="txt2">Delta</span>
                <span class="txt3">Hacks</span>
              </div>
              <div
                class="wrap-input100 validate-input"
                data-validate="Enter username"
              >
                <v-text-field
                  prepend-icon="email"
                  @keypress.enter="loginf()"
                  name="login"
                  color="#fff"
                  label="Email"
                  id="login"
                  v-model="email"
                  type="email"
                  required
                ></v-text-field>
              </div>
              <div
                class="wrap-input100 validate-input"
                data-validate="Enter password"
              >
                <v-text-field
                  @keypress.enter="loginf()"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  color="#fff"
                  id="password"
                  v-model="pass"
                  type="password"
                  required
                ></v-text-field>
              </div>
              <v-alert :value="feedback" type="error">{{ feedback }}</v-alert>
              <div class="container-login100-form-btn">
                <button
                  @click.prevent="login"
                  type="submit"
                  class="login100-btn"
                >
                  Login
                </button>
                <!-- <button type="submit2" class="login100-btn">Register</button> -->
                <!-- <v-btn :loading="loading" :disabled="loading" class="login100-form-btn" type="submit" @click.prevent="login()">Login -->
                <!-- <v-icon right>lock_open</v-icon> -->
                <!-- </v-btn> -->
                <!-- <v-btn :loading="loadingSignup" :disabled="loadingSignup" class="login100-form-btn" :href="source" target="_blank" slot="activator" @click="signuppage">Register &nbsp; -->
                <!-- <i class="fas fa-user-plus" /> -->
                <!-- </v-btn> -->
                <div class="forgotdiv">
                  <br />
                  <a class="forgot" v-on:click="counter = 1">
                    Create New Account
                  </a>
                  <br />
                  <a class="forgot" v-on:click="counter = 2">
                    Forgot Password?
                  </a>
                </div>
              </div>
            </template>
            <template v-else-if="counter === 1">
              <div class="spanText">
                <span class="txt1">Create </span>
                <span class="txt2">Account</span>
                <span class="txt3"></span>
              </div>
              <br />
              <span class="txt4">Please fill in the following details</span>
              <br />
              <div
                class="wrap-input100 validate-input"
                v-if="register_screen_1 === 1"
                data-validate="Enter username"
              >
                <v-text-field
                  prepend-icon="person"
                  @keypress.enter="loginf()"
                  name="fname"
                  label="Enter First Name"
                  color="#fff"
                  id="fname"
                  v-model="fName"
                  type="fname"
                  required
                ></v-text-field>
              </div>
            </div>
          </template>
          <template v-else-if="counter === 1">
            <div class="spanText">
              <span class="txt1">Create</span>
              <span class="txt2">Account</span>
              <span class="txt3"></span>
            </div>
            <br />
            <span class="txt4">Please fill in the following details</span>
            <br />
            <div
              class="wrap-input100 validate-input"
              v-if="register_screen_1 === 1"
              data-validate="Enter username"
            >
              <v-text-field
                prepend-icon="person"
                @keypress.enter="loginf()"
                name="fname"
                label="Enter First Name"
                color="#fff"
                id="fname"
                v-model="fName"
                type="fname"
                required
              ></v-text-field>
            </div>
            <div
              class="wrap-input100 validate-input"
              v-if="register_screen_1 === 1"
              data-validate="Enter username"
            >
              <v-text-field
                prepend-icon="person"
                @keypress.enter="loginf()"
                name="lname"
                label="Enter Last Name"
                color="#fff"
                id="lname"
                v-model="lName"
                type="lname"
                required
              ></v-text-field>
            </div>
            <div
              class="wrap-input100 validate-input"
              v-if="register_screen_2 === 1"
              data-validate="Enter username"
            >
              <v-text-field
                prepend-icon="email"
                @keypress.enter="loginf()"
                name="login"
                label="Enter Email"
                color="#fff"
                id="login"
                v-model="email"
                type="email"
                pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z0-9.-]{1,}[.]{1}[a-zA-Z0-9]{2,}"
                oninvalid="setCustomValidity('Please enter a valid email')"
                oninput="setCustomValidity('')"
                required
              ></v-text-field>
            </div>
            <div
              class="wrap-input100 validate-input"
              v-if="register_screen_2 === 1"
              data-validate="Enter password"
            >
              <v-text-field
                @keypress.enter="loginf()"
                prepend-icon="lock"
                name="password"
                label="Enter a Password"
                color="#fff"
                id="password"
                v-model="pass"
                type="password"
                required
              ></v-text-field>
            </div>
            <!-- <v-alert :value="feedback" type="error">
            {{ feedback }}
            </v-alert>-->
            <div class="container-login100-form-btn">
              <v-alert class="alert-box" :value="feedback" type="error">{{ feedback }}</v-alert>
              <button
                class="login100-btn forgot100-btn"
                v-if="register_screen_1 === 1"
                @click.prevent="registerNext()"
              >Next</button>
              <button
                @click.prevent="signup()"
                class="login100-btn forgot100-btn"
                v-if="register_screen_2 === 1"
              >Register</button>
            </div>
            <div class="forgotdiv">
              <br />
              <a class="forgot" v-if="register_screen_1 === 1" v-on:click="counter = 0">
                <i class="fas fa-arrow-left" />
                Go Back
              </a>
              <a
                class="forgot"
                v-if="register_screen_2 === 1"
                v-on:click="
                    (register_screen_1 = 1),
                      (register_screen_2 = 0),
                      (feedback = '')
                  "
                  <i class="fas fa-arrow-left" />
                  Go Back
                </a>
              </div>
            </template>
            <template v-else-if="counter === 2">
              <div class="spanText">
                <span class="txt1">Forgot</span>
                <span class="txt2"> Pass</span>
                <span class="txt3">word</span>
              </div>
              <br />
              <p class="txt4">
                Please enter your email and a link will be sent to it.
              </p>
              <br />
              <div
                class="wrap-input100 validate-input"
                data-validate="Enter username"
              >
                <i class="fas fa-arrow-left" />
                Go Back
              </a>
            </div>
          </template>
          <template v-else-if="counter === 2">
            <div class="spanText">
              <span class="txt1">Forgot</span>
              <span class="txt2">Pass</span>
              <span class="txt3">word</span>
            </div>
            <br />
            <p class="txt4">Please enter your email and a link will be sent to it.</p>
            <br />
            <div class="wrap-input100 validate-input" data-validate="Enter username">
              <v-text-field
                prepend-icon="email"
                @keypress.enter="loginf()"
                name="login"
                label="Email"
                color="#fff"
                id="login"
                v-model="email"
                type="email"
                required
              ></v-text-field>
            </div>
            <!-- <v-alert :value="feedback" type="error">
            {{ feedback }}
            </v-alert>-->

            <div class="container-login100-form-btn">
              <button class="login100-btn forgot100-btn">Submit</button>
            </div>
            <div class="forgotdiv">
              <br />
              <a class="forgot" v-on:click="counter = 0">
                <i class="fas fa-arrow-left" />
                Go Back
              </a>
            </div>
          </template>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import firebase, { firestore } from 'firebase';
import Vue from 'vue';
import axios from 'axios';
import { LoginModel } from '../types';

export default Vue.extend({
  name: 'Login',
  data(): LoginModel {
    return {
      counter: 0,
      register_screen_1: 1,
      register_screen_2: 0,
      drawer: null,
      email: '',
      pass: '',
      fName: '',
      lName: '',
      feedback: '',
      loader: null,
      loading: false,
      loaderSignup: null,
      loadingSignup: false,
    };
  },
  methods: {
    signuppage() {
      this.$router.push({ name: 'Signup' });
    },
    forgotpage() {
      this.$router.push({ name: 'Forgot' });
    },
    async login() {
      this.loader = 'loading';
      const parent = this;
      if (this.email && this.pass) {
        try {
          await firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.pass);
          this.$router.push({ name: 'Status' });
          console.log('logged in');
          this.feedback = '';
        } catch (error) {
          // Handle Errors here.
          //   const errorCode = error.code;
          const errorMessage = error.message;
          this.feedback = errorMessage;
          console.log(errorMessage);
        }
      }
    },
    async signup() {
      if (this.getForm().checkValidity()) {
        try {
          const user = await firebase
            .auth()
            .createUserWithEmailAndPassword(
              this.email as string,
              this.pass as string
            );
          await this.$store.state.db
            .collection('users')
            .doc(this.email)
            .set({
              first: this.fName,
              last: this.lName,
              email: this.email,
              time: firebase.firestore.Timestamp.fromDate(new Date()),
              user_id: user.user!.uid,
              ip: null,
            });
          const response = await axios.get(
            'https://cors-anywhere.herokuapp.com/https://api.ipify.org?format=json'
          );
          const ipp = response.data.ip;
          const data = await axios.get(
            `https://cors-anywhere.herokuapp.com/https://ipapi.co/${ipp}/json/`
          );
          const geo = data.data;
          await this.$store.state.db
            .collection('users')
            .doc(this.email)
            .update({
              geo,
              user_id: user.user!.uid,
              ip: ipp,
            });
          await firebase.auth().currentUser!.sendEmailVerification();
          this.feedback = 'Please verify your email.';
          console.log('Registered');
        } catch (e) {
          const errorMessage = e.message;
          this.feedback = errorMessage;
          console.log(errorMessage);
        }
      } else {
        this.getForm().reportValidity();
      }
    },
    registerNext() {
      if (this.getForm().checkValidity()) {
        this.register_screen_1 = 0;
        this.register_screen_2 = 1;
      } else {
        this.getForm().reportValidity();
      }
    },
    getForm(): HTMLFormElement {
      return this.$refs.form as HTMLFormElement;
    },
  },
  mounted() {},
  props: {
    source: String,
  },
  watch: {
    loader() {
      const l: any = this.loader;
      this[l] = !this[l];

      setTimeout(() => {
        this[l] = false;
      }, 3000);
      this.loader = null;
    },
  },
});
</script>
<style scoped src='../assets/css/login.css'>
</style>
