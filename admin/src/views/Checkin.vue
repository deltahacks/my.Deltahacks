<template>
  <v-app>
    <Navbar />
    <v-snackbar v-model="feedback" top :color="bannerColor" :timeout="bannerTimeout">
      {{bannerMessage}}
      <v-btn color="white" flat @click="feedback = false">Close</v-btn>
    </v-snackbar>
    <div id="search">
      <v-text-field
        id="search"
        hint="Search for attendees"
        prepend-icon="search"
        hide-details
        single-line
        :clearable="true"
      ></v-text-field>
    </div>
    <h1 id="id">{{$route.params.id}}</h1>
    <h2>Last status: {{ lastStatus }}</h2>
    <v-btn @click="beam" class="checkinButtons" :disabled="alreadyCheckedIn">Beam</v-btn>
    <v-btn @click="checkin" class="checkinButtons" :disabled="alreadyCheckedIn">Check in</v-btn>
    <div class="input-prepend-append">
      <button type="button" class="btn btn-prepend" @click="adjustMeals(-1)">-</button>
      <input type="number" min="0" max="5" id="meals" name="f" :value="meals" />
      <button type="button" class="btn btn-append" @click="adjustMeals(1)">+</button>
    </div>
  </v-app>
</template>

<script lang="ts">
import firebase from 'firebase/app';
import Vue from 'vue';
import Navbar from '@/components/Navbar.vue';
import db from '../firebase_init';

import DocumentData = firebase.firestore.DocumentData;

interface CheckinData {
  meals: number,
  feedback: boolean,
  bannerMessage: string,
  bannerTimeout: number,
  bannerColor: string,
  lastStatus: string | null,
  alreadyCheckedIn: boolean,
  exists: boolean
}

export default Vue.extend({
  data(): CheckinData {
    return {
      meals: 0,
      feedback: false,
      bannerMessage: 'Success',
      bannerTimeout: 2000,
      bannerColor: 'success',
      lastStatus: null,
      alreadyCheckedIn: false,
      exists: false,
    };
  },
  components: {
    Navbar,
  },
  methods: {
    async checkin() {
      try {
        await db.collection('DH6')
          .doc('hackathon')
          .collection('checked in')
          .doc(this.$route.params.id.toLowerCase())
          .set({
            time: new Date(),
            by: this.$store.state.firebase.auth().currentUser.email.toLowerCase(),
            meals: 0,
            type: 'attendee',
          });

        this.feedback = true;
        this.alreadyCheckedIn = true;
        this.bannerMessage = 'Successfully checked in';
        console.log('Successfully written');
      } catch (err) {
        console.log(err);
      }
    },
    beam() {
      db.collection('DH6')
        .doc('hackathon')
        .collection('live desk')
        .doc(this.$store.state.firebase.auth().currentUser.email.toLowerCase())
        .set({ scanned: this.$route.params.id.toLowerCase() });
    },
    async adjustMeals(adjustment) {
      console.log('Adjusting meal');
      try {
        const hackathon = await db.collection('DH6').doc('hackathon').get();
        if (this.meals < hackathon.data().mealsSoFar || adjustment < 0) {
          await db.collection('DH6')
            .doc('hackathon')
            .collection('checked in')
            .doc(this.$route.params.id.toLowerCase())
            .update({
              meals: this.meals += adjustment,
            });

          this.feedback = true;
          this.bannerMessage = 'Successfully Adjusted Meal';
          console.log('Successfully written');
        } else {
          const alert = confirm('🥝 FYI this attendee has already had enough meals, would you like to give them one anyway?');
          if (alert) {
            await db.collection('DH6')
              .doc('hackathon')
              .collection('checked in')
              .doc(this.$route.params.id.toLowerCase())
              .update({
                meals: this.meals += adjustment,
              });
            this.feedback = true;
            this.bannerMessage = 'Successfully Adjusted Meal';
            console.log('Successfully written');
          } else {
            console.log('Did not give');
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  async mounted() {
    try {
      const doc = await db.collection('DH6')
        .doc('hackathon')
        .collection('checked in')
        .doc(this.$route.params.id.toLowerCase())
        .get();

      if (doc.exists) {
        this.exists = true;
        this.alreadyCheckedIn = true;
        this.lastStatus = 'Checked In';
        this.meals = doc.data().meals;
        return true;
      }
      // doc.data() will be undefined in this case
      console.log('No such document!');
      this.lastStatus = 'Not checked in';
      return false;
    } catch (err) {
      console.log('Error getting document:', err);
    }
  },
});
</script>

<style scoped>
.checkinButtons {
  height: 10%;
}

#id {
  margin-top: 5%;
}

input {
  text-align: center;
}
#search {
  width: 90%;
  margin: 0 auto;
}
</style>
