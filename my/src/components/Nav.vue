<template>
  <div id="nav-box">
    <a class="btnbox1" id="logout" @click.prevent="logout">Log Out</a>
    <a class="btnbox2" id="logout" href="../status">Status</a>
    <div class="rounded-box extended">
      <a href="https://www.deltahacks.com" target="_blank" id="title" class="heading">
        Delta<span style="font-weight: 300">Hacks</span>
        VI
      </a>
      <h1 id="name" class="heading">
        {{ first }}<span style="font-weight: 300;" v-if="(first.length + last.length) < 21" >{{ last }}</span>
      </h1>
    </div>
    <a class="btnbox3" href="../status">
      <i class="fas fa-arrow-left" /> &nbsp; Go Back To Status
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import db from '../firebase_init';

export default Vue.extend({
  name: 'Nav',
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
      console.log('tst');
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
      db.collection('users')
        .doc(appEmail)
        .onSnapshot((snap) => {
          if (snap.exists) {
            this.first = snap.data()!.first ? snap.data()!.first : 'Welcome';
            this.last = snap.data()!.first ? snap.data()!.last : '';
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
<style>
.extended {
  width: 72vw !important;
}
.btnbox1 {
  font-weight: 500 !important;
}
.btnbox2 {
  font-weight: 700 !important;
  text-decoration: none;
  /* padding-left:-20px !important; */
}
.btnbox1:hover,
.btnbox2:hover {
  /* font-weight:500!important; */
  opacity: 0.6 !important;
  transition: 0.5s !important;
}
.btnbox3 {
  width: 97vw;
  text-align: center;
  display: none;
  font-size: 1.1em;
  padding-top: 10px;
  padding-bottom: -40px;
  padding-left: 0px !important;
  margin: 0;
  color: white !important;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
}
.btnbox3:hover {
  cursor: pointer;
}
</style>
