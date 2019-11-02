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
    <v-btn @click="signin" class="checkinButtons" :disabled="!alreadyCheckedIn">Sign in building</v-btn>
    <v-btn @click="signout" class="checkinButtons" :disabled="!alreadyCheckedIn">Sign out building</v-btn>
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
  attendeeData: DocumentData | null,
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
      attendeeData: null,
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
        await db.collection('hackathon')
          .doc('DH5')
          .collection('Checked In')
          .doc(this.$route.params.id.toLowerCase())
          .set({
            checkedIn: true,
            time: new Date(),
            by: this.$store.state.firebase.auth().currentUser.email.toLowerCase(),
            whereabouts: [
              {
                initialCheckin: true,
                building: 'ETB',
                time: new Date(),
                by: this.$store.state.firebase
                  .auth()
                  .currentUser.email.toLowerCase(),
                type: 'incoming',
              },
            ],
            meals: 0,
          });

        this.feedback = true;
        this.alreadyCheckedIn = true;
        this.bannerMessage = 'Successfully checked in';
        console.log('Successfully written');
        this.attachListener();
      } catch (err) {
        console.log(err);
      }
    },
    beam() {
      db.collection('hackathon')
        .doc('DH5')
        .collection('FrontDesk')
        .doc(this.$store.state.firebase.auth().currentUser.email.toLowerCase())
        .set({ scanned: this.$route.params.id.toLowerCase() });
    },
    async signin() {
      return navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          await db.collection('hackathon')
            .doc('DH5')
            .collection('Checked In')
            .doc(this.$route.params.id.toLowerCase())
            .update({
              whereabouts: this.$store.state.firebase.firestore.FieldValue.arrayUnion(
                {
                  building: 'ETB',
                  geolocation: [
                    position.coords.latitude,
                    position.coords.longitude,
                  ],
                  time: new Date(),
                  by: this.$store.state.firebase
                    .auth()
                    .currentUser.email.toLowerCase(),
                  type: 'incoming',
                },
              ),
            });

          this.feedback = true;
          this.bannerMessage = 'Successfully signed in building';
          console.log('Successfully written');
        } catch (err) {
          console.log(err);
        }
      });
    },
    async signout() {
      return navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          await db.collection('hackathon')
            .doc('DH5')
            .collection('Checked In')
            .doc(this.$route.params.id.toLowerCase())
            .update({
              whereabouts: this.$store.state.firebase.firestore.FieldValue.arrayUnion(
                {
                  building: 'ETB',
                  geolocation: [
                    position.coords.latitude,
                    position.coords.longitude,
                  ],
                  time: new Date(),
                  by: this.$store.state.firebase
                    .auth()
                    .currentUser.email.toLowerCase(),
                  type: 'outgoing',
                },
              ),
            });

          this.feedback = true;
          this.bannerMessage = 'Successfully signed out building';
          console.log('Successfully written');
        } catch (err) {
          console.log(err);
        }
      });
    },
    attachListener() {
      db.collection('hackathon')
        .doc('DH5')
        .collection('Checked In')
        .doc(this.$route.params.id.toLowerCase())
        .onSnapshot((doc) => {
          this.attendeeData = doc.data() || null;
          if (this.attendeeData) {
            if (
              this.attendeeData.whereabouts[
                this.attendeeData.whereabouts.length - 1
              ].type === 'incoming'
            ) {
              this.lastStatus = `Checked into ${
                this.attendeeData.whereabouts[
                  this.attendeeData.whereabouts.length - 1
                ].building
              } at ${new Date(
                this.attendeeData.whereabouts[
                  this.attendeeData.whereabouts.length - 1
                ].time.seconds * 1000,
              )}`;
            } else {
              this.lastStatus = `Left ${
                this.attendeeData.whereabouts[
                  this.attendeeData.whereabouts.length - 1
                ].building
              } at ${new Date(
                this.attendeeData.whereabouts[
                  this.attendeeData.whereabouts.length - 1
                ].time.seconds * 1000,
              )}`;
            }
          }
          console.log('Current data: ', doc.data());
        });
    },
    async adjustMeals(adjustment) {
      console.log('Adjusting meal');
      try {
        await db.collection('hackathon')
          .doc('DH5')
          .collection('Checked In')
          .doc(this.$route.params.id.toLowerCase())
          .update({
            meals: this.meals += adjustment,
          });

        this.feedback = true;
        this.bannerMessage = 'Successfully Adjusted Meal';
        console.log('Successfully written');
      } catch (err) {
        console.log(err);
      }
    },
  },
  async mounted() {
    try {
      const doc = await db.collection('hackathon')
        .doc('DH5')
        .collection('Checked In')
        .doc(this.$route.params.id.toLowerCase())
        .get();

      if (doc.exists) {
        this.exists = true;
        this.alreadyCheckedIn = true;
        this.attendeeData = doc.data() || null;
        if (this.attendeeData) {
          if (
            this.attendeeData.whereabouts[
              this.attendeeData.whereabouts.length - 1
            ].type === 'incoming'
          ) {
            this.lastStatus = `Checked into ${
              this.attendeeData.whereabouts[
                this.attendeeData.whereabouts.length - 1
              ].building
            } at ${new Date(
              this.attendeeData.whereabouts[
                this.attendeeData.whereabouts.length - 1
              ].time.seconds * 1000,
            )}`;
          } else {
            this.lastStatus = `Left ${
              this.attendeeData.whereabouts[
                this.attendeeData.whereabouts.length - 1
              ].building
            } at ${new Date(
              this.attendeeData.whereabouts[
                this.attendeeData.whereabouts.length - 1
              ].time.seconds * 1000,
            )}`;
          }
        }
        this.meals = this.attendeeData!.meals;
        console.log('Document data:', doc.data());
        console.log('Listener Attached');
        this.attachListener();
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
