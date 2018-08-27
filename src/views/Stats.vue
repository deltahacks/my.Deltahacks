<template>
    <v-app class="dashboard">
        <Navbar/>
        <v-container fluid grid-list-md>
            <v-layout row wrap>
              <h3>Summary</h3>
            </v-layout>
            <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md2>
                    <v-card color="white lighten-4" >
                        <v-card-title primary-title>Accepted Applications</v-card-title>
                        <v-card color="white lighten-4" dark>
                                <v-card-text class="totalapps center">
                                    <IOdometer class="iOdometer" value=232 />
                                </v-card-text>
                            </v-card>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md2>
                    <v-card color="white lighten-4" >
                        <v-card-title primary-title>Rejected Applications</v-card-title>
                        <v-card color="white lighten-4" dark>
                                <v-card-text class="totalapps center">
                                    <IOdometer class="iOdometer" value=196 />
                                </v-card-text>
                            </v-card>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md2>
                    <v-card color="white lighten-4" >
                        <v-card-title primary-title>Pending Applications</v-card-title>
                        <v-card color="white lighten-4" dark>
                                <v-card-text class="totalapps center">
                                    <IOdometer class="iOdometer" value=540 />
                                </v-card-text>
                            </v-card>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md2>
                    <v-card color="white lighten-4" >
                        <v-card-title primary-title>RSVP</v-card-title>
                        <v-card color="white lighten-4" dark>
                                <v-card-text class="totalapps center">
                                    <IOdometer class="iOdometer" value=0 />
                                </v-card-text>
                            </v-card>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md2>
                    <v-card color="white lighten-4" >
                        <v-card-title primary-title>Checked In</v-card-title>
                        <v-card color="white lighten-4" dark>
                                <v-card-text class="totalapps center">
                                    <IOdometer class="iOdometer" value=0 />
                                </v-card-text>
                            </v-card>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md2>
                    <v-card color="white lighten-4" >
                        <v-card-title primary-title>Mentors</v-card-title>
                        <v-card color="white lighten-4" dark>
                                <v-card-text class="totalapps center">
                                    <IOdometer class="iOdometer" value=18 />
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
                    <v-card color="white lighten-4" dark>
                        <pie-chart :data="data" :options="options"/>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md3>
                    <v-card color="white lighten-4" dark>
                        <pie-chart :data="checkInData" :options="options"/>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md3>
                    <v-card color="white lighten-4" dark>
                        <bar-chart :data="ageData" :options="options"/>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md3>
                    <v-card color="white lighten-4" dark>
                        <bar-chart :data="busData" :options="options"/>
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


<script>
import firebase from 'firebase';
import IOdometer from 'vue-odometer';
// import Typed from 'typed.js';
import PieChart from '@/components/PieChartGen.js';
import BarChart from '@/components/BarChart.js';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import db from '../private/firebase_init';
import { allUniversities } from '../private/data';
import fake from '@/helpers/fake';
import functions from 'firebase/functions';
export default {
    name: 'Stats',
    data() {
        return {
          test: [50,25,25],
          data: {
            labels: ['Accepted', 'Rejected', 'Pending'],
            datasets: [
              {
                label: 'Applicant Distribution',
                backgroundColor: ['#E31836', '#83002C', '#004C9B'],
                data: [20, 30, 60],
              }
            ]
          },
          checkInData: {
            labels: ['Checked In', 'Not Checked In'],
            datasets: [
              {
                label: 'Applicant Distribution',
                backgroundColor: ['#004C9B', '#83002C'],
                data: [40, 60],
              }
            ]
          },
          ageData: {
            labels: ['18', '19', '20', '21', '22', '23+'],
            datasets: [
              {
                label: 'Age Distribution',
                backgroundColor: ['#E31836', '#83002C', '#004C9B','#FDD54F', '#4F2682', '#41cdf4'],
                data: [70, 160, 200, 125, 90, 50],
              },
            ]
          },
          busData: {
            labels: ['Toronto', 'Waterloo', 'London', 'Montreal', 'None'],
            datasets: [
              {
                label: 'Number of Students Per Bus',
                backgroundColor: ['#E31836', '#83002C', '#004C9B','#FDD54F', '#4F2682'],
                data: [60, 120, 25, 34, 200],
              },
            ]
          },
          options:{},
        };
    },
    components: {
        Navbar,
        Footer,
        IOdometer,
        PieChart,
        BarChart,
    },
    created() {

    },
    mounted() {
    },
    methods: {
      changeData() {
        this.data.datasets.data = [1,49,25,25]
      },
      getApplicationDistribution() {
      },
    },
};
</script>

<style scoped>

</style>
