<template>
  <v-toolbar class="toolbar">
   <v-toolbar-title id="title">
    <a href="/" class="smaller delta"><img src="@/assets/logo.png" height=53px alt="DeltaHacks Logo" /></a>&ensp;&ensp;
    </v-toolbar-title>
      <!-- <v-btn>
        <v-badge right color="red" overlap>
          <v-icon slot="badge" dark small>fas fa-exclamation</v-icon>
          <v-icon large color="grey lighten-1">
            far fa-bell
          </v-icon>
        </v-badge>
      </v-btn> -->
      <a href="/status" class="button">STATUS</a>&ensp;
      <a href="/apply" class="button">APPLY NOW</a>&ensp;
      <!-- <v-btn flat to="/status" v-if="c_user" >Status</v-btn> -->
      <a href="/signup" class="button">SIGNUP</a>&ensp;
      <a href="/" class="button">LOGIN</a>&ensp;
      <!-- <v-btn flat to="/login" v-if="!c_user">Login</v-btn> -->
      <a href="#" class="button">CONTACT</a>&ensp;
      <a href="/faq" class="button">FAQ</a>&ensp;
      <!-- <v-btn flat @click.prevent="logout" v-if="c_user">Logout</v-btn> -->
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
            <a href="/" class="button">LOGOUT</a>&ensp;
      <v-chip class="button">
        <v-avatar><v-icon>account_circle</v-icon></v-avatar>
        {{c_user.email}}
      </v-chip>
      <!-- <v-chip  class="clickable" @click.prevent="logout" v-if="c_user">
        Logout
      </v-chip> -->
<p>&ensp; &ensp; &ensp;</p>
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
      drawer: null,
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' },
      ],
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
<style scoped src='../assets/css/navbar.css'>
</style>
