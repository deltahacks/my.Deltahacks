<template>
  <v-toolbar dark class="toolbar">
    <v-spacer></v-spacer>

    <a href="/" class="smaller delta">
      <img src="@/assets/logo.png" height="53px" alt="DeltaHacks Logo" />
    </a>
    <v-toolbar-title id="title"></v-toolbar-title>

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
      <v-btn flat to="/status" v-if="c_user">Status</v-btn>
      <v-btn flat to="/apply" v-if="c_user">Apply Now</v-btn>
      <v-btn flat to="/signup" v-if="!c_user">Signup</v-btn>
      <v-btn flat to="/login" v-if="!c_user">Login</v-btn>
      <!-- <v-btn flat to="/">Contact</v-btn> -->
      <!-- <v-btn flat to="/">FAQ</v-btn> -->
      <!-- <v-btn flat @click.prevent="logout" v-if="c_user">Logout</v-btn> -->
    </v-toolbar-items>
    <v-chip
      color="white"
      text-color="black"
      class="clickable, hide-chip"
      style="margin: 0px 40px"
    >
      <v-avatar>
        <v-icon large :color="rgba(255, 255, 0, 0.5)">account_cidrcle</v-icon>
      </v-avatar>
      {{ c_user.email }}
    </v-chip>
    <!-- <v-chip  class="clickable " @click.prevent="logout " v-if="c_user ">
        Logout
      </v-chip> -->
    <v-spacer></v-spacer>

    <div class="text-xs-center, hide-nav ">
      <v-menu offset-y>
        <v-btn slot="activator " color="grey darken-3 " dark right>Menu</v-btn>

        <v-list>
          <v-list-tile to="/status ">
            <v-list-tile-title v-if="c_user">Status</v-list-tile-title>
          </v-list-tile>

          <v-list-tile to="/apply ">
            <v-list-tile-title v-if="c_user">Apply</v-list-tile-title>
          </v-list-tile>

          <!-- <v-list-tile to="/ ">
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile>

          <v-list-tile to="/ ">
            <v-list-tile-title>FAQ</v-list-tile-title>
          </v-list-tile> -->
        </v-list>
      </v-menu>
    </div>
  </v-toolbar>
</template>

<script lang="ts">
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Vue from 'vue';

export default Vue.extend({
  name: 'Navbar',
  components: {},
  data() {
    return {
      c_user: firebase.auth().currentUser,
      dhs: ['DH V', 'DH IV', 'DH III', 'DH II'],
      current: 'DH V',
      drawer: null,
      items: [{ title: 'Status' }, { title: 'Apply Now' }],
    };
  },
  methods: {
    async logout() {
      try {
        await firebase.auth().signOut();
        this.$router.push({ name: 'Login' });
      } catch (err) {
        console.log(err);
      }
    },
  },
});
</script>
<style>
#title {
  font-family: 'Roboto', serif;
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
@media only screen and (min-width: 960px) {
  .hide-nav {
    display: none;
  }
}

@media only screen and (max-width: 959px) {
  .hide-chip {
    display: none;
  }
  .smaller.delta {
    width: 2%;
    height: auto;
    position: absolute;
    left: 10%;
  }
}
</style>
