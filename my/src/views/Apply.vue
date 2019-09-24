<template>
  <div>
    <Card title="Name" />
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import firebase from 'firebase';
import { ApplicationModel, ApplyState } from '../types';

type ApplicationPageData = ApplicationModel | ApplyState;

import Card from '../components/Card.vue';

export default Vue.extend({
  data(): any {
    return { app: {} } as ApplicationPageData;
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
      this.$router.push({ name: 'Status' });
    },

    // validates all fields before submission
    validateBeforeSubmit(): void {},
  },
  async created(): Promise<any> {
    try {
      const app = await this.$store.state.db
        .collection(this.$store.state.hackathon)
        .doc('applications')
        .collection('all')
        // .doc(firebase.auth().currentUser.email)
        .doc('test@test.com')
        .get();

      this.app = app.data();
    } catch (error) {
      console.log('Error tying to fetch data: ', error);
    }
    // fetch application data and store it in data here
  },
  mounted(): void {
    // populate autofill data here
  },
});
</script>

<style lang="stylus" scoped></style>