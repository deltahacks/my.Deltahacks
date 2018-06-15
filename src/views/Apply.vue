<template>
  <v-app class="dashboard">
    <Navbar/>
    <form class="ff mx-auto">
      <v-text-field v-model="application.name" :error-messages="nameErrors" :counter="10" label="Name" required @input="$v.name.$touch()" @blur="$v.name.$touch()"></v-text-field>
      <v-text-field v-model="application.email" v-validate="'required|email'" :error-messages="emailErrors" label="E-mail" required @input="$v.email.$touch()" @blur="$v.email.$touch()"></v-text-field>
      <v-date-picker reactive=true v-model="date" color="green lighten-1"></v-date-picker>
      <v-select :items="list_of_universities" v-model="university" label="What university do you go to?" autocomplete></v-select>
      <v-select v-model="application.school_year" :items="items" :error-messages="selectErrors" label="Year" required @change="$v.select.$touch()" @blur="$v.select.$touch()">
      </v-select>
      <v-select v-model="application.shirt_size" :items="shirts" :error-messages="selectErrors" label="Shirt size" required @change="$v.select.$touch()" @blur="$v.select.$touch()">
      </v-select>
      <v-select v-model="select" :items="food" :error-messages="selectErrors" label="Dietary restrictions" required @change="$v.select.$touch()" @blur="$v.select.$touch()">
      </v-select>
      <v-select v-model="select" :items="hackathons" :error-messages="selectErrors" label="How many hackathons have you attended?" required @change="$v.select.$touch()" @blur="$v.select.$touch()">
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

      <v-checkbox id="mlh" v-model="checkbox" :error-messages="checkboxErrors" label="Do you agree to MLH terms and conditions?" required @change="$v.checkbox.$touch()" @blur="$v.checkbox.$touch()"></v-checkbox>

      <div class="mx-auto gg" style="border: solid 2px black">
        <v-btn @click="submit">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
      </div>

    </form>

  </v-app>
</template>

<script>
/* eslint-disable no-unused-expressions */

import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { validationMixin } from 'vuelidate';
import { required, maxLength, email } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import { list_of_universities } from '../private/data';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

export default {
  mixins: [validationMixin],
  name: 'Apply',
  data() {
    return {
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
  methods: {},
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
