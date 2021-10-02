<template>
  <div id="nav-box">

    <div class="rounded-box">
      <a href="https://www.deltahacks.com" target="_blank" id="title" class="heading">
        Delta<span style="font-weight: 300">Hacks</span>
        8
      </a>
      <h1 id="name" class="heading">
        {{ first }}<span style="font-weight: 300" v-if="(first.length + last.length) < 21" >{{ last }}</span>
      </h1>
    </div>
    <a id="logout" @click.prevent="logout">Log Out</a>
  </div>
</template>

<script lang="ts">
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Vue from 'vue';
import db from '../firebase_init';

export default Vue.extend({
  name: 'Navbar2',
  components: {},
  data() {
    return {
      c_user: firebase.auth().currentUser,
      dhs: ['DH VI', 'DH V', 'DH IV', 'DH III', 'DH II'],
      current: 'DH VI',
      drawer: null,
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' },
      ],
      first: 'Welcome',
      last: '',
    };
  },
  methods: {
    tst() {
      console.log('tst_error');
    },
    async logout() {
      console.log('logging out');
      try {
        await firebase.auth().signOut();
        console.log('Logout successful');
        this.$router.push({ name: 'Login' });
      } catch (e) {
        console.log('Logout unsuccessful');
        console.log(e);
      }
    },
  },
  async beforeMount() {
    // console.log('mounted');
    const appEmail = firebase.auth().currentUser!.email as string;
    // const genderStatus = await this.checkGenderInput(appEmail);
    try {
      db.collection(this.$store.state.currentHackathon)
        .doc('users')
        .collection('all')
        .doc(appEmail)
        .onSnapshot((snap) => {
          if (snap.exists) {
            this.first = snap.data()!.first ? snap.data()!.first : 'Welcome';
            this.last = snap.data()!.first ? snap.data()!.last : '';
          } else {
            this.first = 'Admin';
            this.last = '';
          }
        });
    } catch (err) {
      console.error(err);
    }
  },
});
</script>
<style scoped src='../assets/css/navbar.css'>
</style>
