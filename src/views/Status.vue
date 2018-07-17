<template>
  <v-app class="dashboard">
    <div class="topnav">
      <div class="w3-bar">
        <a href="/status" class="w3-bar-item w3-button w3-hover-none w3-border-black w3-bottombar w3-hover-border-blue w3-hover-text-blue">Link 3</a>
        <a href="/dashboard" class="w3-bar-item w3-button w3-border-white w3-bottombar w3-hover-border-blue w3-hover-text-red">Link 1</a>
        <a href="/" class="w3-bar-item w3-button w3-hover-none w3-border-white w3-bottombar w3-hover-border-blue w3-hover-text-blue">Link 2</a>
        <a href="/apply" class="w3-bar-item w3-button w3-border-white w3-bottombar w3-hover-border-color w3-hover-text-red">Link 3</a>
      </div>
    </div>
    <div class="container-status100" style="background-image: url('https://wallpapersite.com/images/pages/pic_w/14088.png');">
      <div class="wrap-status100">
        <h1>This application is still under review</h1>
        <v-card-text></v-card-text>
        <v-stepper alt-labels>
          <div class="wrap-status200">
            <v-stepper-header>
              <v-stepper-step step="1" complete>Applied</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="2" complete>Received</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3">Processing</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="4">Decision</v-stepper-step>
            </v-stepper-header>
          </div>
        </v-stepper>
      </div>
    </div>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { validationMixin } from 'vuelidate';
import { required, maxLength, email } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import { list_of_universities } from '../private/data';

export default {
  mixins: [validationMixin],
  name: 'Status',
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
      items: ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Fifth Year'],
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
  },
  computed: {},
  methods: {},
};
</script>
<style scoped src='../assets/css/status.css'>
</style>
