<template>
<div id="wrapper">
  <v-container grid-list-md text-xs-center>
  <v-layout>
      <section id="left">
      <v-flex xs12>
        <v-card dark color="primary">
          <v-card-text class="px-0"><h2>{{ usrname }}</h2></v-card-text>
        </v-card>
      </v-flex>
      <br>
        <v-btn color="info" class="button1" v-on:click="status=0">RESET SCORE</v-btn>
        <br><br><br>
         <vue-slider v-model="status" piecewise=true piecewise-label=true step="1" max="5" use-keyboard=true height=20 dot-size=30></vue-slider>
      <!-- <vue-slider vmodel="status" step="1" max="5" track-color="red" hint="PLEASE RATE THE APPLICANT FROM 0-5" persistent-hint=true thumb-label=true thumb-color="purple" use-keyboard=true ticks=true tooltip="always"/> -->
    <h2>The current applicant score is : {{status+status1}} out of 10</h2>
    <br>
    <v-btn color="success" class="button2" v-on:click="status">SUBMIT SCORE</v-btn>
          </section>
          <section id="right">
  <v-flex>
     <v-card>
          <iframe :src="resumeLink" style="width:700px; height:900px;"></iframe>
        </v-card>
      </v-flex>
      </section>
    </v-layout>
  </v-container>
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
    resumeLink: 'https://drive.google.com/viewerng/viewer?embedded=true&url=https://writing.colostate.edu/guides/documents/resume/functionalSample.pdf',
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

<style>
 #wrapper {
        width: auto;
        height: 950px;
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
