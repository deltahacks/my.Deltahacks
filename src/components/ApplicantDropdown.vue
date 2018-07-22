<template>
  <div id="">
    <v-layout row wrap>
      <v-flex>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ usrname }}</h3>
          </div>
        </v-card-title>
        <v-layout row wrap>
          <v-flex row wrap xs6>
            <v-card id="topcard" dark color="white">
              <v-card-text class="px-0 name">
                {{ applicant.name }}
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex row wrap xs6>
            <v-card id="topcard" dark color="primary">
              <v-card-text class="px-0 name">{{ applicant.university }}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex v-for="i in 3" :key="`4${i}`" xs4>
            <v-card dark color="primary">
              <v-card-text class="px-0">4</v-card-text>
            </v-card>
          </v-flex>
          <v-flex v-for="i in 4" :key="`3${i}`" xs3>
            <v-card dark color="secondary">
              <v-card-text class="px-0">3</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <vue-slider id="slider" v-model="status" piecewise=true piecewise-label=false step=1 max=10 use-keyboard=false height=20 dot-size=30></vue-slider>
        <h2>The current applicant score is : {{status}} out of 10</h2>
        <v-btn color="info" class="button1" v-on:click="status=0">RESET SCORE</v-btn>
        <v-btn color="success" class="button2" v-on:click="status">SUBMIT SCORE</v-btn>
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
    pageCount: 0,
    status: 0,
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
