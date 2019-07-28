<template>
    <v-app class="dashboard background" style="background-image: url('https://github.com/deltahacks/my.Deltahacks/blob/master/my/src/assets/Backgimg2.jpg?raw=true');">
        <Navbar2 class="navbar1" />
        <div class='container-status100'>
            <div class="wrap-apply100">
                <form @keyup="formChange" class="ff mx-auto " ref="form" @submit.prevent="validateBeforeSubmit" @submit="submitApplication">
                    <h1 v-if="!submitted" class='text-xs-left'>Apply here.</h1>
                    <h1 v-else class='text-xs-left'>You've submitted your application. 😁</h1>
                    <p v-if="!submitted" class='text-xs-left'>Please fill out this application form to the best of your abilities. This form will autosave, you can come back to submit it any time before the deadline.</p>
                    <p v-if="!submitted" class='text-xs-left'>No programming experience? That's okay! We're just looking for well thought out answers. The more thought out your answers, the greater your chance of getting accepted. Only the questions under "Application Questions" will be judged. You'll get an email when we've made a decision.</p>
                    <p v-if="!submitted" class='text-xs-left'>Are you a high school student? You're eligible to attend - as long as you're 18 or older on the day of the event, Jan 26, 2019.</p>
                    <p v-if="!submitted" class='text-xs-left'>Round one has now concluded. Applications will now be considered for round two, which closes on Nov 15.</p>
                    <p v-else class='text-xs-left'>Your application has been recieved by us, sit back and relax while our team reviews it. You'll be notified when a decision is made, in the meantime you can check the status page to check the progress of your application. If you wish to make any changes you can email relations@deltahacks.com.</p>
                    <br><br>
                    <h2 style="float:left">{{ subsectionLabels[0] }}</h2>
                    <br><br>
                    <label for="name" style='float:left'>
                        <strong>What's your first name?*</strong>
                    </label><br>
                    <v-text-field name="name" id='name' :disabled="submitted" autocomplete="off" v-model="application.name" v-validate="{required:true, max:100}" :error-messages="errors.first('name')" data-vv-delay="1000"></v-text-field>
                    <label for="name" style='float:left'>
                        <strong>What's your last name?*</strong>
                    </label><br>
                    <v-text-field name="lastname" id="lastname" :disabled="submitted" autocomplete="off" v-model="application.lastname" v-validate="{required:true, max:100}" :error-messages="errors.first('lastname')" data-vv-delay="1000"></v-text-field>
                    <label for="date" style='float:left'>
                        <strong>When is your birthday? *</strong>
                    </label><br>
                    <v-text-field name="date" id="date" :disabled="submitted" v-model="application.birthday" mask="date" placeholder="dd/mm/yyyy" v-validate="{required: true}" :error-messages="errors.first('date')"></v-text-field>

                    <label for="date" style='float:left'>
                        <strong :class="enableGenderSelect && submitted ? 'we_messed_up' : ''">What's your gender? *</strong>
                    </label><br>
                    <v-select name="gender" id='gender' :disabled="!enableGenderSelect && submitted" @change="genderChange" v-model="application.gender" :items="['M', 'F', 'Other/Prefer not to say']" v-validate="{required:true}" :error-messages="errors.first('gender')" data-vv-delay="1000" />
                    <label for="date" style='float:left'>
                        <strong>What ethnicity do you identify as? *</strong>
                    </label><br>
                    <v-select :items="races" name="race" :disabled="submitted" v-model="application.race" @change="formChange" v-validate="{required: true}" :error-messages="errors.first('race:required')" data-vv-delay="1000"></v-select>
                    <label for="university" style='float:left'>
                        <strong>What university/college do you go to? *</strong>
                    </label><br>
                    <v-combobox name="university" id='university' :disabled="submitted" @change="formChange" :items="allUniversities" v-model="application.university" v-validate="{required: true}" :error-messages="errors.first('university:required')" data-vv-delay="1000">
                        <template slot="no-data">
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        We don't know that one. Press
                                        <kbd>tab</kbd> to create it.
                                    </v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </template>
                    </v-combobox>
                    <label for="major" style='float:left'>
                        <strong>What do you study? *</strong>
                    </label><br>
                    <v-combobox name="major" id='major' :disabled="submitted" :items='majors' @change="formChange" v-model="application.major" v-validate="{required:true}" :error-messages="errors.first('major')" data-vv-delay="1000">
                        <template slot="no-data">
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        We don't know that one. Press
                                        <kbd>tab</kbd> to create it.
                                    </v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </template>
                    </v-combobox>
                    <label for="major" style='float:left'>
                        <strong>What degree are you pursuing? *</strong>
                    </label><br>
                    <v-select name="degree" id='degree' :disabled="submitted" :items='degrees' @change="formChange" v-model="application.degree" v-validate="{required:true}" :error-messages="errors.first('degree')" data-vv-delay="1000"></v-select>
                    <label for="year" style='float:left'>
                        <strong>What year of school are you in? *</strong>
                    </label><br>
                    <v-select name="year" id='year' :disabled="submitted" @change="formChange" v-model="application.school_year" :items="items" v-validate="{required:true}" :error-messages="errors.first('year:required')" data-vv-delay="1000">
                    </v-select>
                    <div class="section divider"></div>
                    <h2 style="float:left">{{subsectionLabels[1]}}</h2>
                    <br><br>
                    <label for="shirt size" style='float:left'>
                        <strong>What's your shirt size? *</strong>
                    </label><br>
                    <v-select v-model="application.shirt_size" :disabled="submitted" @change="formChange" :items="shirts" v-validate="{required:true}" name="shirt size" id="shirt size" :error-messages="errors.first('shirt size:required')" data-vv-delay="1000">
                    </v-select>
                    <label for="diet" style='float:left'>
                        <strong>Any dietary restrictions? *</strong>
                    </label><br>
                    <v-combobox v-model="application.dietary_restrictions" :disabled="submitted" @change="formChange" :items="food" v-validate="{required:true}" name="diet" id='diet' :error-messages="errors.first('diet:required')" data-vv-delay="1000">
                        <template slot="no-data">
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        We don't know that one. Press
                                        <kbd>tab</kbd> to create it.
                                    </v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </template>
                    </v-combobox>
                    <label for="hackathons" style='float:left'>
                        <strong>Number of hackathons attended. *</strong>
                    </label><br>
                    <v-select v-model="application.hackathons" @change="formChange" :disabled="submitted" :items="hackathons" v-validate="{required:true}" name="hackathons" id="hackathons" :error-messages="errors.first('hackathons:required')" data-vv-delay="1000">
                    </v-select>
                    <v-flex xs12>
                        <label for="workshops" style='float:left'>
                            <strong>Any workshops you'd be interested in?</strong>
                        </label><br>
                        <v-combobox v-model="application.workshops" deletable-chips small-chips :items="workshops" :disabled="submitted" @change="formChange" hide-selected multiple>
                        </v-combobox>
                    </v-flex>
                    <label for="discover" style="float:left">
                        <strong>How did you hear about us? *</strong>
                    </label><br>
                    <v-select v-model="application.discover" :disabled="submitted" @change="formChange" :items="methods" v-validate="{required:true}" name="discover" id='diet' :error-messages="errors.first('discover:required')" data-vv-delay="1000"></v-select>
                    <label for="location" style='float:left'>
                        <strong>Where are you coming from? *</strong>
                    </label><br>
                    <v-combobox name="location" v-model="application.location" :items="cities" :disabled="submitted" @change="formChange" v-validate="{required: true}" :error-messages="errors.first('location:required')" data-vv-delay="1000">
                        <template slot="no-data">
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        We don't know that one. Press
                                        <kbd>tab</kbd> to create it.
                                    </v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </template>
                    </v-combobox>
                    <div class="section divider"></div>
                    <h2 style="float:left">{{subsectionLabels[2]}}</h2>
                    <br><br>
                    <label for="phone" style='float:left'>
                        <strong>Your Cell Phone Number *</strong>
                    </label><br>
                    <v-text-field mask="phone" :disabled="submitted" name="phone" id='phone' v-model="application.phone" prepend-icon="phone" data-vv-delay="1000" v-validate="{required:true, max: 11, is_not: application.emergency_phone}" :error-messages="errors.first('phone:required')"></v-text-field>
                    <label for="emergency phone" style='float:left'>
                        <strong>Emergency Contact Number *</strong>
                    </label><br>
                    <v-text-field mask="phone" :disabled="submitted" name="emergency phone" id='emergency phone' v-model="application.emergency_phone" prepend-icon="phone" v-validate="{required:true, max: 11, is_not: application.phone}" :error-messages="errors.first('emergency phone')"></v-text-field>
                    <label for="emergency name" style='float:left'>
                        <strong>Emergency Contact's Name *</strong>
                    </label><br>
                    <v-text-field name="emergency name" id='emergency name' :disabled="submitted" autocomplete="off" v-model="application.emergency_name" v-validate="{required:true, max:100}" :error-messages="errors.first('emergency name')" data-vv-delay="1000"></v-text-field>
                    <label for="emergency relationship" style='float:left'>
                        <strong>Relationship with Emergency Contact *</strong>
                    </label><br>
                    <v-select :disabled="submitted" :items="relations" name="emergency relationship" id='emergency relationship' v-model="application.emergency_relationship" v-validate="{required:true, max: 11, is_not: application.phone}" :error-messages="errors.first('emergency relationship')"></v-select>
                    <div class="section divider"></div>
                    <p>Note : Only information below this line will be considered during the reviewing process. The above information is for statistics, demographics, and logistical purposes only.</p>
                    <div class="section divider"></div>
                    <h2 style="float:left">{{subsectionLabels[3]}}</h2>
                    <br><br>
                    <v-text-field name="github" :disabled="submitted" label="Your Github" single-line data-vv-delay="4000" v-model="application.github" prepend-icon="fab fa-github" v-validate="{max:150, url:true}" :error-messages="errors.first('github')">
                    </v-text-field>
                    <v-text-field name="linkedin" :disabled="submitted" label="Your Linkedin" single-line data-vv-delay="4000" v-model="application.linkedin" prepend-icon="fab fa-linkedin" v-validate="{max:150, url:true}" :error-messages="errors.first('linkedin')">
                    </v-text-field>
                    <v-text-field name="website" :disabled="submitted" label="Your Website" single-line data-vv-delay="4000" v-model="application.website" prepend-icon="fas fa-link" v-validate="{max:150, url:true}" :error-messages="errors.first('website')">
                    </v-text-field>
                    <v-text-field name="devpost" :disabled="submitted" label="Your Devpost" single-line data-vv-delay="4000" v-model="application.devpost" prepend-icon="fas fa-link" v-validate="{max:150, url:true}" :error-messages="errors.first('devpost')">
                    </v-text-field><br>
                    <div id="filePondContainer">
                        <file-pond @addfile="submitFileInfoOnDrop" v-if="!submitted" name="test" ref="pond" label-idle="Drop resume here..." accepted-file-types="application/pdf" v-bind:files="myFiles" v-on:init="handleFilePondInit" />
                        <v-chip class="no border" style="float:left;overflow: wrap" v-if="haveFile" outline small color="gray">
                            <v-icon left>info</v-icon>
                            <strong>We've got your file "</strong>
                            <a target="_blank" :href="application.documents.download_link">{{application.documents.filename}}</a>"
                        </v-chip>
                    </div>
                    <div class="section divider"></div>
                    <h2 style="float:left; padding-left:26px;">{{subsectionLabels[4]}}</h2>
                    <br><br>
                    <v-container fluid>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <p class="text-lg-left">Tell us about a project you worked on/ thing you made/ internship you did/ course you took that you are really passionate about, and why?*</p>
                                <v-textarea box :disabled="submitted" autocomplete="nope" name="project" placeholder="Tell us about a project you've worked on recently..." v-model="application.q1" auto-grow v-validate="{required:true, max:500}" :error-messages="errors.first('project')" counter=500>
                                </v-textarea>
                                <v-progress-linear v-if="custom" slot="progress" :value="q1Progress" :color="q1Color" height="5"></v-progress-linear>
                            </v-flex>
                            <div class="section divider"></div>
                            <v-flex xs12>
                                <p class="text-lg-left">Why do you want to come to Deltahacks V, and what is one thing that you are passionate to bring to this year's hackathon?*</p>
                                <v-textarea box :disabled="submitted" autocomplete="nope" name="reason" placeholder="Why do you want to come to Deltahacks V..." v-model="application.q2" auto-grow v-validate="{required:true, max:500}" :error-messages="errors.first('reason')" counter=500>
                                </v-textarea>
                                <v-progress-linear v-if="custom" slot="progress" :value="q2Progress" :color="q2Color" height="5"></v-progress-linear>
                            </v-flex>
                            <div class="section divider"></div>
                            <v-flex xs12>
                                <p class="text-lg-left">If you could teleport to anywhere in the world right now, where would you go and why?*</p>
                                <v-textarea box :disabled="submitted" name="creative" placeholder="Answer here..." autocomplete="nope" v-model="application.q3" auto-grow v-validate="{required:true, max:500}" :error-messages="errors.first('creative')" counter=500 />
                                <v-progress-linear v-if="custom" slot="progress" :value="q3Progress" :color="q3Color" height="5"></v-progress-linear>
                            </v-flex>
                            <v-flex xs12>
                                <p class="text-lg-left">Anything else you'd like to tell us? *</p>
                                <v-text-field :disabled="submitted" name="wildcard" placeholder="Could be anything!" v-model="application.q4" auto-grow />
                            </v-flex>
                            <div class="section divider"></div>
                        </v-layout>
                    </v-container><br>
                    <div class="small font">
                        <v-checkbox name="agreement" :disabled="submitted" id="mlh" v-model="checkbox" :error-messages="checkError">
                            <span style="font-size:0.8em;" class="terms" slot="label">{{MLH}}
                                <a @click.stop href="https://mlh.io/privacy">MLH Privacy Policy</a>. I further agree to the
                                <a @click.stop :href="contest_terms">MLH Contest Terms and Conditions</a>.*</span>
                        </v-checkbox>
                        <v-checkbox name="share" :disabled="submitted" id="share" v-model="share" :label="SHARE" :error-messages="shareError">
                            <span style="font-size:0.8em;" slot="label">I have read and agree to the
                                <a @click.stop href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">MLH Code of Conduct</a>.*</span>
                        </v-checkbox>
                        <v-checkbox name="microsoft" :disabled="submitted" id="mlh" v-model="application.microsoft">
                            <span style="font-size:0.8em;" class="terms" slot="label">{{MICROSOFT}}</span>
                        </v-checkbox>

                    </div>
                    <!-- <v-checkbox name="share"   :disabled="submitted" id="share" v-model="share" :label="MLH"></v-checkbox> -->
                    <div class="mx-auto gg">
                        <v-dialog v-model="confirmGender" persistent max-width="400">
                            <v-card>
                                <v-card-title class="headline">Are you sure you want to update your application with this answer?</v-card-title>
                                <v-card-text>You cannot edit your answer once you've done this.</v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="red darken-1" flat @click.native="confirmGender = false">No</v-btn>
                                    <v-btn color="green darken-1" flat @click="redirectToStatus">Yes</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <v-dialog v-model="confirm" persistent max-width="400">
                            <v-btn slot="activator" :disabled="submitted" class="button1">Submit</v-btn>
                            <v-card>
                                <v-card-title class="headline">Are you sure you'd like to submit?</v-card-title>
                                <v-card-text>You cannot edit your application once you've submitted.</v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="red darken-1" flat @click.native="confirm = false">No</v-btn>
                                    <v-btn color="green darken-1" flat @click="submitApplication">Yes</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <v-dialog v-model="confirmClear" persistent max-width="400">
                            <v-btn slot="activator" :disabled="submitted" class="button2">Clear</v-btn>
                            <v-card>
                                <v-card-title class="headline">Are you sure you'd like to clear the form?</v-card-title>
                                <v-card-text>This will overwrite perviously saved data.</v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="red darken-1" flat @click.native="confirmClear = false">No</v-btn>
                                    <v-btn color="green darken-1" flat @click="clearForm">Clear</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </div>
                </form>
                <v-dialog v-model="loading" persistent width="300">
                    <v-card color="primary" dark>
                        <v-card-text>
                            {{loadingMessage}}
                            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                        </v-card-text>
                    </v-card>
                </v-dialog>
                <v-snackbar v-model="feedback" top :color="bannerColor" right :timeout="bannerTimeout">
                    {{bannerMessage}}
                    <v-btn color="white" flat @click="feedback = false">
                        Close
                    </v-btn>
                </v-snackbar>
            </div>
        </div>
        <v-layout row justify-center>
          <v-dialog v-model="deadline" persistent max-width="450" min-height="350">
            <v-card>
              <v-card-title class="mx-auto gg headline">Sorry, DeltaHacks V applications are now closed!</v-card-title>
              <v-card-text>If you've already submitted your application and would like to see it's current status, please go <a href="/status">here</a>.<br><br>
               Still want a chance to hack at McMaster? DeltaHacks is hosting an <a :href="hackday_link">MLH Local Hack Day</a> on Dec 1st!</v-card-text>
            </v-card>
          </v-dialog>
        </v-layout>
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
import { validationMixin } from 'vuelidate';
import { Validator } from 'vee-validate';
import { required, maxLength, email } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import { majors, allUniversities } from '../private/data';
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
      deadline: false, // Change this if applications are ever needed.
      existing_doc: undefined,
      checkError: undefined,
      shareError: undefined,
      confirmGender: false,
      pondError: undefined,
      bannerColor: 'success',
      bannerMessage: 'Complete!',
      bannerTimeout: 3000,
      loadingMessage: 'Loading...',
      parent: this,
      enableGenderSelect: false,
      hackday_link: 'https://localhackday.mlh.io/lhd-2018/events/854-deltahacks',
      contest_terms:
                'https://github.com/MLH/mlh-policies/blob/master/prize-terms-and-conditions/contest-terms.md',
      subsectionLabels: [
        'Personal Information',
        'Logistical Stuff',
        'Emergency Info',
        'Your Profiles',
        'Application Questions',
      ],
      methods: [
        'A friend',
        'MLH',
        'Facebook',
        'Twitter',
        'Posters',
        'Instagram',
        'Snapchat',
        'Google',
        'Other',
      ],
      cities: [
        '(Type your own option)',
        'Toronto',
        'Hamilton',
        'Waterloo',
        'London',
        'Montreal',
        'Ottawa',
        'Mississauga',
        'Guelph',
        'Burlington',
        'Brampton',
        'Markham',
        'Milton',
      ],
      races: [
        'Black / African American',
        'Hispanic',
        'East Asian',
        'South Asian',
        'Middle Eastern',
        'Native American',
        'White / Caucasian',
        'Multiple ethnicity / Other',
        'Prefer not to say',
      ],
      url: '',
      MLH:
                'I authorize you to share my application information for event administration,' +
                ' ranking, MLH administration, event informational e-mails, and occasional messages about hackathons ' +
                ' in-line with the',
      SHARE:
                'I also agree to the MLH Contest Terms and Conditions and the MLH Privacy Policy.*',
      MICROSOFT:
                'I give Microsoft permission to contact me, send me promotion material, and share resources to help me prepare for the hackathon.',
      picker: null,
      submitted: false,
      date: '2000-01-01',
      university: null,
      timeout: null,
      allUniversities,
      majors,
      application: {
        name: '',
        lastname: '',
        email: firebase.auth().currentUser.email,
        last_modified: undefined,
        first_submitted: undefined,
        school_year: null,
        shirt_size: null,
        dietary_restrictions: null,
        hackathons: null,
        university: null,
        discover: null,
        github: '',
        linkedin: '',
        website: '',
        devpost: '',
        phone: '',
        emergency_phone: '',
        emergency_name: '',
        q1: '',
        q2: '',
        q3: '',
        q4: '',
        meme: '',
        major: '',
        location: '',
        workshops: [],
        degree: '',
        birthday: '',
        documents: [],
        microsoft: false,
        gender: '',
      },
      links: ['Home', 'About', 'Contact'],
      q1: '',
      custom: true,
      name: '',
      email: '',
      select: null,
      items: [
        'First Year',
        'Second Year',
        'Third Year',
        'Fourth Year',
        'Fifth Year',
        'Sixth Year',
      ],
      workshops: [
        'NodeJs',
        'ReactJs/VueJs',
        'Blockchain',
        'Machine Learning',
        'Buzzwords',
        'Android development',
        'iOS development',
        'Web Development',
        'Intro to AR/VR',
        'Game Development',
        'Intro to UI/UX design',
        'Hardware hacking',
        'Computer Vision with OpenCV',
      ],
      hackathons: ['This is my first one', '1', '2', '3', '4', '5-9', '10+'],
      food: [
        'None',
        'Vegetarian',
        'Vegan',
        'Halal',
        'Gluten Free',
        'Kosher',
        'No Beef',
        'Lactose Intolerant',
        'Gluten Free',
        '(Type your own option)',
      ],
      shirts: ['XS', 'S', 'M', 'L', 'XL'],
      degrees: ['Bachelors', 'Masters', 'PhD'],
      relations: [
        'Parent',
        'Grandparent',
        'Sibling',
        'Partner',
        'Friend',
        'Guardian',
        'Other',
      ],
      checkbox: false,
      share: false,
      microsoft: false,
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
    q3Progress() {
      return Math.min(100, this.application.q3.length / 5);
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
      FilePond,
      Navigation,
      Navbar2,
    },
    q1Color() {
      return ['error', 'warning', 'success'][Math.floor(this.q1Progress / 40)];
    },
    q2Color() {
      return ['error', 'warning', 'success'][Math.floor(this.q2Progress / 40)];
    },
    q3Color() {
      return ['error', 'warning', 'success'][Math.floor(this.q3Progress / 40)];
    },
    currentUser() {
      return firebase.auth().currentUser;
    },
    haveFile() {
      return this.editing && this.application.documents.filename;
    },
    agreed() {
      return this.checkbox && this.share;
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
        lastname: '',
        email: firebase.auth().currentUser.email,
        last_modified: undefined,
        first_submitted: undefined,
        school_year: null,
        shirt_size: null,
        dietary_restrictions: null,
        hackathons: null,
        university: null,
        discover: null,
        github: '',
        linkedin: '',
        website: '',
        devpost: '',
        phone: '',
        emergency_phone: '',
        q1: '',
        q2: '',
        q3: '',
        q4: '',
        meme: '',
        major: '',
        location: '',
        birthday: '',
        documents: [],
        microsoft: false,
      };
    },
    genderChange() {
      this.formChange();

      if (this.submitted && this.application.gender && this.enableGenderSelect) {
        this.confirmGender = true;
      }
    },
    redirectToStatus() {
      this.$router.push({ name: 'Status' });
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
      this.checkbox = !this.checkbox;
    },
    validateBeforeSubmit() {
      return this.$validator.validateAll();
    },
    formChange() {
      console.log('Change detected');
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
    async setApplicationInProgress() {
      if (this.submitted && !this.enableGenderSelect) return;
      const unixts = Math.round(new Date().getTime() / 1000);
      this.application.last_modified = {
        unix: unixts,
        date: new Date().toString(),
      };
      this.application.first_submitted = {
        unix: 0,
        date: '',
      };
      try {
        let request = this.$store.state.db
          .collection('applications')
          .doc('DH5')
          .collection('in progress')
          .doc(firebase.auth().currentUser.email)
          .set(this.application)
        let response = await request;
        this.showInfoMessage('Application progress saved!');
      } catch(err) {
          console.log(err);
          this.loading = false;
      }
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
      console.log('Submitting application...');
      // if (this.application.q4 == '' || !this.application.q4) this.application.q4 = ' ';
      this.setDateInformation();
      this.$store.state.db
        .collection('applications')
        .doc('DH5')
        .collection('submitted')
        .doc(firebase.auth().currentUser.email)
        .set(this.application)
        .then(() => {
          this.$router.push({ name: 'Status' });
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    storeFileAndGetInfo(doc) {
      if (!doc) return;
      const { filename, file, id } = doc;
      const storeRef = firebase.storage().ref();
      return new Promise((resolve, reject) => {
        storeRef
          .child(`hackathon/DH5/users/${firebase.auth().currentUser.email}/${filename}`)
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
      this.confirm = false;
      if (!(await this.validateBeforeSubmit())) {
        console.log('Error validating inputs!');
        return;
      } else if (!this.checkbox) {
        this.checkError = 'Please accept the terms and conditions to continue.';
        return;
      } else if (!this.share) {
        this.shareError = 'You must agree to these terms in order to proceed.';
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
    fillApplicationFields() {
      const ref = this.application;
      ref.q1 = ref.q1 ? ref.q1 : '';
      ref.q2 = ref.q2 ? ref.q2 : '';
      ref.q3 = ref.q3 ? ref.q3 : '';
      ref.q4 = ref.q4 ? ref.q4 : '';
      ref.meme = ref.meme ? ref.meme : '';
      ref.workshops = ref.workshops ? ref.workshops : [];
      ref.devpost = ref.devpost ? ref.devpost : '';
      ref.lastname = ref.lastname ? ref.lastname : '';
      ref.location = ref.location ? ref.location : '';
      ref.microsoft = ref.microsoft ? ref.microsoft : false;
    },
    getUserAppStatus(userEmail) {
      return new Promise((resolve, reject) => {
        this.$store.state.db
          .collection('applications')
          .doc('DH5')
          .collection('submitted')
          .doc(userEmail)
          .get()
          .then((doc) => {
            resolve(doc.exists);
          })
          .catch(err => reject(err));
      });
    },
    beforeMount() {
      this.activateModal('Loading...');
      const userEmail = firebase.auth().currentUser.email;
      this.$store.state.db
        .collection('applications')
        .doc('DH5')
        .collection('submitted')
        .doc(userEmail)
        .get()
        .then((doc) => {
          resolve(doc.exists);
        })
        .catch(err => reject(err));
    },
    setSubmittedVariables(data) {
      this.editing = true;
      this.submitted = true;
      this.checkbox = true;
      this.share = true;
      this.application = data;
      this.fillApplicationFields();
      this.loading = false;
    },
  },
  beforeMount() {
    this.activateModal('Loading...');
    const userEmail = firebase.auth().currentUser.email;
    this.$store.state.db
      .collection('applications')
      .doc('DH5')
      .collection('in progress')
      .doc(userEmail)
      .get()
      .then(async (doc) => {
        const submitted = await this.getUserAppStatus(userEmail);
        if (doc.exists) {
          const data = doc.data();
          const gender = data.gender;
          console.log(data);
          console.log(gender);
          if (submitted && !gender) {
            this.enableGenderSelect = true;
            this.deadline = false;
            this.setSubmittedVariables(data);
          } else if (submitted) {
            this.setSubmittedVariables(data);
            this.deadline = true;
          } else {
            this.editing = true;
            this.application = doc.data();
            this.fillApplicationFields();
            this.loading = false;
            this.deadline = true;
          }
        } else {
          console.log('Document not found!');
          this.editing = false;
          this.loading = false;
          this.deadline = true;
        }
      })
      .catch((err) => {
        console.log('User app query failed.');
        console.log(err);
        this.loading = false;
        this.deadline = true;
      });
  },
};
</script>

<style scoped src='../assets/css/apply.css'>
</style>
