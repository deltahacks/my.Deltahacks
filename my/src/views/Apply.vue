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
    <ValidationObserver ref="form" v-slot="foo">
      <form action>
        <ValidationProvider 
          v-for="(question, i) in questions" 
          :key="i" 
          :rules="question.requirements"
          :name="question.name || question.label"
          v-slot="{ errors }"
        >
          <Card
            v-scroll-reveal
            class="card"
            :title="question.label"
            :inputType="question.fieldType"
            :selectData="question.selectData"
            :requestUpdate="onFormChange"
            v-model="app[question.model[0]][question.model[1]]"
            :ref="question.name || question.label"
            :error="errors[0]"
          />
        </ValidationProvider>
      </form>
      <div class="action-buttons">
        <!-- <v-btn class="act-btn" large @click="resetApplication">Reset</v-btn> -->
        <v-btn class="act-btn" large @click="submitApp">Submit</v-btn>
      </div>
    </ValidationObserver>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase, { firestore, FirebaseError } from 'firebase';
import Nav from '@/components/Nav.vue';
import Card from '@/components/Card.vue';
import VueScrollReveal from 'vue-scroll-reveal';
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full';

import { ApplicationModel, AppContents } from '../types';
import { blankApplication, applicationQuestions } from '../data';

Vue.use(VueScrollReveal, {
  class: 'v-scroll-reveal', // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
  duration: 1000,
  scale: 1.35,
  distance: '10px',
  mobile: true,
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

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
    async submitApp(): Promise<void> {
      const isValid = await (this.$refs.form as Vue & { validate: () => boolean }).validate();
      if (!isValid) {
        this.snack.message = 'Invalid field(s) on form';
        this.snack.color = 'error';

        // Find the first invalid field name and scroll to it
        const { errors } = (this.$refs.form as any).ctx || { errors: [] };
        const invalidFields = Object.entries(errors).find(([field, errors] : Array<any>) => errors.length);
        if (invalidFields && invalidFields.length > 0) {
          this.$refs[invalidFields[0]][0].$el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        this.app._.status = 'submitted';
        this.snack.message = 'Application submitted';
        this.snack.color = 'success';
      }

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
    validateBeforeSubmit(): void {
      debugger
    },

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
    this.questions = applicationQuestions.map(question => {
      const newQuestion = { ...question }
      if (newQuestion.requirements && newQuestion.requirements.oneOf) {
        // If a requirement is to choose one of several options, use the selectData as a list of valid choices
        newQuestion.requirements.oneOf = newQuestion.selectData;
      }

      return newQuestion;
    });
  },
});
</script>

<style scoped>
.card {
  margin: 10px 10px 10px 10px;
}

.act-btn {
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  font-family: Montserrat;
  opacity: 0.99;
  padding: 10px 42%;
  color: white;
  border-radius: 30px;
  margin-right: 20px !important;
  background-color: rgba(255, 255, 255, 0.15) !important;
  transition: 0.1s ease-in-out;
  cursor: pointer;
  z-index: 10000;
}

.action-buttons {
  margin: 0 auto 50px auto;
}

v-snackbar {
  background-color: red !important;
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
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@-moz-keyframes animated {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes animated {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>

