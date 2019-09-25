<template>
  <v-app>
    <Card title="Name" />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';
import {ApplicationModel, AppContents} from '../types';

import Card from '../components/Card.vue';

export default Vue.extend({
  data(): ApplicationModel {
    return {app: {}};
  },
  components: {
    Card,
  },
  methods: {
    // updates in progress application
    updateAppProgress(): void {},

    // actually submits application
    submitApp(): void {},

    // clears all fields in the application
    resetApplication(): void {},

    // does what it says
    redirectAfterSubmit(): void {
      this.$router.push({name: 'Status'});
    },

    // validates all fields before submission
    validateBeforeSubmit(): void {},

    // Grrabs the application from where its store in firebase
    fetchFromFirebase(): Promise<any> {
      return this.$store.state.db
        .collection(this.$store.state.hackathon)
        .doc('applications')
        .collection('all')
        .doc('test@test.com')
        .get();
    },

    // grabs current (logged in) users unique identifier
    getUID: (): string | null => firebase.auth().currentUser!.email,
  },
  async created(): Promise<any> {
    try {
      const app = await this.fetchFromFirebase();
      this.app = app.data() as AppContents;
    } catch (error) {
      console.log('Error tying to fetch data: ', error);
    }
  },
  mounted(): void {
    // populate autofill data here
  },
});
</script>

<style scoped></style>
