<template>
  <div id>
    <v-snackbar v-model="feedback" top :color="bannerColor" :timeout="bannerTimeout">
      {{bannerMessage}}
      <v-btn color="white" flat @click="feedback = false">Close</v-btn>
    </v-snackbar>
    <v-layout row wrap>
      <v-flex xs12 md6 lg6>
        <v-card-title primary-title>
          <div>
            <h3
              class="headline mb-0"
            >{{ applicant.name.first + ' ' + applicant.name.last }} #{{ applicant._.index }}</h3>
          </div>
        </v-card-title>
        <v-layout row wrap>
          <v-flex xs12 lg10 mb-3>
            <v-expansion-panel id="panel" popout>
              <v-expansion-panel-content v-model="topcard">
                <div slot="header" class="headline mb-0">Basic Info</div>
                <v-card>
                  <v-layout row wrap class='basic_info'>
                    <v-flex xs12 md6 lg6>
                      <h4>Name:</h4>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <p>{{ applicant.name.first + ' ' + applicant.name.last }}</p>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <h4>University:</h4>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <p>{{ applicant.academics.school }}</p>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <h4>Year:</h4>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <p>{{ applicant.academics.year }}</p>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <h4># of Previous Hackathons:</h4>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <p>{{ applicant.logistics.hackathons_attended }}</p>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <h4>Major:</h4>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <p>{{ applicant.academics.major }}</p>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <h4>Degree:</h4>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <p>{{ applicant.academics.degree }}</p>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <h4>Git Repo:</h4>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <a v-bind:href="applicant.profiles.github" target="_blank">
                        {{ applicant.profiles.github == '' ? '-' : applicant.profiles.github }}
                      </a>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <h4>LinkedIn:</h4>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <a v-bind:href="applicant.profiles.linkedin" target="_blank">
                        {{ applicant.profiles.linkedin == '' ? '-' : applicant.profiles.linkedin }}
                      </a>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <h4>Website:</h4>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <a v-bind:href="applicant.profiles.website" target="_blank">
                        {{ applicant.profiles.website == '' ? '-' : applicant.profiles.website }}
                      </a>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <h4>Devpost:</h4>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <a v-bind:href="applicant.profiles.devpost" target="_blank">
                        {{ applicant.profiles.devpost == '' ? '-' : applicant.profiles.devpost }}
                      </a>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <h4>Dietary Restrictions:</h4>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <p>{{ applicant.logistics.diet_restrictions }}</p>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <h4>Shirt Size:</h4>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <p>{{ applicant.logistics.shirt_size }}</p>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <h4>Ethnicity:</h4>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <p>{{ applicant.personal.race }}</p>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <h4>Coming From:</h4>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <p>{{ applicant.logistics.traveling_from }}</p>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <h4>Emergency Contact:</h4>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <p>{{ applicant.emergency.name + ' - ' + applicant.emergency.phone }}</p>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <h4>Workshops:</h4>
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <p>{{ applicant.responses.workshops }}</p>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                <div slot="header" class="headline mb-0">Application Questions</div>
                <v-card>
                  <v-card-title
                    class="questionTitle"
                  >Describe the process of something you have built/created that you are proud of?</v-card-title>
                  <v-card-text>{{ applicant.responses.q1 }}</v-card-text>
                  <v-card-title
                    class="questionTitle"
                  >If you could reinvent one object in the world, what would it be and how would you change it ?</v-card-title>
                  <v-card-text>{{ applicant.responses.q2 }}</v-card-text>
                  <v-card-title
                    class="questionTitle"
                  >What is one trait you have that you believe makes you a suitable candidate for DeltaHacks 8?</v-card-title>
                  <v-card-text>{{ applicant.responses.q3 }}</v-card-text>
                  <v-card-title class="questionTitle">Anything you'd like us to see?</v-card-title>
                  <v-card-text>{{ applicant.profiles.other }}</v-card-text>
                  <v-card-title class="questionTitle">Anything else you'd like to tell us?</v-card-title>
                  <v-card-text>{{ applicant.responses.anything_else }}</v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>
        </v-layout>
        <vue-slider
          :disabled="applicant._.reviews.scores.length >= 3 || isReviewed || !$store.state.currentUserIsAuthorizedReviewer"
          id="slider"
          v-model="score"
          :piecewise="false"
          :piecewise-label="false"
          step="1"
          :max="14"
          :use-keyboard="false"
          :height="20"
          :dot-size="30"
        ></vue-slider>
        <v-btn
          :disabled="applicant._.reviews.scores.length >= 3 || isReviewed || !$store.state.currentUserIsAuthorizedReviewer"
          color="success"
          class="button2"
          @click="updateApplicationScore"
        >SUBMIT SCORE</v-btn>
        <v-btn
          v-if="$store.state.vuex_user_role == 'mod'"
          class="bold"
          color="blue"
          dark
          @click="decisionStats"
        >Stats</v-btn>
        <v-dialog v-model="dialog" width="500">
          <v-btn
            slot="activator"
            class="bold"
            color="red"
            dark
            :disabled="!$store.state.currentUserIsAuthorizedReviewer"
          >Delete</v-btn>
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Are you sure?</v-card-title>
            <v-card-text>This will delete the selected applicant and cannot be undone.</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="bold" color="red" flat @click="deleteApplicant(applicant.contact.email)">Yes</v-btn>
              <v-btn color="primary" flat @click="dialog = false">No</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
      <v-flex xs12 md6 lg6>
        <v-card color id="docCard">
          <v-card-text class="text-xs-left">
            <h2>Resume</h2>
          </v-card-text>
          <iframe
            id="resume"
            v-if="applicant.resume.filename"
            :src="applicant.resume.link ? applicant.resume.link : 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'"
          ></iframe>
          <h2 v-else>No resume uploaded</h2>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script lang="ts">
import vueSlider from 'vue-slider-component';
import Vue from 'vue';
import { firestore, auth } from 'firebase';

export default Vue.extend({
  name: 'Applicant',
  props: ['usrname', 'applicant', 'isReviewed'],
  data: () => ({
    dialog: false,
    currentPage: 0,
    bannerColor: 'success',
    bannerTimeout: 2000,
    bannerMessage: 'Successfully Deleted!',
    feedback: false,
    currentUser1: 'yee',
    topcard: true,
    pageCount: 0,
    status: 0,
    score: 0,
    resumeLink:
      'https://drive.google.com/viewerng/viewer?embedded=true&url=https://writing.colostate.edu/guides/documents/resume/functionalSample.pdf',
    cards: [
      {
        title: 'Pre-fab homes',
        flex: 12,
      },
      {
        title: 'Favorite road trips',
        src: '/static/doc-images/cards/road.jpg',
        flex: 6,
      },
      {
        title: 'Best airlines',
        src: '/static/doc-images/cards/plane.jpeg',
        flex: 6,
      },
    ],
  }),
  components: {
    vueSlider,
  },
  mounted() {
    console.log(this.$store.state.currentUserIsAuthorizedReviewer);
  },
  methods: {
    decisionStats() {
      const resstr = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const r of this.applicant.decision.reviewers) {
        resstr[r.reviewer] = r.score;
      }
      console.log(this.applicant.name, resstr);
    },
    async updateApplicationScore() {
      try {
        const userApplication = await this.$store.state.db
          .collection(this.$store.state.currentHackathon)
          .doc('applications')
          .collection('all')
          .doc(this.applicant.contact.email)
          .get();
        const applicantData = userApplication.data();
        applicantData._.reviews.total = applicantData._.reviews.total ? applicantData._.reviews.total + 1 : 1;
        applicantData._.reviews.scores.push({
          score: this.score,
          reviewer: this.$store.state.firebase.auth().currentUser.email,
        });
        // console.log('decision', decision);
        const uploadScore = await this.$store.state.db
          .collection(this.$store.state.currentHackathon)
          .doc('applications')
          .collection('all')
          .doc(this.applicant.contact.email)
          .update({ _: { reviews: applicantData._.reviews, ...applicantData._ } });
        // @ts-ignore
        this.isReviewed = true; // I'll fix this eventually
        console.log(
          'Review sent, you can chill: ',
          `${userApplication.data().name.first} ${userApplication.data().name.last}`,
        );
      } catch (err) {
        console.log('Error getting user app: ', err);
      }
    },
    async deleteApplicant(applicant) {
      try {
        const decisionDelete = await this.$store.state.db
          .collection(this.$store.state.currentHackathon)
          .doc('applications')
          .collection('all')
          .doc(applicant)
          .delete();
        this.feedback = true;
      } catch (err) {
        console.log('Error deleting application: ', err);
      }
      this.dialog = false;
    },
    getAuth() {
      return auth().currentUser!.email;
    },
  },
});
</script>

<style scoped>
i {
  font-size: 3em;
  margin: 10px 20px;
}

.basic_info .flex {
  padding: 4px 24px !important;
}

.basic_info .flex:nth-child(odd) {
  flex-basis: 33%;
}

#datacard {
  height: 900px;
}

#maind {
  border: solid 2px black;
}

#contain {
  border: solid 2px blue;
  width: 100%;
  height: 100%;
}

#panel {
  margin-left: 10%;
  margin-right: 10%;
}

#slider {
  margin-left: 5%;
  margin-right: 5%;
}

.name {
  font-size: 2em;
  color: black;
}

#topcard {
  height: 200px;
}

#resume {
  width: 100%;
  height: 900px;
}

#docCard {
  width: 100%;
}

.questionTitle {
  font-weight: bold;
}

.responseText {
  text-indent: 100%;
}
</style>
