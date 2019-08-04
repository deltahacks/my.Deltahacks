<template>
  <v-toolbar class="toolbar" style="background-color:rgba(0,0,0,0.3)">
    <v-toolbar-title id="title">
      <img src="@/assets/logo.png" height="47px" alt="DeltaHacks Logo">&ensp;&ensp;
    </v-toolbar-title>
    <a href="/status" class="button button-hide">STATUS</a>&ensp;
    <a href="/apply" class="button button-hide">APPLY</a>&ensp;
    <!-- <a href="#" class="button button-hide">CONTACT</a>&ensp; -->
    <!-- <a href="/faq" class="button button-hide">FAQ</a>&ensp; -->
    <!-- <v-btn flat @click.prevent="logout" v-if="c_user">Logout</v-btn> -->
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-icon color="white" class="button-hide">person</v-icon>
    <a href="/status" class="button button-hide">{{c_user.email.toUpperCase()}}</a>
    <div class="text-xs-center">
      <v-menu offset-y>
        <v-avatar>
          <v-icon color="white">account_circle</v-icon>
        </v-avatar>

        <v-list style="background-color:#85F8B5;">
          <v-list-tile to="/">
            <v-list-tile-title v-if="c_user">Change Password</v-list-tile-title>
          </v-list-tile>

          <v-list-tile to="/login/forgot">
            <v-list-tile-title v-if="c_user">Forgot Password</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </div>
    <a @click.prevent="logout" class="button button-hide">LOGOUT</a>&ensp;
    <div class="text-xs-center mobile" style="margin-right:-40px;">
      <v-menu offset-y>
        <v-btn flat slot="activator" class="button" right>Menu</v-btn>

        &ensp;
        <v-list style="background-color:rgba(255,255,255,0.7);">
          <v-list-tile to="/status">
            <v-list-tile-title v-if="c_user">Status</v-list-tile-title>
          </v-list-tile>

          <v-list-tile to="/apply">
            <v-list-tile-title v-if="c_user">Apply</v-list-tile-title>
          </v-list-tile>

          <!-- <v-list-tile to="/">
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile>

          <v-list-tile to="/">
            <v-list-tile-title>FAQ</v-list-tile-title>
          </v-list-tile>-->
          <v-list-tile @click.prevent="logout" v-if="c_user">
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </div>
    <p>&ensp; &ensp; &ensp;</p>
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
      dhs: ["DH V", "DH IV", "DH III", "DH II"],
      current: "DH V",
      drawer: null,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ]
    };
  },
  methods: {
    tst() {
      console.log("FUUUUUUUUUUUCK");
    },
    async logout() {
      console.log("logging out");
      try {
        await firebase
          .auth()
          .signOut();
        console.log("Logout successful");
        this.$router.push({ name: "Login" });
      } catch (e) {
        console.log("Logout unsuccessful");
        console.log(e);
      }
    }
  }
};
</script>
<style scoped src='../assets/css/navbar.css'>
</style>
