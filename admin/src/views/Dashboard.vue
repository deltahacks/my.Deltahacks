<template>
  <v-app class="dashboard">
    <Navbar />
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md4>
          <v-card color="white lighten-4" dark>
            <GmapMap
              id="gmap"
              :center="{ lat: 43.6532, lng: -79.3832 }"
              :zoom="7"
              map-type-id="terrain"
            >
              <GmapMarker
                :key="index"
                v-for="(m, index) in positions.pos"
                :position="m"
                :title="positions.names[index].email"
                :clickable="true"
                :draggable="false"
                @click="center = m"
              />
            </GmapMap>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md2>
          <v-layout row wrap>
            <v-flex d-flex>
              <v-card color="white lighten-4" dark>
                <v-card-title primary class="title">
                  Total Submissions:
                </v-card-title>
                <v-card-text class="totalapps center">
                  <IOdometer class="iOdometer" :value="applicationCount" />
                </v-card-text>
              </v-card>
            </v-flex>
                 <v-flex d-flex>
              <v-card color="white lighten-4" dark>
                <v-card-title style="background-color:black"> 
                  <v-select
                  :items="universitiesMap"
                  label="Application by university"
                  item-text="name"
                  color="blue"
                  background-color="black"
                  v-model="selectedUniversity"
                  return-object
                ></v-select>
                </v-card-title>
                <v-card-text class="totalapps center">
                  <IOdometer class="iOdometer" :value="selectedUniversity.val" />
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex v-if="isAuthorizedReviewer">
          <v-card color="white lighten-4" dark>
            <v-card color="white lighten-4">
              <v-card-text primary class="title">Assigned Applications</v-card-text>
              <v-card-text>
                <IOdometer class="iOdometer" :value="assignedApplications" />
              </v-card-text>
            </v-card>
            <v-card color="white lighten-4" dark>
              <v-card-text primary class="title">Unmarked</v-card-text>
              <v-card-text>
                <IOdometer class="iOdometer" :value="unmarkedApplications" />
                <br>
                <br>
                {{secretMessage}}
              </v-card-text>
            </v-card>
            <v-card color="white lighten-4" dark>
              <v-card-text primary class="title">Marked</v-card-text>
              <v-card-text>
                <IOdometer class="iOdometer" :value="markedApplications" />
              </v-card-text>
            </v-card>
            <v-card color="white lighten-4" dark>
              <v-card-text primary class="title">Average Score</v-card-text>
              <v-card-text>
                <IOdometer class="iOdometer" :value="averageScore" />
              </v-card-text>
            </v-card>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3 child-flex v-else>
          <v-card color="white lighten-4" dark>
            <custom-angle-radial-chart :title="'Universities'" :categories="universities.categories" :data="universities.data" />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3 child-flex>
          <v-card color="white lighten-4" dark>
            <commit-chart />
          </v-card>
        </v-flex>
        <!-- <v-subheader class="ht">Applicants</v-subheader> -->
        <v-flex d-flex xs12 sm12 md12>
          <DataTable id="dataTable" />
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
/* eslint-disable no-restricted-syntax */
import IOdometer from 'vue-odometer';
import * as firebase from 'firebase/app';

import Vue from 'vue';
import db from '../firebase_init';
import Navbar from '@/components/Navbar.vue';
import PieChart from '../components/PieChart';
import PieChart2 from '../components/PieChartGen';
import DataTable from '@/components/DataTable.vue';
import CommitChart from '../components/CommitChart';

import CustomAngleRadialChart from '@/components/charts/CustomAngleRadial.vue';

import { formatChartData } from '../helpers/utils';

import { allUniversities } from '../data';

import 'firebase/functions';
import 'odometer/themes/odometer-theme-default.css';

interface DashboardData {
  page: number;
  apps: string;
  loading: boolean;
  allUniversities: any;
  applicationStats: any;
  applicationCount: number;
  loadingMessage: string;
  positions: { pos: any; names: any };
  links: string[];
  // eslint-disable-next-line camelcase
  c_user: any;
  colors: string[];
  debugFunctions: any;
  assignedApplications: number;
  unmarkedApplications: number;
  markedApplications: number;
  averageScore: number;
  secretMessage: string;
  isAuthorizedReviewer: boolean;
}

export default Vue.extend({
  name: 'Dashboard',
  data(): DashboardData {
    return {
      page: 3,
      apps: '245',
      loading: false,
      allUniversities,
      selectedUniversity: 0,
      applicationStats: {},
      applicationCount: 0,
      loadingMessage: 'Loading...',
      positions: { pos: [], names: [] },
      links: ['Home', 'About', 'Contact'],
      c_user: firebase.auth().currentUser,
      colors: [
        '#E31836',
        '#83002C',
        '#004C9B',
        '#FDD54F',
        '#4F2682',
        '#63a832',
        '#e0932f',
      ],
      debugFunctions: [
        {
          title: 'Index Apps',
          async execute() {
            try {
              console.log('Envoking firebase function...');
              const successfulIndex = await firebase
                .functions()
                .httpsCallable('indexApplications')({ adminKey: 1234 });
              console.log('Success!', successfulIndex);
            } catch (err) {
              console.log('Error indexing applications');
            }
          },
        },
        {
          title: 'Test Firebase Functions',
          async execute() {
            try {
              const successfulIndex = await firebase
                .functions()
                .httpsCallable('newHello')({ adminKey: 1234 });
              console.log(successfulIndex);
            } catch (err) {
              console.log('Error testing');
            }
          },
        },
        {
          title: 'Force update stats',
          async execute() {
            try {
              console.log('Envoking firebase function...');
              const successfulIndex = await firebase
                .functions()
                .httpsCallable('forceUpdateStatistics')({ adminKey: 1234 });
              console.log('Success!', successfulIndex);
            } catch (err) {
              console.log('Error indexing applications');
            }
          },
        },
        {
          title: 'Count Microsoft',
          async execute() {
            try {
              console.log('Counting msft');
              const msftCount = await db
                .collection('decisions')
                .doc('DH5')
                .collection('pending')
                .get();
              let finalcount = 0;
              for (const inst of msftCount.docs) {
                // console.log('INST', inst.data(), inst);
                finalcount = inst.data().microsoft
                  ? finalcount + 1
                  : finalcount;
              }
              console.log('Miccrosoft count: ', finalcount + 95);
            } catch (err) {
              console.log('Error indexing applications');
            }
          },
        },
        {
          title: 'Count Microsoft 2',
          async execute() {
            try {
              console.log('Counting msft');
              const msftCount = await db
                .collection('decisions')
                .doc('DH5')
                .collection('pending')
                .where('index', '>', 500)
                .get();
              // eslint-disable-next-line prefer-const
              let finalcount = 0;
              for (const inst of msftCount.docs) {
                // console.log('INST', inst.data(), inst);
                // eslint-disable-next-line no-unused-expressions
                inst.data().microsoft
                  ? console.log(
                    `,${inst.data().name} ${inst.data().lastname},`,
                    `${inst.data().email},`,
                    `${inst.data().major},`,
                    `${inst.data().university},`,
                  )
                  : false;
              }
              console.log('Miccrosoft count: ', finalcount + 95);
            } catch (err) {
              console.log('Error indexing applications');
            }
          },
        },
        {
          title: 'Reviewer stats',
          async execute() {
            try {
              console.log('Calculating...');
              const msftCount = await db
                .collection('decisions')
                .doc('DH5')
                .collection('pending')
                .get();
              const finalcount = 0;
              const rStats = {};
              for (const inst of msftCount.docs) {
                // console.log('INST', inst.data(), inst);
                // console.log('Dec', inst.data().decision);
                // eslint-disable-next-line no-continue
                if (!inst.data().decision) continue;
                for (const rev of inst.data().decision.assignedTo) {
                  if (rStats[rev]) {
                    rStats[rev].assigned += 1;
                    if (
                      inst
                        .data()
                        .decision.reviewers.some(p => p.reviewer === rev)
                    ) {
                      rStats[rev].marked += 0;
                    }
                  } else {
                    rStats[rev] = { marked: 0, assigned: 1 };
                  }
                  for (const rev2 of inst.data().decision.reviewers) {
                    if (rStats[rev2.reviewer]) {
                      rStats[rev2.reviewer].marked += 1;
                    } else {
                      rStats[rev2.reviewer] = { marked: 0, assigned: 1 };
                    }
                  }
                }
              }
              // eslint-disable-next-line guard-for-in
              for (const finalRevCount in rStats) {
                // console.log('l24999', finalRevCount, rStats[finalRevCount]);
                rStats[finalRevCount].marked /= 3;
                rStats[finalRevCount].marked = Math.floor(
                  rStats[finalRevCount].marked,
                );
              }
              console.log('Reviewers: ', rStats);
            } catch (err) {
              console.log('Error indexing applications', err);
            }
          },
        },
      ],
      assignedApplications: 0,
      unmarkedApplications: 0,
      markedApplications: 0,
      averageScore: 0,
      secretMessage: '',
      isAuthorizedReviewer: false,
    };
  },
  components: {
    Navbar,
    // eslint-disable-next-line vue/no-unused-components
    PieChart,
    // eslint-disable-next-line vue/no-unused-components
    PieChart2,
    IOdometer,
    DataTable,
    CommitChart,
    CustomAngleRadialChart,
  },
  created() {
    this.$Progress.start();
  },
  async mounted() {
    const nameRes = await db
      .collection('admins')
      // .doc((this as any).$store.state.firebase.auth().currentUser.email)
      .get();
    const revObj = {};
    nameRes.docs.forEach((val) => {
      revObj[val.data().email] = val.data().name;
      if (
        val.data().email === (this as any).$store.state.firebase.auth().currentUser.email
      ) {
        // console.log('Changing role: ', val.data().role);

        (this as any).$store.state.vuex_user_role = val.data().role;
      }
    });
    (this as any).$store.state.allAdmins = revObj;
    (this as any).$store.state.currentAdminUserName = (this as any).$store.state.allAdmins[
      (this as any).$store.state.firebase.auth().currentUser.email
    ];
    // console.log('NAMERES', nameRes.data());
    (this as any).activateModal(
      `Welcome back ${
        (this as any).$store.state.currentAdminUserName
          ? (this as any).$store.state.currentAdminUserName.trim().split(/\s+/)[0]
          : ''
      }!, Loading hackathon data...`,
    );

    try {
      const doc = await db.collection(this.$store.state.currentHackathon)
        .doc('users')
        .collection('all')
        .get();

      doc.docs.forEach((val) => {
        // console.log('Vaal', val);
        (this as any).positions.pos.push({
          lat: val.data().geo ? val.data().geo.latitude : 0,
          lng: val.data().geo ? val.data().geo.longitude : 0,
        });
        (this as any).positions.names.push({
          email: val.data().email,
        });
        // console.log(val.data().geo);
        (this as any).$Progress.finish();
      });
      (this as any).loading = false;
    } catch (err) {
      console.log('E307', err);
      (this as any).$Progress.fail();
      (this as any).loading = false;
    }

    db.collection(this.$store.state.currentHackathon)
      .doc('statistics')
      .onSnapshot((doc) => {
        if (doc) {
          // const universityStats = doc.data()!.applicationStats.universities;
          (this as any).applicationStats = doc.data()!.applicationStats;
          (this as any).applicationCount = doc.data()!.applications;
          // (this.$refs.universities as any).changeData(
          //   this.processField(this.filterData(universityStats), 'Universities'),
          // );
        }
      });
    const authRes = await db
      .collection('admins')
      .doc((this as any).$store.state.firebase.auth().currentUser.email)
      .get();

    (this as any).$store.state.currentUserIsAuthorizedReviewer = authRes.data()!.authorizedReviewer;
    console.log('auth res: ', authRes.data());

    if (authRes.data()!.authorizedReviewer == true) {
      (this as any).isAuthorizedReviewer = true;
      (this as any).getApplicationStats();
    }
  },
  computed: {
    universitiesMap() {
      const res = formatChartData(this, ['applicationStats', 'universities'], { sort: true, limit: 100 });
      const final = [];
      for (let index = 0; index < res.categories.length; index++) {
        final.push({
          name: res.categories[index],
          val: res.data[index],
        });
      }
      return final;
    },
    universities() {
      return formatChartData(this, ['applicationStats', 'universities'], { sort: true, limit: 4 });
    },
    vuex_user_role: {
      get(): string {
        return (this as any).$store.state.vuex_user_role;
      },
      set(value: string) {
        (this as any).$store.commit('update_vuex_role', value);
      },
    },
    vuex_password: {
      get(): string {
        return (this as any).$store.state.vuex_password;
      },
      set(value: string) {
        (this as any).$store.commit('update_vuex_password', value);
      },
    },
    vuex_current_user: {
      get(): string {
        return (this as any).$store.state.vuex_current_user;
      },
      set(value: string) {
        (this as any).$store.commit('update_vuex_current_user', value);
      },
    },
  },
  methods: {
    filterData(data) {
      const N = 5; // Number of fields to show before collapsing into "Other"
      const values: number[] = Object.values(data);
      const keys = Object.keys(data);
      const out = {} as any;
      let i = 0;
      while (i < N) {
        const mindex = values.indexOf(Math.max(...values));
        out[keys[mindex]] = values[mindex];
        values.splice(mindex, 1);
        keys.splice(mindex, 1);
        i++;
      }
      out.Other = 0;
      values.forEach((value) => {
        out.Other += value;
      });
      return out;
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
    async fnctn() {
      try {
        const f = await firebase.functions().httpsCallable('createAdminUser')({
          email: 'admin1@google.com',
          phoneNumber: '6473338767',
          password: 'password1',
        });
        console.log(f);
      } catch (err) {
        console.log(err);
      }
    },
    async f2() {
      const func = firebase.functions().httpsCallable('newHello');
      try {
        const res = await func({ hello: 'hi' });
        console.log(res);
      } catch (err) {
        console.log('l129', err);
      }
    },
    /* async fbdata() {
      for (const j of fake) {
        const { application, ...j2 } = j;
        try {
          const ind = await firebase.functions().httpsCallable('returnIndex')({});
          console.log('Index data: ', ind.data.index);
          db.collection('fake_users')
            .doc(j.email)
            .set({ ...j2, index: ind.data.index })
            .then(() => {
              db.collection('applications')
                .doc('DH5_Test')
                .collection('all')
                .doc(j.email)
                .set(application)
                .then(() => console.log('Successfully written'))
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
          console.log(j);
        } catch (err) {
          console.log('Error getting index: ', err);
        }
      }
    }, */
    fake_apps() {},
    async getApplicationCount() {
      try {
        const allStatistics = await db
          .collection('statistics')
          .doc('DH5')
          .get();
      } catch (err) {
        console.log('An error occured: ', err);
      }
    },
    activateModal(msg = 'Loading...') : void {
      (this as any).loading = true;
      (this as any).loadingMessage = msg;
    },
    getApplicationStats() {
      let totalScore = 0;
      const user = (this as any).$store.state.firebase.auth().currentUser.email;
      db.collection(this.$store.state.currentHackathon)
        .doc('applications')
        .collection('all')
        .onSnapshot((snap) => {
          (this as any).assignedApplications = 0;
          (this as any).markedApplications = 0;
          totalScore = 0;
          snap.forEach((application) => {
            const reviewArr = application.data()._.reviews.assignedTo; // get the list of reviewers for each application
            for (let i = 0; i < reviewArr.length; i++) {
              try {
              // check if admin is assigned as reviewer in each application
                if (user === reviewArr[i]) {
                  (this as any).assignedApplications += 1;
                  try {
                    const scoresArr = application.data()._.reviews.scores;
                    // loop through the list of application scores and check if reviewer has assigned a score
                    for (let j = 0; j < scoresArr.length; j++) {
                      if (scoresArr[j].reviewer === user) {
                        totalScore += application.data()._.reviews.scores[j].score;
                        (this as any).markedApplications += 1; // admin is assigned to this application so increase marked application count
                        (this as any).averageScore = totalScore / (this as any).markedApplications; // update average score
                      }
                    }
                  } catch (err) {
                    console.log(application.id);
                    console.log('No score assigned for this app');
                  }
                  // calculate the unmarked applications
                  console.log((this as any).markedApplications, (this as any).assignedApplications);
                  (this as any).unmarkedApplications = (this as any).assignedApplications - (this as any).markedApplications;
                }
              } catch (err) {
                console.log('No reviewers assigned for this app');
              }
            }
          });

          if ((this as any).unmarkedApplications >= 100) {
            (this as any).secretMessage = "Oof, that's a lot";
          } else if ((this as any).unmarkedApplications <= (this as any).assignedApplications / 2 && (this as any).unmarkedApplications > 0) {
            (this as any).secretMessage = 'Nearly there! You got this!';
          } else if ((this as any).unmarkedApplications == 0) {
            (this as any).secretMessage = "You're chilling, go watch a movie";
          }
        });
    },
  },
});
</script>

<style>
.totalapps {
  font-size: 30px;
}

.ht {
  font-size: 30px;
}

#gmap {
  width: 100%;
  height: 100%;
}

.iOdometer {
  font-size: 150%;
  margin: 0;
  color: #00ced1;
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

#debugger {
  font-size: 2em;
}

#dataTable {
  width: 100%;
}

.title {
  color: black;
}
</style>
