<template>
  <v-toolbar class="toolbar">
    <v-toolbar-title id="title">
    </v-toolbar-title>

    <!-- <v-btn>
        <v-badge right color="red" overlap>
          <v-icon slot="badge" dark small>fas fa-exclamation</v-icon>
          <v-icon large color="grey lighten-1">
            far fa-bell
          </v-icon>
        </v-badge>
      </v-btn> -->
          <a href="/" class="smaller delta"><img src="@/assets/logo.png" height=53px alt="DeltaHacks Logo" /></a>
      <v-btn flat to="/status" v-if="c_user" class="button hide">Status</v-btn>
      <v-btn flat to="/apply" v-if="c_user" class="button hide">Apply Now</v-btn>
      <v-btn flat to="/signup" v-if="!c_user" class="button hide">Signup</v-btn>
      <v-btn flat to="/login" v-if="!c_user" class="button hide">Login</v-btn>
      <v-btn flat to="/" class="button hide">Contact</v-btn>
      <v-btn flat to="/FAQ" class="button hide">FAQ</v-btn>
    <div class="text-xs-center mobile"  >
      <v-menu offset-y>
        <v-btn flat slot="activator" class="button menu" right>Menu</v-btn>&ensp;

        <v-list style='background:transparent'>
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

        </v-list>
      </v-menu>
    </div>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-chip color="white" text-color="black" class="clickable hide">
      <v-avatar>
        <v-icon>account_circle</v-icon>
      </v-avatar>
      {{c_user.email}}
    </v-chip>&ensp; &ensp;

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
<style scoped>
#title{
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
  position: relative;
  margin-right: 50px

}

@media only screen and (max-width:960px) {
  .smaller.delta {
  width: 2%;
  height: auto;
/*   position: relative;
  margin-right: 140px;
  margin-left: -60px;
  padding-right: 80%; */

}
}

@media only screen and (max-width:640px) {
  .smaller.delta {
  width: 2%;
  height: auto;
  /* position: relative;
  margin-right: 120px */

}
}
.clickable {
  cursor: pointer;
}

.button {
  -moz-appearance: none;
  -webkit-appearance: none;
  -ms-appearance: none;
  -moz-transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out,
    color 0.2s ease-in-out;
  -webkit-transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out,
    color 0.2s ease-in-out;
  -ms-transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out,
    color 0.2s ease-in-out;
  transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;
  float: left;
  background-color: transparent;
  font-family: sans-serif;
  border: 1;
  border-radius: 200px;
  box-shadow: inset 0 0 0 2px #fff;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  line-height: 42px;
  padding: 0 1.25em;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  border-bottom: 10px

}
 .button:hover,
.button:active {
  box-shadow:  0 0 0 2px #017ef2;
  color: #017ef2;
  background-color: transparent;
  transition: 0.02s;
} 



@media only screen and (max-width:960px) {
  .hide {
    display:none;
  }
}

@media only screen and (min-width:961px) {
  .mobile {
    display:none;
  }
}

.menu {
  position: absolute;
  float: right;
  margin-top: -10px;
  margin-left: 80%;
}
</style>
