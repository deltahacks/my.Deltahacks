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
      <a href="/status" class="button button-hide">STATUS</a>&ensp;
      <a href="/apply" class="button button-hide">APPLY NOW</a>&ensp;
      <!-- <v-btn flat to="/status" v-if="c_user" >Status</v-btn> -->
      <a href="/signup" class="button button-hide">SIGNUP</a>&ensp;
      <a href="/" class="button button-hide">LOGIN</a>&ensp;
      <!-- <v-btn flat to="/login" v-if="!c_user">Login</v-btn> -->
      <a href="#" class="button button-hide">CONTACT</a>&ensp;
      <a href="/faq" class="button button-hide">FAQ</a>&ensp;
      <!-- <v-btn flat @click.prevent="logout" v-if="c_user">Logout</v-btn> -->
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
            <a href="/" class="button button-hide">LOGOUT</a>&ensp;
      <v-chip class="button hide-chip">
        <v-avatar><v-icon>account_circle</v-icon></v-avatar>
        {{c_user.email}}
      </v-chip>
      <div class="text-xs-center mobile" style="margin-right:-60px;">
      <v-menu offset-y>
        <v-btn flat slot="activator" class="button" right>Menu</v-btn>&ensp;

        <v-list>

          <v-list-tile to="/status">
            <v-list-tile-title v-if="c_user">Status</v-list-tile-title>
          </v-list-tile>

          <v-list-tile to="/apply">
            <v-list-tile-title v-if="c_user">Apply Now</v-list-tile-title>
          </v-list-tile>

          <v-list-tile to="/">
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile>

          <v-list-tile to="/">
            <v-list-tile-title>FAQ</v-list-tile-title>
          </v-list-tile>

          <v-list-tile @click.prevent="logout" v-if="c_user">
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>

        </v-list>
      </v-menu>
    </div>
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
