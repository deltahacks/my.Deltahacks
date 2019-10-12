<template>
<v-app>
  <div class="background">
    <Nav />
    <v-snackbar
      top
      right
      :color="snack.color"
      v-model="snack.visible"
      :timeout="snack.timeout"
    >
      {{ snack.message }}
      <v-btn :color="snack.btnColor" flat text @click="snack.visible = false">
        Close
      </v-btn>
    </v-snackbar>
    <form action>
      <Card
        class="card"
        v-for="(question, i) in questions"
        :key="i"
        :title="question.label"
        :inputType="question.fieldType"
        :selectData="question.selectData"
        :requestUpdate="onFormChange"
        v-model="app[question.model[0]][question.model[1]]"
      />
    </form>
    <div class="text-xs-center">
      <v-btn class="act-btn" large @click="submitApp">Submit</v-btn>
      <br />
      <v-btn class="act-btn" large @click="resetApplication">Reset</v-btn>
    </div>
  </div>
</v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase, { firestore, FirebaseError } from 'firebase';
import Nav from '@/components/Nav.vue';
import Card from '@/components/Card.vue';
import VueScrollReveal from 'vue-scroll-reveal';

import { ApplicationModel, AppContents } from '../types';
import { blankApplication, applicationQuestions } from '../data';

Vue.use(VueScrollReveal, {
  class: 'v-scroll-reveal', // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
  duration: 1000,
  scale: 1.35,
  distance: '10px',
  mobile: true,
  reset: true,
});

export default Vue.extend({
  data(): ApplicationModel {
    return {
      app: blankApplication,
      questions: {},
      updateTimeout: null,
      snack: {
        color: 'success',
        btnColor: 'white',
        timeout: 3000,
        visible: false,
        message: 'Progress saved!',
      },
    };
  },
  components: {
    Card,
    Nav,
  },
  methods: {
    // updates in progress application
    onFormChange() {
      if (this.updateTimeout) clearTimeout(this.updateTimeout);
      this.updateTimeout = setTimeout(() => {
        this.snack.message = 'Progress saved!';
        this.snack.color = 'success';
        this.updateAppProgress();
      }, 4000);
    },

    updateAppProgress(): void {
      console.log('Updated!');
      this.getDB()
        .collection('DH6')
        .doc('applications')
        .collection('all')
        .doc(this.getUID())
        .set(this.app);
      this.snack.visible = true;
    },

    // actually submits application
    submitApp(): void {
      this.app._.status = 'submitted';
      this.snack.message = 'Application submitted';
      this.snack.color = 'success';
      this.updateAppProgress();
    },

    // clears all fields in the application
    resetApplication(): void {
      this.app = blankApplication as AppContents;
      this.snack.message = 'Application reset!';
      this.snack.color = 'warning';
      this.updateAppProgress();
    },

    // does what it says
    redirectAfterSubmit(): void {
      this.$router.push({ name: 'Status' });
    },

    // validates all fields before submission
    validateBeforeSubmit(): void {},

    // Grabs the application from where its store in firebase
    fetchFromFirebase(): Promise<any> {
      return this.$store.state.db
        .collection('DH6')
        .doc('applications')
        .collection('all')
        .doc(this.getUID())
        .get();
    },

    // grabs current (logged in) users unique identifier
    getUID: (): string => firebase.auth().currentUser!.email as string,
    getDB(): firebase.firestore.Firestore {
      return this.$store.state.db;
    },
  },
  async created(): Promise<any> {
    try {
      const app = await this.fetchFromFirebase();
      if (app.data()) this.app = app.data() as AppContents;
      console.log('Success');
    } catch (error) {
      // Create popup modal here warning user
      console.log('Unable to fetch, trying again...');
    }
  },
  mounted(): void {
    // populate autofill data here
    this.questions = applicationQuestions;
  },
});
</script>

<style scoped>
.card {
  padding: 10px 10px 10px 10px;
}

.act-btn {
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  font-family: Montserrat;
  opacity: 0.99;
  padding: 10px 23%;
  color: white;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.15) !important;
  transition: 0.1s ease-in-out;
  cursor: pointer;
  z-index: 10000;
  margin: 10px auto;
}

v-snackbar {
  background-color: red !important;
}

.background {
  width: 100% !important;
  min-width: 100vw;
  height: 100%;
  background-size: cover;
  background: linear-gradient(270deg, #1a7fc3, #39bc82);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-animation: animated 25s ease infinite;
  -moz-animation: animated 25s ease infinite;
  animation: animated 25s ease infinite;
}
</style>

