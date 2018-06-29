<template>
	<div class="limiter">
		<div class="container-login100" style="background-image: url('https://wallpapersite.com/images/pages/pic_w/14088.png');">
      <div class="wrap-login100">
				<form class="login100-form validate-form">
					<span class="login100-form-logo">
            <img src="@/assets/logo.png" height="90" width="90" alt="DeltaHacks Logo" />
					</span>
					<span class="welcomeheader">
						<b><u>DeltaHacks V Log In</u></b>
					</span>
					<div class="wrap-input100 validate-input" data-validate = "Enter username">
						<v-text-field prepend-icon="person" @keypress.enter="login()" name="login" label="Email" id="login" v-model="email" type="email" required></v-text-field>
					</div>
					<div class="wrap-input100 validate-input" data-validate="Enter password">
						 <v-text-field @keypress.enter="login()" prepend-icon="lock" name="password" label="Password" id="password" v-model="pass" type="password" required></v-text-field>
					</div>
                  <v-alert :value="feedback" type="error">
                    {{ feedback }}
                  </v-alert>
					<div class="container-login100-form-btn">
            <v-btn class="login100-form-btn" type="submit" :disabled="loading" :loading="loading" @click.prevent="login()">
              LOGIN<v-icon right>lock_open</v-icon>
						</v-btn>
					</div>
          <div class="container-login100-form-btn">
						 <v-btn class="login100-form-btn" :href="source" target="_blank" slot="activator" to="/signup" >Signup <v-icon right>person</v-icon> &nbsp; +</v-btn>
					</div>
				</form>
      </div>
		</div>
	</div>
</template>
<script>
import firebase from 'firebase';

export default {
  name: 'Login',
  data: () => ({
    drawer: null,
    email: null,
    pass: null,
    feedback: null,
  }),
  methods: {
    signuppage() {
      this.$router.push({ name: 'Signup' });
    },
    login() {
      if (this.email && this.pass) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.pass)
          .then(() => {
            this.$router.push({ name: 'Dashboard' });
            console.log('logged in');
            this.feedback = null;
          })
          .catch((error) => {
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
        .jsonp('http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=7waqfqbprs7pajbz28mqf6vz')
        .then(
          (response) => {
            this.$Progress.finish();
          },
          (response) => {
            this.$Progress.fail();
          },
        );
    },
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
    source: String,
  },
};
</script>
<style scoped lang="scss">
@import "../assets/css/main.css";
</style>
