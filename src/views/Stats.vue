<template>
    <v-app class='dashboard'>
        <Navbar/>
        <v-container fluid grid-list-md>
            <v-layout row wrap>
              <h3>Summary</h3>
            </v-layout>
            <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md2>
                    <v-card color='white lighten-4' >
                        <v-card-title primary-title>Accepted Applications</v-card-title>
                        <v-card color='white lighten-4' dark>
                                <v-card-text class='totalapps center'>
                                    <IOdometer class='iOdometer' :value="statistics.decisions.accepted" />
                                </v-card-text>
                            </v-card>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md2>
                    <v-card color='white lighten-4' >
                        <v-card-title primary-title>Rejected Applications</v-card-title>
                        <v-card color='white lighten-4' dark>
                                <v-card-text class='totalapps center'>
                                    <IOdometer class='iOdometer' :value="statistics.decisions.rejected" />
                                </v-card-text>
                            </v-card>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md2>
                    <v-card color='white lighten-4' >
                        <v-card-title primary-title>Pending Applications</v-card-title>
                        <v-card color='white lighten-4' dark>
                                <v-card-text class='totalapps center'>
                                    <IOdometer class='iOdometer' :value="statistics.decisions.pending" />
                                </v-card-text>
                            </v-card>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md2>
                    <v-card color='white lighten-4' >
                        <v-card-title primary-title>RSVP</v-card-title>
                        <v-card color='white lighten-4' dark>
                                <v-card-text class='totalapps center'>
                                    <IOdometer class='iOdometer' :value="statistics.rsvp" />
                                </v-card-text>
                            </v-card>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md2>
                    <v-card color='white lighten-4' >
                        <v-card-title primary-title>Checked In</v-card-title>
                        <v-card color='white lighten-4' dark>
                                <v-card-text class='totalapps center'>
                                    <IOdometer class='iOdometer' :value="statistics.checkedIn" />
                                </v-card-text>
                            </v-card>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md2>
                    <v-card color='white lighten-4' >
                        <v-card-title primary-title>Total Applications</v-card-title>
                        <v-card color='white lighten-4' dark>
                                <v-card-text class='totalapps center'>
                                    <IOdometer class='iOdometer' :value="total" />
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
                        <pie-chart ref="decisions" :data='data' :options='options'/>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md3>
                    <v-card color='white lighten-4' dark>
                        <pie-chart ref="checkedIn" :data='checkInData' :options='options'/>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md3>
                    <v-card color='white lighten-4' dark>
                        <bar-chart ref="ages" :data='ageData' :options='options'/>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md3>
                    <v-card color='white lighten-4' dark>
                        <bar-chart :data='busData' :options='options'/>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md3>
                    <v-card color='white lighten-4' dark>
                        <bar-chart ref="hackathons" :data='busData' :options='options'/>
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
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import db from '../private/firebase_init';
import { allUniversities } from '../private/data';

export default {
  name: 'Stats',
  data() {
    return {
      test: [50, 25, 25],
      statistics: {
        decisions: {
          accepted: 0,
          pending: 0,
          rejected: 0,
        },
        rsvp: 0,
        checkedIn: 0,
        mentors: 0,
      },
      data: {
        labels: ['Accepted', 'Rejected', 'Pending'],
        datasets: [
          {
            label: 'Applicant Distribution',
            backgroundColor: ['#E31836', '#83002C', '#004C9B'],
            data: [20, 30, 60],
          },
        ],
      },
      checkInData: {
        labels: ['Checked In', 'Not Checked In'],
        datasets: [
          {
            label: 'Applicant Distribution',
            backgroundColor: ['#004C9B', '#83002C'],
            data: [40, 60],
          },
        ],
      },
      ageData: {
        labels: ['18', '19', '20', '21', '22', '23+'],
        datasets: [
          {
            label: 'Age Distribution',
            backgroundColor: [
              '#E31836',
              '#83002C',
              '#004C9B',
              '#FDD54F',
              '#4F2682',
              '#41cdf4',
            ],
            data: [70, 160, 200, 125, 90, 50],
          },
        ],
      },
      busData: {
        labels: ['Toronto', 'Waterloo', 'London', 'Montreal', 'None'],
        datasets: [
          {
            label: 'Number of Students Per Bus',
            backgroundColor: [
              '#E31836',
              '#83002C',
              '#004C9B',
              '#FDD54F',
              '#4F2682',
            ],
            data: [60, 120, 25, 34, 200],
          },
        ],
      },
      colors: [
              '#E31836',
              '#83002C',
              '#004C9B',
              '#FDD54F',
              '#4F2682',
              '#63a832',
              '#e0932f'
            ],
      options: {},
    };
  },
  components: {
    Navbar,
    Footer,
    IOdometer,
    PieChart,
    BarChart,
  },
  async beforeMount() {
    this.statistics = await this.getStatistics();
    this.setDecisionPanels();
    // this.setAgePanels();
    this.setCheckedInGraph();
    this.setHackathonTable();
  },
  computed: {
    total() {
      const { accepted, rejected, pending } = this.statistics.decisions;
      return accepted + rejected + pending;
    },
  },
  methods: {
    changeData(chart, data) {
      chart.data.datasets = data;
    },
    setCheckedInGraph() {
      this.$refs.checkedIn.changeData({
        labels: ['Checked In', 'Not Checked In'],
        datasets: [
          {
            label: 'Applicant Distribution',
            backgroundColor: ['#004C9B', '#83002C'],
            data: [this.statistics.checkedIn, this.total - this.statistics.checkedIn],
          },
        ],
      });
    },
    getAgeData() {
      return db.collection('applications').doc('DH5_Test').collection('submitted').get()
      .then((snap) => {
        const ages = {'18-': 0, '19': 0, '20': 0, '21': 0, '22': 0, '23': 0, '24+': 0};
        snap.docs.forEach((doc) => {

        });
        return { data: ages };
      })
      .catch(err => console.log(err));
    },
    async setAgePanels() {
      const ages = await this.getAgeData();
      console.log(ages);
      this.$refs.ages.changeData({
        labels: ['18', '19', '20', '21', '22', '23+'],
        datasets: [
          {
            label: 'Age Distribution',
            backgroundColor: [
              '#E31836',
              '#83002C',
              '#004C9B',
              '#FDD54F',
              '#4F2682',
              '#41cdf4',
            ],
            data: [70, 160, 200, 125, 90, 50],
          },
        ],
      });
    },
    setDecisionPanels() {
      this.$refs.decisions.changeData({
        labels: ['Accepted', 'Rejected', 'Pending'],
        datasets: [
          {
            label: 'Applicant Distribution',
            backgroundColor: ['#E31836', '#83002C', '#004C9B'],
            data: [this.statistics.decisions.accepted, this.statistics.decisions.rejected, this.statistics.decisions.pending],
          },
        ],
      });
    },
    getStatistics() {
      const ref = db.collection('statistics').doc('DH5');
      return new Promise(async (resolve, reject) => {
        const snap = await ref.get().catch(err => reject(err));
        resolve(snap.data());
      });
    },
    setHackathonTable() {
      this.$refs.hackathons.changeData(
        this.processField(this.statistics.applicationStats.hackathons, 'Hackathons')
      );
    },
    processField(field, label) {
      const val = Object.values(field)
      return {
        labels: Object.keys(field),
        backgroundColor: this.colors.slice(0, val.length),
        datasets: [
          {
            label,
            data: val,
          },
        ],
      }
    }
  },
};
</script>

<style scoped>
</style>
