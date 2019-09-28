<template>
  <v-app>
    <Nav />
    <form action="">
      <Card
        class="card"
        v-for="(question, i) in questions"
        :key="i"
        :title="question.label"
        v-model="question.model"
      />
    </form>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';
import { ApplicationModel, AppContents } from '../types';

import Nav from '@/components/Nav.vue';
import Card from '@/components/Card.vue';

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
          degree: 'Bachelors',
          major: '',
          graduating: '',
          school: '',
          year: 'First Year',
        },
        personal: {
          birthday: new Date(),
          gender: 'M',
          race: 'Black / African American',
        },
        emergency: {
          name: '',
          phone: '',
          relation: 'Parent',
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
          shirt_size: 'M',
          traveling_from: '',
          hackathons_attended: 3,
        },
        resume: {
          filename: '',
          link: '',
        },
      },
      questions: {},
    };
  },
  components: {
    Card,
    Nav,
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

    // Grabs the application from where its store in firebase
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

    this.questions = [
      {
        label: "What's your first name?",
        fieldType: 'text',
        model: this.app.name.first,
      },
      {
        label: 'And your last name?',
        fieldType: 'text',
        model: this.app.name.last,
      },
      {
        label: "What's your birthday?",
        fieldType: 'text',
        model: this.app.personal.birthday,
      },
      {
        label: 'Where do you study?',
        fieldType: 'text',
        model: this.app.academics.school,
      },
      {
        label: 'And what do you study?',
        fieldType: 'text',
        model: this.app.academics.major,
      },
      {
        label: 'What degree are you pursuing?',
        fieldType: 'multi-select',
        model: this.app.academics.degree,
      },
      {
        label: 'What year are you in?',
        fieldType: 'text',
        model: this.app.academics.year,
      },
      {
        label: 'And when do you expect to graduate?',
        fieldType: 'text',
        model: this.app.academics.graduating,
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

