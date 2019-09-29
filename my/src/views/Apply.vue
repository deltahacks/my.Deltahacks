<template>
  <v-app>
    <Nav />
    <form action="">
      <Card
        class="card"
        v-for="(question, i) in questions"
        :key="i"
        :title="question.label"
        :requestUpdate="onFormChange"
        v-model="app[question.model[0]][question.model[1]]"
      />
    </form>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase, { firestore } from 'firebase';
import Nav from '@/components/Nav.vue';
import Card from '@/components/Card.vue';

import { ApplicationModel, AppContents } from '../types';

export default Vue.extend({
  data(): ApplicationModel {
    return {
      app: {
        name: {
          first: '',
          last: '',
        },
        contact: {
          email: '',
          phone: '',
        },
        first_submitted: new Date(),
        academics: {
          degree: '',
          major: '',
          graduating: '',
          school: '',
          year: '',
        },
        personal: {
          birthday: new Date(),
          gender: '',
          race: '',
        },
        emergency: {
          name: '',
          phone: '',
          relation: '',
        },
        documents: {
          download_link: '',
          filename: '',
          id: '',
        },
        profiles: {
          devpost: '',
          github: '',
          linkedin: '',
          website: '',
        },
        responses: {
          anything_else: '',
          q1: '',
          q2: '',
          q3: '',
          q4: '',
          workshops: [],
        },
        logistics: {
          discovered_by: '',
          diet_restrictions: '',
          shirt_size: '',
          traveling_from: '',
          hackathons_attended: 0,
        },
        resume: {
          filename: '',
          link: '',
        },
      },
      questions: {},
      updateTimeout: null,
    };
  },
  components: {
    Card,
    Nav,
  },
  methods: {
    // updates in progress application
    onFormChange() {
      if (this.updateTimeout) {
        clearTimeout(this.updateTimeout);
      }
      this.updateTimeout = setTimeout(this.updateAppProgress, 4000);
    },
    updateAppProgress(): void {
      console.log('Updated!');
      (this.$store.state.db as firebase.firestore.Firestore)
        .collection('DH6')
        .doc('applications')
        .collection('all')
        .doc(this.getUID())
        .set(this.app);
    },

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
    this.questions = [
      {
        label: "What's your first name?",
        fieldType: 'text',
        model: ['name', 'first'],
      },
      {
        label: 'And your last name?',
        fieldType: 'text',
        model: ['name', 'last'],
      },
      {
        label: "What's your birthday?",
        fieldType: 'text',
        model: ['personal', 'birthday'],
      },
      {
        label: 'Where do you study?',
        fieldType: 'text',
        model: ['academics', 'school'],
      },
      {
        label: 'And what do you study?',
        fieldType: 'text',
        model: ['academics', 'major'],
      },
      {
        label: 'What degree are you pursuing?',
        fieldType: 'multi-select',
        model: ['academics', 'degree'],
      },
      {
        label: 'What year are you in?',
        fieldType: 'text',
        model: ['academics', 'year'],
      },
      {
        label: 'And when do you expect to graduate?',
        fieldType: 'text',
        model: ['academics', 'graduating'],
      },
    ];
  },
});
</script>

<style scoped>
.card {
  margin: 10px 10px 10px 10px;
}
</style>

