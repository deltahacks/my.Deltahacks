<template>
  <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Your Dashboard</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/signup">Signup</v-btn>
      <v-btn flat to="/login">Login</v-btn>
      <v-btn flat @click.prevent="logout">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'Navbar', 
    data(){
        return{
            cuser: null
        }
    }

}
</script>

<style>
    .navbar {
        border: solid 2px black;
        padding: 0 0 0 0;
        margin: 0 0;    
    }
</style>
