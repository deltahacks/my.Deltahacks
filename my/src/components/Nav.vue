<template>
  <v-toolbar class="toolbar" style="background-color:rgba(0,0,0,0.3)">
    <v-toolbar-title id="title">
      <img src="@/assets/logo.png" height="47px" alt="DeltaHacks Logo" />
    </v-toolbar-title>
    <a href="/status" class="button button-hide">STATUS</a>&ensp;
    <a href="/apply" class="button button-hide">APPLY</a>&ensp;
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-icon color="white" class="button-hide">person</v-icon>
    <a href="/status" class="button button-hide">
      {{ uppercaseID }}
    </a>
    <div class="text-xs-center">
      <v-menu offset-y>
        <v-avatar>
          <v-icon color="white">account_circle</v-icon>
        </v-avatar>
        <v-list style="background-color:#85F8B5;">
          <v-list-tile to="/">
            <v-list-tile-title v-if="uid">Change Password</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/login/forgot">
            <v-list-tile-title v-if="uid">Forgot Password</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </div>
    <a @click.prevent="logout" class="button button-hide">LOGOUT</a>&ensp;
    <div class="text-xs-center mobile" style="margin-right:-40px;">
      <v-menu offset-y>
        <v-btn flat slot="activator" class="button" right>Menu</v-btn>
        <v-list style="background-color:rgba(255,255,255,0.7);">
          <v-list-tile to="/status">
            <v-list-tile-title v-if="uid">Status</v-list-tile-title>
          </v-list-tile>
          <v-list-tile to="/apply">
            <v-list-tile-title v-if="uid">Apply</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click.prevent="logout" v-if="uid">
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </div>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';

export default Vue.extend({
  name: 'Navbar',
  components: {},
  data(): {uid: firebase.User | null} {
    return {
      uid: firebase.auth().currentUser,
    };
  },
  methods: {
    async logout() {
      try {
        await firebase.auth().signOut();
        this.$router.push({ name: 'Login' });
      } catch (error) {
        console.log('Logout unsuccessful:', error);
      }
    },
  },
  computed: {
    uppercaseID() {
      return this.uid.email.toUpperCase();
    },
  },
});
</script>
<style scoped src="../assets/css/navbar.css"></style>
