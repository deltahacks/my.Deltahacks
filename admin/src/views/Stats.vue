<template>
  <v-app class='dashboard'>
    <Navbar/>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <h3>Summary</h3>
      </v-layout>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md2>
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
            <v-card-title primary-title>Overflow Applications</v-card-title>
            <v-card color='white lighten-4' dark>
              <v-card-text class='totalapps center'>
                <IOdometer class='iOdometer' :value='decisions.overflow' />
              </v-card-text>
            </v-card>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md2>
          <v-card color='white lighten-4'>
            <v-card-title primary-title>Pending Applications</v-card-title>
            <v-card color='white lighten-4' dark>
              <v-card-text class='totalapps center'>
                <IOdometer class='iOdometer' :value='pending' />
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
        </v-flex>
        <v-flex d-flex xs12 sm6 md2>
          <v-card color='white lighten-4'>
            <v-card-title primary-title>Checked In</v-card-title>
            <v-card color='white lighten-4' dark>
              <v-card-text class='totalapps center'>
                <IOdometer class='iOdometer' :value='statistics.checkedIn' />
              </v-card-text>
            </v-card>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md2>
          <v-card color='white lighten-4'>
            <v-card-title primary-title>RSVP</v-card-title>
            <v-card color='white lighten-4' dark>
              <v-card-text class='totalapps center'>
                <IOdometer class='iOdometer' :value='rsvp' />
              </v-card-text>
            </v-card>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <h3>Distribution</h3>
      </v-layout>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md3 child-flex>
          <v-card color='white lighten-4' dark>
            <pie-chart ref='decisions' :data='data' :options='options' />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color='white lighten-4' dark>
            <bar-chart ref="ages" :options='options' />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color='white lighten-4' dark>
            <pie-chart ref='universities' :options='options' />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color='white lighten-4' dark>
            <bar-chart ref='hackathons' :options='options' />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color='white lighten-4' dark>
            <bar-chart ref='majors' :options='options' />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color='white lighten-4' dark>
            <bar-chart ref='schoolYears' :options='options' />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color='white lighten-4' dark>
            <bar-chart ref='shirt_sizes' :options='options' />
          </v-card>
        </v-flex>
        <!-- <v-flex d-flex xs12 sm6 md3>
          <v-card color='white lighten-4' dark>
            <pie-chart ref='universities' :options='options' />
          </v-card>
        </v-flex> -->
        <v-flex d-flex xs12 sm6 md3>
          <v-card color='white lighten-4' dark>
            <bar-chart ref='diets' :options='options' />
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model='loading' persistent width='300'>
      <v-card color='primary' dark>
        <v-card-text>
          {{loadingMessage}}
          <v-progress-linear indeterminate color='white' class='mb-0'></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>


<script>
import firebase from 'firebase';
import IOdometer from 'vue-odometer';
import functions from 'firebase/functions';
import fake from '@/helpers/fake';
// import Typed from 'typed.js';
import PieChart from '@/components/PieChartGen';
import BarChart from '@/components/BarChart';
import ApexChart from '@/components/ApexBar.vue';
import Navbar from '@/components/Navbar.vue';
import db from '../private/firebase_init';
import { allUniversities } from '../private/data';

export default {
  name: 'Stats',
  data() {
    return {
      test: [50, 25, 25],
      decisions: {
        accepted: 0,
        pending: 0,
        overflow: 0,
          round1: 0,
          round2: 0,
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
      submitted: 0,
      inProgress: 0,
      data: {
        labels: ['Accepted', 'Rejected', 'Pending'],
        datasets: [
          {
            label: 'Applicant Distribution',
            backgroundColor: this.colors,
            data: [20, 30, 60],
          },
        ],
      },
      checkInData: {
        labels: ['Checked In', 'Not Checked In'],
        datasets: [
          {
            label: 'Applicant Distribution',
            backgroundColor: this.colors,
            data: [40, 60],
          },
        ],
      },
      ageData: {
        labels: ['18', '19', '20', '21', '22', '23+'],
        datasets: [
          {
            label: 'Age Distribution',
            backgroundColor: this.colors,
            data: [70, 160, 200, 125, 90, 50],
          },
        ],
      },
      busData: {
        labels: ['Toronto', 'Waterloo', 'London', 'Montreal', 'None'],
        datasets: [
          {
            label: 'Number of Students Per Bus',
            backgroundColor: this.colors,
            data: [60, 120, 25, 34, 200],
          },
        ],
      },
      colors: ['#E31836', '#83002C', '#004C9B', '#FDD54F', '#4F2682', '#63a832', '#e0932f'],
      options: {},
      rsvp: 0,
    };
  },
  components: {
    Navbar,
    IOdometer,
    PieChart,
    BarChart,
    ApexChart,
  },
  async beforeMount() {
    this.statistics = await this.getStatistics();
    this.setAllData();

    db
      .collection('statistics')
      .doc('DH5')
      .onSnapshot((doc) => {
        console.log(doc.data());
        if (doc.exists) {
          this.statistics = doc.data();
          this.setAllData();
        }
      });
    this.initAgeChart();
  },
  computed: {
    total() {
      const { accepted, rejected, pending } = this.decisions;
      return accepted + rejected + pending;
    },
    pending() {
      return this.inProgress - this.submitted;
    },
    accepted() {
      const { round1, round2 } = this.decisions;
      return round1 + round2;
    },
  },
  methods: {
    setAllData() {
      this.setDecisionListeners();
      // this.setCheckedInGraph();
      this.setMiscStatistics();
      this.setRSVPData();
    },
    setCheckedInGraph() {
      this.$refs.checkedIn.changeData({
        labels: ['Checked In', 'Not Checked In'],
        datasets: [
          {
            label: 'Applicant Distribution',
            backgroundColor: this.colors,
            data: [this.statistics.checkedIn, this.total - this.statistics.checkedIn],
          },
        ],
      });
    },
    // setCheckedInGraph() {
    //   this.$refs.checkedIn.changeData({
    //     labels: ['Checked In', 'Not Checked In'],
    //     datasets: [
    //       {
    //         label: 'Applicant Distribution',
    //         backgroundColor: this.colors,
    //         data: [
    //           this.statistics.checkedIn,
    //           this.total - this.statistics.checkedIn,
    //         ],
    //       },
    //     ],
    //   });
    // },
    initAgeChart() {
      db.collection('applications').doc('DH5').collection('submitted').onSnapshot((snap) => {
        this.updateAgeData(snap);
      });
    },
    parseDateField(date) {
      const day = date.slice(0, 2);
      const month = date.slice(2, 4);
      const year = date.slice(4, date.length);
      const parsed = `${month}/${day}/${year}`;
      return new Date(parsed);
    },
    createDate(current, year) {
      const out = new Date(current.setFullYear(year));
      return out;
    },
    updateAgeData(snap) {
      const ages = {
        '18-': 0,
        19: 0,
        20: 0,
        21: 0,
        22: 0,
        23: 0,
        '24+': 0,
      };
      snap.docs.forEach((doc) => {
        const data = doc.data();
        const birthday = this.parseDateField(data.birthday);
        ages[this.getAgeFromDate(birthday)] += 1;
      });
      this.setAgePanels(ages);
    },
    parseDateField(date) {
      const day = date.slice(0, 2);
      const month = date.slice(2, 4);
      const year = date.slice(4, date.length);
      const parsed = `${month}/${day}/${year}`;
      return new Date(parsed);
    },
    getAgeFromDate(bday) {
      const current = new Date();
      if (bday > this.createDate(current, current.getFullYear() - 19)) {
        return '18-';
      } else if (bday > this.createDate(current, current.getFullYear() - 1)) {
        return '19';
      } else if (bday > this.createDate(current, current.getFullYear() - 1)) {
        return '20';
      } else if (bday > this.createDate(current, current.getFullYear() - 1)) {
        return '21';
      } else if (bday > this.createDate(current, current.getFullYear() - 1)) {
        return '22';
      } else if (bday > this.createDate(current, current.getFullYear() - 1)) {
        return '23';
      }
      return '24+';
    },
    async setAgePanels(data) {
      // const { data } = await this.getAgeData();
      this.$refs.ages.changeData({
        labels: ['18', '19', '20', '21', '22', '23+'],
        datasets: [
          {
            label: 'Age Distribution',
            backgroundColor: this.colors,
            data: Object.values(data),
          },
        ],
      });
    },
    setDecisionListeners(init = false) {
      db.collection('decisions').doc('DH5').collection('round1')
                    .onSnapshot((snap) => {
                        this.decisions.round1 = snap.docs.length;
                        this.setDecisionPanels();
                    });
      db.collection('decisions').doc('DH5').collection('overflow')
                    .onSnapshot((snap) => {
                        this.decisions.overflow = snap.docs.length;
                        this.setDecisionPanels();
                    });
      db.collection('applications').doc('DH5').collection('submitted')
                    .onSnapshot((snap) => {
                      console.log(snap.docs.length);
                        this.submitted = snap.docs.length;
                    });
      db.collection('applications').doc('DH5').collection('in progress')
                    .onSnapshot((snap) => {
                      console.log(snap.docs.length);
                      this.inProgress = snap.docs.length;
                    });
      db.collection('decisions').doc('DH5').collection('round2')
                    .onSnapshot((snap) => {
                        this.decisions.round2 = snap.docs.length;
                        this.setDecisionPanels();
                    });
    },
    setRSVPData() {
      db.collection('hackathon').doc('DH5').collection('RSVP').doc('all')
        .collection('Yes')
        .onSnapshot((snap) => {
          this.rsvp = snap.docs.length;
        });
    },
    setDecisionPanels() {
      this.$refs.decisions.changeData({
        labels: ['Accepted', 'Overflow'],
        datasets: [
          {
            label: 'Applicant Distribution',
            backgroundColor: this.colors,
            data: [
              this.decisions.accepted,
              this.decisions.overflow,
            ],
          },
        ],
      });
    },
    setMiscStatistics() {
      this.filterData(this.statistics.applicationStats.universities);
      this.$refs.hackathons.changeData(this.processField(this.statistics.applicationStats.hackathons, 'Hackathons'));
      this.$refs.majors.changeData(this.processField(this.filterData(this.statistics.applicationStats.majors), 'Majors'));
      this.$refs.schoolYears.changeData(this.processField(this.statistics.applicationStats.schoolYears, 'School Years'));
      this.$refs.shirt_sizes.changeData(this.processField(this.statistics.applicationStats.shirt_sizes, 'Shirt Size'));
      // this.$refs.universities.changeData(this.statistics.applicationStats.universities);
      this.$refs.universities.changeData(this.processField(this.filterData(this.statistics.applicationStats.universities), 'Universities'));
    },
    // TODO: Improve the efficiency of this solution.
    filterData(data) {
      const N = 5; // Number of fields to show before collapsing into "Other"
      const values = Object.values(data);
      const keys = Object.keys(data);
      const out = {};
      let i = 0;
      while (i < N) {
        const mindex = values.indexOf(Math.max(...values));
        out[keys[mindex]] = values[mindex];
        values.splice(mindex, 1);
        keys.splice(mindex, 1);
        i++;
      }
      out.Other = 0;
      values.forEach(value => out.Other += value);
      return out;
    },
    apexProcessField(field, label) {
      const val = Object.values(field);
      return {
        labels: Object.keys(field),
        datasets: [
          {
            label,
            backgroundColor: this.colors,
            data: val,
          },
        ],
      };
    },
    getStatistics() {
      const ref = db.collection('statistics').doc('DH5');
      return new Promise(async (resolve, reject) => {
        const snap = await ref.get().catch(err => reject(err));
        resolve(snap.data());
      });
    },
    processField(field, label) {
      const val = Object.values(field);
      return {
        labels: Object.keys(field),
        datasets: [
          {
            label,
            backgroundColor: this.colors,
            data: val,
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
</style>
