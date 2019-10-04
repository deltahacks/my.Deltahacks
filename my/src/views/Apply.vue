<template>
  <v-app class="background">
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
    <form action="">
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
    <button @click="resetApplication">RESET</button>
    <button @click="resetApplication">Submit</button>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase, { firestore, FirebaseError } from 'firebase';
import Nav from '@/components/Nav.vue';
import Card from '@/components/Card.vue';

import { ApplicationModel, AppContents } from '../types';
import { blankApplication } from '../data';

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
        fieldType: 'date',
        model: ['personal', 'birthday'],
      },
      {
        label: 'Where do you study?',
        fieldType: 'single-select',
        selectData: ['Waterloo', 'McMaster'],
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
      {
        label: 'This is a test',
        fieldType: 'date',
        model: ['personal', 'birthday'],
      },
    ];
  },
});
</script>

<style scoped>
.card {
  margin: 10px 10px 10px 10px;
}

.background {
    background: linear-gradient(270deg, #1a7fc3, #39bc82);
    background-size: 200% 200%;
    -webkit-animation: animated 25s ease infinite;
    -moz-animation: animated 25s ease infinite;
    animation: animated 25s ease infinite;
}

@-webkit-keyframes animated {
    0% {
        background-position: 0% 50%
    }
    50% {
        background-position: 100% 50%
    }
    100% {
        background-position: 0% 50%
    }
}

@-moz-keyframes animated {
    0% {
        background-position: 0% 50%
    }
    50% {
        background-position: 100% 50%
    }
    100% {
        background-position: 0% 50%
    }
}

@keyframes animated {
    0% {
        background-position: 0% 50%
    }
    50% {
        background-position: 100% 50%
    }
    100% {
        background-position: 0% 50%
    }
}

</style>

