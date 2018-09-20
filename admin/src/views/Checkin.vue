<template>
  <v-app>
    <Navbar/>
    <v-snackbar v-model="feedback" top :color="bannerColor" :timeout="bannerTimeout">
      {{bannerMessage}}
      <v-btn color="white" flat @click="feedback = false">
        Close
      </v-btn>
    </v-snackbar>
    <div id="search">
      <v-text-field id="search" hint='Search for attendees' prepend-icon="search" hide-details single-line :clearable=true></v-text-field>
    </div>
    <h1 id="id">{{$route.params.id}}</h1>
    <h2> Last status: {{ lastStatus }}</h2>
    <v-btn @click="checkin" class="checkinButtons" :disabled="alreadyCheckedIn">Check in</v-btn>
    <v-btn @click="signin" class="checkinButtons" :disabled="!alreadyCheckedIn">Sign in building</v-btn>
    <v-btn @click="signout" class="checkinButtons" :disabled="!alreadyCheckedIn">Sign out building</v-btn>
    <div class="input-prepend-append">
      <button type="button" class="btn btn-prepend" @click='adjustMeals(-1)'> - </button>
      <input type="number" min="0" max="5" id="meals" name='f' :value="meals">
      <button type="button" class="btn btn-append" @click='adjustMeals(1)'> + </button>
    </div>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import db from '../private/firebase_init';

export default {
  data() {
    return {
      d: 'l',
      meals: 0,
      feedback: null,
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
    checkin() {
      db
        .collection('hackathon')
        .doc('DHV')
        .collection('checked in')
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
              by: this.$store.state.firebase.auth().currentUser.email.toLowerCase(),
              type: 'incoming',
            },
          ],
          meals: 0,
        })
        .then(() => {
          this.feedback = true;
          this.alreadyCheckedIn = true;
          this.bannerMessage = 'Successfully checked in';
          console.log('Successfully written');
          this.attachListener();
        })
        .catch(err => console.log(err));
    },
    signin() {
      return navigator.geolocation.getCurrentPosition((position) => {
        db
          .collection('hackathon')
          .doc('DHV')
          .collection('checked in')
          .doc(this.$route.params.id.toLowerCase())
          .update({
            whereabouts: this.$store.state.firebase.firestore.FieldValue.arrayUnion({
              building: 'ETB',
              geolocation: [position.coords.latitude, position.coords.longitude],
              time: new Date(),
              by: this.$store.state.firebase.auth().currentUser.email.toLowerCase(),
              type: 'incoming',
            }),
          })
          .then(() => {
            this.feedback = true;
            this.bannerMessage = 'Successfully signed in building';
            console.log('Successfully written');
          })
          .catch(err => console.log(err));
      });
    },
    signout() {
      return navigator.geolocation.getCurrentPosition((position) => {
        db
          .collection('hackathon')
          .doc('DHV')
          .collection('checked in')
          .doc(this.$route.params.id.toLowerCase())
          .update({
            whereabouts: this.$store.state.firebase.firestore.FieldValue.arrayUnion({
              building: 'ETB',
              geolocation: [position.coords.latitude, position.coords.longitude],
              time: new Date(),
              by: this.$store.state.firebase.auth().currentUser.email.toLowerCase(),
              type: 'outgoing',
            }),
          })
          .then(() => {
            this.feedback = true;
            this.bannerMessage = 'Successfully signed out building';
            console.log('Successfully written');
          })
          .catch(err => console.log(err));
      });
    },
    attachListener() {
      db
        .collection('hackathon')
        .doc('DHV')
        .collection('checked in')
        .doc(this.$route.params.id.toLowerCase())
        .onSnapshot((doc) => {
          this.attendeeData = doc.data();
          if (
            this.attendeeData.whereabouts[this.attendeeData.whereabouts.length - 1]
              .type === 'incoming'
          ) {
            this.lastStatus = `Checked into ${
              this.attendeeData.whereabouts[this.attendeeData.whereabouts.length - 1]
                .building
            } at ${new Date(this.attendeeData.whereabouts[this.attendeeData.whereabouts.length - 1]
              .time.seconds * 1000)}`;
          } else {
            this.lastStatus = `Left ${
              this.attendeeData.whereabouts[this.attendeeData.whereabouts.length - 1]
                .building
            } at ${new Date(this.attendeeData.whereabouts[this.attendeeData.whereabouts.length - 1]
              .time.seconds * 1000)}`;
          }
          console.log('Current data: ', doc.data());
        });
    },
    adjustMeals(adjustment) {
      console.log('Adjusting meal');
      db
        .collection('hackathon')
        .doc('DHV')
        .collection('checked in')
        .doc(this.$route.params.id.toLowerCase())
        .update({
          meals: (this.meals += adjustment),
        })
        .then(() => {
          this.feedback = true;
          this.bannerMessage = 'Successfully Adjusted Meal';
          console.log('Successfully written');
        })
        .catch(err => console.log(err));
    },
  },
  mounted() {
    db
      .collection('hackathon')
      .doc('DHV')
      .collection('checked in')
      .doc(this.$route.params.id.toLowerCase())
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.exists = true;
          this.alreadyCheckedIn = true;
          this.attendeeData = doc.data();
          if (
            this.attendeeData.whereabouts[this.attendeeData.whereabouts.length - 1]
              .type === 'incoming'
          ) {
            this.lastStatus = `Checked into ${
              this.attendeeData.whereabouts[this.attendeeData.whereabouts.length - 1]
                .building
            } at ${new Date(this.attendeeData.whereabouts[this.attendeeData.whereabouts.length - 1]
              .time.seconds * 1000)}`;
          } else {
            this.lastStatus = `Left ${
              this.attendeeData.whereabouts[this.attendeeData.whereabouts.length - 1]
                .building
            } at ${new Date(this.attendeeData.whereabouts[this.attendeeData.whereabouts.length - 1]
              .time.seconds * 1000)}`;
          }
          this.meals = this.attendeeData.meals;
          console.log('Document data:', doc.data());
          console.log('Listener Attached');
          this.attachListener();
          return true;
        }
        // doc.data() will be undefined in this case
        console.log('No such document!');
        this.lastStatus = 'Not checked in';
        return false;
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  },
};
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
