<template>
  <v-toolbar class="toolbar">
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-menu offset-y>
      <v-btn class="bold" slot="activator" color="primary" dark>DH V</v-btn>
      <v-list>
        <v-list-tile v-for="(item, index) in dhs" :key="index" @click="">
          <v-list-tile-title class="">{{ item }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-toolbar-title id="title">Attendee Relations Dashboard</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <div id="search">
      <v-text-field clearable=true id="search" hint='Search for attendees' prepend-icon="search" hide-details single-line></v-text-field>
    </div>

    <v-toolbar-items class="hidden-sm-and-down">
      <!-- <v-btn>
        <v-badge right color="red" overlap>
          <v-icon slot="badge" dark small>fas fa-exclamation</v-icon>
          <v-icon large color="grey lighten-1">
            far fa-bell
          </v-icon>
        </v-badge>
      </v-btn> -->
      <v-btn flat to="/apply" v-if="c_user" class="red lighten-1">Apply Now</v-btn>
      <v-btn flat to="/dashboard" v-if="c_user">{{ c_user.email }}</v-btn>
      <v-btn flat to="/signup" v-if="!c_user">Signup</v-btn>
      <v-btn flat to="/login" v-if="!c_user">Login</v-btn>
      <v-btn flat @click.prevent="logout" v-if="c_user">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Navbar",
  components: {},
  data() {
    return {
      c_user: firebase.auth().currentUser,
      dhs: ["DH V", "DH IV", "DH III", "DH II"]
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(
          () => {
            this.$router.push({ name: "Login" });
          },
          error => {
            console.log(error);
          }
        );
    }
  }
};
</script>

<style>
.navbar {
  border: solid 2px black;
  padding: 0 0 0 0;
  margin: 0 0;
}

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
</style>
