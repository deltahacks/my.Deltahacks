<template>
  <v-toolbar class="toolbar">
    <v-menu offset-y>
      <v-btn class="bold" slot="activator" color="primary" dark>
        {{ current }}
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="(item, index) in dhs"
          :key="index"
          @click="current = item"
        >
          <v-list-tile-title class>{{ item }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-toolbar-title id="title">Attendee Relations Dashboard</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <div class="text-xs-center mobile">
      <v-menu offset-y>
        <v-btn flat slot="activator" right>Menu</v-btn>
        &ensp;
        <v-list>
          <v-list-tile to="/stats">
            <v-list-tile-title v-if="c_user">Statistics</v-list-tile-title>
          </v-list-tile>

          <v-list-tile to="/status">
            <v-list-tile-title v-if="c_user">Status</v-list-tile-title>
          </v-list-tile>

          <v-list-tile to="/apply">
            <v-list-tile-title v-if="c_user">Apply</v-list-tile-title>
          </v-list-tile>

          <!-- <v-list-tile to="/">
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile>-->

          <v-list-tile to="/">
            <v-list-tile-title>FAQ</v-list-tile-title>
          </v-list-tile>

          <v-list-tile @click.prevent="logout" v-if="c_user">
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </div>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/stats" v-if="c_user" class="green lighten-2">
        Statistics
      </v-btn>
      <v-btn flat to="/status" v-if="c_user" class="blue lighten-3">
        Status
      </v-btn>
      <v-btn flat to="/apply" v-if="c_user" class="red lighten-3">
        Apply Now
      </v-btn>
      <v-btn flat to="/dashboard" v-if="c_user">{{ c_user.email }}</v-btn>
      <v-btn flat to="/signup" v-if="!c_user">Signup</v-btn>
      <v-btn flat to="/login" v-if="!c_user">Login</v-btn>
      <v-btn flat @click.prevent="logout" v-if="c_user">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">
import firebase from 'firebase';
import Vue from 'vue';

export default Vue.extend({
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
    async logout() {
      console.log('logging out');
      try {
        await firebase.auth().signOut();
        console.log('Logout successful');
        this.$router.push({ name: 'Login' });
      } catch (e) {
        console.log('Logout unsuccessful');
        // showError(e);
      }
    },
  },
});
</script>
<style>
.navbar {
  border: solid 2px black;
  padding: 0 0 0 0;
  margin: 0 0;
}
#title {
  font-family: 'Roboto', serif;
  font-weight: 500;
}
/* @media only screen and (max-width: 1227px) {
  #title {
      font-family: "Roboto", serif;
      font-weight: 500;
      display: none;
  }
} */
@media only screen and (min-width: 961px) {
  .mobile {
    display: none;
  }
}
.bold {
  font-weight: 600;
}
</style>
