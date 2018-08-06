<template>
  <v-app class="dashboard ">
    <Navigation/>
    <form @keyup="formChange" class="ff mx-auto " ref="form" @submit.prevent="validateBeforeSubmit" @submit="submitApplication">
      <!-- <v-subheader class="large">About You</v-subheader>
      <v-divider></v-divider>
      <br> -->
      <v-text-field name="name" autocomplete="off" v-model="application.name" label="What is your full name?" v-validate="{required:true, max:100}" :error-messages="errors.first('name')" data-vv-delay="1000"></v-text-field>
      <!-- find a better way of including this in form -->
      <v-text-field name="email" v-model="application.email" label="What email should we use to contact you?" v-validate="{required:true, email:true, max:100}" :error-messages="errors.first('email')" data-vv-delay="8000"></v-text-field>
      <!-- <v-date-picker name="date" v-model="date" color="green lighten-1"
                    v-validate="'required:true'"></v-date-picker> -->
      <v-text-field name="date" v-model="application.birthday" mask="date" label="What's your birthday?" placeholder="dd/mm/yyyy" v-validate="{required: true}" :error-messages="errors.first('date')"></v-text-field>
      <v-select name="university" @change="formChange" :items="allUniversities" v-model="application.university" label="What university do you go to?" autocomplete v-validate="{required: true}" :error-messages="errors.first('university:required')" data-vv-delay="1000"></v-select>
      <v-select name="year" @change="formChange" v-model="application.school_year" :items="items" label="What year of school are you in?" v-validate="{required:true}" :error-messages="errors.first('year:required')" data-vv-delay="1000">
      </v-select>
      <!-- <br>
      <v-subheader class="large">Hackathon Info</v-subheader>
      <v-divider></v-divider>
      <br> -->
      <v-select v-model="application.shirt_size" @change="formChange" :items="shirts" label="What's your shirt size?" v-validate="{required:true}" name="shirt size" :error-messages="errors.first('shirt size:required')" data-vv-delay="1000">
      </v-select>
      <v-select v-model="application.dietry_restrictions" @change="formChange" :items="food" label="Any dietary restrictions" v-validate="{required:true}" name="diet" :error-messages="errors.first('diet:required')" data-vv-delay="1000">
      </v-select>
      <v-select v-model="application.hackathons" @change="formChange" :items="hackathons" label="How many hackathons have you attended?" v-validate="{required:true}" name="hackathons" :error-messages="errors.first('hackathons:required')" data-vv-delay="1000">
      </v-select>
      <!-- <br>
      <v-subheader class="large">Portfolio & Contact</v-subheader>
      <v-divider></v-divider>
      <br> -->
      <v-text-field name="github" label="Your Github" single-line data-vv-delay="4000" v-model="application.github" prepend-icon="fab fa-github" v-validate="{max:150, url:true}" :error-messages="errors.first('github')">
      </v-text-field>
      <v-text-field name="linkedin" label="Your Linkedin" single-line data-vv-delay="4000" v-model="application.linkedin" prepend-icon="fab fa-linkedin" v-validate="{max:150, url:true}" :error-messages="errors.first('linkedin')">
      </v-text-field>
      <v-text-field name="website" label="Your Website" single-line data-vv-delay="4000" v-model="application.website" prepend-icon="fas fa-link" v-validate="{max:150, url:true}" :error-messages="errors.first('website')">
      </v-text-field>
      <v-container d-inline-flex>
        <v-flex xs6 sm6>
          <v-text-field mask="phone" name="phone" label="You cell phone number" v-model="application.phone" prepend-icon="phone" data-vv-delay="1000" v-validate="{required:true, max: 11, is_not: application.emergency_phone}" :error-messages="errors.first('phone:required')"></v-text-field>
        </v-flex>
        <v-flex xs4>
        </v-flex>
        <v-flex xs6 sm6>
          <v-text-field mask="phone" name="emergency phone" label="Emergency contact" v-model="application.emergency_phone" prepend-icon="phone" v-validate="{required:true, max: 11, is_not: application.phone}" :error-messages="errors.first('emergency phone')"></v-text-field>
        </v-flex>
      </v-container>
      <file-pond name="test" ref="pond" label-idle="Drop resume here..." allow-multiple="true" accepted-file-types="application/pdf" v-bind:files="myFiles" v-on:init="handleFilePondInit" />
      <br>
      <br>
      <v-divider></v-divider>
      <br>
      <v-container fluid>
        <v-layout row>
          <v-flex xs12>
            <v-text-field multi-line outline name="story" placeholder="Tell us about a project you've worked on recently..." v-model="application.story" auto-grow v-validate="{required:true, max:500}" counter=500>
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-progress-linear v-if="custom" slot="progress" :value="progress" :color="color" height="14"></v-progress-linear>
      </v-container>
      <v-checkbox name="agreement" @click="toggleCheck" id="mlh" v-model="checkbox" label="Do you agree to MLH terms and conditions?" :error-messages="checkError"></v-checkbox>
      <!-- careful with modifying these buttons, submit must to be of type submit. -->
      <div class="mx-auto gg">
        <v-btn type="submit" outline color="blue">Submit</v-btn>
        <v-btn outline color="red">Clear</v-btn>
      </div>
    </form>
    <v-dialog v-model="loading" persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
<<<<<<< HEAD
          {{loadingMessage}}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
=======
          Submitting Application...
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
>>>>>>> ddee8fbe7b0c35cb6f5b1432906b83c0a3fb3db6
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="feedback" top :color="bannerColor" right :timeout="bannerTimeout">
      {{bannerMessage}}
      <v-btn color="white" flat @click="feedback = false">
        Close
      </v-btn>
    </v-snackbar>
    <!-- <a id="mlh-trust-badge" style="display:block;max-width:100px;min-width:60px;position:fixed;right:50px;top:0;width:10%;z-index:10000" href="https://mlh.io/seasons/na-2019/events?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2019-season&utm_content=gray" target="_blank"><img src="https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-gray.svg" alt="Major League Hacking 2019 Hackathon Season" style="width:100%"></a> -->
  </v-app>
</template>

<script>
/* eslint-disable no-unused-expressions */
import firebase from 'firebase';
import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import debounce from 'debounce';
import Navbar from '@/components/Navbar.vue';
import Navigation from '@/components/Navigation.vue';
import Footer from '@/components/Footer.vue';
import { validationMixin } from 'vuelidate';
import { Validator } from 'vee-validate';
import { required, maxLength, email } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import { allUniversities } from '../private/data';
// import { setTimeout } from 'timers';

const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);
export default {
  mixins: [validationMixin],
  name: 'Apply',
  data() {
    return {
      myFiles: [],
      loading: false,
      feedback: false,
      existing_doc: undefined,
      checkError: undefined,
      pondError: undefined,
      bannerColor: 'success',
      bannerMessage: 'Complete!',
      bannerTimeout: 3000,
      loadingMessage: 'Loading...',
      parent: this,
      picker: null,
      date: '2000-01-01',
      university: null,
      timeout: null,
      allUniversities,
      application: {
        name: '',
        email: '',
        last_modified: undefined,
        first_submitted: undefined,
        school_year: null,
        shirt_size: null,
        dietry_restrictions: null,
        hackathons: null,
        university: null,
        github: '',
        linkedin: '',
        website: '',
        phone: '',
        emergency_phone: '',
        story: '',
        birthday: '',
        documents: [],
      },
      links: ['Home', 'About', 'Contact'],
      story: '',
      custom: true,
      name: '',
      email: '',
      select: null,
      items: ['First Year', 'Second Year', 'Third Year', 'Forth Year', 'Fifth Year'],
      hackathons: ['This is my first one', '2', '3', '5+', '10+'],
      food: ['None', 'Vegetarian', 'Vegan', 'Halal', 'Gluten Free', 'Kosher'],
      shirts: ['XS', 'S', 'M', 'L', 'XL'],
      checkbox: false,
    };
  },
  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    checkbox: { required },
    university: { in: allUniversities },
  },
  components: {
    Navbar,
    Footer,
    FilePond,
    Navigation,
  },
  computed: {
    progress() {
      return Math.min(100, this.application.story.length / 5);
    },
    color() {
      return ['error', 'warning', 'success'][Math.floor(this.progress / 40)];
    },
    currentUser() {
      return firebase.auth().currentUser;
    },
  },
  methods: {
    handleFilePondInit() {
      console.log('FilePond has initialized');
      // FilePond instance methods are available on `this.$refs.pond`
    },
    activateModal(msg) {
      this.loading = true;
      this.loadingMessage = msg;
    },
    softValidation() {
      const { email, name } = this.application;

      if (email && name) return true;
      return false;
    },
    toggleCheck() {
      this.checkError = undefined;
    },
    validateBeforeSubmit() {
      this.$validator.validateAll();
    },
    formChange() {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.timeout = setTimeout(() => {
        this.setApplicationInProgress();
      }, 2000);
    },
    showInfoMessage(msg) {
      this.bannerMessage = msg;
      this.bannerColor = 'success';
      this.feedback = true;
    },
    showErrorMessage(msg) {
      this.bannerMessage = msg;
      this.bannerColor = 'error';
      this.feedback = true;
    },
    setApplicationInProgress() {
      if (this.softValidation()) {
        this.$store.state.db
          .collection('applications')
          .doc('DH5_Test')
          .collection('in progress')
          .doc(firebase.auth().currentUser.email)
          .set(this.application)
          .then(() => {
            console.log('saving...');
            this.showInfoMessage('Application progress saved!');
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
          });
      }
    },
    setDateInformation() {
      const unixts = Math.round(new Date().getTime() / 1000);
      if (this.existing_doc) {
        this.application.last_modified = {
          unix: unixts,
          date: new Date().toString(),
        };
      } else {
        this.application.first_submitted = {
          unix: unixts,
          date: new Date().toString(),
        };
        this.application.last_modified = {
          unix: unixts,
          date: new Date().toString(),
        };
      }
    },
    setApplication() {
      this.setDateInformation();
      this.$store.state.db
        .collection('applications')
        .doc('DH5_Test')
        .collection('submitted')
        .doc(firebase.auth().currentUser.email)
        .set(this.application)
        .then(() => {
          this.$router.push({ name: 'Dashboard' });
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    storeFileAndGetInfo(doc) {
      const { filename, file, id } = doc;
      const storeRef = firebase.storage().ref();
      return new Promise((resolve, reject) => {
        storeRef
          .child(`users/${firebase.auth().currentUser.email}/${filename}`)
          .put(file)
          .then(snapshot => {
            snapshot.ref.getDownloadURL().then(url => {
              resolve({
                download_link: url,
                id,
                filename,
              });
            });
          })
          .catch(err => reject(err));
      });
    },
    async submitApplication() {
      // consider async.js / async-each alternatives
      if (!this.checkbox) {
        this.checkError = 'Please accept the terms and conditions to continue.';
        return;
      }
      const files = this.$refs.pond.getFiles();
      if (files.length > 3) {
        this.showErrorMessage('Applications are limited to three files!');
        return;
      }
      this.activateModal('Submitting application...');
      const results = [];
      for (const doc of files) {
        if (doc.fileExtension === 'pdf') {
          results.push(this.storeFileAndGetInfo(doc));
        }
      }
      this.application.documents = await Promise.all(results).catch(err => {
        console.log(`Upload Failed: ${err}`);
        this.loading = false;
      });
      this.setApplication();
    },
  },
  beforeMount() {
    this.activateModal('Retrieving user info...');
    this.$store.state.db
      .collection('applications')
      .doc('DH5_Test')
      .collection('in progress')
      .doc(firebase.auth().currentUser.email)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.existing_doc = doc;
          this.application = doc.data();
          this.loading = false;
        } else {
          console.log('Document not found!');
          this.loading = false;
        }
      })
      .catch((err) => {
        console.log('User app query failed.');
        this.loading = false;
      });
  },
};
</script>

<style scoped>
.ff {
  margin-top: 5%;
  width: 40%;
}

#mlh {
  margin-top: 10%;
}
.gg {
  display: inline-block;
}
.section.split {
  margin-top: 3%;
  margin-bottom: 3%;
}
.gradient {
  background: rgb(0, 21, 36);
  background: linear-gradient(
    90deg,
    rgba(0, 21, 36, 0.5494572829131652) 0%,
    rgba(93, 162, 198, 0.896796218487395) 0%
  );
}
.large {
  font-size: 1.3em !important;
}
</style>
