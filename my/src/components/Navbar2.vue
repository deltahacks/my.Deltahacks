<template>
  <v-toolbar class="toolbar">
    <v-toolbar-title id="title">
      <a href="/" class="smaller delta"><img src="@/assets/logo.png" height=53px alt="DeltaHacks Logo" /></a>&ensp;&ensp;
    </v-toolbar-title>
    <a href="/status" class="button button-hide">STATUS</a>&ensp;
    <a href="/apply" class="button button-hide">APPLY</a>&ensp;
    <!-- <a href="#" class="button button-hide">CONTACT</a>&ensp; -->
    <!-- <a href="/faq" class="button button-hide">FAQ</a>&ensp; -->
    <!-- <v-btn flat @click.prevent="logout" v-if="c_user">Logout</v-btn> -->
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-icon class="button-hide" color='white'>person</v-icon>
    <a href="/status" class="button button-hide">
      {{c_user.email.toUpperCase()}}</a>
    <div class="text-xs-center">
      <v-menu offset-y>
        <v-avatar>
          <v-icon :color='white'>account_circle</v-icon>
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
    <a @click.prevent='logout' class="button button-hide">LOGOUT</a>&ensp;
    <div class="text-xs-center mobile" style="margin-right:-60px;">
      <v-menu offset-y>
        <v-btn flat slot="activator" class="button" right>Menu</v-btn>&ensp;

        <v-list style="background-color:transparent;">

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
          </v-list-tile> -->

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
        tst() {
            console.log('FUUUUUUUUUUUCK');
        },
        logout() {
            console.log('logging out');
            firebase
                .auth()
                .signOut()
                .then(
                    () => {
                        console.log('Logout successful');
                        this.$router.push({ name: 'Login' });
                    },
                    error => {
                        console.log('Logout unsuccessful');
                        console.log(error);
                    }
                );
        },
    },
};
</script>
<style scoped src='../assets/css/navbar.css'>
</style>
