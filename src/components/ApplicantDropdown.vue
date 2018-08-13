<template>
  <div id="">
    <v-layout row wrap>
      <v-flex xs12 md6 lg6>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ usrname }}</h3>
          </div>
        </v-card-title>
        <v-layout row wrap>
          <v-flex xs12 lg10 mb-3>
            <v-expansion-panel id="panel" popout>
              <v-expansion-panel-content>
                <div slot="header">Basic Info</div>
                <v-card>
                  <v-layout row wrap>
                    <v-flex xs12 md6 lg6>
                      <v-card-text> Name: </v-card-text>
                      <v-card-text> Place of study: </v-card-text>
                      <v-card-text> Year: </v-card-text>
                      <v-card-text> # of Previous Hackathons: </v-card-text>
                      <v-card-text> Git Repo: </v-card-text>
                      <v-card-text> LinkedIn: </v-card-text>
                      <v-card-text> Website: </v-card-text>
                      <!-- <v-card-text class="px-0 name">{{ ": " + applicant. }}</v-card-text> -->
                    </v-flex>
                    <v-flex xs12 md6 lg6>
                      <v-card-text>{{ applicant.name }}</v-card-text>
                      <v-card-text>{{ applicant.university }}</v-card-text>
                      <v-card-text>{{ applicant.school_year }}</v-card-text>
                      <v-card-text>{{ applicant.hackathons }}</v-card-text>
                      <v-card-text><a v-bind:href="applicant.github" target="_blank"> {{ applicant.github }} </a> </v-card-text>
                      <v-card-text><a v-bind:href="applicant.linkedin" target="_blank"> {{ applicant.linkedin }} </a> </v-card-text>
                      <v-card-text><a v-bind:href="applicant.website" target="_blank"> {{ applicant.website }} </a> </v-card-text>
                      <!-- <v-card-text class="px-0 name">{{ ": " + applicant. }}</v-card-text> -->
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                <div slot="header">Personal Story</div>
                <v-card>
                  <v-card-text>{{ applicant.story }}</v-card-text>
                </v-card>
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                <div slot="header">Other Content?</div>
                <v-card>
                  <v-card-text>{{ applicant.story }}</v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>
        </v-layout>
        <vue-slider id="slider" v-model="score" :piecewise=false :piecewise-label=false step=1 :max=10 :use-keyboard=false :height=20 :dot-size=30></vue-slider>
        <h2>The current applicant score is : {{status}} out of 10</h2>
        <v-btn color="info" class="button1" v-on:click="status=0">RESET SCORE</v-btn>
        <v-btn color="success" class="button2" @click="updateApplicationScore">SUBMIT SCORE</v-btn>
      </v-flex>
      <v-flex xs12 md6 lg6>
        <v-card color="">
          <v-card-text class="text-xs-left">
            <h2>Resume</h2>
          </v-card-text>
          <iframe :src="resumeLink" style="width: 100%; height: 900px;"></iframe>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import vueSlider from 'vue-slider-component';
export default {
  name: 'Applicant',
  props: ['usrname', 'applicant'],
  data: () => ({
    currentPage: 0,
    currentUser1: 'yee',
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
    async updateApplicationScore() {
      console.log('Updating score', this.$store.state.test);
      try {
        let userApplication = await this.$store.state.db
          .collection('decisions')
          .doc('DH5')
          .collection('pending')
          .doc(this.applicant.email)
          .get();

        let aaa = this.$store.state.test;
        console.log(
          aaa,
          this.$store.state.firebase.auth().currentUser.email,
          userApplication.data().reviewers
        );

        let reviews = userApplication.data().reviews + 1;
        let reviewers = userApplication.data().reviewers;
        reviewers.push({
          score: this.score,
          reviewer: this.$store.state.firebase.auth().currentUser.email,
        });
        let uploadScore = await this.$store.state.db
          .collection('decisions')
          .doc('DH5')
          .collection('pending')
          .doc(this.applicant.email)
          .update({ reviews, reviewers });
      } catch (err) {
        console.log('Error getting user app: ', err);
      }
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

#panel{
  margin-left: 5%;
  margin-right: 5%;
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
</style>
