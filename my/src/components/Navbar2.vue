<template>
  <div id="nav-box">
    <a id="logout" @click.prevent="logout">Log Out</a>
    <div class="rounded-box">
      <h1 id="title" class="heading">
        Delta<span style="font-weight: 300">Hacks</span> VI
      </h1>
      <h1 id="name" class="heading">First<span style="font-weight: 300">Last</span></h1>
    </div>
  </div>
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
    async logout() {
      console.log('logging out');
      try {
        await firebase
          .auth()
          .signOut();
        console.log('Logout successful');
        this.$router.push({ name: 'Login' });
      } catch (e) {
        console.log('Logout unsuccessful');
        console.log(e);
      }
    },
  },
});
</script>
<style scoped src='../assets/css/navbar.css'>
</style>
