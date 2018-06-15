<template>
  <div id="wrapper">
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs6 md6 lg6>
          <v-card height='100%' color="">
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
                <i class="fa fa-globe"></i>
                <i class="fa fa-linkedin"></i>
                <i class="fab fa-github"></i>
              </div>
            </v-card>
            <br>
            <br><br>

            <br><br>
            <br>
            <h3>A PROJECT I DID:</h3>
            <br><br>
            <v-btn color="info" class="button1" v-on:click="status=0">RESET SCORE</v-btn>
            <br><br><br>
            <vue-slider v-model="status" piecewise=true piecewise-label=true step="1" max="5" use-keyboard=true height=20 dot-size=30></vue-slider>
            <!-- <vue-slider vmodel="status" step="1" max="5" track-color="red" hint="PLEASE RATE THE APPLICANT FROM 0-5" persistent-hint=true thumb-label=true thumb-color="purple" use-keyboard=true ticks=true tooltip="always"/> -->
            <h2>The current applicant score is : {{status+status1}} out of 10</h2>
            <br>
            <v-btn color="success" class="button2" v-on:click="status">SUBMIT SCORE</v-btn>
          </v-card>
        </v-flex>
        <v-flex xs6 md6 lg6>
          <v-card color="">
            <v-card-text class="px-0">Resume</v-card-text>
            <iframe :src="resumeLink" style="width: 100%; height: 900px;"></iframe>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- <v-layout row wrap>
      <section id="left1">
        <v-flex xs12 md12 lg12>
          <v-card dark color="primary">
            <v-card-text class="px-0">
              <h2>{{ usrname }}</h2>
            </v-card-text>
          </v-card>
        </v-flex>
        <br>
        <v-btn color="info" class="button1" v-on:click="status=0">RESET SCORE</v-btn>
        <br><br><br>
        <vue-slider v-model="status" piecewise=true piecewise-label=true step="1" max="5" use-keyboard=true height=20 dot-size=30></vue-slider>
        <h2>The current applicant score is : {{status+status1}} out of 10</h2>
        <br>
        <v-btn color="success" class="button2" v-on:click="status">SUBMIT SCORE</v-btn>
      </section>
      <section id="right1" xs12 md12 lg12>
        <v-card>
<div id="wrapper">
  <v-container grid-list-md text-xs-center>
  <v-layout>
      <section id="left">
      <v-flex xs12>
        <br>
        <v-card dark color="primary">
          <v-card-text class="px-0"><h2>{{ usrname }}</h2></v-card-text>
        </v-card>
      </v-flex>
      <br>
    <v-card dark color="green">
    <v-card-text class="px-0"><h2>AGE</h2></v-card-text></v-card>
    <br>
    <v-card dark color="green">
    <v-card-text class="px-0"><h2>UNIVERSITY AND YEAR </h2></v-card-text>
    </v-card>
    <br>
    <v-card dark color="green">
    <v-card-text class="px-0"><h2>NO OF HACKATHONS</h2></v-card-text>
    </v-card>
    <br>
  <i class="fa fa-github"><a href="www.github.com"><h2> GITHUB</h2></a></i>
    <br><br>
    <i class="fa fa-globe"><a href="www.website.com"><h2> WEBSITE</h2></a></i>
    <br><br>
    <i class="fa fa-linkedin"><a href="www.linkedin.com"><h2> LINKEDIN</h2></a></i>
    <br><br>
    <br>
    <h3>A PROJECT I DID:</h3>
    <br><br> -->

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
#datacard {
  height: 900px;
}

#wrapper {
  width: auto;
  height: auto;
}
#left {
  width: 600px;
  float: left;
}
#right {
  width: 700px;
  height: 900px;
  float: right;
}
.button1 {
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  height: 50px;
  width: 200px;
}
.button2 {
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  height: 50px;
  width: 200px;
}
</style>
