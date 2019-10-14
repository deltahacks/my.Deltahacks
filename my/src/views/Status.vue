<template>
  <v-app class="dashboard background">
    <!-- <Navigation class="mobile"/> -->
    <Navbar2 class="navbar1" />
    <div class="container-status100">
      <div class="hide">
        <!-- RSVP Section (not on mobile! need to add) -->
        <!-- was rushing to get demo working so hardcoded inline styling for some of rsvp element -->
        <div
          class="wrap-status100"
          style="height:445px;padding:35px 55px 35px 55px;"
          v-if="step > 3"
        >
          <h1 v-if="!response.rsvp && !hasResponded" class="rtitle">
            🎉 Congratulations, you've been invited to DeltaHacks V!
          </h1>
          <h1 v-if="response.rsvp" class="rtitle">
            😉 Awesome, see you there!
          </h1>
          <h1 v-if="!response.rsvp && hasResponded" class="rtitle">
            We'll miss you, but thanks for letting us know!
          </h1>
          <h3 class>Will you be attending?</h3>
          <div style="padding-top:10px;">
            <div style="padding-top:10px;">
              <div class="mx-auto gg" style="display:inline-block;">
                <v-btn
                  large
                  color="success"
                  @click="toggleRSVP(true)"
                  :depressed="response.rsvp && hasResponded"
                  class="button1"
                >
                  Yes!
                </v-btn>
                <v-btn
                  large
                  color="error"
                  @click="toggleRSVP(false)"
                  :depressed="!response.rsvp && hasResponded"
                  class="button2"
                >
                  No.
                </v-btn>
              </div>
              <br />
              <br />
            </div>
            <!-- <label for="name" style='float:left'>
                            <strong>Will you be attending?*</strong>
                        </label><br>
            <v-switch @change="changeRSVP" :label="response.rsvp ? 'Yes!' : 'No.'" v-model="response.rsvp"></v-switch>-->
            <!-- Need Bus -->
            <div
              class="mx-auto gg"
              style="display:inline-block;width:50% !important;"
              v-show="response.rsvp"
              transition="slide-x-transition"
            >
              <div>
                <label for="name" style="float:left">
                  <strong>Will you need a bus?*</strong>
                </label>
                <br />
                <v-switch
                  @change="changeBus"
                  :label="response.bus ? 'Yes!' : 'No.'"
                  v-model="response.bus"
                ></v-switch>
              </div>
              <!-- Bus Location -->
              <div>
                <label for="name" style="float:left">
                  <strong>Where are you coming from?*</strong>
                </label>
                <br />
                <v-select
                  @change="changeBus"
                  :persistent-hint="true"
                  :hint="busWarning"
                  name="busLocation"
                  v-model="response.location"
                  :items="busLocations"
                ></v-select>
              </div>
              <br />
            </div>
            <div class="mx-auto gg" v-if="confirmation">
              <v-chip
                style="border:none;float:left;overflow:wrap;"
                outline
                small
                color="#555"
              >
                <v-icon left>check</v-icon>
                <strong>Your response has been submitted.</strong>
              </v-chip>
            </div>
            <!-- <div class="rspvButtons">
                            <v-btn class="button1" @click="submitRSVP">Submit</v-btn>
            </div>-->
          </div>
        </div>
        <div class="wrap-status100" v-if="step <= 3">
          <div>
            <h1
              v-show="!genderCompleted"
              slot="activator"
              style="color: #F14D4C"
            >
              Please go to
              <a href="/apply" class="currentStatus">your application</a>
              and complete an additional field.
            </h1>
            <h1 v-show="step === 0 && genderCompleted">
              You haven't started yet! Go
              <a href="/apply" class="currentStatus">here</a>
              to begin.
            </h1>
            <h1 v-show="step > 0 && genderCompleted">{{ currentHeader }}</h1>
            <br />
            <v-stepper alt-labels class="transp">
              <v-stepper-header>
                <v-stepper-step step="1" :complete="step > 0">
                  {{ baseStep }}
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2" :complete="step > 0">
                  Submitted
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3" :complete="step > 0">
                  Processing
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="4" :complete="step > 0">
                  Decision
                </v-stepper-step>
              </v-stepper-header>
            </v-stepper>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div>
          <v-layout row wrap>
            <v-flex d-flex md3 :key="media.icon" v-for="media in social">
              <div>
                <v-btn class="mx-3" dark icon :href="media.link">
                  <v-icon size="24px">{{ media.icon }}</v-icon>
                </v-btn>
              </div>
            </v-flex>
          </v-layout>
        </div>
      </div>

      <div class="mobile">
        <div class="wrap-status101" v-if="step <= 3">
          <h1 v-show="step === 0">
            You haven't started yet! Go
            <a href="/apply" class="currentStatus">here</a>
            to begin.
          </h1>
          <h1 v-show="step > 0">{{ currentHeader }}</h1>
          <v-card-text></v-card-text>
          <v-stepper vertical class="wrap-status201">
            <v-stepper-step :complete="step > 0" step="1">
              {{ baseStep }}
            </v-stepper-step>
            <v-stepper-step :complete="step > 0" step="2">
              Submitted
            </v-stepper-step>
            <v-stepper-step :complete="step > 0" step="3">
              Processing
            </v-stepper-step>
            <v-stepper-step :complete="step > 0" step="4">
              Decision
            </v-stepper-step>
          </v-stepper>
        </div>
        <div
          class="wrap-status101-accept wrap-status201-accept"
          v-if="step > 3"
        >
          <h1 v-if="!response.rsvp && !hasResponded" class="rtitle">
            🎉
            <div id="mobileCol">
              Congratulations, you've been invited to DeltaHacks V!
            </div>
          </h1>
          <h1 v-if="response.rsvp" class="rtitle">Awesome, see you there!</h1>
          <h1 v-if="!response.rsvp && hasResponded" class="rtitle">
            We'll miss you, but thanks for letting us know!
          </h1>
          <h3 class>Will you be attending?</h3>
          <div style="padding-top:10px;">
            <div style="padding-top:10px;">
              <div class style="display:inline-block;">
                <v-btn
                  large
                  color="success"
                  @click="toggleRSVP(true)"
                  :depressed="response.rsvp && hasResponded"
                  class="button1"
                >
                  Yes!
                </v-btn>
                <v-btn
                  large
                  color="error"
                  @click="toggleRSVP(false)"
                  :depressed="!response.rsvp && hasResponded"
                  class="button2"
                >
                  No.
                </v-btn>
              </div>
              <br />
              <br />
            </div>
            <!-- <label for="name" style='float:left'>
                            <strong>Will you be attending?*</strong>
                        </label><br>
            <v-switch @change="changeRSVP" :label="response.rsvp ? 'Yes!' : 'No.'" v-model="response.rsvp"></v-switch>-->
            <!-- Need Bus -->
            <div
              class
              style="display:inline-block;width:80% !important;"
              v-show="response.rsvp"
              transition="slide-x-transition"
            >
              <div>
                <label for="name" style="float:left">
                  <strong>Will you need a bus?*</strong>
                </label>
                <br />
                <v-switch
                  @change="changeBus"
                  :label="response.bus ? 'Yes!' : 'No.'"
                  v-model="response.bus"
                ></v-switch>
              </div>
              <!-- Bus Location -->
              <div>
                <label for="name" style="float:left">
                  <strong>Where are you coming from?*</strong>
                </label>
                <br />
                <v-select
                  @change="changeBus"
                  :persistent-hint="true"
                  :hint="busWarning"
                  name="busLocation"
                  v-model="response.location"
                  :items="busLocations"
                ></v-select>
              </div>
            </div>

            <div class="mx-auto gg" v-if="confirmation">
              <v-chip
                style="border:none;float:left;overflow:wrap;"
                outline
                small
                color="#555"
              >
                <v-icon left>check</v-icon>
                <strong>Your response has been submitted.</strong>
              </v-chip>
            </div>
            <!-- <div class="rspvButtons">
                            <v-btn class="button1" @click="submitRSVP">Submit</v-btn>
            </div>-->
          </div>
        </div>
        <div style="margin-top: 5%;">
          <v-layout row wrap>
            <v-flex d-flex md3 :key="media2.icon" v-for="media2 in social">
              <div>
                <v-btn class="mx-3" dark icon :href="media2.link">
                  <v-icon size="24px">{{ media2.icon }}</v-icon>
                </v-btn>
              </div>
            </v-flex>
          </v-layout>
        </div>
      </div>
    </div>
    <v-snackbar v-model="feedback" top color="success" right :timeout="3000">
      Thanks! We've got your response.
      <v-btn color="white" flat @click="feedback = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar
      v-model="criticalError"
      :auto-height="true"
      top
      color="error"
      right
      :timeout="10000"
    >
      Could not establish connection to the server. Consider refreshing or
      attempting to access the page on mobile. If the issue persists contact us
      at hello@deltahacks.com.
      <v-btn color="white" flat @click="criticalError = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
import Navbar from '@/components/Navbar.vue';
import Navbar2 from '@/components/Navbar2.vue';
import Navigation from '@/components/Navigation.vue';
import Vue from 'vue';
import { auth } from 'firebase';
import { validationMixin } from 'vuelidate';
import { required, maxLength, email } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import db from '../firebase_init';
import { StatusModel } from '../types';

const allUniversities = [];
export default Vue.extend({
  mixins: [validationMixin],
  name: 'Status',
  data(): StatusModel {
    return {
      genderCompleted: true,
      response: {
        rsvp: false,
        bus: false,
        location: '',
        email: auth().currentUser!.email,
      },
      emptyResponse: {
        rsvp: false,
        bus: false,
        location: '',
        email: auth().currentUser!.email,
      },
      criticalError: false,
      hasResponded: false,
      confirmation: false,
      timeout: undefined,
      bus: false,
      busLocations: [
        'University of Waterloo',
        'University of Toronto',
        'University of Western Ontario',
      ],
      busWarning: "We're currently gauging interest in buses.",
      feedback: false,
      social: [
        {
          link: 'https://twitter.com/deltahacks',
          icon: 'fab fa-twitter',
        },
        {
          link: 'https://www.facebook.com/thedeltahacks/',
          icon: 'fab fa-facebook',
        },
        {
          link: 'https://www.instagram.com/deltahacks/',
          icon: 'fab fa-instagram',
        },
        {
          link: 'https://www.linkedin.com/company/deltahacks/',
          icon: 'fab fa-linkedin',
        },
      ],
      parent: this,
      picker: null,
      date: '2000-01-01',
      university: null,
      allUniversities,
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { 'My-Awesome-Header': 'header value' },
        addRemoveLinks: true,
        acceptedFiles: 'application/pdf',
      },
      subheaders: [
        'Applications are now closed.',
        "Sorry we couldn't offer you a spot.",
        'This application is under review.',
        "Congratulations, you've been accepted!",
        'Unfortunately we cannot offer you an invitation this time.',
      ],
      application: {
        name: '',
        email: '',
        school_year: null,
        shirt_size: null,
        dietary_restrictions: null,
        hackathons: null,
        github: '',
        linkedin: '',
        website: '',
        phone: '',
        emergency_phone: '',
      },
      links: ['Home', 'About', 'Contact'],
      story: '',
      custom: true,
      name: '',
      step: 0,
      email: '',
      select: null,
      items: [
        'First Year',
        'Second Year',
        'Third Year',
        'Fourth Year',
        'Fifth Year',
      ],
      hackathons: ['This is my first one', '2', '3', '5+', '10+'],
      food: ['Vegetarian', 'Vegan', 'Halal', 'Gluten Free', 'Kosher'],
      shirts: ['XS', 'S', 'M', 'L', 'XL'],
      checkbox: false,
    };
  },
  components: {
    Navbar,
    Navigation,
    Navbar2,
  },
  computed: {
    baseStep(): string {
      // console.log(this.step === 0);
      if (this.step === 0) {
        return 'Closed';
      }
      return 'Closed';
    },
    currentHeader(): string {
      return this.subheaders[this.step - 1];
    },
  },
  methods: {
    toggleRSVP(res) {
      this.hasResponded = true;
      this.response.rsvp = res;
      if (!this.response.rsvp) {
        this.response = this.emptyResponse;
      }
      this.formChange();
    },
    changeRSVP() {
      if (!this.response.rsvp) {
        this.response = this.emptyResponse;
      }
    },
    formChange() {
      this.confirmation = false;
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.timeout = setTimeout(() => {
        this.submitRSVP();
      }, 2000);
    },
    changeBus() {
      if (!this.response.bus) this.response.location = '';
      this.formChange();
    },
    async submitRSVP() {
      const { email } = auth().currentUser!;
      const folder = this.response.rsvp ? 'Yes' : 'No';
      const opposingFolder = !this.response.rsvp ? 'Yes' : 'No';
      const rsvpRef = db
        .collection('hackathon')
        .doc('DH5')
        .collection('RSVP')
        .doc('all');
      try {
        const res = await rsvpRef
          .collection(folder)
          // TOD(null-check) implement better solution for when email is null
          .doc(email || 'test@test.com')
          .set(this.response);
        this.feedback = true;
        this.confirmation = true;
      } catch (err) {
        console.log(err);
      }
      rsvpRef
        .collection(opposingFolder)
        // TOD(null-check) implement better solution for when email is null
        .doc(email || 'test@test.com')
        .delete();
    },
    updateStep(doc) {
      if (doc.exists) {
        switch (doc.data().status) {
          case 'in progress':
            this.step = 1;
            break;
          case 'submitted':
            this.step = 2;
            break;
          case 'pending':
          case 'actually rejected':
            this.step = 2;
            break;
          case 'overflow':
          case 'overflow2':
          case 'accepted':
          case 'processing':
          case 'rejected':
          case 'round4':
            this.step = 3;
            break;
          case 'round1':
          case 'round2':
          case 'round3':
            this.step = 4;
            break;
          default:
            this.step = 0;
        }
      } else {
        console.log('Document not found!');
      }
    },
    checkGenderInput(email) {
      if (this.step <= 1) return;
      db.collection('applications')
        .doc('DH5')
        .collection('in progress')
        .doc(email)
        .onSnapshot((snap) => {
          if (snap.exists) {
            const data = snap.data();
            if (data!.gender) {
              this.genderCompleted = true;
            } else {
              this.genderCompleted = false;
            }
          }
        });
    },
    async fillRSVP() {
      const { email } = auth().currentUser!;
      const folder = this.response.rsvp ? 'Yes' : 'No';
      const opposingFolder = !this.response.rsvp ? 'Yes' : 'No';
      const rsvpRef = db
        .collection('hackathon')
        .doc('DH5')
        .collection('RSVP')
        .doc('all')
        .collection('Yes')
        // TOD(null-check) implement better solution for when email is null
        .doc(email || 'test@test.com');
      const doc: any = rsvpRef.get();
      if (doc.exists) {
        const data = doc.data();
        this.response = data;
        this.confirmation = true;
        this.hasResponded = true;
      } else {
        const doc = await db
          .collection('hackathon')
          .doc('DH5')
          .collection('RSVP')
          .doc('all')
          .collection('No')
          // TOD(null-check) implement better solution for when email is null
          .doc(email || 'test@test.com')
          .get();
        if (doc.exists) {
          this.confirmation = true;
          this.hasResponded = true;
        }
      }
    },
  },
  async beforeMount() {
    // console.log('mounted');
    const appEmail = auth().currentUser!.email as string;
    // const genderStatus = await this.checkGenderInput(appEmail);
    try {
      db.collection('users')
        .doc(appEmail)
        .onSnapshot((snap) => {
          if (snap.exists) {
            this.updateStep(snap);
            if (this.step > 1) this.checkGenderInput(appEmail);
            if (this.step > 3) {
              this.fillRSVP();
            }
          } else {
            console.log(`User ${appEmail} not found.`);
          }
        });
    } catch (err) {
      console.error(err);
      this.criticalError = true;
    }
  },
});
</script>
<style scoped src='../assets/css/status.css'>
.regular {
  text-decoration: none;
  color: inherit;
}
#footertext {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 1.3em;
  float: left;
}
.rtitle {
  padding-bottom: 30px !important;
  font-size: 2.5em !important;
}
.button1 {
  -moz-appearance: none;
  -webkit-appearance: none;
  -ms-appearance: none;
  -moz-transition: background-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;
  -webkit-transition: background-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;
  -ms-transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out,
    color 0.2s ease-in-out;
  transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out,
    color 0.2s ease-in-out;
  float: left !important;
  background-color: transparent !important;
  font-family: sans-serif !important;
  border: 1 !important;
  /* border-radius: 40px; */
  box-shadow: inset 0 0 0 2px #2196f3 !important;
  color: #2196f3 !important;
  cursor: pointer !important;
  /* display: inline-block !important; */
  font-size: 15px !important;
  font-weight: 600 !important;
  /* line-height: 52px; */
  padding: 0 1.75em !important;
  text-align: center !important;
  text-decoration: none !important;
  text-transform: uppercase !important;
}

.no.border {
  border: none;
}
</style>
