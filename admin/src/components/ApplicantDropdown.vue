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
                  <v-layout row wrap>
                    <v-flex xs12 md6 lg6>
                      <v-card-text>
                        <h4>Name:</h4>
                      </v-card-text>
                      <v-card-text>
                        <h4>University:</h4>
                      </v-card-text>
                      <v-card-text>
                        <h4>Year:</h4>
                      </v-card-text>
                      <v-card-text>
                        <h4># of Previous Hackathons:</h4>
                      </v-card-text>
                      <v-card-text>
                        <h4>Major:</h4>
                      </v-card-text>
                      <v-card-text>
                        <h4>Degree:</h4>
                      </v-card-text>
                      <v-card-text>
                        <h4>Git Repo:</h4>
                      </v-card-text>
                      <v-card-text>
                        <b>LinkedIn:</b>
                      </v-card-text>
                      <v-card-text>
                        <h4>Website:</h4>
                      </v-card-text>
                      <v-card-text>
                        <h4>Devpost:</h4>
                      </v-card-text>
                      <v-card-text>
                        <b>Dietary restrictions:</b>
                      </v-card-text>
                      <v-card-text>
                        <b>Shirt size:</b>
                      </v-card-text>
                      <v-card-text>
                        <b>Ethnicity:</b>
                      </v-card-text>
                      <v-card-text>
                        <b>Coming from:</b>
                      </v-card-text>
                      <v-card-text>
                        <b>Heard from:</b>
                      </v-card-text>
                      <v-card-text>
                        <b>Emergency contact:</b>
                      </v-card-text>
                      <v-card-text>
                        <b>Workshops:</b>
                      </v-card-text>
                      <!-- <v-card-text class="px-0 name">{{ ": " + applicant. }}</v-card-text> -->
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <v-card-text>{{ applicant.name.first + ' ' + applicant.name.last}}</v-card-text>
                      <v-card-text>{{ applicant.academics.school }}</v-card-text>
                      <v-card-text>{{ applicant.academics.year }}</v-card-text>
                      <v-card-text>{{ applicant.logistics.hackathons_attended }}</v-card-text>
                      <v-card-text>{{ applicant.academics.major }}</v-card-text>
                      <v-card-text>{{ applicant.academics.degree }}</v-card-text>
                      <v-card-text>
                        <a
                          v-bind:href="applicant.profiles.github"
                          target="_blank"
                        >{{ applicant.profiles.github == '' ? '-' : applicant.profiles.github }}</a>
                      </v-card-text>
                      <v-card-text>
                        <a
                          v-bind:href="applicant.profiles.linkedin"
                          target="_blank"
                        >{{ applicant.profiles.linkedin == '' ? '-' : applicant.profiles.linkedin }}</a>
                      </v-card-text>
                      <v-card-text>
                        <a
                          v-bind:href="applicant.profiles.website"
                          target="_blank"
                        >{{ applicant.profiles.website == '' ? '-' : applicant.profiles.website }}</a>
                      </v-card-text>
                      <v-card-text>
                        <a
                          v-bind:href="applicant.profiles.devpost"
                          target="_blank"
                        >{{ applicant.profiles.devpost == '' ? '-' : applicant.profiles.devpost }}</a>
                      </v-card-text>
                      <v-card-text>{{ applicant.logistics.diet_restrictions }}</v-card-text>
                      <v-card-text>{{ applicant.logistics.shirt_size }}</v-card-text>
                      <v-card-text>{{ applicant.personal.race }}</v-card-text>
                      <v-card-text>{{ applicant.logistics.traveling_from }}</v-card-text>
                      <v-card-text>{{ applicant.logistics.discovered_by }}</v-card-text>
                      <v-card-text>{{ applicant.emergency.name + ' - ' + applicant.emergency.relationship + ' - ' + applicant.emergency.phone }}</v-card-text>
                      <v-card-text>{{ applicant.responses.workshops }}</v-card-text>

                      <!-- <v-card-text class="px-0 name">{{ ": " + applicant. }}</v-card-text> -->
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                <div slot="header" class="headline mb-0">Application Questions</div>
                <v-card>
                  <v-card-title
                    class="questionTitle"
                  >What does positive change mean to you? How do you see yourself incorporating positive change into your experience at DeltaHacks?*</v-card-title>
                  <v-card-text>{{ applicant.responses.q1 }}</v-card-text>
                  <v-card-title
                    class="questionTitle"
                  >Describe a time you had to teach a new skill to someone.</v-card-title>
                  <v-card-text>{{ applicant.responses.q2 }}</v-card-text>
                  <v-card-title
                    class="questionTitle"
                  >If you were stranded on a deserted island, with no way to escape, for a month, what 3 personal items would you want to have?*</v-card-title>
                  <v-card-text>{{ applicant.responses.q3 }}</v-card-text>
                  <v-card-title class="questionTitle">Anything else you'd like to tell us?</v-card-title>
                  <v-card-text>{{ applicant.anything_else }}</v-card-text>
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

export default Vue.extend({
  name: 'Applicant',
  props: ['usrname', 'applicant', 'isReviewed', 'refetchCurrentPage'],
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
      // console.log('Updating score', this.$store.state.test);
      try {
        const userApplication = await this.$store.state.db
          .collection('DH6')
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
          .collection('DH6')
          .doc('applications')
          .collection('all')
          .doc(this.applicant.contact.email)
          .update({ _: { reviews: applicantData._.reviews, ...applicantData._ } });
        this.isReviewed = true;
        // this.refetchCurrentPage();
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
          .collection('DH6')
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
  },
});
</script>

<style scoped>
i {
  font-size: 3em;
  margin: 10px 20px;
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
