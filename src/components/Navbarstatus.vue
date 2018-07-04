<template>
  <v-toolbar class="toolbar">
    <v-toolbar-title id="title">STATUS</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/apply" v-if="c_user" class="red lighten-3">Apply Now</v-btn>
      <v-btn flat to="/dashboard" v-if="c_user">{{ c_user.email }}</v-btn>
      <v-btn flat to="/signup" v-if="!c_user">Signup</v-btn>
      <v-btn flat to="/login" v-if="!c_user">Login</v-btn>
      <v-btn flat @click.prevent="logout" v-if="c_user">Logout</v-btn>
    </v-toolbar-items>
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
<style scoped src='../assets/css/navbar.css'>
</style>