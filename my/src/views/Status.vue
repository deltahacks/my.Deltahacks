<template>
  <div class="background">
    <transition name="view" mode="out-in">
      <v-app key="1" v-if="counter === 0">
        <div class="container-hello100 background">
          <!-- "style="background-image: url('https://wallpapersite.com/images/pages/pic_w/14088.png');" -->
          <h1 class="hellotext">{{ splashMessage }}</h1>
          <img src="../assets/vi2.png" draggable="false" class="hello-back-vi" />
        </div>
      </v-app>
      <v-app key="2" v-if="counter === 1" class="dashboard statusbackground">
        <!-- <Navigation class="mobile"/> -->
        <Navbar2 />
        <div class="wrap">
          <!--Column#1-->
          <div class="col col6">
            <div class="box box9">
              <p class="big">Welcome.</p>
              <p class="small">
                Be a part of the hackathon for change. We are looking forward to
                being able to meet with you in person. Good luck with your
                application!
              </p>
            </div>
            <div class="box box5 status">
              <div class="currentStatus">
                <h2>My Application Status</h2>
                <div class="emote">{{ emoticon }}</div>
                <p class="bigmobile">
                  {{ currentHeader }}
                  <a
                    @click.prevent="resend()"
                    v-if="!isVerified() && !resent"
                  >Resend Email</a>
                </p>
              </div>
              <a href="/apply" class="apply-btn">
                <div class="apply box5">Apply</div>
              </a>
            </div>
          </div>
          <!--Column#2-->
          <div class="col col4">
            <!-- <div> -->
            <!-- <transition name='fade' mode="out-in">
                <div class="box box11" v-for="number in [currentNumber]" :key='number'>
                  <img :src="images[currentNumber]"/>
                  </div>
            </transition>-->
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
            <div :key="media.icon" v-for="media in social">
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

const allUniversities = [];
export default Vue.extend({
  mixins: [validationMixin],
  name: 'Status',
  data(): StatusModel {
    return {
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
        "Congratulations, you've been accepted!",
        "Sorry we couldn't offer you a spot.",
        'Unfortunately we cannot offer you an invitation this time.',
      ],
      links: ['Home', 'About', 'Contact'],
      story: '',
      custom: true,
      name: '',
      step: 0,
      email: '',
      checkbox: false,
      timer: 0,
      curImage: 0,
      numImages: 13,
      resent: false,
      splashMessage: '',
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
        case 5:
          return '🙁';
        default:
          return '🙂';
      }
    },
  },
  methods: {
    method1() {
      this.timeout = setTimeout(() => {
        this.counter = 1;
        console.log('Happened');
      }, 2000);
    },
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
    updateStep(email) {
      db.collection('DH6')
        .doc('applications')
        .collection('all')
        .doc(email)
        .onSnapshot(snap => {
          if (snap.exists) {
            const data = snap.data();
            switch (data!._.status) {
              case 'in progress':
                this.step = 2;
                break;
              case 'submitted':
                this.step = 3;
                break;
              case 'accepted':
                this.step = 4;
                break;
              case 'rejected':
                this.step = 5;
                break;
              default:
                this.step = 0;
            }
          } else {
            // application not started
            this.step = 1;
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
    // console.log('mounted');
    const appEmail = auth().currentUser!.email as string;
    this.splashMessage =
      this.$route.params.firstTime === 'yes' ? 'Hello.' : 'Hello, Again.';
    // const genderStatus = await this.checkGenderInput(appEmail);
    try {
      db.collection('users')
        .doc(appEmail)
        .onSnapshot(snap => {
          if (snap.exists) {
            this.updateStep(appEmail);
            // if (this.step > 1) this.checkGenderInput(appEmail);
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
  mounted() {
    this.timer = setInterval(this.nextImage, 4000);
    this.method1();
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
