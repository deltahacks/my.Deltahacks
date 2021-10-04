<template>
  <div class="background">
    <transition name="view" mode="out-in">
      <!-- Made this v-if false to disable the welcome splash screen -->
      <v-app key="1" v-if="false">
        <div class="container-hello100 background">
          <!-- "style="background-image: url('https://wallpapersite.com/images/pages/pic_w/14088.png');" -->
          <h1 class="hellotext">{{ splashMessage }}</h1>
          <img
            src="../assets/vi2.png"
            draggable="false"
            class="hello-back-vi"
          />
        </div>
      </v-app>
      <v-app key="2" v-if="true" class="dashboard statusbackground">
        <Navbar2 />
        <div class="wrap">
          <!--Column#1-->
          <div class="col col6">
            <div class="box box9" v-if="currentGroupIncludes('Standard')">
              <p class="big">Welcome.</p>
              <p class="small">
                Be a part of the hackathon for change. We are looking forward to
                being able to meet with you online this year. Good luck with your
                application!
              </p>
            </div>
            <div class="box box9" v-if="currentGroupIncludes('rejected')">
              <p class="big">Welcome.</p>
              <p class="small">
                Thank you for applying. We hope to see you next year.
              </p>
            </div>
            <div class="box box9" v-if="currentGroupIncludes('Awaiting Registration')">
              <p class="big">Welcome.</p>
              <p class="small">
                Registration is now open. Your unique discord check-in code is <span id="code">{{this.code}}</span>.
                <b>Please do not share this with others!</b> Click <a href="https://discord.gg/6HvMQAnMgb" id="disc-join">HERE</a> to join the server.
              </p>
            </div>
            <div class="box box9" v-if="currentGroupIncludes('submission not open')">
              <p class="big">Welcome.</p>
              <p class="small">
                The hackathon has now started. Good Luck!
              </p>
            </div>
            <div class="box box9" v-if="currentGroupIncludes('missed submission deadline')">
              <p class="big">Sadge.</p>
              <p class="small">
                Submissions are now closed. We would love to see you again next year!
              </p>
            </div>
            <div class="box box9" v-if="currentGroupIncludes('Registered')">
              <p class="big">Welcome.</p>
              <p class="small">
                Thank you for registering. We are looking forward to seeing you at the hackathon.
              </p>
            </div>
            <div class="box box9" v-if="currentGroupIncludes('No RSVP')">
              <p class="big">Welcome</p>
              <p class="small">
                The registration period is now over. RSVPs and applications are no longer being accepted. We would love to see you next year!
              </p>
            </div>
            <div class="box box9" v-if="currentGroupIncludes('Awaiting RSVP')">
              <p class="big rsvp" style="font-size: 5vw">Will you be attending DH8?</p>
              <a @click="
                  () => {
                    updateRSVP(true, true), (current_state = 'coming');
                  }
                ">
                <div class="box box3 rsvp-btn">
                  Yes
                </div>
              </a>
              <a
                @click="
                  () => {
                    updateRSVP(true, false), (current_state = 'not coming');
                  }
                "
              >
                <div class="box box3 rsvp-btn">
                  No
                </div>
              </a>
            </div>
            <!-- <div class="box box9 boxclip" v-if="currentStateNum() === 6">
              <p class="big">Bus?</p>
              <p class="small" style="margin-top:-20px; margin-bottom:9px;">
                Please select a stop below.
              </p>
              <v-select
                :items="busLocations"
                v-model="busSelected"
                filled
                rounded
                dense
                solo
                append-icon="keyboard_arrow_down"
                background-color="rgba(255,255,255,0.5)"
                style="margin-left:5px;"
              ></v-select>
              <div class="col col2">
                <a
                  @click="
                    () => {
                      updateRSVP(true, true, busSelected), (current_state = 'update rsvp');
                    }
                  "
                >
                  <div class="box box3 next">
                    Next
                  </div>
                </a>
              </div>
            </div> -->
            <div class="box box9 boxclip" v-if="currentGroupIncludes('RSVPd')">
              <template v-if="rsvp.coming">
                <p class="big">Confirmed.</p>
                <p class="small" style="margin-top:-20px">
                  We're so excited to see you on March 5th!
                </p>
              </template>
              <template v-if="!rsvp.coming">
                <p class="big">Can't make it.</p>
                <p class="small" style="margin-top:-20px">
                  We're sorry you can't make it. Hope to see you next time!
                </p>
              </template>
              <div class="col col4">
                <a @click="() => (current_state = 'accepted')">
                  <div class="box box2 change-response" v-if="!this.rsvpClosed">
                    Change Response
                  </div>
                </a>
              </div>
            </div>
            <div class="box box9 boxclip" v-if="currentGroupIncludes('not submitted')">
               <template>
                 <div class="afterSubmit">
                 <div style="float:left;">
                    <h2>Submission Date</h2>
                    <br>
                    <span class="afterSubmitRounded">Sunday, March 7th, 2021</span>
                </div>
                <div style="float:left; margin-left:2vw">
                    <h2>Submission Time</h2>
                    <br>
                    <span class="afterSubmitRounded">12:30 P.M.</span>
                </div>
                </div>
              </template>
            </div>
             <div class="box box9" v-if="currentGroupIncludes('Project Submitted')">
               <template>
                 <div class="afterSubmit">
                <div style="float:left;">
                    <h2>Group Number</h2>
                    <br>
                    <span class="afterSubmitRounded">{{groupNumber}}</span>
                </div>
                <div style="float:left; margin-left:2vw">
                    <h2>Judging Area</h2>
                    <br>
                    <span class="afterSubmitRounded">{{ groupNumber == "Pending" ? "DeltaHacks 8 Server" : "Group " + groupNumber + " Channel"}}</span>
                </div>
                </div>
              </template>
            </div>

            <div class="box box5 status desktop">
              <div class="currentStatus">
                <h2>My Application Status</h2>
                <div class="emote">{{ emoticon }}</div>
                <p class="bigmobile">
                  {{ currentHeader }}
                  <a @click.prevent="resend()" v-if="!isVerified() && !resent">
                    Resend Email
                  </a>
                </p>
              </div>
              <div class="currentStatus" v-if="currentGroupIncludes('showStartTime')">
                <p class="bigmobile">Start Time</p>
                <div><span class="deadline">8:00 P.M.</span></div>
                <p class="bigmobile">
                  Friday, March 5th, 2021
                </p>
              </div>
              <div class="currentStatus" v-if="currentGroupIncludes('showDeadline')">
                <p class="bigmobile">Submission Deadline</p>
                <div><span class="deadline">12:30 P.M.</span></div>
                <p class="bigmobile">
                  Sunday, March 7th, 2021
                </p>
              </div>
              <div class="currentStatus glm" v-if="currentGroupIncludes('Project Submitted')">
                <p class="goodluck box5">Good Luck!</p>
              </div>
              <a href="/apply" class="apply-btn" v-if="currentGroupIncludes('Standard')">
                <div class="apply box5">Apply</div>
              </a>
              <a href="/submit" class="apply-btn" v-if="currentGroupIncludes('not submitted')">
                <div class="submit apply box5">Submit<br>Project</div>
              </a>
              <!-- <div class="apply-btn" v-if="currentGroupIncludes('Project Submitted')">
                <div class="submitted box5">You have successfully submitted your project.</div>
              </div> -->
            </div>
          </div>
          <!--Column#2-->
          <div class="col col4">
            <div class="box box11 boxclip">
              <img
                id="slideimg0"
                class="slide showMe"
                src="../assets/slideshow/IMG_3843.jpg"
                draggable="false"
              />
              <img
                id="slideimg1"
                class="slide"
                src="../assets/slideshow/IMG_3851.jpg"
                draggable="false"
              />
              <img
                id="slideimg2"
                class="slide"
                src="../assets/slideshow/IMG_3874.jpg"
                draggable="false"
              />
              <img
                id="slideimg3"
                class="slide"
                src="../assets/slideshow/IMG_3876.jpg"
                draggable="false"
              />
              <img
                id="slideimg4"
                class="slide"
                src="../assets/slideshow/IMG_3894.jpg"
                draggable="false"
              />
              <img
                id="slideimg5"
                class="slide"
                src="../assets/slideshow/IMG_3907.jpg"
                draggable="false"
              />
              <img
                id="slideimg6"
                class="slide"
                src="../assets/slideshow/IMG_3908.jpg"
                draggable="false"
              />
              <img
                id="slideimg7"
                class="slide"
                src="../assets/slideshow/IMG_3910.jpg"
                draggable="false"
              />
              <img
                id="slideimg8"
                class="slide"
                src="../assets/slideshow/IMG_3927.jpg"
                draggable="false"
              />
              <img
                id="slideimg9"
                class="slide"
                src="../assets/slideshow/IMG_3938.jpg"
                draggable="false"
              />
              <img
                id="slideimg10"
                class="slide"
                src="../assets/slideshow/IMG_3943.jpg"
                draggable="false"
              />
              <img
                id="slideimg11"
                class="slide"
                src="../assets/slideshow/IMG_3945.jpg"
                draggable="false"
              />
              <img
                id="slideimg12"
                class="slide"
                src="../assets/slideshow/IMG_3948.jpg"
                draggable="false"
              />
            </div>
            <!-- </div> -->
            <div :key="media.icon" v-for="media in social" class="desktop">
              <div class="col col2 social">
                <a :href="media.link" target="_blank">
                  <div class="box box3 socialbox">
                    <button light icon>
                      <v-icon>{{ media.icon }}</v-icon>
                    </button>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div class="box box5 status tablet">
            <div class="currentStatus">
                <h2>My Application Status</h2>
                <div class="emote">{{ emoticon }}</div>
                <p class="bigmobile">
                  {{ currentHeader }}
                  <a @click.prevent="resend()" v-if="!isVerified() && !resent">
                    Resend Email
                  </a>
                </p>
              </div>
              <div class="currentStatus" v-if="currentGroupIncludes('showStartTime')">
                <p class="bigmobile">Start Time</p>
                <div><span class="deadline">8:00 P.M.</span></div>
                <p class="bigmobile">
                  Friday, March 5th, 2021
                </p>
              </div>
              <div class="currentStatus" v-if="currentGroupIncludes('showDeadline')">
                <p class="bigmobile">Submission Deadline</p>
                <div><span class="deadline">12:30 P.M.</span></div>
                <p class="bigmobile">
                  Sunday, March 7th, 2021
                </p>
              </div>
              <div class="currentStatus glm" v-if="currentGroupIncludes('Project Submitted')">
                <p class="goodluck box5">Good Luck!</p>
              </div>
              <a href="/apply" class="apply-btn" v-if="currentGroupIncludes('Standard')">
                <div class="apply box5">Apply</div>
              </a>
              <a href="/submit" class="apply-btn" v-if="currentGroupIncludes('not submitted')">
                <div class="submit apply box5">Submit<br>Project</div>
              </a>
              <!-- <a class="apply-btn" v-if="currentGroupIncludes('Project Submitted')">
                <div class="submitted box5">You have successfully submitted your project.</div>
              </a> -->
          </div>
          <div :key="media.icon" v-for="media in social" class="tablet">
            <div class="col col2 social">
              <a :href="media.link" target="_blank">
                <div class="box box3">
                  <button light icon>
                    <v-icon>{{ media.icon }}</v-icon>
                  </button>
                </div>
              </a>
            </div>
          </div>
        </div>
        <v-snackbar top right :color="snack.color" v-model="snack.visible" :timeout="snack.timeout">
          {{ snack.message }}
          <v-btn :color="snack.btnColor" flat text @click="snack.visible = false">Close</v-btn>
        </v-snackbar>
      </v-app>
    </transition>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
import Navbar2 from '@/components/Navbar2.vue';
import Card from '@/components/Card.vue';

import Vue from 'vue';
import firebase from 'firebase';
import { validationMixin } from 'vuelidate';
import { required, maxLength, email } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import db from '../firebase_init';
import { StatusModel } from '../types';
import { busCities } from '../data';

const allUniversities = [];
export default Vue.extend({
  mixins: [validationMixin],
  name: 'Status',
  data(): StatusModel {
    return {
      hackathon: this.$store.state.currentHackathon,
      accepted: false,
      counter: 0,
      genderCompleted: true,
      response: {
        rsvp: false,
        bus: false,
        location: '',
        email: firebase.auth().currentUser!.email,
      },
      emptyResponse: {
        rsvp: false,
        bus: false,
        location: '',
        email: firebase.auth().currentUser!.email,
      },
      snack: {
        color: 'success',
        btnColor: 'white',
        timeout: 3000,
        visible: false,
        message: '',
      },
      timeout: undefined,
      bus: false,
      busLocations: busCities.concat(['Not bussing']),
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
          link: 'https://www.snapchat.com/add/deltahacks/',
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
      // subheaders: [
      //   'Applications are now closed.',
      //   '',
      //   'In progress',
      //   'This application is under review.',
      //   "Sorry, we couldn't offer you a spot this year.",
      //   "Congratulations, you've been accepted!",
      //   "Congratulations, you've been accepted!",
      //   "Congratulations, you've been accepted!",
      //   '',
      //   '',
      //   'Loading',
      // ],
      state_data: {
        loading: { message: 'Loading Status.', emoji: '🕖', groups: ['Standard'] },
        'not started': { message: 'Application Not Started.', emoji: '🤔', groups: ['Standard'] },
        'in progress': { message: 'In progress.', emoji: '🙂', groups: ['Standard'] },
        submitted: { message: 'Your application is under review.', emoji: '😊', groups: ['Standard'] },
        accepted: { message: "Congratulations, you've been accepted!", emoji: '🥳', groups: ['Awaiting RSVP'] },
        coming: { message: "Congratulations, you're coming to DH8.", emoji: '🎉', groups: ['RSVPd', 'coming'] },
        'open registration': { message: 'Registration is now open.', emoji: '🔓', groups: ['Awaiting Registration', 'coming'] },
        'closed rsvp': { message: 'Registration has now closed.', emoji: '🔒', groups: ['No RSVP'] },
        waiting: { message: 'Registration Complete.', emoji: '⏳', groups: ['Registered', 'coming', 'showStartTime'] },
        'checked in': { message: 'Welcome to DH8.', emoji: '✅', groups: ['At hackathon', 'showDeadline', 'submission not open'] },
        submitting: { message: 'Good Luck!', emoji: '💻', groups: ['At hackathon', 'not submitted'] },
        'project submitted': { message: 'Your project has been submitted.', emoji: '🔥', groups: ['At hackathon', 'Project Submitted'] },
        'group assigned': { message: 'Please join your designated voice channel.', emoji: '💯', groups: ['At hackathon', 'Project Submitted'] },
        'submissions closed': { message: 'Submissions are now closed.', emoji: '😢', groups: ['Cannot Submit', 'missed submission deadline'] },
        'not coming': { message: 'Not coming to DH8.', emoji: '😭', groups: ['RSVPd', 'Not coming', 'Cannot Submit'] },
        rejected: { message: "Sorry, we couldn't offer you a spot this year.", emoji: '🙁', groups: ['rejected', 'Not coming', 'Cannot Submit'] },
        'applications closed': { message: 'Applications are now closed.', emoji: '🔒', groups: ['Standard'] },
      },
      links: ['Home', 'About', 'Contact'],
      story: '',
      custom: true,
      name: '',
      // step: 10,
      current_state: 'loading',
      checkedIn: false,
      projectSubmitted: false,
      hackathonStarted: false,
      registrationStarted: false,
      submitAllowed: false,
      submissionDeadlinePassed: false,
      rsvpClosed: false, // being set here, should probably change this to be pulled from somewhere else tho
      groupNumber: 'Pending',
      email: '',
      code: '',
      checkbox: false,
      timer: 0,
      curImage: 0,
      numImages: 13,
      resent: false,
      splashMessage: '',
      busSelected: 'Not bussing',
      rsvp: { coming: false, origin: '' },
    };
  },
  components: {
    Navbar2,
  },
  computed: {
    // currentHeader(): string {
    //   if (!firebase.auth().currentUser!.emailVerified) {
    //     return 'Please check your email and activate your account.';
    //   }
    //   return this.subheaders[this.step];
    // },
    // emoticon(): string {
    //   switch (this.step) {
    //     case 0:
    //       return '🙂';
    //     case 1:
    //       return '😐';
    //     case 4:
    //       return '🙁';
    //     default:
    //       return '🙂';
    //   }
    // },
    currentHeader(): string {
      if (!firebase.auth().currentUser!.emailVerified) {
        return 'Please check your email and activate your account.';
      }
      return this.state_data[this.current_state].message;
    },
    emoticon(): string {
      if (this.current_state in this.state_data) {
        return this.state_data[this.current_state].emoji;
      }

      return '🙂';
    },
  },
  methods: {
    // currentStateNum(): number {
    //   return this.state_data[this.current_state].number;
    // },
    currentGroupIncludes(inputGroup:string): boolean {
      const groupList = this.state_data[this.current_state].groups;
      return (groupList.includes(inputGroup));
    },
    // Grabs the application from where its store in firebase
    fetchFromFirebase(): Promise<any> {
      return this.$store.state.db
        .collection(this.$store.state.currentHackathon)
        .doc('applications')
        .collection('all')
        .doc(firebase.auth().currentUser!.email)
        .get();
    },
    splashTime() {
      this.timeout = setTimeout(() => {
        this.counter = 1;
      }, 2000);
    },
    async updateRSVP(
      update: boolean,
      coming: boolean = false,
      origin: string = '',
    ) {
      const app = await this.fetchFromFirebase();
      const appWithRSVP = app.data();
      const rsvp = { coming, origin };
      if (update && app.data()) {
        let updateError;

        try {
          const updateResponse = await firebase
            .functions()
            .httpsCallable('updateRsvp')({
              rsvp,
            });

          if (updateResponse.data.error) {
            updateError = updateResponse.data.error;
          } else {
            appWithRSVP._.RSVP = rsvp;
          }
        } catch (e) {
          console.error(e);
          updateError = 'Submission error';
        }

        if (updateError) {
          this.snack.message = updateError;
          this.snack.color = 'error';
          this.snack.visible = true;
        }
      }

      this.rsvp = appWithRSVP
        ? appWithRSVP._.RSVP
        : { coming: false, origin: '' };
    },
    // Step is state of the page
    async updateStep(email: string) {
      const checkedInSnapshot = await db.collection(this.hackathon)
        .doc('hackathon')
        .collection('checked in')
        .doc(email)
        .get();

      const personalCode = await firebase
        .functions()
        .httpsCallable('getPersonalCode')({
          email,
        });

      this.code = personalCode.data.code;

      console.log(personalCode.data);

      this.checkedIn = checkedInSnapshot.exists;
      this.projectSubmitted = false;

      const y = await firebase.functions()
        .httpsCallable('getHackathonStatuses')();
      this.submitAllowed = y.data.displayProjectSubmission;
      this.hackathonStarted = y.data.hackathonStarted;
      this.registrationStarted = y.data.registrationStarted;
      this.submissionDeadlinePassed = y.data.submissionDeadlinePassed;

      // const z = await firebase.functions()
      //   .httpsCallable('isHackathonStarted')();
      // this.hackathonStarted = z.data.hackathonStarted;

      // const f = await firebase.functions()
      //   .httpsCallable('isRegistrationStarted')();
      // this.registrationStarted = f.data.registrationStarted;

      const x = await db.collection(this.hackathon)
        .doc('hackathon').collection('projects').doc(email)
        .onSnapshot((snap) => {
          if (!snap.exists) return;
          if (snap.data()!._.status === 'submitted') this.projectSubmitted = true;
          this.groupNumber = snap.data()!._.table;
        });

      if (!this.projectSubmitted) {
        console.log('s');
        const signupRequest = await firebase.functions()
          .httpsCallable('findTeam')({ email: firebase.auth().currentUser!.email });
        console.log(signupRequest.data);
        if (signupRequest.data.projectSubmitted) {
          console.log(signupRequest.data);
          this.projectSubmitted = signupRequest.data.projectSubmitted;
          this.groupNumber = signupRequest.data.tableNumber !== -1 ? signupRequest.data.tableNumber : 'Pending';
        }
      }
      // Check if another user has submitted a project on behalf of the current user
      console.log(this.projectSubmitted);
      console.log(this.groupNumber);
      console.log(this.checkedIn);

      db.collection(this.hackathon)
        .doc('applications')
        .collection('all')
        .doc(email)
        .onSnapshot((snap) => {
          if (snap.exists) {
            const data = snap.data();
            //   if (data!._.status && data!._.status === 'in progress') { this.step = 2; }
            //   if (data!._.status && data!._.status === 'submitted') this.step = 3;
            //   // Check if user made it into any round & set to accepted
            //   if (data!._.decision && data!._.decision === 'rejected') { this.step = 4; }
            //   if (
            //     data!._.decision &&
            //     data!._.decision.substring(0, 5) === 'round'
            //   ) { this.step = 5; }
            //   if (data!._.RSVP && data!._.RSVP.coming) this.step = 6;
            //   if (data!._.RSVP && (data!._.RSVP.origin || data!._.RSVP.coming != null)) this.step = 7;
            //   if (this.checkedIn && this.projectSubmitted === false && this.submitAllowed) this.step = 8;
            //   if (this.checkedIn && this.projectSubmitted && this.submitAllowed) this.step = 9;
            // } else {
            //   // application not started
            //   console.log('s', this.checkedIn, this.projectSubmitted);
            //   this.step = 1;
            //   if (this.checkedIn && this.projectSubmitted === false && this.submitAllowed) this.step = 8;
            //   if (this.checkedIn && this.projectSubmitted && this.submitAllowed) this.step = 9;
            if (data!._.status) {
              if (data!._.status === 'in progress' || data!._.status === 'submitted') {
                this.current_state = data!._.status;
              }
            }
            if (data!._.decision) {
              if (data!._.decision === 'rejected') { this.current_state = 'rejected'; return; }
              if (data!._.decision.substring(0, 5) === 'round') { this.current_state = 'accepted'; }
            }
            if (data!._.RSVP.coming != null) {
              if (data!._.RSVP.coming) {
                this.current_state = 'coming';
              }
              if (!(data!._.RSVP.coming)) {
                this.current_state = 'not coming';
              }
            }
            if ((data!._.RSVP.coming == null || !data!._.RSVP.coming) && this.rsvpClosed) {
              this.current_state = 'closed rsvp';
            }
            if (this.registrationStarted && data!._.RSVP.coming) {
              this.current_state = 'open registration';
            }
            if (this.checkedIn && !this.hackathonStarted) {
              this.current_state = 'waiting';
            }
            if (this.checkedIn && this.hackathonStarted) {
              this.current_state = 'checked in';
              if (this.submitAllowed) {
                this.current_state = 'submitting';
              }
              if (this.projectSubmitted) {
                this.current_state = 'project submitted';
                if (this.groupNumber !== 'Pending') {
                  this.current_state = 'group assigned';
                }
              }
              if (!this.projectSubmitted && this.submissionDeadlinePassed) {
                this.current_state = 'submissions closed';
              }
            }
          } else {
            console.log('s', this.checkedIn, this.projectSubmitted);
            this.current_state = 'not started';
          }
        });
    },
    nextImage() {
      // remove showMe class from current image
      let e = document.getElementById(`slideimg${this.curImage}`);
      this.removeClass(e, 'showMe');
      // compute next image
      this.curImage++;
      if (this.curImage > this.numImages - 1) {
        this.curImage = 0;
      }
      // add showMe class to next image
      e = document.getElementById(`slideimg${this.curImage}`);
      this.addClass(e, 'showMe');
    },
    // helper method
    addClass(elem, name) {
      let c = elem.className;
      if (c) c += ' ';
      c += name;
      elem.className = c;
    },
    // helper method
    removeClass(elem, name) {
      const c = elem.className;
      elem.className = c
        .replace(name, '')
        .replace(/\s+/g, ' ')
        .replace(/^\s+|\s+$/g, ' ');
    },
    resend() {
      this.resent = true;
      console.log(this.resent);
      console.log(this.isVerified());
      firebase.auth()
        .currentUser!.sendEmailVerification()
        .then(() => console.log('Resent'))
        .catch(e => console.log('Resend problem'));
    },
    isVerified: () => firebase.auth().currentUser!.emailVerified,
  },
  async beforeMount() {
    const appEmail = firebase.auth().currentUser!.email as string;
    this.splashMessage =
      this.$route.params.firstTime === 'yes' ? 'Hello.' : 'Hello, Again.';
    this.updateStep(appEmail);
  },
  async mounted() {
    this.splashTime();
    this.timer = setInterval(this.nextImage, 4000);
    this.updateRSVP(false);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
});
</script>
<style scoped src="../assets/css/status.css">

.regular {
  text-decoration: none;
  color: inherit;
}

#footertext {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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

v-snackbar {
  background-color: red !important;
}
</style>
