<template>
  <v-app class="dashboard">
    <Navbar/>
    <form class="ff mx-auto" ref="form" @submit.prevent="validateBeforeSubmit" @submit="submitApplication">
      <v-text-field name="name" v-model="application.name" label="Name"
                    v-validate="{required:true, max:100}"
                    :error-messages="errors.first('name')" data-vv-delay="1000"></v-text-field>
                    <!-- find a better way of including this in form -->
      <v-text-field name="email" v-model="application.email" label="E-mail"
                    v-validate="{required:true, email:true, max:100}"
                    :error-messages="errors.first('email')" data-vv-delay="8000"></v-text-field>
      <!-- <v-date-picker name="date" v-model="date" color="green lighten-1"
                    v-validate="'required:true'"></v-date-picker> -->
      <v-text-field name="date" v-model="application.date" mask="date" label="Date of Birth" placeholder="dd/mm/yyyy"
                    v-validate="{required: true}" :error-messages="errors.first('date')"></v-text-field>
      <v-select name="university" :items="list_of_universities" v-model="application.university"
                  label="What university do you go to?" autocomplete
                  v-validate="{required: true}"
                  :error-messages="errors.first('university:required')" data-vv-delay="1000"></v-select>
      <v-select name="year" v-model="application.school_year" :items="items" label="Year"
                  v-validate="{required:true}"
                  :error-messages="errors.first('year:required')" data-vv-delay="1000">
      </v-select>
      <v-select v-model="application.shirt_size" :items="shirts" label="Shirt size"
                  v-validate="{required:true}" name="shirt size"
                  :error-messages="errors.first('shirt size:required')" data-vv-delay="1000">
      </v-select>
      <v-select v-model="application.dietry_restrictions" :items="food" label="Dietary restrictions"
                  v-validate="{required:true}" name="diet"
                  :error-messages="errors.first('diet:required')" data-vv-delay="1000">
      </v-select>
      <v-select v-model="application.hackathons" :items="hackathons" label="How many hackathons have you attended?"
                  v-validate="{required:true}" name="hackathons"
                  :error-messages="errors.first('hackathons:required')" data-vv-delay="1000">
      </v-select>
      <v-text-field name="github" label="Your Github" single-line data-vv-delay="4000"
                    v-model="application.github" prepend-icon="fab fa-github"
                    v-validate="{max:150, url:true}" :error-messages="errors.first('github')">
      </v-text-field>
      <v-text-field name="linkedin" label="Your Linkedin" single-line data-vv-delay="4000"
                    v-model="application.linkedin" prepend-icon="fab fa-linkedin"
                    v-validate="{max:150, url:true}" :error-messages="errors.first('linkedin')">
      </v-text-field>
      <v-text-field name="website" label="Your Website" single-line data-vv-delay="4000"
                    v-model="application.website" prepend-icon="fas fa-link"
                    v-validate="{max:150, url:true}" :error-messages="errors.first('website')">
      </v-text-field>

      <v-container d-inline-flex>
        <v-flex xs6 sm6>
          <v-text-field mask="phone" name="phone" label="Your cell phone number" v-model="application.phone" single-line prepend-icon="phone" data-vv-delay="1000"
                        v-validate="{required:true, max: 11, is_not: application.emergency_phone}" :error-messages="errors.first('phone:required')"></v-text-field>
        </v-flex>
        <v-flex xs4>
        </v-flex>
        <v-flex xs6 sm6>
          <v-text-field mask="phone" name="emergency phone" label="Emergency contact phone number" v-model="application.emergency_phone" single-line prepend-icon="phone"
                        v-validate="{required:true, max: 11, is_not: application.phone}" :error-messages="errors.first('emergency phone')"></v-text-field>
        </v-flex>
      </v-container>
      <file-pond name="test" ref="pond" label-idle="Drop resume here..." allow-multiple="true" 
        accepted-file-types="application/pdf" v-bind:files="myFiles" v-on:init="handleFilePondInit" />
      <br>

      <v-card flat >
        <v-card-text>
          <v-container fluid>
            <v-layout row>
              <v-flex xs12>
                <v-text-field box multi-line outline
                 name="story" placeholder="Tell us about a project you've worked on recently..."
                 v-model="application.story" auto-grow
                 v-validate="{required:true, max:500}" counter=500>
                </v-text-field>
              </v-flex>

            </v-layout>
            <v-progress-linear v-if="custom" slot="progress" :value="progress" :color="color" height="14"></v-progress-linear>
          </v-container>
        </v-card-text>
      </v-card>
      <v-checkbox name="agreement" @click="toggleCheck" id="mlh" v-model="checkbox"  
      label="Do you agree to MLH terms and conditions?" :error-messages="checkError"></v-checkbox>

      <div class="mx-auto gg" style="border: solid 2px black">
        <v-btn class="button is-primary" type="submit">submit</v-btn>
        <v-btn>clear</v-btn>
      </div>

    </form>

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
import { each } from 'async-each';

import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { validationMixin } from 'vuelidate';
import { Validator } from 'vee-validate';
import { required, maxLength, email } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import { list_of_universities } from '../private/data';

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
);
export default {
  mixins: [validationMixin],
  name: 'Apply',
  data() {
    return {
      myFiles: [],
      checkError: undefined,
      parent: this,
      picker: null,
      date: '2000-01-01',
      university: null,
      list_of_universities,
      application: {
        name: '',
        email: '',
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
        date:'',
        documents:[],
      },
      links: ['Home', 'About', 'Contact'],
      story: '',
      custom: true,
      name: '',
      email: '',
      select: null,
      items: [
        'First Year',
        'Second Year',
        'Third Year',
        'Forth Year',
        'Fifth Year',
      ],
      hackathons: ['This is my first one', '2', '3', '5+', '10+'],
      food: ['Vegetarian', 'Vegan', 'Halal', 'Gluten Free', 'Kosher'],
      shirts: ['XS', 'S', 'M', 'L', 'XL'],
      checkbox: false,
    };
  },
  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    checkbox: { required },
    university: { in: list_of_universities },
  },
  components: {
    Navbar,
    Footer,
    FilePond,
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
    toggleCheck() {
      this.checkError = undefined;
    },
    validateBeforeSubmit() {
      return true;
      this.$validator.validateAll();
    },
    setApplication() {
      this.$store.state.db.collection('applications')
        .doc('DH6')
        .collection('all')
        .doc(firebase.auth().currentUser.email)
        .set(this.application)
        .then(() => this.$router.push({ name: 'Dashboard' }))
        .catch(err => console.log(err));
    },
    async submitApplication() { // consider async.js / async-each alternatives
      if (!this.checkbox) {
        this.checkError = 'Please accept the terms and conditions to continue.';
        return;
      }
      const storeRef = firebase.storage().ref();   
      const files = this.$refs.pond.getFiles();
      for(const doc of files) {        
        const { filename, file, id, fileExtension } = doc;
        console.log('fileExtension');
        if (fileExtension !== 'pdf') continue;
        await storeRef.child(`users/${firebase.auth().currentUser.email}/${filename}`).put(file).then(async (snapshot) => {
          await snapshot.ref.getDownloadURL().then((url) => {
            this.application.documents.push({
              download_link: url,
              id,
              filename,
            })  
          })              
        }).catch(err => console.error(`Upload failed: ${err}`));             
      }  
      console.log('Setting data...');
      this.setApplication();
    },
  },
  beforeMount() {
    this.$store.state.db.collection('applications')
        .doc('DH6')
        .collection('all')
        .doc(firebase.auth().currentUser.email)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log(doc.data());
            this.application = doc.data();
          } else {
            console.log('Document not found!');
          }
        })
  }
};
</script>

<style>
.ff {
  margin-top: 5%;
  width: 70%;
}

#mlh {
  margin-top: 10%;
}
.gg {
  display: inline-block;
}
</style>
