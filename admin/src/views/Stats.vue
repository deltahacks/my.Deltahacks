<template>
  <v-app class="dashboard">
    <Navbar />
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <h3>Summary</h3>
      </v-layout>
      <v-layout row wrap>
        <!-- <v-flex d-flex xs12 sm6 md2>
          <v-card color='white lighten-4'>
            <v-card-title primary-title>Accepted Applications</v-card-title>
            <v-card color='white lighten-4' dark>
              <v-card-text class='totalapps center'>
                <IOdometer class='iOdometer' :value='accepted' />
              </v-card-text>
            </v-card>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md2>
          <v-card color='white lighten-4'>
            <v-card-title primary-title>Rejected Applications</v-card-title>
            <v-card color='white lighten-4' dark>
              <v-card-text class='totalapps center'>
                <IOdometer class='iOdometer' :value='decisions.rejected' />
              </v-card-text>
            </v-card>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md2>
          <v-card color='white lighten-4'>
            <v-card-title primary-title>Submitted Applications</v-card-title>
            <v-card color='white lighten-4' dark>
              <v-card-text class='totalapps center'>
                <IOdometer class='iOdometer' :value='submitted' />
              </v-card-text>
            </v-card>
          </v-card>
        </v-flex>-->
        <v-flex d-flex xs12 sm6 md2>
          <v-card color="white lighten-4">
            <v-card-title primary-title>Checked In</v-card-title>
            <v-card color="white lighten-4" dark>
              <v-card-text class="totalapps center">
                <IOdometer class="iOdometer" :value="safeCheckIn" />
              </v-card-text>
            </v-card>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md2>
          <v-card color="white lighten-4">
            <v-card-title primary-title>Total Applications</v-card-title>
            <v-card color="white lighten-4" dark>
              <v-card-text class="totalapps center">
                <IOdometer class="iOdometer" :value="applicationCount" />
              </v-card-text>
            </v-card>
          </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm6 md2>
          <v-card color="white lighten-4">
            <v-card-title primary-title>Mentors</v-card-title>
            <v-card color="white lighten-4" dark>
              <v-card-text class="totalapps center">
                <IOdometer class="iOdometer" :value="mentors" />
              </v-card-text>
            </v-card>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md2>
          <v-card color="white lighten-4">
            <v-card-title primary-title>Sponsors</v-card-title>
            <v-card color="white lighten-4" dark>
              <v-card-text class="totalapps center">
                <IOdometer class="iOdometer" :value="sponsors" />
              </v-card-text>
            </v-card>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md2>
          <v-card color="white lighten-4">
            <v-card-title primary-title>Walk Ins</v-card-title>
            <v-card color="white lighten-4" dark>
              <v-card-text class="totalapps center">
                <IOdometer class="iOdometer" :value="walkins" />
              </v-card-text>
            </v-card>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md2>
          <v-card color="white lighten-4">
            <v-card-title primary-title>RSVP</v-card-title>
            <v-card color="white lighten-4" dark>
              <v-card-text class="totalapps center">
                <IOdometer class="iOdometer" :value="rsvp" />
              </v-card-text>
            </v-card>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md2>
          <v-card color="white lighten-4">
            <v-card-title primary-title>Bus Passengers</v-card-title>
            <v-card color="white lighten-4" dark>
              <v-card-text class="totalapps center">
                <IOdometer class="iOdometer" :value="bus_passengers" />
              </v-card-text>
            </v-card>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <h3>Distribution</h3>
      </v-layout>
      <v-layout row wrap>
        <!-- <v-flex d-flex xs12 sm6 md3 child-flex>
          <v-card color='white lighten-4' dark>
            <pie-chart ref='decisions' :data='data' :options='{}' />
          </v-card>
        </v-flex>-->

        <v-flex d-flex xs12 sm6 md3>
          <v-card color="white lighten-4" dark>
            <basic-pie-chart :title="'Universities'" :categories="universities.categories" :data="universities.data" :colors="colors" />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color="white lighten-4" dark>
            <basic-bar-chart :title="'Hackathons (Accepted)'" :categories="numHackathons.categories" :data="numHackathons.data" :colors="colors" />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color="white lighten-4" dark>
            <basic-bar-chart :title="'Majors (Accepted)'" :categories="majors.categories" :data="majors.data" :colors="colors" />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color="white lighten-4" dark>
            <basic-bar-chart :title="'School Years (Accepted)'" :categories="schoolYears.categories" :data="schoolYears.data" :colors="colors" />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color="white lighten-4" dark>
            <basic-bar-chart :title="'Shirt Sizes (Accepted)'" :categories="shirtSizes.categories" :data="shirtSizes.data" :colors="colors" />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color="white lighten-4" dark>
            <basic-bar-chart :title="'Discovered By (All)'" :categories="discoveredBy.categories" :data="discoveredBy.data" :colors="colors" />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color="white lighten-4" dark>
            <basic-bar-chart
              :title="'Food Restrictions (Accepted)'"
              :categories="dietaryRestrictions.categories"
              :data="dietaryRestrictions.data"
              :colors="colors" />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color="white lighten-4" dark>
            <basic-bar-chart
              :title="'Coming From (Accepted)'"
              :categories="comingFrom.categories"
              :data="comingFrom.data"
              :colors="colors" />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color="white lighten-4" dark>
            <basic-bar-chart
              :title="'Workshops (Accepted)'"
              :categories="workshops.categories"
              :data="workshops.data"
              :colors="colors" />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color="white lighten-4" dark>
            <basic-bar-chart
              :title="'Average Word Count for Responses'"
              :categories="averageWords.categories"
              :data="averageWords.data"
              :colors="colors" />
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="loading" persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          {{loadingMessage}}
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>


<script lang="ts">
import firebase from 'firebase';
import IOdometer from 'vue-odometer';

import functions from 'firebase/functions';
import Vue from 'vue';
import db from '../firebase_init';
import Navbar from '@/components/Navbar.vue';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChartGen';
import ApexChart from '@/components/ApexBar.vue';

import { formatChartData } from '../helpers/utils';

import BasicBarChart from '@/components/charts/BasicBar.vue';
import BasicPieChart from '@/components/charts/BasicPie.vue';

import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

interface Dataset {
  label: string;
  backgroundColor: string[];
  data: number[];
}
interface Data {
  labels: string[];
  datasets: Dataset[];
}

// Decision interface to be used when using statistics, feel free to change mandatory fields
interface Decisions {
  accepted: number;
  pending: number;
  overflow: number;
  round1?: number;
  round2?: number;
  round3?: number;
  round4?: number;
  round5?: number;
  rejected?: number;
}

interface Statistics {
  decisions: Decisions; // Refer above
  rsvp: number; // Stats - # of rsvp
  checkedIn: number; // Stats - # of people checked in
  mentors: number; // Stats - # of mentors
}

interface StatsData {
  decisions: Decisions;
  statistics: Statistics | any;
  mentors: number; // Stats - # of mentors
  sponsors: number; // Stats - # of sponsors
  checkedIn: number; // Stats - # of people checked in
  walkins: number; // Stats - # of people walked in
  // eslint-disable-next-line camelcase
  bus_passengers: number; // Stats - # of bus passengers
  pickups: { [index: string]: number };
  submitted: number; // Stats - # of submitted applications
  inProgress: number; // Stats - # of in progress applications
  data: Data;
  checkInData: Data;
  ageData: Data;
  busData: Data;
  colors: string[]; // Graphing colors array
  options: any; // Graphing options
  rsvp: number; // Stats - # of RSVP
  applicationCount: number;
  averageWordCount: any;
}

export default Vue.extend({
  name: 'Stats',
  data(): StatsData {
    const colorRef = [
      '#E31836',
      '#83002C',
      '#004C9B',
      '#FDD54F',
      '#4F2682',
      '#63a832',
      '#e0932f',
      '#FF6633',
      '#FFB399',
      '#FF33FF',
      '#FFFF99',
      '#00B3E6',
      '#E6B333',
      '#3366E6',
      '#999966',
      '#99FF99',
      '#B34D4D',
      '#80B300',
      '#809900',
      '#E6B3B3',
      '#6680B3',
      '#66991A',
      '#FF99E6',
      '#CCFF1A',
      '#FF1A66',
      '#E6331A',
      '#33FFCC',
      '#66994D',
      '#B366CC',
      '#4D8000',
      '#B33300',
      '#CC80CC',
      '#66664D',
      '#991AFF',
      '#E666FF',
      '#4DB3FF',
      '#1AB399',
      '#E666B3',
      '#33991A',
      '#CC9999',
      '#B3B31A',
      '#00E680',
      '#4D8066',
      '#809980',
      '#E6FF80',
      '#1AFF33',
      '#999933',
      '#FF3380',
      '#CCCC00',
      '#66E64D',
      '#4D80CC',
      '#9900B3',
      '#E64D66',
      '#4DB380',
      '#FF4D4D',
      '#99E6E6',
      '#6666FF',
    ];
    return {
      decisions: {
        accepted: 0,
        pending: 0,
        overflow: 0,
        round1: 0,
        round2: 0,
        round3: 0,
        round4: 0,
        round5: 0,
        rejected: 0,
      },
      statistics: {
        decisions: {
          accepted: 0,
          pending: 0,
          overflow: 0,
          round1: 0,
          round2: 0,
        },
        rsvp: 0,
        checkedIn: 0,
        mentors: 0,
      },
      applicationCount: 0,
      mentors: 0,
      sponsors: 0,
      checkedIn: 0,
      walkins: 0,
      bus_passengers: 0,
      averageWordCount: {},
      pickups: {
        'University of Waterloo': 0,
        'University of Toronto': 0,
        'University of Western Ontario': 0,
      },
      submitted: 0,
      inProgress: 0,
      data: {
        labels: ['Accepted', 'Rejected', 'Pending'],
        datasets: [
          {
            label: 'Applicant Distribution',
            backgroundColor: colorRef,
            data: [20, 30, 60],
          },
        ],
      },
      checkInData: {
        labels: ['Checked In', 'Not Checked In'],
        datasets: [
          {
            label: 'Applicant Distribution',
            backgroundColor: colorRef,
            data: [40, 60],
          },
        ],
      },
      ageData: {
        labels: ['18', '19', '20', '21', '22', '23+'],
        datasets: [
          {
            label: 'Age Distribution',
            backgroundColor: colorRef,
            data: [70, 160, 200, 125, 90, 50],
          },
        ],
      },
      busData: {
        labels: ['Toronto', 'Waterloo', 'London', 'Montreal', 'None'],
        datasets: [
          {
            label: 'Number of Students Per Bus',
            backgroundColor: colorRef,
            data: [60, 120, 25, 34, 200],
          },
        ],
      },
      colors: colorRef,
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
      rsvp: 0,
    };
  },
  components: {
    Navbar,
    IOdometer,
    BasicBarChart,
    BasicPieChart,
    // ApexChart,
  },
  async beforeMount() {
    (this as any).statistics = await (this as any).getStatistics();
    // this.setAllData();
    (this as any).setCheckInData();
    (this as any).countApplications();
    (this as any).countWords();
    db
      .collection('DH6')
      .doc('statistics')
      .onSnapshot((doc: DocumentSnapshot) => {
        if (doc.exists) {
          (this as any).statistics = doc.data();
          // this.setAllData();
        }
      });
    // this.initAgeChart();
  },
  computed: {
    numHackathons() {
      return formatChartData(this, ['statistics', 'applicationStats', 'hackathons']);
    },
    universities() {
      return formatChartData(this, ['statistics', 'applicationStats', 'universities'], { sort: true, limit: 10 });
    },
    majors() {
      return formatChartData(this, ['statistics', 'applicationStats', 'majors'], { sort: true, limit: 10 });
    },
    schoolYears() {
      return formatChartData(this, ['statistics', 'applicationStats', 'school_years'], { sort: true });
    },
    shirtSizes() {
      return formatChartData(this, ['statistics', 'applicationStats', 'shirt_sizes'], { sort: true });
    },
    discoveredBy() {
      return formatChartData(this, ['statistics', 'applicationStats', 'discovery'], { sort: true });
    },
    dietaryRestrictions() {
      return formatChartData(this, ['statistics', 'applicationStats', 'dietary_restrictions'], { sort: true, limit: 10 });
    },
    comingFrom() {
      return formatChartData(this, ['statistics', 'applicationStats', 'travelling_from'], { sort: true });
    },
    workshops() {
      return formatChartData(this, ['statistics', 'applicationStats', 'workshops'], { sort: true });
    },
    averageWords() {
      return formatChartData(this, ['averageWordCount'], { sort: true });
    },
  },
  // computed: {
  //   total(): number {
  //     const { accepted, rejected, pending } = this.decisions;
  //     return accepted + rejected! + pending;
  //   },
  //   pending(): number {
  //     return this.inProgress - this.submitted;
  //   },
  //   accepted(): number {
  //     const {
  //       round1, round2, round3, round4, round5,
  //     } = this.decisions;
  //     return round1! + round2! + round3! + round4! + round5!;
  //   },
  //   safeCheckIn(): number {
  //     console.log(this.checkedIn, this.mentors, this.sponsors);
  //     return this.checkedIn - this.mentors - this.sponsors;
  //   },
  // },
  methods: {
    setCheckInData() {
      db.collection('DH6')
        .doc('statistics')
        .onSnapshot((doc) => {
          (this as any).mentors = doc.data()!.mentors;
        });
      // db.collection('hackathon')
      //   .doc('DH5')
      //   .collection('Checked In')
      //   .onSnapshot((snap) => {
      //     this.checkedIn = snap.docs.length;
      //   });
      // db.collection('hackathon')
      //   .doc('DH5')
      //   .collection('Sponsors')
      //   .onSnapshot((snap) => {
      //     this.sponsors = snap.docs.length;
      //   });
      // db.collection('hackathon')
      //   .doc('DH5')
      //   .collection('Walkins')
      //   .onSnapshot((snap) => {
      //     this.walkins = snap.docs.length;
      //   });
    },
    countApplications() {
      db.collection('DH6').doc('applications').collection('all').get()
        .then((snap) => {
          (this as any).applicationCount = snap.size;
        });
    },
    async countWords() {
      try {
        let totalWordsQ1 = 0;
        let totalWordsQ2 = 0;
        let totalWordsQ3 = 0;
        let totalWordsAnythingElse = 0;
        let totalSubmitted = 0;
        const ref = await db.collection('DH6').doc('applications').collection('all').get();
        for (let i = 0; i < ref.size; i++) {
          const object = ref.docs[i];
          const subset = (({ _document }) => ({ _document }))(object); // Destructure the object
          if (subset._document.proto.fields._.mapValue.fields.status.stringValue === 'submitted') {
            // Extracting Q1 String then counting words
            totalWordsQ1 += (this as any).splitWord(subset._document.proto.fields.responses.mapValue.fields.q1.stringValue);
            totalWordsQ2 += (this as any).splitWord(subset._document.proto.fields.responses.mapValue.fields.q2.stringValue);
            totalWordsQ3 += (this as any).splitWord(subset._document.proto.fields.responses.mapValue.fields.q3.stringValue);
            totalWordsAnythingElse += (this as any).splitWord(subset._document.proto.fields.responses.mapValue.fields.anything_else.stringValue);
            totalSubmitted += 1;
          }
        }
        (this as any).averageWordCount = {
          'Question 1': Math.round(totalWordsQ1 / totalSubmitted),
          'Question 2': Math.round(totalWordsQ2 / totalSubmitted),
          'Question 3': Math.round(totalWordsQ3 / totalSubmitted),
          'Anything Else': Math.round(totalWordsAnythingElse / totalSubmitted),
        };
      } catch (err) {
        console.error(err);
      }
    },
    splitWord(str) {
      return str.split(' ').length;
    },
    // async getRSVP() {
    //   return new Promise(async (resolve, reject) => {
    //     const snap = await db.collection('hackathon')
    //       .doc('DH5')
    //       .collection('RSVP')
    //       .doc('all')
    //       .collection('Yes')
    //       .get();

    //     const out = {};
    //     snap.docs.forEach((doc) => {
    //       const data = doc.data();
    //       out[data.email] = true;
    //       resolve(out);
    //     });
    //   });
    // },
    // setAllData() {
    // this.setDecisionListeners();
    // this.setCheckedInGraph();
    // this.setMiscStatistics();
    // this.setRSVPData();
    // },
    // initAgeChart() {
    //   db.collection('applications')
    //     .doc('DH5')
    //     .collection('submitted')
    //     .onSnapshot((snap) => {
    //       this.updateAgeData(snap);
    //     });
    // },
    // parseDateField(date: string): Date {
    //   const day = date.slice(0, 2);
    //   const month = date.slice(2, 4);
    //   const year = date.slice(4, date.length);
    //   const parsed = `${month}/${day}/${year}`;
    //   return new Date(parsed);
    // },
    // createDate(current, year): Date {
    //   return new Date(current.setFullYear(year));
    // },
    // updateAgeData(snap) {
    //   const ages = {
    //     '18-': 0,
    //     19: 0,
    //     20: 0,
    //     21: 0,
    //     22: 0,
    //     23: 0,
    //     '24+': 0,
    //   };
    //   snap.docs.forEach((doc) => {
    //     const data = doc.data();
    //     const birthday = this.parseDateField(data.birthday);
    //     ages[this.getAgeFromDate(birthday)] += 1;
    //   });
    //   this.setAgePanels(ages);
    // },
    // getAgeFromDate(bday): string {
    //   const current = new Date();
    //   if (bday > this.createDate(current, current.getFullYear() - 19)) {
    //     return '18-';
    //   }
    //   if (bday > this.createDate(current, current.getFullYear() - 1)) {
    //     return '19';
    //   }
    //   if (bday > this.createDate(current, current.getFullYear() - 1)) {
    //     return '20';
    //   }
    //   if (bday > this.createDate(current, current.getFullYear() - 1)) {
    //     return '21';
    //   }
    //   if (bday > this.createDate(current, current.getFullYear() - 1)) {
    //     return '22';
    //   }
    //   if (bday > this.createDate(current, current.getFullYear() - 1)) {
    //     return '23';
    //   }
    //   return '24+';
    // },
    // async setAgePanels(data) {
    //   // const { data } = await this.getAgeData();
    //   (this.$refs.ages as any).changeData({
    //     labels: ['18', '19', '20', '21', '22', '23+'],
    //     datasets: [
    //       {
    //         label: 'Age Distribution (All)',
    //         backgroundColor: this.colors,
    //         data: Object.values(data),
    //       },
    //     ],
    //   });
    // },
    // for updating statistics with accepted info, careful about overriding.
    // async setAcceptedStats(data) {
    //   const snap = await db.collection('statistics')
    //     .doc('DH5')
    //     .get();

    //   const current = snap.data();
    //   Object.keys(data).forEach((key) => {
    //     current!.applicationStats[key] = data[key];
    //   });
    // console.log(current);
    // db.collection('statistics').doc('DH5').set(current);
    // },
    // for updating statistics, not used in standard page.
    processApplication(stats, app) {
      const safeAdd = (obj, section, index) => {
        if (!obj[section]) obj[section] = {};
        if (obj[section][index]) obj[section][index]++;
        else obj[section][index] = 1;
      };
      safeAdd(stats, 'hackathons_accepted', app.hackathons);
      safeAdd(stats, 'gender_accepted', app.gender);
      // safeAdd(stats, 'gender', app.gender);
    },
    aggregateAccepted(obj, snap) {
      snap.docs.forEach((doc) => {
        const data = doc.data();
        obj[data.email] = true;
      });
    },
    // async setDecisionListeners(init = false) {
    //   const info = {};
    // db.collection('decisions').doc('DH5').collection('round1')
    //   .onSnapshot((snap) => {
    //     this.decisions.round1 = snap.docs.length;
    //     this.setDecisionPanels();
    //   });
    // db.collection('applications')
    //   .doc('DH5')
    //   .collection('submitted')
    //   .onSnapshot((snap) => {
    //     this.submitted = snap.docs.length;
    //   });
    // db.collection('decisions').doc('DH5').collection('round2')
    //               .onSnapshot((snap) => {
    //                   this.decisions.round2 = snap.docs.length;
    //                   this.setDecisionPanels();
    //               });
    // db.collection('decisions').doc('DH5').collection('round3')
    //   .onSnapshot((snap) => {
    //     console.log(snap.docs.length);
    //     this.decisions.round3 = snap.docs.length;
    //     this.setDecisionPanels();
    //   });
    // db.collection('decisions').doc('DH5').collection('round4')
    //               .onSnapshot((snap) => {
    //                   this.decisions.round4 = snap.docs.length;
    //                   this.setDecisionPanels();
    //               });
    // db.collection('decisions').doc('DH5').collection('round5')
    //               .onSnapshot((snap) => {
    //                   this.decisions.round5 = snap.docs.length;
    //                   this.setDecisionPanels();
    //               });
    //   await db
    //     .collection('decisions')
    //     .doc('DH5')
    //     .collection('pending')
    //     .onSnapshot((snap) => {
    //       this.aggregateAccepted(info, snap);
    //     });
    //   db.collection('decisions')
    //     .doc('DH5')
    //     .collection('actually rejected')
    //     .onSnapshot((snap) => {
    //       this.decisions.rejected = snap.docs.length;
    //       this.aggregateAccepted(info, snap);
    //       this.setDecisionPanels();
    //     });
    // },
    // setRSVPData() {
    //   db.collection('hackathon')
    //     .doc('DH5')
    //     .collection('RSVP')
    //     .doc('all')
    //     .collection('Yes')
    //     .onSnapshot((snap) => {
    //       this.rsvp = snap.docs.length;
    //       // set rsvp data.
    //       this.bus_passengers = 0;
    //       this.pickups = {
    //         'University of Waterloo': 0,
    //         'University of Toronto': 0,
    //         'University of Western Ontario': 0,
    //       };
    //       snap.docs.forEach((doc: DocumentSnapshot) => {
    //         const current = doc.data();
    //         if (current && current.bus) {
    //           this.bus_passengers += 1;
    //           this.pickups[current.location] += 1;
    //         }
    //       });
    //       this.redrawRSVP();
    //     });
    // },
    // redrawRSVP() {
    //   (this.$refs.bus_locations as any).changeData({
    //     labels: ['U of Waterloo', 'U of Toronto', 'U of Western'],
    //     datasets: [
    //       {
    //         label: 'Bus Location Distribution',
    //         backgroundColor: this.colors,
    //         data: [
    //           this.pickups['University of Waterloo'],
    //           this.pickups['University of Toronto'],
    //           this.pickups['University of Western Ontario'],
    //         ],
    //       },
    //     ],
    //   });
    // },
    // setDecisionPanels() {
    //   (this.$refs.decisions as any).changeData({
    //     labels: ['Accepted', 'Overflow'],
    //     datasets: [
    //       {
    //         label: 'Applicant Distribution',
    //         backgroundColor: this.colors,
    //         data: [this.accepted, this.decisions.overflow],
    //       },
    //     ],
    //   });
    // },
    apexProcessField(field, label) {
      const val = Object.values(field);
      return {
        labels: Object.keys(field),
        datasets: [
          {
            label,
            backgroundColor: (this as any).colors,
            data: val,
          },
        ],
      };
    },
    getStatistics() {
      const ref = db.collection('DH6').doc('statistics');
      return new Promise(async (resolve, reject) => {
        const snap = await ref.get().catch(err => reject(err));
        if (snap) {
          resolve(snap.data());
        } else {
          resolve('');
        }
      });
    },
    processField(field, label) {
      const val = Object.values(field);
      return {
        labels: Object.keys(field),
        datasets: [
          {
            label,
            backgroundColor: (this as any).colors,
            data: val,
          },
        ],
      };
    },
  },
});
</script>

<style scoped>
</style>
