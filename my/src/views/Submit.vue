<template>
  <v-app class="sizefix">
    <div v-if="app._.status !== 'in progress'" class="submitted-face" />
    <div v-if="app._.status !== 'in progress'" class="submitted-message">
      Congratulations!
      <br />Your project has been submitted for consideration.
      <br />
      <div style="padding-top: 10px !important;">
      <a class="goback" href="../status">
        <i class="fas fa-arrow-left" /> &nbsp; Go Back To Status
      </a><br>
      <a class="logout" @click.prevent="logout">Logout</a>
      </div>
    </div>

    <div class="background">
      <Nav class="fit" />
      <v-snackbar top right :color="snack.color" v-model="snack.visible" :timeout="snack.timeout">
        {{ snack.message }}
        <v-btn :color="snack.btnColor" flat text @click="snack.visible = false">Close</v-btn>
      </v-snackbar>
      <ValidationObserver ref="form">
        <form action>
          <div class="cardify">
            <p class="big">Submit Project</p>
            <p class="small">
              Please answer the following questions in order to enroll your project for judging.
              <br />
              Kindly verify all input fields. Once the form is submitted, it cannot be modified!<br>
              <b>Only one team member is required to submit this form.</b>
            </p>
          </div>
          <ValidationProvider
            v-for="(question, i) in questions"
            :key="'question_' + i"
            :rules="question.requirements"
            :name="question.label"
            v-slot="{ errors }"
          >
            <Card
              v-scroll-reveal
              class="card"
              :title="question.label"
              :inputType="question.fieldType"
              :selectData="question.selectData"
              :requestUpdate="onFormChange"
              :textLimit="question.textLimit"
              :icon="question.icon"
              v-model="app[question.model[0]][question.model[1]]"
              :ref="question.label"
              :error="errors[0]"
              :resume="app.resume"
            />
          </ValidationProvider>
          <br>
              <div class="cardify">
            <p class="big">Project Member Details:</p>
            <hr>
          </div>
            <Card2
              v-for="i in 3"
              :key="i"
              :requestUpdate="onFormChange"
              v-scroll-reveal
              v-model="app.group[i - 1]"
              class="card"
              :title="'Team Member ' + i"
              inputType="text"
            />
        </form>
      </ValidationObserver>
      <Dialog
        title="Reset Submission"
        body="Are you sure you want to reset your Submission? This action can't be undone."
        v-model="resetDialogue"
      >
        <v-btn text @click="resetDialogue = false">Cancel</v-btn>
        <v-btn color="warning" text @click="(resetDialogue = false), resetApplication()">Reset</v-btn>
      </Dialog>
      <Dialog
        title="Submit project for judging?"
        body="Are you sure you want to submit your project for judging? You can't go back and edit it after."
        v-model="submitDialogue"
      >
        <v-btn text @click="submitDialogue = false">Cancel</v-btn>
        <v-btn color="warning" text @click="(submitDialogue = false), submitApp()">Submit</v-btn>
      </Dialog>
      <v-container class="act-btn-group" text-xs-center>
        <v-layout align-center justify-center row wrap>
          <v-flex xs3>
            <v-btn class="act-btn act-btn__reset" block large @click="resetDialogue = true">Reset</v-btn>
          </v-flex>
          <v-flex xs9>
            <v-btn class="act-btn act-btn__submit" block large @click="submitDialogue = true">Submit</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-app>
</template>

<script lang="ts">
/* eslint-disable no-restricted-syntax */
import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import VueScrollReveal from 'vue-scroll-reveal';
import deepmerge from 'deepmerge';

import firebaseMaster from 'firebase';
import functions from 'firebase/functions';

import Nav from '@/components/Nav.vue';
import Card from '@/components/Card.vue';
import Card2 from '@/components/Card2.vue';
import Dialog from '@/components/Dialog.vue';

import {
  ValidationProvider,
  ValidationObserver,
  extend,
} from 'vee-validate/dist/vee-validate.full';
import { oneOf, max } from 'vee-validate/dist/rules';

import { ApplicationModel, AppContents } from '../types';
import {
  getBlankProject,
  submitQuestions,
  authorizations,
} from '../data';

Vue.use(VueScrollReveal, {
  class: 'v-scroll-reveal', // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
  duration: 1000,
  scale: 1.35,
  distance: '10px',
  mobile: true,
  reset: true,
});

extend('oneOf', {
  validate: (value, options) => options.includes(value),
  message: 'Invalid selection',
});
extend('max', {
  validate: max.validate,
  message: 'This field is too long',
});
extend('required', {
  validate: value => {
    if (Array.isArray(value)) return value.length
    return !!value
  },
  message: 'This field is required',
});
extend('link', {
  validate: url =>
    // eslint-disable-next-line no-useless-escape
    /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/.test(url),
  message: 'Invalid URL',
});
extend('mustBe', {
  // If mustBe is true, then the value passed is an empty array, so we coerce the value to a boolean
  validate: (value, mustBeValue) =>
    (mustBeValue.length > 0 ? value === mustBeValue[0] : !!value),
  message: 'Sorry, we\'re unable to accept applications without a "Yes" here!',
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

export default Vue.extend({
  data(): ApplicationModel {
    return {
      app: getBlankProject(),
      questions: {},
      authorizations: {},
      updateTimeout: null,
      snack: {
        color: 'success',
        btnColor: 'white',
        timeout: 3000,
        visible: false,
        message: 'Progress saved!',
      },
      resetDialogue: false,
      submitDialogue: false,
    };
  },
  components: {
    Card,
    Card2,
    Nav,
    Dialog,
  },
  methods: {
    async logout() {
      try {
        await firebase.auth().signOut();
        this.$router.push({ name: 'Login' });
      } catch (err) {
        console.log(err);
      }
    },
    onFormChange() {
      if (this.updateTimeout) clearTimeout(this.updateTimeout);
      this.updateTimeout = setTimeout(() => {
        this.snack.message = 'Progress saved!';
        this.snack.color = 'success';
        this.updateAppProgress(false);
      }, 4000);
    },

    async updateAppProgress(submitting: boolean) {
      let submit = false;
      const verified = await (firebase.auth().currentUser as firebase.User)
        .emailVerified;
      if (submitting && this.app._.status === 'in progress' && verified) {
        this.snack.message = 'Application submitted';
        this.snack.color = 'success';
        submit = true;

        this.app.responses.challenges!.forEach((category) => {
          (this.app as any)._.categories[category.toLowerCase()] = [];
        });
      } else if (
        submitting &&
        this.app._.status === 'in progress' &&
        !verified
      ) {
        this.snack.message = 'Please verify your email before submitting!';
        this.snack.color = 'error';
        this.snack.visible = true;
        return;
      }
      try {
        const submitProjectResponse = await firebaseMaster
          .functions()
          .httpsCallable('submitProject')({
            app: this.app,
            userId: this.getUID(),
            submitting: submit
          });
  
        if (submitProjectResponse.data.error) {
          this.snack.message = submitProjectResponse.data.error;
          this.snack.color = 'error';
          this.snack.visible = true;
          return;
        }
  
        if (submitProjectResponse.data.submitted) {
          // Create scrim
          this.app._.status = 'submitted';
        }
      } catch (err) {
          this.snack.message = 'An unknown error occured';
          this.snack.color = 'error';
          this.snack.visible = true;
          return;
      }
    },

    // actually submits application
    async submitApp(): Promise<void> {
      const isValid = await (this.$refs.form as Vue & {
        validate: () => boolean;
      }).validate();
      if (!isValid) {
        this.snack.message = 'Invalid field(s) on form';
        this.snack.color = 'error';
        this.snack.visible = true;

        // Find the first invalid field name and scroll to it
        const { errors } = (this.$refs.form as any).ctx || { errors: [] };
        // eslint-disable-next-line no-shadow
        const invalidFields = Object.entries(errors).find(([field, errors]: Array<any>) => errors.length);
        if (invalidFields && invalidFields.length > 0) {
          this.$refs[invalidFields[0]][0].$el.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }

        return;
      }
      // If somebody is submitting their application, clear update queue to prevent extra updates from occuring after
      // the application is submitted
      if (this.updateTimeout) clearTimeout(this.updateTimeout);

      this.updateAppProgress(true);
    },

    // clears all fields in the application
    resetApplication(): void {
      if (this.app._.status === 'in progress') {
        this.app = getBlankProject() as any;
        this.snack.message = 'Application reset!';
        this.snack.color = 'warning';
      }
      this.updateAppProgress(false);
      this.setName();
    },

    // does what it says
    redirectAfterSubmit(): void {
      this.$router.push({ name: 'Status' });
    },

    // Grabs the application from where its store in firebase
    fetchFromFirebase(): Promise<any> {
      return this.$store.state.db
        .collection('DH6')
        .doc('hackathon')
        .collection('projects')
        .doc(this.getUID())
        .get();
    },

    async setName() {
      const profile = await this.getDB()
        .collection('users')
        .doc(this.getUID())
        .get();
      if (profile.exists) {
        if (profile.data()!.first && !this.app.name.first) {
          this.app.name.first = profile.data()!.first;
        }
        if (profile.data()!.last && !this.app.name.last) {
          this.app.name.last = profile.data()!.last;
        }
      }
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

      // If there's items in the blank application not present in the online application, reconcile the two.
      // For arrays, replace what's local with what's online
      if (app.data()) this.app = deepmerge(this.app, app.data(), { arrayMerge: (local, nonlocal) => nonlocal }) as AppContents;
      this.setName();
    } catch (error) {
      // Create popup modal here warning user
      console.log('Unable to fetch, trying again...');
    }
  },
  mounted(): void {
    this.questions = submitQuestions;
    this.authorizations = authorizations;
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700&display=swap');

.sizefix {
  overflow-x: hidden !important;
}
.card {
  padding: 10px 10px 0px 10px;
}
.submitted-face::before {
  opacity: 0;
  transition: opacity 0.2s linear;
}
.submitted-face {
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: white;
  z-index: 1000;
  opacity: 0.6;
  color: white;
}
.submitted-message {
  width: 50%;
  padding: 5%;
  left: 50%;
  top: 37.5%;
  transform: translate(-50%, 0);
  background-color: white;
  position: fixed;
  z-index: 2000;
  border: 1px solid white;
  border-radius: 20px;
  opacity: 0.8;
  text-align: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  font-size: 18px;
  font-family: 'Montserrat';
}

.act-btn-group {
  width: 50%;
  z-index: 10;
  padding: 20px 0 40px 0;
}

@media only screen and (max-width: 960px) {
  .act-btn-group {
    width: 90%;
  }
  .box {
    text-align: center;
  }
  .big {
    padding-left: 0;
    padding-right: 0;
  }
  .small {
    padding-left: 0;
    padding-right: 0;
    text-align: center !important;
  }

  .cardify {
    width: 85vw !important;
  }
}

@media only screen and (max-width: 1280px) and (min-width: 961px) {
  .act-btn-group {
    width: 70%;
  }
  .cardify {
    width: 67% !important;
  }
}

.act-btn {
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  opacity: 0.99;
  padding: 10px 23%;
  color: white;
  border-radius: 30px;
  transition: 0.1s ease-in-out;
  cursor: pointer;
  z-index: 100;
  width: 97.5%;
}

.act-btn__reset {
  background-color: rgba(255, 255, 255, 0.1) !important;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2) !important;
}

.act-btn__submit {
  background-color: rgba(255, 255, 255, 0.1) !important;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2) !important;
  float: right;
}

v-snackbar {
  background-color: red !important;
}

.background {
  width: 100% !important;
  min-width: 100vw;
  height: 100%;
  background-size: cover;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  /* background: linear-gradient(269deg, #6D0169, #D9636D, #405BC4, #1D847C, #7C2ECC, #4179BE); */
  background: linear-gradient(
    269deg,
    #7c1078,
    #e8727c,
    #4f6ad3,
    #2c938b,
    #8b3ddb,
    #5088cd
  );
  background-size: 1400% 1400%;
  -webkit-animation: ApplyAnimation 180s ease infinite;
  -moz-animation: ApplyAnimation 180s ease infinite;
  animation: ApplyAnimation 180s ease infinite;
}
@-webkit-keyframes ApplyAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 51%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@-moz-keyframes ApplyAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 51%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes ApplyAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 51%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.fit {
  width: 92vw !important;
}

.cardify {
  font-family: 'Montserrat';
  color: white !important;
  padding: 50px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 50px;
  height: 100%;
  width: 49%;
  margin: 50px auto 50px auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.big {
  font-size: 2.5em;
  font-weight: 600;
  color: white;
  /* margin: 50px; */
  font-family: 'Montserrat';
  text-align: center;
}

.small {
  font-size: 1.6em;
  line-height: 1.3em;
  font-weight: 300;
  text-align: left;
  /* padding: 0% 0% 0 5%; */
}

.goback {
  font-family: 'Montserrat';
  text-decoration: none;
  margin-top:50px !important;
}
.logout{
  font-size:1.3em;
  padding-top:10px;
  padding-left: 10px;
    font-family: 'Montserrat';
  text-decoration: none;
}
</style>

