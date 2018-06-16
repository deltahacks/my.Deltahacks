<template>
  <div id="">
    <v-layout row wrap>
      <v-flex xs12 md6 lg6 xl6>
        <v-card color="" height="100%">
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ usrname }}</h3>
            </div>
          </v-card-title>
          <v-flex xs12>
            <br>
            <v-card dark color="primary">
              <v-card-text class="text-xs-left">
                <h2>{{ usrname }}</h2>
              </v-card-text>
            </v-card>
          </v-flex>
          <br>
          <v-card dark color="green lighten-3">
            <v-card-text class="text-xs-left">
              <h2>Age</h2>
            </v-card-text>
          </v-card>
          <br>
          <v-card dark color="green lighten-3">
            <v-card-text class="text-xs-left">
              <h2>University / Program / Year </h2>
            </v-card-text>
          </v-card>
          <br>
          <v-card dark color="green lighten-3">
            <v-card-text class="text-xs-left">
              <h2>Number of Hackathons: </h2>
            </v-card-text>
          </v-card>
          <br>
          <v-card dark color="green lighten-3">
            <div class="text-xs-center">
              <v-icon>fab fa-chrome</v-icon>
              <v-icon>fab fa-linkedin</v-icon>
              <v-icon>fab fa-github</v-icon>
            </div>
          </v-card>
          <br>
          <br><br>

          <br><br>
          <br>
          <h3>A PROJECT I DID:</h3>
          <br><br>
          <br><br><br>
          <vue-slider v-model="status" piecewise=true piecewise-label=true step="1" max="5" use-keyboard=true height=20 dot-size=30></vue-slider>
          <!-- <vue-slider vmodel="status" step="1" max="5" track-color="red" hint="PLEASE RATE THE APPLICANT FROM 0-5" persistent-hint=true thumb-label=true thumb-color="purple" use-keyboard=true ticks=true tooltip="always"/> -->
          <h2>The current applicant score is : {{status+status1}} out of 10</h2>
          <br>
          <v-btn color="info" class="button1" v-on:click="status=0">RESET SCORE</v-btn>
          <v-btn color="success" class="button2" v-on:click="status">SUBMIT SCORE</v-btn>
        </v-card>
      </v-flex>
      <v-flex xs12 md6 lg6>
        <v-card color="">
          <v-card-text class="px-0">Resume</v-card-text>
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
  props: ['usrname'],
  data: () => ({
    currentPage: 0,
    pageCount: 0,
    status: 0,
    status1: 0,
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
</style>
