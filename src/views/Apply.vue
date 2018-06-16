<template>
  <v-app class="dashboard">
    <Navbar/>
    <form class="ff mx-auto">
      <v-text-field v-model="application.name" :counter="10" label="Name"></v-text-field>
      <v-text-field v-model="application.email" label="E-mail"></v-text-field>
      <v-date-picker v-model="date" color="green lighten-1"></v-date-picker>
      <v-select :items="list_of_universities" v-model="university" label="What university do you go to?" autocomplete></v-select>
      <v-select v-model="application.school_year" :items="items" label="Year">
      </v-select>
      <v-select v-model="application.shirt_size" :items="shirts" label="Shirt size">
      </v-select>
      <v-select v-model="select" :items="food" label="Dietary restrictions">
      </v-select>
      <v-select v-model="select" :items="hackathons" label="How many hackathons have you attended?">
      </v-select>
      <v-text-field name="input-1-3" label="Your Github" single-line v-model="application.github" prepend-icon="fab fa-github">
      </v-text-field>
      <v-text-field name="input-1-3" label="Your Linkedin" single-line v-model="application.linkedin" prepend-icon="fab fa-linkedin">
      </v-text-field>
      <v-text-field name="input-1-3" label="Your Website" single-line v-model="application.website" prepend-icon="fas fa-link">
      </v-text-field>

      <v-container d-inline-flex>
        <v-flex xs6 sm6>
          <v-text-field name="input-1-3" label="Your cell phone number" single-line prepend-icon="phone"></v-text-field>
        </v-flex>
        <v-flex xs4>
        </v-flex>
        <v-flex xs6 sm6>
          <v-text-field name="input-1-3" label="Emergency contact phone number" single-line prepend-icon="phone"></v-text-field>
        </v-flex>
      </v-container>
      <file-pond name="test" ref="pond" label-idle="Drop files here..." allow-multiple="true" accepted-file-types="application/pdf" server="/api" v-bind:files="myFiles" v-on:init="handleFilePondInit" />
      <br>
      <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>

      <v-card color="grey" flat>
        <v-card-text>
          <v-container fluid>
            <v-layout row>
              <v-flex xs12>
                <v-text-field name="input-1" label="Tell us about a project you've worked on recently" textarea dark v-model="story"></v-text-field>
              </v-flex>

            </v-layout>
            <v-progress-linear v-if="custom" slot="progress" :value="progress" :color="color" height="14"></v-progress-linear>
          </v-container>
        </v-card-text>
      </v-card>

      <v-checkbox id="mlh" v-model="checkbox" label="Do you agree to MLH terms and conditions?"></v-checkbox>

      <div class="mx-auto gg" style="border: solid 2px black">
        <v-btn>submit</v-btn>
        <v-btn>clear</v-btn>
      </div>

    </form>

  </v-app>
</template>

<script>
/* eslint-disable no-unused-expressions */
import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { validationMixin } from 'vuelidate';
import { required, maxLength, email } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import { list_of_universities } from '../private/data';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
);

export default {
  mixins: [validationMixin],
  name: 'Apply',
  data() {
    return {
      myFiles: ['cat.jpeg'],
      parent: this,
      picker: null,
      date: '2000-01-01',
      university: null,
      list_of_universities,
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { 'My-Awesome-Header': 'header value' },
        addRemoveLinks: true,
        acceptedFiles: 'application/pdf',
      },
      application: {
        name: '',
        email: '',
        school_year: null,
        shirt_size: null,
        dietry_restrictions: null,
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
  },
  components: {
    Navbar,
    Footer,
    FilePond,
    vueDropzone: vue2Dropzone,
  },
  computed: {
    progress() {
      return Math.min(100, this.story.length / 5);
    },
    color() {
      return ['error', 'warning', 'success'][Math.floor(this.progress / 40)];
    },
  },
  methods: {
    handleFilePondInit() {
      console.log('FilePond has initialized');

      // FilePond instance methods are available on `this.$refs.pond`
    },
  },
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
