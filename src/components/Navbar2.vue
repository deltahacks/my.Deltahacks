<template>
  <v-toolbar class="toolbar">
    <v-spacer></v-spacer>
    <a href="/" class="smaller delta"><img src="@/assets/logo.png" height=53px alt="DeltaHacks Logo" /></a>
    <v-toolbar-title id="title">
    </v-toolbar-title>

    <v-spacer></v-spacer>
      <!-- <v-btn>
        <v-badge right color="red" overlap>
          <v-icon slot="badge" dark small>fas fa-exclamation</v-icon>
          <v-icon large color="grey lighten-1">
            far fa-bell
          </v-icon>
        </v-badge>
      </v-btn> -->
      <a href="/status" class="button">Status</a>&ensp;
      <a href="/apply" class="button">Apply Now</a>&ensp;
      <!-- <v-btn flat to="/status" v-if="c_user" >Status</v-btn> -->
      <a href="/signup" class="button">Signup</a>&ensp;
      <!-- <v-btn flat to="/login" v-if="!c_user">Login</v-btn> -->
      <a href="#" class="button">Contact</a>&ensp;
      <a href="#" class="button">FAQ</a>&ensp;
      <!-- <v-btn flat @click.prevent="logout" v-if="c_user">Logout</v-btn> -->
      <v-chip color="white" text-color="black" class="clickable">
        <v-avatar><v-icon>account_circle</v-icon></v-avatar>
        {{c_user.email}}
      </v-chip>
      <!-- <v-chip  class="clickable" @click.prevent="logout" v-if="c_user">
        Logout
      </v-chip> -->
    <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Navbar',
  components: {},
  data() {
    return {
      c_user: firebase.auth().currentUser,
      dhs: ['DH V', 'DH IV', 'DH III', 'DH II'],
      current: 'DH V',
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(
          () => {
            this.$router.push({ name: 'Login' });
          },
          (error) => {
            console.log(error);
          },
        );
    },
  },
};
</script>
<style>

#title {
  font-family: "Roboto", serif;
  font-weight: 500;
}

#search {
  width: 300px;
  margin-right: 15px;
}

.bold {
  font-weight: 600;
}
.smaller.delta {
  width: 2%;
  height: auto;
}
.clickable {
  cursor: pointer;
}

.button {
		-moz-appearance: none;
		-webkit-appearance: none;
		-ms-appearance: none;
		-moz-transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;
		-webkit-transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;
		-ms-transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;
		transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;
    float: left;
    background-color: transparent;
    font-family: sans-serif;
		border: 1;
		border-radius: 0;
		box-shadow: inset 0 0 0 2px #fff;
		color: #fff;
		cursor: pointer;
		/* display: inline-block; */
		font-size: 15px;
		font-weight: 600;
		line-height: 52px;
		padding: 0 1.75em;
		text-align: center;
		text-decoration: none;
		text-transform: uppercase;
	}
	.button:hover,
		.button:active {
      box-shadow: inset 0 0 0 2px #017ef2;
			color: #017ef2;
			background-color: transparent;}


</style>
