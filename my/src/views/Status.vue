<template>
  <div class="background">
    <transition name="view" mode="out-in">
      <v-app key="1" v-if="counter === 0">
        <div class="container-hello100 background">
          <!-- "style="background-image: url('https://wallpapersite.com/images/pages/pic_w/14088.png');" -->
          <h1 class="hellotext">{{ splashMessage }}</h1>
          <img
            src="../assets/vi2.png"
            draggable="false"
            class="hello-back-vi"
          />
        </div>
      </v-app>
      <v-app key="2" v-if="counter === 1" class="dashboard statusbackground">
        <Navbar2 />
        <div class="wrap">
          <!--Column#1-->
          <div class="col col6">
            <div class="box box9" v-if="step <= 4">
              <p class="big">Welcome.</p>
              <p class="small">
                Be a part of the hackathon for change. We are looking forward to
                being able to meet with you in person. Good luck with your
                application!
              </p>
            </div>
            <div class="box box9" v-if="step === 5">
              <p class="big rsvp" style="font-size: 5vw">Will you be coming?</p>
                <a @click="() => step = 6">
                  <div class="box box3 rsvp-btn">
                    Yes
                  </div>
                </a>
                <a @click="() => { updateRSVP(true, false), step = 7 }">
                  <div class="box box3 rsvp-btn">
                    No
                  </div>
                </a>
            </div>
            <div class="box box9" v-if="step === 6">
              <p class="big">Bus?</p>
              <p class="small" style="margin-top:-20px; margin-bottom:9px;">Please select a stop below.</p>
                <v-select
                  :items="busLocations"
                  v-model="busSelected"
                  filled
                  rounded
                  dense
                  solo
                  append-icon="keyboard_arrow_down"
                  background-color="rgba(255,255,255,0.5)"
                  style="margin-left:5px;"
                ></v-select>
                <div class="col col2">
                  <a @click=" () => { updateRSVP(true, true, busSelected), step = 7 }">
                    <div class="box box3 next">
                      Next
                    </div>
                  </a>
                </div>
            </div>
            <div class="box box9" v-if="step === 7">
              <template v-if="rsvp.coming">
                <p class="big">Confirmed.</p>
                <p class="small" style="margin-top:-20px">We hope you're as excited as we are. See you soon!</p>
              </template>
              <template v-if="!rsvp.coming">
                <p class="big">Can't make it.</p>
                <p class="small" style="margin-top:-20px">We're sorry you can't make it. Hope to see you next time!</p>
              </template>
              <div class="col col4">
                <a @click="() => step = 5">
                  <div class="box box2 change-response">
                    Change Response
                  </div>
                </a>
              </div>
            </div>
            <div class="box box9" v-if="step === 8">
               <template>
                <p class="medium" style="margin-top:20px;">The Hackathon <br> for Change!</p>
              </template>
            </div>
             <div class="box box9" v-if="step === 9">
               <template>
                 <div class="afterSubmit">
                <div style="float: left;">
                    <h2>Table Number</h2>
                    <br>
                    <span class="afterSubmitRounded">17</span>
                </div>
                <div>
                    <h2>Judging Area</h2>
                    <br>
                    <span class="afterSubmitRounded">Thode 2nd Floor</span>
                </div>
                </div>
              </template>
            </div>

            <div class="box box5 status desktop">
              <div class="currentStatus" v-if="step < 8">
                <h2>My Application Status</h2>
                <div class="emote">{{ emoticon }}</div>
                <p class="bigmobile">
                  {{ currentHeader }}
                  <a @click.prevent="resend()" v-if="!isVerified() && !resent">
                    Resend Email
                  </a>
                </p>
              </div>
              <div class="currentStatus" v-if="step === 8">
                <p class="bigmobile">Deadline</p>
                <div><span class="deadline">12 P.M</span></div>
                <p class="bigmobile">
                  Sunday, January 26th 2020
                </p>
              </div>
              <div class="currentStatus glm" v-if="step === 9">
                <p class="goodluck box5">Good Luck!</p>
              </div>
              <a href="/apply" class="apply-btn" v-if="step < 8">
                <div class="apply box5">Apply</div>
              </a>
              <a href="/submit" class="apply-btn" v-if="step === 8">
                <div class="submit apply box5">Submit<br>Project</div>
              </a>
              <div class="apply-btn" v-if="step === 9">
                <div class="submitted box5">You have successfully submitted your project.</div>
              </div>
            </div>
          </div>
          <!--Column#2-->
          <div class="col col4">
            <div class="box box11">
              <img
                id="slideimg0"
                class="slide showMe"
                src="../assets/slideshow/IMG_3843.jpg"
                draggable="false"
              />
              <img
                id="slideimg1"
                class="slide"
                src="../assets/slideshow/IMG_3851.jpg"
                draggable="false"
              />
              <img
                id="slideimg2"
                class="slide"
                src="../assets/slideshow/IMG_3874.jpg"
                draggable="false"
              />
              <img
                id="slideimg3"
                class="slide"
                src="../assets/slideshow/IMG_3876.jpg"
                draggable="false"
              />
              <img
                id="slideimg4"
                class="slide"
                src="../assets/slideshow/IMG_3894.jpg"
                draggable="false"
              />
              <img
                id="slideimg5"
                class="slide"
                src="../assets/slideshow/IMG_3907.jpg"
                draggable="false"
              />
              <img
                id="slideimg6"
                class="slide"
                src="../assets/slideshow/IMG_3908.jpg"
                draggable="false"
              />
              <img
                id="slideimg7"
                class="slide"
                src="../assets/slideshow/IMG_3910.jpg"
                draggable="false"
              />
              <img
                id="slideimg8"
                class="slide"
                src="../assets/slideshow/IMG_3927.jpg"
                draggable="false"
              />
              <img
                id="slideimg9"
                class="slide"
                src="../assets/slideshow/IMG_3938.jpg"
                draggable="false"
              />
              <img
                id="slideimg10"
                class="slide"
                src="../assets/slideshow/IMG_3943.jpg"
                draggable="false"
              />
              <img
                id="slideimg11"
                class="slide"
                src="../assets/slideshow/IMG_3945.jpg"
                draggable="false"
              />
              <img
                id="slideimg12"
                class="slide"
                src="../assets/slideshow/IMG_3948.jpg"
                draggable="false"
              />
            </div>
            <!-- </div> -->
            <div :key="media.icon" v-for="media in social" class="desktop">
              <div class="col col2 social">
                <a :href="media.link" target="_blank">
                  <div class="box box3">
                    <button light icon>
                      <v-icon>{{ media.icon }}</v-icon>
                    </button>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div class="box box5 status tablet">
            <div class="currentStatus" v-if="step < 8">
                <h2>My Application Status</h2>
                <div class="emote">{{ emoticon }}</div>
                <p class="bigmobile">
                  {{ currentHeader }}
                  <a @click.prevent="resend()" v-if="!isVerified() && !resent">
                    Resend Email
                  </a>
                </p>
              </div>
              <div class="currentStatus" v-if="step === 8">
                <p class="bigmobile">Deadline</p>
                <div><span class="deadline">12 P.M</span></div>
                <p class="bigmobile">
                  Sunday, January 26th 2020
                </p>
              </div>
              <div class="currentStatus glm" v-if="step === 9">
                <p class="goodluck box5">Good Luck!</p>
              </div>
              <a href="/apply" class="apply-btn" v-if="step < 8">
                <div class="apply box5">Apply</div>
              </a>
              <a href="/submit" class="apply-btn" v-if="step === 8">
                <div class="submit apply box5">Submit<br>Project</div>
              </a>
              <a class="apply-btn" v-if="step === 9">
                <div class="submitted box5">You have successfully submitted your project.</div>
              </a>
          </div>
          <div :key="media.icon" v-for="media in social" class="tablet">
            <div class="col col2 social">
              <a :href="media.link" target="_blank">
                <div class="box box3">
                  <button light icon>
                    <v-icon>{{ media.icon }}</v-icon>
                  </button>
                </div>
              </a>
            </div>
          </div>
        </div>

        <v-snackbar
          v-model="feedback"
          top
          color="success"
          right
          :timeout="3000"
        >
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
          attempting to access the page on mobile. If the issue persists contact
          us at hello@deltahacks.com.
          <v-btn color="white" flat @click="criticalError = false">Close</v-btn>
        </v-snackbar>
      </v-app>
    </transition>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
import Navbar2 from '@/components/Navbar2.vue';
import Card from '@/components/Card.vue';

import Vue from 'vue';
import { auth } from 'firebase/app';
import { validationMixin } from 'vuelidate';
import { required, maxLength, email } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import db from '../firebase_init';
import { StatusModel } from '../types';
import { busCities } from '../data';

const allUniversities = [];
export default Vue.extend({
  mixins: [validationMixin],
  name: 'Status',
  data(): StatusModel {
    return {
      hackathon: 'DH6',
      accepted: false,
      counter: 0,
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
      busLocations: busCities.concat(['Not bussing']),
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
        {
          link: 'https://www.snapchat.com/add/deltahacks/',
          icon: 'fab fa-snapchat',
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
        'Application unsubmitted',
        'In progress',
        'This application is under review.',
        "Sorry, we couldn't offer you a spot this year.",
        "Congratulations, you've been accepted!",
        "Congratulations, you've been accepted!",
        "Congratulations, you've been accepted!",
        '',
      ],
      links: ['Home', 'About', 'Contact'],
      story: '',
      custom: true,
      name: '',
      step: 0,
      checkedIn: false,
      projectSubmitted: false,
      email: '',
      checkbox: false,
      timer: 0,
      curImage: 0,
      numImages: 13,
      resent: false,
      splashMessage: '',
      busSelected: 'Not bussing',
      rsvp: { coming: false, origin: '' },
    };
  },
  components: {
    Navbar2,
  },
  computed: {
    currentHeader(): string {
      if (!auth().currentUser!.emailVerified) {
        return 'Please check your email and activate your account.';
      }
      return this.subheaders[this.step];
    },
    emoticon(): string {
      switch (this.step) {
        case 0:
          return '🙂';
        case 1:
          return '😐';
        case 4:
          return '🙁';
        default:
          return '🙂';
      }
    },
  },
  methods: {
    // Grabs the application from where its store in firebase
    fetchFromFirebase(): Promise<any> {
      return this.$store.state.db
        .collection('DH6')
        .doc('applications')
        .collection('all')
        .doc(auth().currentUser!.email)
        .get();
    },
    splashTime() {
      this.timeout = setTimeout(() => {
        this.counter = 1;
      }, 2000);
    },
    async updateRSVP(update: boolean, coming: boolean = false, origin: string = '') {
      const app = await this.fetchFromFirebase();
      const appWithRSVP = app.data();
      const rsvp = { coming, origin };
      if (update && app.data()) {
        appWithRSVP._.RSVP = rsvp;
        await db.collection(this.hackathon)
          .doc('applications')
          .collection('all')
          .doc(auth().currentUser!.email as string)
          .update(appWithRSVP);
      }
      this.rsvp = (appWithRSVP) ? appWithRSVP._.RSVP : { coming: false, origin: '' };
    },
    // Step is state of the page
    async updateStep(email: string) {
      const checkedInSnapshot = await db.collection(this.hackathon)
        .doc('hackathon')
        .collection('checked in')
        .doc(email)
        .get();

      this.checkedIn = checkedInSnapshot.exists;

      const projectsSnapshot = await db.collection(this.hackathon)
        .doc('hackathon')
        .collection('projects')
        .get();

      this.projectSubmitted = false;

      // Project keys are the submitter's email, so we check if the user submitted a project
      for (let project of projectsSnapshot.docs) {
        if (project.id === email) {
          // if (project.data()._.status === 'submitted') this.projectSubmitted = true;
          break;
        }
      }

      // Check if another user has submitted a project on behalf of the current user
      if (!this.projectSubmitted) {
        for (let project of projectsSnapshot.docs) {
          const projectData = project.data();
          if (!projectData.group || !Array.isArray(projectData.group)) continue;

          const inProject = projectData.group.find(person => person.email === email);
          if (inProject) {
            this.projectSubmitted = true;
            break;
          }
        }
      }

      db.collection(this.hackathon)
        .doc('applications')
        .collection('all')
        .doc(email)
        .onSnapshot((snap) => {
          if (snap.exists) {
            const data = snap.data();
            if (data!._.status && data!._.status === 'in progress') this.step = 2;
            if (data!._.status && data!._.status === 'submitted') this.step = 3;
            // Check if user made it into any round & set to accepted
            if (data!._.decision && data!._.decision === 'rejected') this.step = 4;
            if (data!._.decision && data!._.decision.substring(0, 5) === 'round') this.step = 5;
            if (data!._.RSVP && data!._.RSVP.coming) this.step = 6;
            if (data!._.RSVP && (data!._.RSVP.origin || data!._.RSVP.coming != null)) this.step = 7;
            if (this.checkedIn && this.projectSubmitted === false) this.step = 8;
            if (this.checkedIn && this.projectSubmitted) this.step = 9;
          } else {
            // application not started
            this.step = 1;
          }
        });
    },
    nextImage() {
      // remove showMe class from current image
      let e = document.getElementById(`slideimg${this.curImage}`);
      this.removeClass(e, 'showMe');
      // compute next image
      this.curImage++;
      if (this.curImage > this.numImages - 1) {
        this.curImage = 0;
      }
      // add showMe class to next image
      e = document.getElementById(`slideimg${this.curImage}`);
      this.addClass(e, 'showMe');
    },
    // helper method
    addClass(elem, name) {
      let c = elem.className;
      if (c) c += ' ';
      c += name;
      elem.className = c;
    },
    // helper method
    removeClass(elem, name) {
      const c = elem.className;
      elem.className = c
        .replace(name, '')
        .replace(/\s+/g, ' ')
        .replace(/^\s+|\s+$/g, ' ');
    },
    resend() {
      this.resent = true;
      console.log(this.resent);
      console.log(this.isVerified());
      auth()
        .currentUser!.sendEmailVerification()
        .then(() => console.log('Resent'))
        .catch(e => console.log('Resend problem'));
    },
    isVerified: () => auth().currentUser!.emailVerified,
  },
  async beforeMount() {
    const appEmail = auth().currentUser!.email as string;
    this.splashMessage =
      this.$route.params.firstTime === 'yes' ? 'Hello.' : 'Hello, Again.';
    this.updateStep(appEmail);
  },
  async mounted() {
    this.splashTime();
    this.timer = setInterval(this.nextImage, 4000);
    this.updateRSVP(false);
  },
  beforeDestroy() {
    clearInterval(this.timer);
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
