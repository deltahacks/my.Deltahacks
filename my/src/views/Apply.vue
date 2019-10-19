<template>
  <v-app class="sizefix">
    <div v-if="app._.status === 'submitted'" class="submitted-face" />
    <div v-if="app._.status === 'submitted'" class="submitted-message">
      Your application has been submitted!
      <br />We’ll let you know as soon as we make a decision.
    </div>
    <div class="background">
      <Nav class="fit"/>
      <v-snackbar
        top
        right
        :color="snack.color"
        v-model="snack.visible"
        :timeout="snack.timeout"
      >
        {{ snack.message }}
        <v-btn :color="snack.btnColor" flat text @click="snack.visible = false">Close</v-btn>
      </v-snackbar>
      <ValidationObserver ref="form">
        <form action>
          <div class="cardify">
              <p class="big">Apply here.</p>
              <p class="small">
                Please fill out this application form to the best of your abilities. This form will autosave, you can come back to submit it anytime before the deadline.<br><br>
                No programming experience? That's okay! We're just looking for well thought out answers. The more thought out your answers, the greater your chance of getting accepted. Only the questions under "Application Questions" will be judged. You'll get an email when we've made a decision.<br><br>
                Are you a high school student? You're eligible to attend - as long as you're 18 or older on the day of the event,<b> Jan 25, 2020</b>.
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
            :rules="{ mustBe: true }"
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
      <v-dialog v-model="resetDialogue" max-width="290">
        <v-card>
          <v-card-title class="headline">Reset application?</v-card-title>
          <v-card-text>
            Click "Reset" to reset your application. This action can't be
            undone.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" text @click="resetDialogue = false">
              Cancel
            </v-btn>
            <v-btn
              color="warning"
              text
              @click="(resetDialogue = false), resetApplication()"
            >
              Reset
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-container class="act-btn-group" text-xs-center>
        <v-layout align-center justify-center row wrap>
          <v-flex xs3>
            <v-btn
              class="act-btn act-btn__reset"
              block
              large
              @click="resetDialogue = true"
            >
              Reset
            </v-btn>
          </v-flex>
          <v-flex xs9>
            <v-btn
              class="act-btn act-btn__submit"
              block
              large
              @click="submitApp"
            >
              Submit
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase, { firestore, FirebaseError } from 'firebase';
import Nav from '@/components/Nav.vue';
import Card from '@/components/Card.vue';
import Checkbox from '@/components/Checkbox.vue';
import VueScrollReveal from 'vue-scroll-reveal';

import {
  ValidationProvider,
  ValidationObserver,
  extend,
} from 'vee-validate/dist/vee-validate.full';
import { oneOf, max } from 'vee-validate/dist/rules';

import { ApplicationModel, AppContents } from '../types';
import {
  blankApplication,
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
    /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/.test(
      url,
    ),
  message: 'Invalid URL',
});
extend('mustBe', {
  // If mustBe is true, then the value passed is an empty array, so we coerce the value to a boolean
  validate: (value, mustBeValue) =>
    mustBeValue.length > 0 ? value === mustBeValue[0] : !!value,
  message: 'Sorry, we\'re unable to accept applications without a "Yes" here!',
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

export default Vue.extend({
  data(): ApplicationModel {
    return {
      app: blankApplication,
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
    };
  },
  components: {
    Card,
    Nav,
    Checkbox,
  },
  methods: {
    // updates in progress application
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
      if (submitting && this.app._.status !== 'submitted' && verified) {
        this.app._.status = 'submitted';
        this.snack.message = 'Application submitted';
        this.snack.color = 'success';
        submit = true;
      } else if (submitting && this.app._.status !== 'submitted' && !verified) {
        this.snack.message = 'Please verify your email before submitting!';
        this.snack.color = 'error';
      }
      if (this.app._.status !== 'submitted' || submit) {
        this.getDB()
          .collection('DH6')
          .doc('applications')
          .collection('all')
          .doc(this.getUID())
          .set(this.app);
      } else {
        this.snack.message = 'Submission error';
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
        const invalidFields = Object.entries(errors).find(
          ([field, errors]: Array<any>) => errors.length,
        );
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
      if (this.app._.status !== 'submitted') {
        this.app = blankApplication as AppContents;
        this.snack.message = 'Application reset!';
        this.snack.color = 'warning';
      }
      this.updateAppProgress(false);
    },

    // does what it says
    redirectAfterSubmit(): void {
      this.$router.push({ name: 'Status' });
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

    async uploadResume(doc) {
      if (!doc) return;
      const { filename, file, id } = doc;
      const storeRef = firebase.storage().ref();
      try {
        const snapshot = await storeRef
          .child(`hackathon/DH6/users/${this.getUID()}/Resume.pdf`)
          .put(file);
        const url = await snapshot.ref.getDownloadURL();

        this.app.resume.filename = filename;
        this.app.resume.link = url;
        this.updateAppProgress(false);
      } catch (err) {
        console.log('File upload error');
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
      if (app.data()) this.app = app.data() as AppContents;
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
}

.act-btn-group {
  width: 50%;

  padding: 20px 0 40px 0;
}

@media only screen and (max-width: 960px) {
  .act-btn-group {
    width: 90%;
  }
  .box{
     text-align: center;
  }
  .big{
    padding-left:0;
    padding-right:0;
  }
  .small{
    padding-left:0;
    padding-right:0;
    text-align:center !important;
  }
  .cardify{
    width: 90% !important;
  }
}

@media only screen and (max-width: 1280px) and (min-width: 961px) {
  .act-btn-group {
    width: 70%;
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
  z-index: 10000;
  width: 97.5%;
}

.act-btn__reset {
  background-color: rgba(255, 255, 255, 0.2) !important;
}

.act-btn__submit {
  background-color: rgba(255, 255, 255, 0.1) !important;
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
  /* background: linear-gradient(270deg, #1a7fc3, #39bc82); */
  /* -webkit-animation: animated 25s ease infinite;
  -moz-animation: animated 25s ease infinite;
  animation: animated 25s ease infinite; */
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
/* New gradient */
  background: linear-gradient(269deg, #93278f, #ff8993, #6681ea, #43aaa2, #f26dab, #a254f2, #679fe4);
  background-size: 1400% 1400%;
  -webkit-animation: AnimationName 59s ease infinite;
  -moz-animation: AnimationName 59s ease infinite;
  animation: AnimationName 59s ease infinite;
}
@-webkit-keyframes AnimationName {
   0%{background-position:0% 50%}
   50%{background-position:100% 51%}
   100%{background-position:0% 50%}
}
@-moz-keyframes AnimationName {
   0%{background-position:0% 50%}
   50%{background-position:100% 51%}
   100%{background-position:0% 50%}
}
@keyframes AnimationName {
0%{background-position:0% 50%}
50%{background-position:100% 51%}
100%{background-position:0% 50%}
}

.fit{
  width: 92vw !important;
}


.cardify{
  font-family: "Montserrat";
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

</style>

