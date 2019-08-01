<template>
  <div class="limiter">
    <div
      class="container-signup100"
      style="background-image: url('https://wallpapersite.com/images/pages/pic_w/14088.png');"
    >
      <div class="wrap-signup100">
        <form class="signup100-form validate-form">
          <span class="signup100-form-logo">
            <img src="@/assets/logo.png" height="90" width="90" alt="DeltaHacks Logo" />
          </span>
          <span class="welcomeheader">DeltaHacks V Admin Sign Up</span>

          <div class="wrap-input100 validate-input" data-validate="Enter username">
            <v-text-field
              prepend-icon="email"
              name="email"
              label="Email"
              type="email"
              v-model="admin_email"
            ></v-text-field>
          </div>
          <div class="wrap-input100 validate-input" data-validate="Enter password">
            <v-text-field
              prepend-icon="lock"
              name="password"
              label="Password"
              id="password"
              type="password"
              v-model="admin_password"
            ></v-text-field>
          </div>
          <div class="wrap-input100 validate-input" data-validate="Enter password">
            <v-text-field
              prepend-icon="lock"
              name="password2"
              label="Retype password"
              id="password2"
              type="password"
              v-model="admin_password_repeat"
            ></v-text-field>
          </div>
          <div class="wrap-input100 validate-input" data-validate="Enter secret">
            <v-text-field
              prepend-icon="lock"
              name="secret"
              label="Enter team secret"
              id="secret"
              type="text"
              v-model="admin_secret"
            ></v-text-field>
          </div>
          <div class="wrap-input100 validate-input" data-validate="Enter name">
            <v-text-field
              prepend-icon="person"
              name="name"
              label="Enter full name"
              id="name"
              type="text"
              v-model="admin_name"
            ></v-text-field>
          </div>
          <div class="container-signup100-form-btn">
            <v-alert :value="feedback" type="error">{{ feedback }}</v-alert>
            <v-btn
              class="signup100-form-btn"
              :loading="loading"
              :disabled="loading"
              @click.prevent="adminsignup"
            >
              Signup &nbsp;
              <i class="fas fa-user-plus" />
            </v-btn>
          </div>
          <div class="container-signup100-form-btn">
            <v-btn
              class="signup100-form-btn"
              :href="source"
              target="_blank"
              slot="activator"
              to="/"
            >
              LOGIN
              <v-icon right>lock_open</v-icon>
            </v-btn>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import firebase from 'firebase';
import functions from 'firebase/functions';
import Vue from 'vue';

/* eslint-disable camelcase */

interface SomeState {
  geo: null;
  email: null|string;
  drawer: null|string;
  loader: string;
  loading: boolean;
  password: null|string;
  feedback: string;
  loading2: boolean;
  color: string;
  admin_name: null|string;
  ip_address: null|string;
  admin_email: null|string;
  admin_secret: null|string;
  admin_password: null|string;
  password_repeat: null|string;
  successFeedback: boolean;
  admin_password_repeat: null|string;
}

export default Vue.extend({
  name: 'Signup',
  data(): SomeState {
    return {
      geo: null,
      email: null,
      drawer: null,
      loader: '',
      loading: false,
      password: null,
      feedback: '',
      loading2: false,
      color: 'success',
      admin_name: null,
      ip_address: null,
      admin_email: null,
      admin_secret: null,
      admin_password: null,
      password_repeat: null,
      successFeedback: false,
      admin_password_repeat: null,
    };
  },
  props: {
    source: String,
  } as any,
  methods: {
    async adminsignup() {
      this.loader = 'loading';
      if (
        this.admin_email
        && this.admin_password_repeat
        && this.admin_password
        && this.admin_secret
      ) {
        if (this.admin_password_repeat !== this.admin_password) {
          this.feedback = 'Both passwords need to be identical';
          return;
        }
        try {
          const adminSignupResponse = await firebase
            .functions()
            .httpsCallable('createAdminUser')({
              email: this.admin_email,
              password: this.admin_password,
              secret: this.admin_secret,
              name: this.admin_name,
            });
          console.log('RESPONSE: ', adminSignupResponse.data);
          this.successFeedback = true;
          if (adminSignupResponse.data.createdUser) {
            this.$router.push({
              name: 'Login',
              params: { successFeedback: 'true' },
            });
          }
        } catch (err) {
          this.feedback = 'There was an error :(';
          console.log('Error: ', err);
        }
      } else {
        this.feedback = 'You need to enter all the fields';
      }
    },
    signUpFirebase() {
      if (this.vuex_email && this.vuex_password && this.password_repeat) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.vuex_email, this.vuex_password)
          .then((user) => {
            console.log(user.user!.uid, 'ID');
            console.log(this.$store.state.db, 'DB');
            axios
              .get('https://api.ipify.org?format=json')
              .then((response) => {
                console.log(response.data.ip);
                const ipp = response.data.ip;
                axios
                  .get(`https://ipapi.co/${ipp}/json/`)
                  .then((data) => {
                    console.log(data.data);
                    this.geo = data.data;
                    this.$store.state.db
                      .collection('users')
                      .doc(this.vuex_email)
                      .set({
                        email: this.vuex_email,
                        geo: this.geo,
                        user_id: user.user!.uid,
                        ip: ipp,
                        is_admin: false,
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                console.log(response.data.ip);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .then(() => {
            console.log('success');
            this.$router.push({ name: 'Dashboard' });
          })
          .catch((err) => {
            this.feedback = err.message;
          });
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
        this.$store.commit('update_vuex_role', value);
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
<style scoped src='../assets/css/adminsignup.css'>
</style>
