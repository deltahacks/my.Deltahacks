<template>
  <v-app class="dashboard background" style="background-image: url('https://wallpapersite.com/images/pages/pic_w/14088.png');">
    <Navbar2 class="navbar1" />
    <div class='container-status100'>
      <form @keyup="formChange" class="ff mx-auto " ref="form" @submit.prevent="validateBeforeSubmit" @submit="submitApplication">
        <!-- <v-subheader class="large">About You</v-subheader>
      <v-divider></v-divider>
      <br> -->
        <h1 v-if="!submitted" class='text-xs-left'>Apply here.</h1>
        <h1 v-else class='text-xs-left'>You've submitted your application. 😁</h1>
        <p v-if="!submitted" class='text-xs-left'>Please fill out this application form to the best of your abilities. This form will autosave, you can come back to submit it any time before the deadline. The more information submitted, the greater the chances of being accepted to DeltaHacks V. You will receive an email on acceptance or waitlisting of your application.</p>
        <p v-else class='text-xs-left'>Your application has been recieved by us, sit back and relax while our team reviewes it. You'll be notified when a decision is made, in the meantime you can check the status page to check the progress of your application. If you wish to make any changes you can email relations@deltahacks.com.</p>
        <label for="name" style='float:left'>
          <strong>What is your full name?</strong>
        </label>
        <v-text-field name="name" id='name' :disabled="submitted" autocomplete="off" v-model="application.name" v-validate="{required:true, max:100}" :error-messages="errors.first('name')" data-vv-delay="1000"></v-text-field>
        <!-- find a better way of including this in form -->
        <!-- <v-text-field name="email" :disabled="submitted" v-model="application.email" label="What email should we use to contact you?" v-validate="{required:true, email:true, max:100}" :error-messages="errors.first('email')" data-vv-delay="5000"></v-text-field> -->
        <!-- <v-date-picker name="date" v-model="date" color="green lighten-1"
                    v-validate="'required:true'"></v-date-picker> -->
        <label for="date" style='float:left'>
          <strong>When is your birthday?</strong>
        </label>
        <v-text-field name="date" id="date" :disabled="submitted" v-model="application.birthday" mask="date" placeholder="dd/mm/yyyy" v-validate="{required: true}" :error-messages="errors.first('date')"></v-text-field>
        <label for="university" style='float:left'><strong>What university do you go to?</strong></label>
        <v-select name="university" id='university' :disabled="submitted" @change="formChange" :items="allUniversities" v-model="application.university"  autocomplete v-validate="{required: true}" :error-messages="errors.first('university:required')" data-vv-delay="1000"></v-select>
        <label for="major" style='float:left'><strong>What do you study?</strong></label>
        <v-text-field name="major" id='major' :disabled="submitted" autocomplete="off" v-model="application.major" v-validate="{required:false, max:100}" :error-messages="errors.first('major')" data-vv-delay="1000"></v-text-field>
        <label for="year" style='float:left'><strong>What year of school are you in?</strong></label>
        <v-select name="year" id='year' :disabled="submitted" @change="formChange" v-model="application.school_year" :items="items" v-validate="{required:true}" :error-messages="errors.first('year:required')" data-vv-delay="1000">
        </v-select>
        <!-- <br>
      <v-subheader class="large">Hackathon Info</v-subheader>
      <v-divider></v-divider>
      <br> -->
        <label for="shirt size" style='float:left'>
          <strong>What's your shirt size?</strong>
        </label>
        <v-select v-model="application.shirt_size" :disabled="submitted" @change="formChange" :items="shirts" v-validate="{required:true}" name="shirt size" id="shirt size" :error-messages="errors.first('shirt size:required')" data-vv-delay="1000">
        </v-select>
        <label for="diet" style='float:left'>
          <strong>Any dietary restrictions?</strong>
        </label>
        <v-select v-model="application.dietry_restrictions" :disabled="submitted" @change="formChange" :items="food" v-validate="{required:true}" name="diet" id='diet' :error-messages="errors.first('diet:required')" data-vv-delay="1000">
        </v-select>
        <label for="hackathons" style='float:left'>
          <strong>How many hackathons have you attended?</strong>
        </label>
        <v-select v-model="application.hackathons" @change="formChange" :disabled="submitted" :items="hackathons" v-validate="{required:true}" name="hackathons" id="hackathons" :error-messages="errors.first('hackathons:required')" data-vv-delay="1000">
        </v-select>
        <!-- <br>
      <v-subheader class="large">Portfolio & Contact</v-subheader>
      <v-divider></v-divider>
      <br> -->
        <v-text-field name="github" :disabled="submitted" label="Your Github" single-line data-vv-delay="4000" v-model="application.github" prepend-icon="fab fa-github" v-validate="{max:150, url:true}" :error-messages="errors.first('github')">
        </v-text-field>
        <v-text-field name="linkedin" :disabled="submitted" label="Your Linkedin" single-line data-vv-delay="4000" v-model="application.linkedin" prepend-icon="fab fa-linkedin" v-validate="{max:150, url:true}" :error-messages="errors.first('linkedin')">
        </v-text-field>
        <v-text-field name="website" :disabled="submitted" label="Your Website" single-line data-vv-delay="4000" v-model="application.website" prepend-icon="fas fa-link" v-validate="{max:150, url:true}" :error-messages="errors.first('website')">
        </v-text-field>
        <v-container d-inline-flex>
          <v-flex xs6 sm6>
            <label for="phone" style='float:left'>
              <strong>Your cell phone number</strong>
            </label>
            <v-text-field mask="phone" :disabled="submitted" name="phone" id='phone' v-model="application.phone" prepend-icon="phone" data-vv-delay="1000" v-validate="{required:true, max: 11, is_not: application.emergency_phone}" :error-messages="errors.first('phone:required')"></v-text-field>
          </v-flex>
          <v-flex xs4>
          </v-flex>
          <v-flex xs6 sm6>
            <label for="emergency phone" style='float:left'>
              <strong>Emergency contact</strong>
            </label>
            <v-text-field mask="phone" :disabled="submitted" name="emergency phone" id='emergency phone' v-model="application.emergency_phone" prepend-icon="phone" v-validate="{required:true, max: 11, is_not: application.phone}" :error-messages="errors.first('emergency phone')"></v-text-field>
          </v-flex>
        </v-container>
        <div id="filePondContainer">
          <file-pond @addfile="submitFileInfoOnDrop" v-if="!submitted" name="test" ref="pond" label-idle="Drop resume here..." allow-multiple="false" accepted-file-types="application/pdf" v-bind:files="myFiles" v-on:init="handleFilePondInit" />
          <v-chip class="no border" style="float:left" v-if="haveFile" outline small color="gray">
            <v-icon left>info</v-icon>
            <strong>We've got your file "</strong>
            <a target="_blank" :href="application.documents.download_link">{{application.documents.filename}}</a>"
          </v-chip>
        </div>
        <br>
        <br>
        <v-divider></v-divider>
        <br>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs12>
              <p class="text-lg-left">Tell us about a project you worked on/ thing you made/ internship you did/ course you took that you are really passionate about, and why?</p>
              <v-text-field multi-line outline :disabled="submitted" name="q1" placeholder="Tell us about a project you've worked on recently..." v-model="application.q1" auto-grow v-validate="{required:true, max:500}" counter=500>
              </v-text-field>
              <v-progress-linear v-if="custom" slot="progress" :value="q1Progress" :color="q1Color" height="5"></v-progress-linear>
            </v-flex>
            <v-flex xs12>
              <p class="text-lg-left">Why do you want to come to Deltahacks V, what is one thing that you are passionate to bring to this years hackathon?</p>
              <v-text-field :disabled="submitted" multi-line outline name="q2" placeholder="Why do you want to come to Deltahacks V..." v-model="application.q2" auto-grow v-validate="{required:true, max:500}" counter=500>
              </v-text-field>
              <v-progress-linear v-if="custom" slot="progress" :value="q2Progress" :color="q2Color" height="5"></v-progress-linear>
            </v-flex>
            <v-flex xs12>
              <p class="text-lg-left">If you could invent a new programming language what would you name it</p>
              <v-text-field :disabled="submitted" outline name="q3" placeholder="New language name..." v-model="application.q3" auto-grow v-validate="{required:true, max:100}" counter=100>
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <p class="text-lg-left">Is there something else you'd like us to know?</p>
              <v-text-field :disabled="submitted" outline name="q4" placeholder="Is there something else you'd like us to know?" v-model="application.q4" auto-grow v-validate="{required:true, max:300}" counter=300>
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-checkbox name="agreement" @click="toggleCheck" :disabled="submitted" id="mlh" v-model="checkbox" label="Do you agree to MLH terms and conditions?" :error-messages="checkError"></v-checkbox>
        <!-- submission and clearn btns + confirmation dialog -->
        <div class="mx-auto gg">
          <!-- <v-btn type="submit" outline color="blue" :disabled="submitted">Submit</v-btn> -->
          <v-dialog v-model="confirm" persistent max-width="400">
            <v-btn slot="activator" outline color="blue" :disabled="submitted">Submit</v-btn>
            <v-card>
                <v-card-title class="headline">Are you sure you'd like to submit?</v-card-title>
                <v-card-text>You will no longer be able to edit your application once you have submitted.</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" flat @click.native="confirm = false">No</v-btn>
                <v-btn color="green darken-1" @click.prevent="validateBeforeSubmit" @click="submitApplication" flat>Yes</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
          <!-- <v-btn outline color="red" :disabled="submitted">Clear</v-btn> -->
          <v-dialog v-model="confirmClear" persistent max-width="400">
            <v-btn slot="activator" outline color="red" :disabled="submitted">Clear</v-btn>
            <v-card>
                <v-card-title class="headline">Are you sure you'd like to clear?</v-card-title>
                <v-card-text>Saved progress will be lost on next save.</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" flat @click.native="confirmClear = false">No</v-btn>
                <v-btn color="green darken-1" flat @click="clearForm">Clear</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </div>
      </form>
      <!-- loading dialog -->
      <v-dialog v-model="loading" persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            {{loadingMessage}}
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <!-- saved notification -->
      <v-snackbar v-model="feedback" top :color="bannerColor" right :timeout="bannerTimeout">
        {{bannerMessage}}
        <v-btn color="white" flat @click="feedback = false">
          Close
        </v-btn>
      </v-snackbar>
    </div>
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
import Navbar2 from '@/components/Navbar2.vue';
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
      confirm: false,
      confirmClear: false,
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
      submitted: false,
      date: '2000-01-01',
      university: null,
      timeout: null,
      allUniversities,
      application: {
        name: '',
        email: firebase.auth().currentUser.email,
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
        major: '',
        birthday: '',
        documents: [],
      },
      links: ['Home', 'About', 'Contact'],
      q1: '',
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
    Navbar2,
  },
  computed: {
        q1Progress() {
            return Math.min(100, this.application.q1.length / 5);
        },
        q2Progress() {
            return Math.min(100, this.application.q2.length / 5);
        },
        q1Color() {
            return ['error', 'warning', 'success'][Math.floor(this.q1Progress / 40)];
        },
        q2Color() {
            return ['error', 'warning', 'success'][Math.floor(this.q2Progress / 40)];
        },
        currentUser() {
            return firebase.auth().currentUser;
        },
        haveFile() {
            return this.editing && this.application.documents.filename;
        },
    },
    methods: {
        handleFilePondInit() {
            console.log('FilePond has initialized');
            // FilePond instance methods are available on `this.$refs.pond`
        },
        getEmptyApplication() {
            return {
                name: '',
                email: firebase.auth().currentUser.email,
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
                major: '',
                birthday: '',
                documents: [],
            }
        },
        clearForm() {
            this.confirmClear = false;
            this.application = this.getEmptyApplication();
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
                if (this.submitted) {
                    this.$refs.pond.removeFile(0);
                    return;
                }
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
            };
            this.application.first_submitted = {
                unix: 0,
                date: '',
            };
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
                .catch(err => {
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
            this.confirm = false;
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
                this.application.documents = await Promise.all(results).catch(err => {
                    console.log(`Upload Failed: ${err}`);
                    this.loading = false;
                });
            }
            this.setApplication();
        },
        insertUserFileData(doc) {
            this.$refs.pond.addFile(doc.download_link);
        },
        fillApplicationFields() {
            const ref = this.application;
            ref.q1 = ref.q1 ? ref.q1 : '';
            ref.q2 = ref.q2 ? ref.q2 : '';
            ref.q3 = ref.q3 ? ref.q3 : '';
            ref.q4 = ref.q4 ? ref.q4 : '';
        },
        getUserAppStatus(userEmail) {
            return new Promise((resolve, reject) => {
                this.$store.state.db
                    .collection('applications')
                    .doc('DH5_Test')
                    .collection('submitted')
                    .doc(userEmail)
                    .get()
                    .then(doc => {
                        resolve(doc.exists);
                    })
                    .catch(err => reject(err));
            });
        },
    },
    beforeMount() {
        this.activateModal('Loading...');
        const userEmail = firebase.auth().currentUser.email;
        this.$store.state.db
            .collection('applications')
            .doc('DH5_Test')
            .collection('in progress')
            .doc(userEmail)
            .get()
            .then(async doc => {
                const submitted = await this.getUserAppStatus(userEmail);
                if (submitted) {
                    this.editing = true;
                    this.submitted = true;
                    this.checkbox = true;
                    this.application = doc.data();
                    this.fillApplicationFields();
                    this.loading = false;
                } else if (doc.exists) {
                    this.editing = true;
                    this.application = doc.data();
                    this.fillApplicationFields();
                    // this.insertUserFileData(this.application.documents);
                    this.loading = false;
                } else {
                    console.log('Document not found!');
                    this.editing = false;
                    this.loading = false;
                }
            })
            .catch(err => {
                console.log('User app query failed.');
                console.log(err);
                this.loading = false;
            });
    },
  }
</script>

<style scoped>
h1 {
    margin-bottom: 2%;
    margin-top: 5%;
}

p {
    font-weight: bold;
    align: left;
}

@media only screen and (min-width: 1280px) and (max-width: 4000px) {
    .ff {
        width: 40%;
        margin-bottom: 10%;
    }
}

@media only screen and (min-width: 500px) and (max-width: 1280px) {
    .ff {
        margin-bottom: 10%;
        width: 70%;
    }
}

@media only screen and (max-width: 500px) {
    .ff {
        margin-bottom: 10%;
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

.background {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    z-index: 0;
    background-color: rgba(255, 255, 255, 0.8);
}
.navbar1 {
    z-index: 0;
    background-color: rgba(255, 255, 255, 0.8);
}
.container-status100 {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 15px;
    padding-bottom: 0px;
    overflow: hidden;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
    z-index: 1;
}

.container-status100::before {
    content: '';
    display: block;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.8);
}
</style>
