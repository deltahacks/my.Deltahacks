<template>
  <v-app class="sizefix">
    <div v-if="app._.status === 'submitted'" class="submitted-face" />
    <div v-if="app._.status === 'submitted'" class="submitted-message">
      You've already submitted your application! We'll get back to you soon :)
      <br />
      <br />
      <div style="padding-top: 10px !important;">
      <a class="goback" href="../status">
        <i class="fas fa-arrow-left" /> &nbsp; Go Back To Status
      </a><br>
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
            <p class="big">Apply here.</p>
            <p class="small">
              Please fill out this application form to the best of your
              abilities. This form will autosave, you can come back to submit it
              anytime before the deadline.
              <br />
              <br />No programming experience? That's okay! We're just looking for
              well thought out answers. You'll get an email when we've made a
              decision.
              <br />
              <br />High school students are eligible to attend!
              <br />
              <br /> If you're having submission problems, please make sure that your email has been verified.
                     If problems persist, try using a different browser like Chrome.
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
              :upload="uploadResume"
              :resume="app.resume"
            />
          </ValidationProvider>
          <ValidationProvider
            v-for="(authorization, i) in authorizations"
            :key="'authorization_' + i"
            :rules="authorization.requirements"
            :name="authorization.label"
            v-slot="{ errors }"
          >
            <Checkbox
              v-model="app[authorization.model[0]][authorization.model[1]]"
              :title="authorization.label"
              :requestUpdate="onFormChange"
              :ref="authorization.label"
              :error="errors[0]"
            />
          </ValidationProvider>
        </form>
      </ValidationObserver>
      <Dialog
        title="Reset Application"
        body="Are you sure you want to reset your application? This action can't be undone."
        v-model="resetDialogue"
      >
        <v-btn text @click="resetDialogue = false">Cancel</v-btn>
        <v-btn color="warning" text @click="(resetDialogue = false), resetApplication()">Reset</v-btn>
      </Dialog>
      <Dialog
        title="Submit Application"
        body="Are you sure you want to submit your application? You can't go back and edit it after."
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
import Vue from 'vue';
import firebaseMaster from 'firebase';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import VueScrollReveal from 'vue-scroll-reveal';
import deepmerge from 'deepmerge';
import axios from 'axios';

import Nav from '@/components/Nav.vue';
import Card from '@/components/Card.vue';
import Checkbox from '@/components/Checkbox.vue';
import Dialog from '@/components/Dialog.vue';

import {
  ValidationProvider,
  ValidationObserver,
  extend,
} from 'vee-validate/dist/vee-validate.full';
import { oneOf, max } from 'vee-validate/dist/rules';

import { ApplicationModel, AppContents } from '../types';
import {
  getBlankApplication,
  applicationQuestions,
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
  validate: value => !!value,
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
extend('oldEnough', {
  validate: (birthday, [minimumAge, targetDate]) => {
    const difference = new Date(new Date(targetDate).valueOf() - new Date(birthday).valueOf()); // ms since epoch
    return Math.abs(difference.getUTCFullYear() - 1970) >= minimumAge;
  },
  message: (birthday, requirements) => `You must be ${requirements[0]} at the time of the event.`,
});
extend('validPhone', {
  validate: phoneNum =>
    // eslint-disable-next-line no-useless-escape
    /^[\+]?[0-9]\d{9,14}$/.test(phoneNum),
  message: 'Invalid phone number, Please enter a valid phone number in the form 1234567890, 01234567890 or +01234567890 (no spaces or special characters).',
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

export default Vue.extend({
  data(): ApplicationModel {
    return {
      app: getBlankApplication(),
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
    Nav,
    Checkbox,
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
      this.updateTimeout = setTimeout(() => this.updateAppProgress(false), 4000);
    },

    async updateAppProgress(submitting: boolean) {
      let updateError;
      try {
        const user = await firebaseMaster.auth().currentUser;
        if (user) {
          await user.reload();
        }
        const emailVerified = user && user.emailVerified;

        const updateResponse = await firebaseMaster
          .functions()
          .httpsCallable('updateApplication')({
            app: this.app,
            isSubmission: submitting,
            emailVerified,
          });

        if (updateResponse.data.error) {
          updateError = updateResponse.data.error;
        } else {
          if (submitting) {
            const response = await axios.get('https://api.ipify.org?format=json');
            const ipp = response.data.ip;
            const data = await axios.get(`https://ipapi.co/${ipp}/json/`);
            const geo = data.data;
            await this.$store.state.db
              .collection(this.$store.state.currentHackathon)
              .doc('users')
              .collection('all')
              .doc(user!.email)
              .set({
                first: this.app.name.first,
                last: this.app.name.last,
                ip: ipp,
                geo,
              }, { merge: true });
          }
          this.snack.message = submitting ? 'Application submitted' : 'Progress saved!';
          this.snack.color = 'success';
        }
      } catch (e) {
        console.error(e);
        updateError = 'Submission error';
      }

      if (updateError) {
        this.snack.message = updateError;
        this.snack.color = 'error';
      }

      this.snack.visible = true;
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      window.location.href = 'status';
    },

    // clears all fields in the application
    resetApplication(): void {
      if (this.app._.status === 'in progress') {
        this.app = getBlankApplication() as AppContents;
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
        .collection(this.$store.state.currentHackathon)
        .doc('applications')
        .collection('all')
        .doc(this.getUID())
        .get();
    },

    async uploadResume(doc) {
      if (!doc) return;
      const { filename, file, id } = doc;
      const storeRef = firebase.storage().ref();
      try {
        const snapshot = await storeRef
          .child(`hackathon/${this.$store.state.currentHackathon}/users/${this.getUID()}/Resume.pdf`)
          .put(file);
        const url = await snapshot.ref.getDownloadURL();

        this.app.resume.filename = filename;
        this.app.resume.link = url;
        this.updateAppProgress(false);
      } catch (err) {
        console.log('File upload error');
      }
    },
    async setName() {
      const profile = await this.getDB()
        .collection(this.$store.state.currentHackathon)
        .doc('users')
        .collection('all')
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

      // If there's items in the blank application not present in the online application, reconcile the two
      if (app.data()) this.app = deepmerge(this.app, app.data()) as AppContents;
      this.setName();
    } catch (error) {
      // Create popup modal here warning user
      console.log('Unable to fetch, trying again...');
    }
  },
  mounted(): void {
    this.questions = applicationQuestions;
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

