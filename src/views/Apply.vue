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
      <file-pond @addfile="submitFileInfoOnDrop" name="test" ref="pond" label-idle="Drop resume here..." allow-multiple="false" accepted-file-types="application/pdf" v-bind:files="myFiles" v-on:init="handleFilePondInit" />
      <v-chip class="no border" v-if="editing" outline small color="gray">
        <!-- <v-icon left>info</v-icon>Submitting another file will replace {{application.documents.filename}} -->
      </v-chip>
      <br>
      <br>
      <v-divider></v-divider>
      <br>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <p class="text-lg-left">Tell us about a project you worked on/ thing you made/ internship you did/ course you took that you are really passionate about, and why?</p>
            <v-text-field multi-line outline name="story" placeholder="Tell us about a project you've worked on recently..." v-model="application.q1" auto-grow v-validate="{required:true, max:500}" counter=500>
            </v-text-field>
            <v-progress-linear v-if="custom" slot="progress" :value="progress" :color="color" height="14"></v-progress-linear>
          </v-flex>
          <v-flex xs12>
            <p class="text-lg-left">Why do you want to come to Deltahacks V, what is one thing that you are passionate to bring to this years hackathon?</p>
            <v-text-field multi-line outline name="story2" placeholder="Why do you want to come to Deltahacks V..." v-model="application.q2" auto-grow v-validate="{required:true, max:500}" counter=500>
            </v-text-field>
            <v-progress-linear v-if="custom" slot="progress" :value="progress" :color="color" height="14"></v-progress-linear>
          </v-flex>
          <v-flex xs12>
            <p class="text-lg-left">If you could invent a new programming language what would you name it</p>
            <v-text-field outline name="story2" placeholder="New language name..." v-model="application.q3" auto-grow v-validate="{required:true, max:100}" counter=100>
            </v-text-field>
          </v-flex>
          <v-flex xs12>
            <p class="text-lg-left">Is there something else you'd like us to know?</p>
            <v-text-field outline name="story2" placeholder="Is there something else you'd like us to know?" v-model="application.q4" auto-grow v-validate="{required:true, max:300}" counter=300>
            </v-text-field>
          </v-flex>
        </v-layout>
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
          {{loadingMessage}}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
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
import { list_of_universities as allUniversities } from '../private/data';
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
      editing: false,
      existing_doc: undefined,
      checkError: undefined,
      pondError: undefined,
      bannerColor: 'success',
      bannerMessage: 'Complete!',
      bannerTimeout: 3000,
      loadingMessage: 'Loading...',
      parent: this,
      url: '',
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
        q1: '',
        q2: '',
        q3: '',
        q4: '',
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
    async submitFileInfoOnDrop() {
      const files = this.$refs.pond.getFiles();
      try {
        const info = await this.storeFileAndGetInfo(files[0]);
        this.application.documents = info;
        this.setApplicationInProgress();
      } catch (err) {
        console.log(err);
      }
    },
    setApplicationInProgress() {
      const unixts = Math.round(new Date().getTime() / 1000);
      this.application.last_modified = {
          unix: unixts,
          date: new Date().toString(),
      }
      this.application.first_submitted = {
        unix: 0,
        date: "",
      }
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
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    setDateInformation() {
      const unixts = Math.round(new Date().getTime() / 1000);
      this.application.first_submitted = {
        unix: unixts,
        date: new Date().toString(),
      };
      this.application.last_modified = {
        unix: unixts,
        date: new Date().toString(),
      };
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
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    storeFileAndGetInfo(doc) {
      if (!doc) return;
      const { filename, file, id } = doc;
      const storeRef = firebase.storage().ref();
      return new Promise((resolve, reject) => {
        storeRef
          .child(`users/${firebase.auth().currentUser.email}/${filename}`)
          .put(file)
          .then((snapshot) => {
            snapshot.ref.getDownloadURL().then((url) => {
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
      this.activateModal('Submitting application...');
      const resume = files[0];
      const results = [];
      if (resume) {
        results.push(this.storeFileAndGetInfo(files[0]));
        this.application.documents = await Promise.all(results).catch((err) => {
          console.log(`Upload Failed: ${err}`);
          this.loading = false;
        });
      }
      this.setApplication();
    },
    insertUserFileData(doc) {
      this.$refs.pond.addFile(doc.download_link);
    },
  },
  beforeMount() {
    this.activateModal('Loading...');
    this.$store.state.db
      .collection('applications')
      .doc('DH5_Test')
      .collection('in progress')
      .doc(firebase.auth().currentUser.email)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.editing = true;
          this.application = doc.data();
          // this.insertUserFileData(this.application.documents);
          this.loading = false;
        } else {
          console.log('Document not found!');
          this.editing = false;
          this.loading = false;
        }
      })
      .catch((err) => {
        console.log('User app query failed.');
        console.log(err);
        this.loading = false;
      });
  },
};
</script>

<style scoped>
@media only screen and (min-width: 1280px) and (max-width: 4000px) {
    .ff {
    margin-top: 5%;
    width: 40%;
    }
}

@media only screen and (min-width: 500px) and (max-width: 1280px) {
    .ff {
    margin-top: 5%;
    width: 70%;
    }
}

@media only screen and (max-width: 500px) {
    .ff {
    margin-top: 5%;
    width: 90%;
    }
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
.no.border {
  border: none;
}
</style>
