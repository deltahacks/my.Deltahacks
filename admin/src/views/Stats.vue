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
                <IOdometer class="iOdometer" :value="checkedIn" />
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
            <v-card-title primary-title>Judges</v-card-title>
            <v-card color="white lighten-4" dark>
              <v-card-text class="totalapps center">
                <IOdometer class="iOdometer" :value="judges" />
              </v-card-text>
            </v-card>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md2>
          <v-card color="white lighten-4">
            <v-card-title primary-title>Volunteers</v-card-title>
            <v-card color="white lighten-4" dark>
              <v-card-text class="totalapps center">
                <IOdometer class="iOdometer" :value="volunteers" />
              </v-card-text>
            </v-card>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md2>
          <v-card color="white lighten-4">
            <v-card-title primary-title>Executives</v-card-title>
            <v-card color="white lighten-4" dark>
              <v-card-text class="totalapps center">
                <IOdometer class="iOdometer" :value="execs" />
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
        <v-flex d-flex xs12 sm6 md2>
          <v-card color="white lighten-4">
            <v-card-title primary-title
              >Average Time to Submit (Hours)</v-card-title
            >
            <v-card color="white lighten-4" dark>
              <v-card-text class="totalapps center">
                <IOdometer class="iOdometer" :value="avgDaysToSubmit" />
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
            <basic-pie-chart
              :title="'Universities'"
              :categories="universities.categories"
              :data="universities.data"
              :colors="colors"
            />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color="white lighten-4" dark>
            <basic-bar-chart
              :title="'Hackathons (Accepted)'"
              :categories="numHackathons.categories"
              :data="numHackathons.data"
              :colors="colors"
            />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color="white lighten-4" dark>
            <basic-bar-chart
              :title="'Majors (Accepted)'"
              :categories="majors.categories"
              :data="majors.data"
              :colors="colors"
            />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color="white lighten-4" dark>
            <basic-bar-chart
              :title="'School Years (Accepted)'"
              :categories="schoolYears.categories"
              :data="schoolYears.data"
              :colors="colors"
            />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color="white lighten-4" dark>
            <basic-bar-chart
              :title="'Shirt Sizes (Accepted)'"
              :categories="shirtSizes.categories"
              :data="shirtSizes.data"
              :colors="colors"
            />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color="white lighten-4" dark>
            <basic-bar-chart
              :title="'Discovered By (All)'"
              :categories="discoveredBy.categories"
              :data="discoveredBy.data"
              :colors="colors"
            />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color="white lighten-4" dark>
            <basic-bar-chart
              :title="'Food Restrictions (Accepted)'"
              :categories="dietaryRestrictions.categories"
              :data="dietaryRestrictions.data"
              :colors="colors"
            />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color="white lighten-4" dark>
            <basic-bar-chart
              :title="'Locations'"
              :categories="comingFrom.categories"
              :data="comingFrom.data"
              :colors="colors"
            />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color="white lighten-4" dark>
            <basic-bar-chart
              :title="'Workshops (Accepted)'"
              :categories="workshops.categories"
              :data="workshops.data"
              :colors="colors"
            />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color="white lighten-4" dark>
            <basic-bar-chart
              :title="'Average Word Count for Responses'"
              :categories="averageWords.categories"
              :data="averageWords.data"
              :colors="colors"
            />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color="white lighten-4" dark>
            <basic-bar-chart
              :title="'RSVP Busses'"
              :categories="busPassengers.categories"
              :data="busPassengers.data"
              :colors="colors"
            />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
          <v-card color="white lighten-4" dark>
            <basic-bar-chart
              :title="'RSVP Shirt Sizes'"
              :categories="RSVPShirts.categories"
              :data="RSVPShirts.data"
              :colors="colors"
            />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm12 md12>
          <v-card color="white lighten-4" dark>
            <basic-bar-chart
              :title="'RSVP Dietary Restrictions'"
              :categories="RSVPDiets.categories"
              :data="RSVPDiets.data"
              :colors="colors"
            />
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="loading" persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          {{ loadingMessage }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script lang="ts">
import firebase from "firebase";
import IOdometer from "vue-odometer";

import functions from "firebase/functions";
import Vue from "vue";
import db from "../firebase_init";
import Navbar from "@/components/Navbar.vue";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChartGen";
import ApexChart from "@/components/ApexBar.vue";

import {formatChartData} from "../helpers/utils";

import BasicBarChart from "@/components/charts/BasicBar.vue";
import BasicPieChart from "@/components/charts/BasicPie.vue";

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
  judges: number;
  volunteers: number;
  execs: number;
  // eslint-disable-next-line camelcase
  bus_passengers: number; // Stats - # of bus passengers
  pickups: {[index: string]: number};
  rsvpShirts: {[index: string]: number};
  rsvpDiets: {[index: string]: number};
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
  avgDaysToSubmit: number;
}

export default Vue.extend({
  name: "Stats",
  data(): StatsData {
    const colorRef = [
      "#E31836",
      "#83002C",
      "#004C9B",
      "#FDD54F",
      "#4F2682",
      "#63a832",
      "#e0932f",
      "#FF6633",
      "#FFB399",
      "#FF33FF",
      "#FFFF99",
      "#00B3E6",
      "#E6B333",
      "#3366E6",
      "#999966",
      "#99FF99",
      "#B34D4D",
      "#80B300",
      "#809900",
      "#E6B3B3",
      "#6680B3",
      "#66991A",
      "#FF99E6",
      "#CCFF1A",
      "#FF1A66",
      "#E6331A",
      "#33FFCC",
      "#66994D",
      "#B366CC",
      "#4D8000",
      "#B33300",
      "#CC80CC",
      "#66664D",
      "#991AFF",
      "#E666FF",
      "#4DB3FF",
      "#1AB399",
      "#E666B3",
      "#33991A",
      "#CC9999",
      "#B3B31A",
      "#00E680",
      "#4D8066",
      "#809980",
      "#E6FF80",
      "#1AFF33",
      "#999933",
      "#FF3380",
      "#CCCC00",
      "#66E64D",
      "#4D80CC",
      "#9900B3",
      "#E64D66",
      "#4DB380",
      "#FF4D4D",
      "#99E6E6",
      "#6666FF",
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
      judges: 0,
      volunteers: 0,
      checkedIn: 0,
      execs: 0,
      walkins: 0,
      bus_passengers: 0,
      averageWordCount: {},
      avgDaysToSubmit: 0,
      pickups: {
        "Scarborough/York": 0,
        Waterloo: 0,
        Western: 0,
        UofT: 0,
      },
      rsvpShirts: {XS: 0, S: 0, M: 0, L: 0, XL: 0},
      rsvpDiets: {None: 0},
      submitted: 0,
      inProgress: 0,
      data: {
        labels: ["Accepted", "Rejected", "Pending"],
        datasets: [
          {
            label: "Applicant Distribution",
            backgroundColor: colorRef,
            data: [20, 30, 60],
          },
        ],
      },
      checkInData: {
        labels: ["Checked In", "Not Checked In"],
        datasets: [
          {
            label: "Applicant Distribution",
            backgroundColor: colorRef,
            data: [40, 60],
          },
        ],
      },
      ageData: {
        labels: ["18", "19", "20", "21", "22", "23+"],
        datasets: [
          {
            label: "Age Distribution",
            backgroundColor: colorRef,
            data: [70, 160, 200, 125, 90, 50],
          },
        ],
      },
      busData: {
        labels: ["Toronto", "Waterloo", "London", "Montreal", "None"],
        datasets: [
          {
            label: "Number of Students Per Bus",
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
    // this.setAllData();
    (this as any).dbref = await (this as any).getDB();
    (this as any).setCheckInData();
    (this as any).countApplications();
    (this as any).countWords();
    (this as any).avgSubmitTime();
    (this as any).countRSVP();
    db.collection(this.$store.state.currentHackathon)
      .doc("statistics")
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
      return formatChartData(this, [
        "statistics",
        "applicationStats",
        "hackathons",
      ]);
    },
    universities() {
      return formatChartData(
        this,
        ["statistics", "applicationStats", "universities"],
        {sort: true, limit: 10},
      );
    },
    majors() {
      return formatChartData(
        this,
        ["statistics", "applicationStats", "majors"],
        {sort: true, limit: 10},
      );
    },
    schoolYears() {
      return formatChartData(
        this,
        ["statistics", "applicationStats", "school_years"],
        {sort: true},
      );
    },
    shirtSizes() {
      return formatChartData(
        this,
        ["statistics", "applicationStats", "shirt_sizes"],
        {sort: true},
      );
    },
    discoveredBy() {
      return formatChartData(
        this,
        ["statistics", "applicationStats", "discovery"],
        {sort: true},
      );
    },
    dietaryRestrictions() {
      return formatChartData(
        this,
        ["statistics", "applicationStats", "dietary_restrictions"],
        {sort: true, limit: 10},
      );
    },
    comingFrom() {
      return formatChartData(
        this,
        ["statistics", "applicationStats", "travelling_from"],
        {sort: true},
      );
    },
    workshops() {
      return formatChartData(
        this,
        ["statistics", "applicationStats", "workshops"],
        {sort: true},
      );
    },
    averageWords() {
      return formatChartData(this, ["averageWordCount"], {sort: true});
    },
    busPassengers() {
      return formatChartData(this, ["pickups"], {sort: true});
    },
    RSVPShirts() {
      return formatChartData(this, ["rsvpShirts"], {sort: true});
    },
    RSVPDiets() {
      return formatChartData(this, ["rsvpDiets"], {sort: true});
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
      db.collection(this.$store.state.currentHackathon)
        .doc("hackathon")
        .collection("checked in")
        .where("type", "==", "mentor")
        .onSnapshot(snap => {
          (this as any).mentors = snap.docs.length;
        });
      db.collection(this.$store.state.currentHackathon)
        .doc("hackathon")
        .collection("checked in")
        .where("type", "==", "judge")
        .onSnapshot(snap => {
          (this as any).judges = snap.docs.length;
        });
      db.collection(this.$store.state.currentHackathon)
        .doc("hackathon")
        .collection("checked in")
        .where("type", "==", "volunteer")
        .onSnapshot(snap => {
          (this as any).volunteers = snap.docs.length;
        });
      db.collection(this.$store.state.currentHackathon)
        .doc("hackathon")
        .collection("checked in")
        .where("type", "==", "attendee")
        .onSnapshot(snap => {
          (this as any).checkedIn = snap.docs.length;
        });
      db.collection(this.$store.state.currentHackathon)
        .doc("hackathon")
        .collection("checked in")
        .where("type", "==", "sponsor")
        .onSnapshot(snap => {
          (this as any).sponsors = snap.docs.length;
        });
      db.collection(this.$store.state.currentHackathon)
        .doc("hackathon")
        .collection("checked in")
        .where("type", "==", "exec")
        .onSnapshot(snap => {
          (this as any).execs = snap.docs.length;
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
      (this as any).applicationCount = (this as any).dbref.length;
    },
    async countRSVP() {
      try {
        const ref = (this as any).dbref;
        for (let i = 0; i < ref.length; i++) {
          try {
            if (ref[i]._.RSVP && ref[i]._.RSVP.coming) {
              (this as any).rsvp += 1;
              (this as any).countBusPassengers(ref[i]);
              (this as any).countRSVPShirts(ref[i]);
              (this as any).countRSVPDiets(ref[i]);
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async countBusPassengers(app) {
      if (app._.RSVP.origin && !app._.RSVP.origin.includes("Not")) {
        (this as any).bus_passengers += 1;
        (this as any).pickups[app._.RSVP.origin] += 1;
      }
    },
    async countRSVPShirts(app) {
      (this as any).rsvpShirts[app.logistics.shirt_size] += 1;
    },
    async countRSVPDiets(app) {
      if (typeof app.logistics.diet_restrictions == "string") {
        const diet = app.logistics.diet_restrictions.toString();
        if ((this as any).rsvpDiets.hasOwnProperty(diet)) {
          (this as any).rsvpDiets[diet] += 1;
        } else {
          (this as any).rsvpDiets[diet] = 1;
        }
      }
    },
    async countWords() {
      try {
        let totalWordsQ1 = 0;
        let totalWordsQ2 = 0;
        let totalWordsQ3 = 0;
        let totalWordsAnythingElse = 0;
        let totalSubmitted = 0;
        const ref = (this as any).dbref;
        for (let i = 0; i < ref.length; i++) {
          if (ref[i]._.status === "submitted") {
            // Extracting Q1 String then counting words
            totalWordsQ1 += (this as any).splitWord(ref[i].responses.q1);
            totalWordsQ2 += (this as any).splitWord(ref[i].responses.q2);
            totalWordsQ3 += (this as any).splitWord(ref[i].responses.q3);
            totalWordsAnythingElse += (this as any).splitWord(
              ref[i].responses.anything_else,
            );
            totalSubmitted += 1;
          }
        }
        (this as any).averageWordCount = {
          "Question 1": Math.round(totalWordsQ1 / totalSubmitted),
          "Question 2": Math.round(totalWordsQ2 / totalSubmitted),
          "Question 3": Math.round(totalWordsQ3 / totalSubmitted),
          "Anything Else": Math.round(totalWordsAnythingElse / totalSubmitted),
        };
      } catch (err) {
        console.error(err);
      }
    },
    splitWord(str) {
      return str.split(" ").length;
    },
    async avgSubmitTime() {
      try {
        let avgTime = 0;
        let totalSubmitted = 0;
        const ref = (this as any).dbref;
        for (let i = 0; i < ref.length; i++) {
          if (ref[i]._.status === "submitted") {
            const timeInitiated = new Date(
              ref[i]._.time_initiated.seconds * 1000,
            );
            const timeSubmitted = new Date(
              ref[i]._.time_submitted.seconds * 1000,
            );
            avgTime +=
              (timeSubmitted.getTime() - timeInitiated.getTime()) /
              (1000 * 3600); // Converts ms to days
            totalSubmitted += 1;
          }
        }
        Number(
          ((this as any).avgDaysToSubmit = (avgTime / totalSubmitted).toFixed(
            2,
          )),
        );
      } catch (err) {
        console.error(err);
      }
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
      safeAdd(stats, "hackathons_accepted", app.hackathons);
      safeAdd(stats, "gender_accepted", app.gender);
      // safeAdd(stats, 'gender', app.gender);
    },
    aggregateAccepted(obj, snap) {
      snap.docs.forEach(doc => {
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
      const ref = db.collection(this.$store.state.currentHackathon).doc("statistics");
      return new Promise(async (resolve, reject) => {
        const snap = await ref.get().catch(err => reject(err));
        if (snap) {
          resolve(snap.data());
        } else {
          resolve("");
        }
      });
    },
    async getDB() {
      const apps: string[] = [];
      const ref = await db
        .collection(this.$store.state.currentHackathon)
        .doc("applications")
        .collection("all")
        .get();
      return ref.docs.map(doc => doc.data());
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

<style scoped></style>
