<template>
    <v-app class="dashboard background" style="background-image: url('https://github.com/deltahacks/my.Deltahacks/blob/master/my/src/assets/Backgimg2.jpg?raw=true');">
        <Navbar2 class="navbar1" />
        <div class='container-status100'>
            <div class="wrap-apply100" >
                <form @keyup="formChange" class="ff mx-auto " ref="form" @submit.prevent="validateBeforeSubmit" @submit="submitApplication">
                    <h1 >DeltaHacks V applications are now closed!</h1>
                    <p> If you've already submitted your application and would like to see it's current status, please go <a href="/status">here</a>.</p>
                    <p> Still want a chance to hack at McMaster? DeltaHacks is hosting an <a :href="hackday_link">MLH Local Hack Day</a> on Dec 1st!</p>
                </form>
                  <div>
                    <img href="@/assets/hackday.png"/>
                  </div>
            </div>
        </div>
        <!-- <v-layout row justify-center>
          <v-dialog v-model="deadline" persistent max-width="450" min-height="350">
            <v-card>
              <v-card-title class="mx-auto gg headline">Sorry, DeltaHacks V applications are now closed!</v-card-title>
              <v-card-text>If you've already submitted your application and would like to see it's current status, please go <a href="/status">here</a>.<br><br>
               Still want a chance to hack at McMaster? DeltaHacks is hosting an <a :href="hackday_link">MLH Local Hack Day</a> on Dec 1st!</v-card-text>
            </v-card>
          </v-dialog>
        </v-layout> -->
        <!-- <a id="mlh-trust-badge" style="display:block;max-width:100px;min-width:60px;position:fixed;right:50px;top:0;width:10%;z-index:10000" href="https://mlh.io/seasons/na-2019/events?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2019-season&utm_content=gray" target="_blank"><img src="https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-gray.svg" alt="Major League Hacking 2019 Hackathon Season" style="width:100%"></a> -->
    </v-app>
</template>


<script lang="ts">
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
import firebase from 'firebase';
import vueFilePond from 'vue-filepond';
import Vue from 'vue';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import debounce from 'debounce';
import Navbar from '@/components/Navbar.vue';
import Navigation from '@/components/Navigation.vue';
import Navbar2 from '@/components/Navbar2.vue';
import { validationMixin } from 'vuelidate';
import { mapGetters } from 'vuex';
import { majors, allUniversities } from '../private/data';
// import { setTimeout } from 'timers';

const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

interface Data {
  myFiles: any, loading: boolean, feedback: boolean, confirm: boolean, confirmClear: boolean, editing: boolean, deadline: boolean, existing_doc: any, hackday_link: string, contest_terms: string
}

export default Vue.extend({
  mixins: [validationMixin],
  name: 'Apply',
  data(): Data {
    return {
      myFiles: [],
      loading: false,
      feedback: false,
      confirm: false,
      confirmClear: false,
      editing: false,
      deadline: true, // Change this if applications are ever needed.
      existing_doc: undefined,
      hackday_link: 'https://localhackday.mlh.io/lhd-2018/events/854-deltahacks',
      contest_terms:
                'https://github.com/MLH/mlh-policies/blob/master/prize-terms-and-conditions/contest-terms.md',
    };
  },
  components: {
    // Navbar,
    // FilePond,
    // Navigation,
    Navbar2,
  },
  computed: {
  },
  methods: {
  },
  beforeMount() {
  },
});
</script>

<style scoped src='../assets/css/apply.css'>
</style>
