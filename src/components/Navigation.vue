<template>
  <v-toolbar dark class="toolbar">
    <v-spacer></v-spacer>
    <a href="/" class="smaller delta"><img src="@/assets/logo.png" height=53px alt="DeltaHacks Logo" /></a>
    <v-toolbar-title id="title">
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <!-- <v-btn>
        <v-badge right color="red" overlap>
          <v-icon slot="badge" dark small>fas fa-exclamation</v-icon>
          <v-icon large color="grey lighten-1">
            far fa-bell
          </v-icon>
        </v-badge>
      </v-btn> -->
      <v-btn flat to="/status" v-if="c_user" >Status</v-btn>
      <v-btn flat to="/apply" v-if="c_user" >Apply Now</v-btn>
      <v-btn flat to="/signup" v-if="!c_user">Signup</v-btn>
      <v-btn flat to="/login" v-if="!c_user">Login</v-btn>
      <v-btn flat to="/">Contact</v-btn>
      <v-btn flat to="/">FAQ</v-btn>
      <!-- <v-btn flat @click.prevent="logout" v-if="c_user">Logout</v-btn> -->
    </v-toolbar-items>
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
</style>
