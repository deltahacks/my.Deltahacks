<template>
  <div class="limiter">
    <div class="container-login100 background">
      <!-- "style="background-image: url('https://wallpapersite.com/images/pages/pic_w/14088.png');" -->
      <div class="wrap-login100">
        <!-- <div class="shadow-wrap"> -->
        <div class="card">
          <img
            src="../assets/sidebar_v2.png"
            draggable="false"
            alt="Sidebar+Logo"
            class="sidebar"
          />
        </div>
        </div>
        <!-- </div> -->
        <div class="login100-form">
        <form ref="form" class="validate-form">
          <!-- <span class="login100-form-logo">
            <img src="@/assets/logo.png" height="90" width="90" alt="DeltaHacks Logo" />
        </span>-->
          <!-- <img src="../assets/vi.png" draggable="false" class="back-vi" /> -->
          <img src="../assets/8.png" draggable="false" class="back-vi" />
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
                  color="#000000"
                  label="Email"
                  id="login"
                  v-model="email"
                  type="email"
                  required
                  dark
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
                  color="#000000"
                  id="password"
                  v-model="pass"
                  type="password"
                  required
                  dark
                ></v-text-field>
              </div>
              <v-alert
                class="alert-box"
                :value="feedback"
                type="error"
                color="rgba(255, 255, 255, 0.1)"
              >
                {{ feedback }}
              </v-alert>
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
                  color="#000000"
                  id="fname"
                  v-model="fName"
                  type="fname"
                  required
                  dark
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
                  color="#000000"
                  id="lname"
                  v-model="lName"
                  type="lname"
                  required
                  dark
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
                  color="#000000"
                  id="login"
                  v-model="email"
                  type="email"
                  pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z0-9.-]{1,}[.]{1}[a-zA-Z0-9]{2,}"
                  oninvalid="setCustomValidity('Please enter a valid email')"
                  oninput="setCustomValidity('')"
                  required
                  dark
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
                  color="#000000"
                  id="password"
                  v-model="pass"
                  type="password"
                  required
                  dark
                ></v-text-field>
              </div>
              <!-- <v-alert :value="feedback" type="error">
            {{ feedback }}
            </v-alert>-->
              <v-alert
                v-if="register_screen_alert === 1"
                class="alert-box"
                :value="feedback"
                type="error"
                color="rgba(255, 255, 255, 0.1)"
              >
                {{ feedback }}
              </v-alert>
              <div class="container-login100-form-btn">
                <button
                  class="login100-btn forgot100-btn"
                  v-if="register_screen_1 === 1"
                  @click.prevent="registerNext()"
                >
                  Next
                </button>
                <button
                  @click.prevent="signup()"
                  class="login100-btn forgot100-btn"
                  v-if="register_screen_2 === 1"
                >
                  Register
                </button>
              </div>
              <div class="forgotdiv">
                <br />
                <a
                  class="forgot"
                  v-if="register_screen_1 === 1"
                  v-on:click="counter = 0"
                >
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
              <p class="txt4">
                Please enter your email and a link will be sent to it.
              </p>
              <br />
              <div
                class="wrap-input100 validate-input"
                data-validate="Enter username"
              >
                <v-text-field
                  prepend-icon="email"
                  @keypress.enter="loginf()"
                  name="login"
                  label="Email"
                  color="#000000"
                  id="login"
                  v-model="email"
                  type="email"
                  required
                  dark
                ></v-text-field>
              </div>
              <v-alert
                :v-if="counter === 2"
                class="alert-box"
                :value="feedback"
                type="error"
                color="rgba(255, 255, 255, 0.1)"
              >
                {{ feedback }}
              </v-alert>
              <!-- <v-alert :value="feedback" type="error">
            {{ feedback }}
            </v-alert>-->
              <div class="container-login100-form-btn">
                <button @click.prevent="reset()" class="login100-btn forgot100-btn">Reset</button>
              </div>
              <div class="forgotdiv">
                <br />
                <a class="forgot" v-on:click="counter = 0, feedback=''">
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
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
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
      register_screen_alert: 0,
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
          const user = await firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.pass);
          this.$router.push({ name: 'Status' });
          console.log('logged in');
          this.feedback = '';
        } catch (error) {
          // Handle Errors here.
          //   const errorCode = error.code;
          const errorMessage = error.message;
          console.log('CODE', error.code);
          switch (error.code) {
            case 'auth/user-not-found':
              this.feedback = 'That account does not exist.';
              break;
            case 'auth/wrong-password':
              this.feedback = 'Invalid password.';
              break;
            case 'auth/too-many-requests':
              this.feedback = 'Please try logging in again later.';
              break;
            default:
              this.feedback = errorMessage;
              break;
          }
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
              this.pass as string,
            );
          const response = await axios.get('https://api.ipify.org?format=json');
          const ipp = response.data.ip;
          const data = await axios.get(`https://ipapi.co/${ipp}/json/`);
          const geo = data.data;
          await this.$store.state.db
            .collection(this.$store.state.currentHackathon)
            .doc('users')
            .collection('all')
            .doc(this.email)
            .set({
              first: this.fName,
              last: this.lName,
              email: this.email,
              time: firebase.firestore.Timestamp.fromDate(new Date()),
              ip: ipp,
              geo,
              user_id: user.user!.uid,
            });
          await firebase.auth().currentUser!.sendEmailVerification();
          this.register_screen_alert = 1;
          this.feedback = 'Please verify your email.';
          console.log('Registered');
        } catch (e) {
          this.register_screen_alert = 1;
          const errorMessage = e.message;
          this.feedback = errorMessage;
          console.log(errorMessage);
        }
      } else {
        this.getForm().reportValidity();
      }
    },
    async reset() {
      if (!this.getForm().checkValidity()) {
        this.getForm().reportValidity();
        return;
      }
      firebase.auth().sendPasswordResetEmail(this.email).then(() => {
        this.feedback = 'Reset email sent.';
      }).catch((error) => {
        this.feedback = 'User with this email does not exist';
      });
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
