<template>
  <div id="">
    <v-snackbar v-model="feedback" top :color="bannerColor" :timeout="bannerTimeout">
      {{bannerMessage}}
      <v-btn color="white" flat @click="feedback = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-layout row wrap>
      <v-flex xs12 md6 lg6>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ applicant.name + ' ' + applicant.lastname }} #{{ applicant.index }}</h3>
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
                        <h4> Name: </h4>
                      </v-card-text>
                      <v-card-text>
                        <h4> University: </h4>
                      </v-card-text>
                      <v-card-text>
                        <h4> Year: </h4>
                      </v-card-text>
                      <v-card-text>
                        <h4> # of Previous Hackathons: </h4>
                      </v-card-text>
                      <v-card-text>
                        <h4> Major: </h4>
                      </v-card-text>
                      <v-card-text>
                        <h4> Degree: </h4>
                      </v-card-text>
                      <v-card-text>
                        <h4> Git Repo: </h4>
                      </v-card-text>
                      <v-card-text>
                        <b> LinkedIn: </b>
                      </v-card-text>
                      <v-card-text>
                        <h4> Website: </h4>
                      </v-card-text>
                      <v-card-text>
                        <h4> Devpost: </h4>
                      </v-card-text>
                      <v-card-text>
                        <b> Dietary restrictions: </b>
                      </v-card-text>
                      <v-card-text>
                        <b> Shirt size: </b>
                      </v-card-text>
                      <v-card-text>
                        <b> Ethnicity: </b>
                      </v-card-text>
                      <v-card-text>
                        <b> Coming from: </b>
                      </v-card-text>
                      <v-card-text>
                        <b> Heard from: </b>
                      </v-card-text>
                      <v-card-text>
                        <b> Emergency contact: </b>
                      </v-card-text>
                      <v-card-text>
                        <b> Workshops: </b>
                      </v-card-text>
                      <!-- <v-card-text class="px-0 name">{{ ": " + applicant. }}</v-card-text> -->
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <v-card-text>
                        {{ applicant.name + ' ' + applicant.lastname}}
                      </v-card-text>
                      <v-card-text>{{ applicant.university }}</v-card-text>
                      <v-card-text>{{ applicant.school_year }}</v-card-text>
                      <v-card-text>{{ applicant.hackathons }}</v-card-text>
                      <v-card-text>{{ applicant.major }}</v-card-text>
                      <v-card-text>{{ applicant.degree }}</v-card-text>
                      <v-card-text>
                        <a v-bind:href="applicant.github" target="_blank"> {{ applicant.github == '' ? '-' : applicant.github }} </a>
                      </v-card-text>
                      <v-card-text>
                        <a v-bind:href="applicant.linkedin" target="_blank"> {{ applicant.linkedin == '' ? '-' : applicant.linkedin }} </a>
                      </v-card-text>
                      <v-card-text>
                        <a v-bind:href="applicant.website" target="_blank"> {{ applicant.website == '' ? '-' : applicant.website }} </a>
                      </v-card-text>
                      <v-card-text>
                        <a v-bind:href="applicant.devpost" target="_blank"> {{ applicant.devpost == '' ? '-' : applicant.devpost }} </a>
                      </v-card-text>
                      <v-card-text>{{ applicant.dietary_restrictions }}</v-card-text>
                      <v-card-text>{{ applicant.shirt_size }}</v-card-text>
                      <v-card-text>{{ applicant.race }}</v-card-text>
                      <v-card-text>{{ applicant.location }}</v-card-text>
                      <v-card-text>{{ applicant.discover }}</v-card-text>
                      <v-card-text>{{ applicant.emergency_name + ' - ' + applicant.emergency_relationship + ' - ' + applicant.emergency_phone }}</v-card-text>
                      <v-card-text>{{ applicant.workshops }}</v-card-text>

                      <!-- <v-card-text class="px-0 name">{{ ": " + applicant. }}</v-card-text> -->
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                <div slot="header" class="headline mb-0">Application Questions</div>
                <v-card>
                  <v-card-title class="questionTitle"> Tell us about a project you worked on/ thing you made/ internship you did/ course you took that you are really passionate about, and why?*
                  </v-card-title>
                  <v-card-text>{{ applicant.q1 }}</v-card-text>
                  <v-card-title class="questionTitle"> Why do you want to come to Deltahacks V, and what is one thing that you are passionate to bring to this year's hackathon?* </v-card-title>
                  <v-card-text class="responseText">{{ applicant.q2 }}</v-card-text>
                  <v-card-title class="questionTitle"> If you could teleport to anywhere in the world right now, where would you go and why?* </v-card-title>
                  <v-card-text>{{ applicant.q3 }}</v-card-text>
                  <v-card-title class="questionTitle"> Anything else you'd like to tell us? </v-card-title>
                  <v-card-text>{{ applicant.q4 }}</v-card-text>
                  <v-card-title class="questionTitle"> I give Microsoft permission to contact me, send me promotion material, and share resources to help me prepare for the hackathon. </v-card-title>
                  <v-card-text>{{ applicant.microsoft ? 'Yes' : 'No' }}</v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>
        </v-layout>
        <vue-slider :disabled='applicant.decision.reviewers.length >= 3 || isReviewed || !$store.state.currentUserIsAuthorizedReviewer' id="slider" v-model="score" :piecewise=false :piecewise-label=false step=1 :max=14 :use-keyboard=false :height=20 :dot-size=30></vue-slider>
        <v-btn color="success" class="button2" :disabled='applicant.decision.reviewers.length >= 3 || isReviewed || !$store.state.currentUserIsAuthorizedReviewer' @click="updateApplicationScore">SUBMIT SCORE</v-btn>
        <v-btn v-if="$store.state.vuex_user_role == 'mod'" class="bold" color="blue" dark @click="decisionStats">Stats</v-btn>
        <v-dialog v-model="dialog" width="500">
          <v-btn slot="activator" class="bold" color="red" dark :disabled='!$store.state.currentUserIsAuthorizedReviewer'>Delete</v-btn>
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title> Are you sure?</v-card-title>
            <v-card-text>This will delete the selected applicant and cannot be undone.</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="bold" color="red" flat @click="deleteApplicant(applicant.email)">Yes</v-btn>
              <v-btn color="primary" flat @click="dialog = false">No</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
      <v-flex xs12 md6 lg6>
        <v-card color="" id='docCard'>
          <v-card-text class="text-xs-left">
            <h2>Resume</h2>
          </v-card-text>
          <iframe id='resume' v-if="applicant.documents[0] || applicant.documents" :src="applicant.documents[0] ? applicant.documents[0].download_link : (applicant.documents.download_link ? applicant.documents.download_link : 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf') "></iframe>
          <h2 v-else>No resume uploaded</h2>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import vueSlider from 'vue-slider-component';

export default {
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
    computed: {
        hasResume() {
            //console.log(this.applicant);
            const app = this.applicant;
            return app.documents && app.documents.length !== 0;
        },
    },
    mounted() {
        //console.log('Sub', this.isReviewed, this.applicant, this.random);
        /*         this.score = this.applicant.decision.reviewers.find(
            obj => obj.reviewer === this.$store.state.firebase.auth().currentUser.email
        ).score; */
        // console.log('Docs', this.applicant.documents);
    },
    methods: {
        decisionStats() {
            console.log(this.applicant.name, this.applicant.decision.reviewers);
        },
        async updateApplicationScore() {
            //console.log('Updating score', this.$store.state.test);
            try {
                const userApplication = await this.$store.state.db
                    .collection('decisions')
                    .doc('DH5')
                    .collection('pending')
                    .doc(this.applicant.email)
                    .get();

                const aaa = this.$store.state.test;
                // console.log(
                //     aaa,
                //     this.$store.state.firebase.auth().currentUser.email,
                //     userApplication.data().decision
                // );
                const decision = { ...userApplication.data().decision };
                const reviews = userApplication.data().decision.reviews + 1;
                const reviewers = userApplication.data().decision.reviewers;
                reviewers.push({
                    score: this.score,
                    reviewer: this.$store.state.firebase.auth().currentUser.email,
                });
                decision.reviews = reviews;
                decision.reviewers = reviewers;
                //console.log('decision', decision);
                const uploadScore = await this.$store.state.db
                    .collection('decisions')
                    .doc('DH5')
                    .collection('pending')
                    .doc(this.applicant.email)
                    .update({ decision });
                this.isReviewed = true;
                // this.refetchCurrentPage();
                console.log(
                    'Review sent, you can chill: ',
                    `${userApplication.data().name} ${userApplication.data().lastname}`
                );
            } catch (err) {
                console.log('Error getting user app: ', err);
            }
        },
        async deleteApplicant(applicant) {
            try {
                const decisionDelete = await this.$store.state.db
                    .collection('decisions')
                    .doc('DH5')
                    .collection('pending')
                    .doc(applicant)
                    .delete();
                this.usrname = `(DELETED) ${this.usrname}`;
                this.feedback = true;
                console.log('Sucessful deletion: ', applicationDelete, decisionDelete);
            } catch (err) {
                console.log('Error deleting application: ', err);
            }
            this.dialog = false;
        },
    },
};
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
