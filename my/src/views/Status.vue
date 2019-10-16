<template>
  <v-app class="dashboard gradient-background">
    <!-- <Navigation class="mobile"/> -->
    <Navbar2 />
      <div class="wrap">
          <!--Column#1-->
          <div class="col col6">
                <div class="box box9">
                  <p class="big">Welcome.</p>
                  <p class="small">Be a part of the hackathon for change.
                    We are looking forward to being able to meet with you in person.
                    Good luck with your application!</p>
                </div>
                <div class="box box5 status">
                  <div class="currentStatus">
                    <h2>My Application Status</h2>
                    <v-icon> {{ emoticon }}</v-icon>
                    <p>{{ currentHeader }}</p>
                    </div>
                  <div class="apply box5">
                    <a href="/apply" class="apply-btn">Apply</a>
                  </div>
                </div>
          </div>
          <!--Column#2-->
          <div class="col col4">
              <div class="box box11">
                <transition name='fade'>
                  <img name="slide" :src="images[currentNumber]" />
                </transition>
                <!-- <transition-group name='fade' tag='div'>
                  <div class="box box11" v-for="number in [currentNumber]" :key='number'>
                    <img :src="currentImage"/>
                    </div>
                </transition-group> -->
              </div>
        
              <div :key="media.icon" v-for="media in social">
                <div class="col col2 social">
                  <div class="box box3">
                      <button light icon :href="media.link">
                        <v-icon size="24px">{{ media.icon }}</v-icon>
                      </button>
                  </div>
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
import Card from '@/components/Card.vue';
import Vue from 'vue';
import { auth } from 'firebase';
import { validationMixin } from 'vuelidate';
import { required, maxLength, email } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import db from '../firebase_init';
import { StatusModel } from '../types';
import img1 from '@/assets/slideshow/IMG_3843.jpg';
import img2 from '@/assets/slideshow/IMG_3851.jpg';
import img3 from '@/assets/slideshow/IMG_3874.jpg';
import img4 from '@/assets/slideshow/IMG_3876.jpg';
import img5 from '@/assets/slideshow/IMG_3894.jpg';
import img6 from '@/assets/slideshow/IMG_3907.jpg';
import img7 from '@/assets/slideshow/IMG_3908.jpg';
import img8 from '@/assets/slideshow/IMG_3910.jpg';
import img9 from '@/assets/slideshow/IMG_3927.jpg';
import img10 from '@/assets/slideshow/IMG_3938.jpg';
import img11 from '@/assets/slideshow/IMG_3943.jpg';
import img12 from '@/assets/slideshow/IMG_3945.jpg';
import img13 from '@/assets/slideshow/IMG_3948.jpg';

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
        {
          link: 'https://www.linkedin.com/company/deltahacks/',
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
      images: [img1, img2, img3, img4, img5, img6,
        img7, img8, img9, img10, img11, img12, img13],
      currentNumber: 0,
    };
  },
  components: {
    // Navbar,
    // Navigation,
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
    // currentImage() {
    //   return this.images[Math.abs(this.currentNumber) % this.images.length];
    // },
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
    startRotation() {
      if(this.currentNumber < this.images.length - 1) 
        this.currentNumber++; 
      else this.currentNumber = 0;
      setTimeout(this.startRotation,3000);
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
  mounted() {
    this.startRotation();
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
