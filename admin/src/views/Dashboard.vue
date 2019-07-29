<template>
  <v-app class="dashboard">
    <Navbar />
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md4>
          <v-card color="white lighten-4" dark>
            <GmapMap
              id="gmap"
              :center="{lat:43.6532, lng:-79.3832}"
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
                @click="center=m"
              />
            </GmapMap>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md2>
          <v-layout row wrap>
            <v-flex d-flex>
              <v-card color="white lighten-4" dark>
                <v-card-title primary class="title">Total Submissions:</v-card-title>
                <v-card-text class="totalapps center">
                  <IOdometer class="iOdometer" :value="applicationCount" />
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex d-flex>
              <v-layout row wrap>
                <v-flex d-flex xs12>
                  <v-card color="white lighten-4" dark>
                    <div class="tooltip">
                      <span class="tooltiptext">Click only if you know what you're doing</span>
                      <v-btn class="bold" color="orange" dark>Fake Firebase</v-btn>
                      <v-btn class="bold" color="blue" dark>Send Mail</v-btn>
                    </div>
                  </v-card>
                </v-flex>
                <v-flex d-flex xs12>
                  <v-card color="white lighten-4" dark>
                    <v-menu offset-y>
                      <v-btn slot="activator" color="error" depressed large dark id="debugger">
                        Debug
                        <v-icon right dark>cloud_upload</v-icon>
                      </v-btn>
                      <v-list>
                        <v-list-tile
                          v-for="(func, index) in debugFunctions"
                          :key="index"
                          @click="func.execute()"
                        >
                          <v-list-tile-title>{{ func.title }}</v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3 child-flex>
          <v-card color="white lighten-4" dark>
            <!-- <pie-chart></pie-chart> -->
            <pie-chart2 ref="universities" :options="{}"></pie-chart2>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md3>
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
          {{loadingMessage}}
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>


<script lang="ts">
import IOdometer from "vue-odometer";
import * as firebase from "firebase/app";

import db from "../private/firebase_init";
import Navbar from "@/components/Navbar.vue";
import PieChart from "../components/PieChart";
import PieChart2 from "../components/PieChartGen";
import DataTable from "@/components/DataTable.vue";
import CommitChart from "../components/CommitChart";
import { allUniversities } from "../private/data";

import "firebase/functions";
import "odometer/themes/odometer-theme-default.css";

export default {
  name: "Dashboard",
  data() {
    return {
      page: 3,
      apps: "245",
      loading: false,
      allUniversities,
      applicationCount: 0,
      loadingMessage: "Loading...",
      positions: { pos: [], names: [] },
      links: ["Home", "About", "Contact"],
      c_user: firebase.auth().currentUser,
      colors: [
        "#E31836",
        "#83002C",
        "#004C9B",
        "#FDD54F",
        "#4F2682",
        "#63a832",
        "#e0932f"
      ],
      debugFunctions: [
        {
          title: "Index Apps",
          async execute() {
            try {
              console.log("Envoking firebase function...");
              const successfulIndex = await firebase
                .functions()
                .httpsCallable("indexApplications")({ adminKey: 1234 });
              console.log("Success!", successfulIndex);
            } catch (err) {
              console.log("Error indexing applications");
            }
          }
        },
        {
          title: "Test Firebase Functions",
          async execute() {
            try {
              const successfulIndex = await firebase
                .functions()
                .httpsCallable("newHello")({ adminKey: 1234 });
              console.log(successfulIndex);
            } catch (err) {
              console.log("Error testing");
            }
          }
        },
        {
          title: "Force update stats",
          async execute() {
            try {
              console.log("Envoking firebase function...");
              const successfulIndex = await firebase
                .functions()
                .httpsCallable("forceUpdateStatistics")({ adminKey: 1234 });
              console.log("Success!", successfulIndex);
            } catch (err) {
              console.log("Error indexing applications");
            }
          }
        },
        {
          title: "Count Microsoft",
          async execute() {
            try {
              console.log("Counting msft");
              const msftCount = await db
                .collection("decisions")
                .doc("DH5")
                .collection("pending")
                .get();
              let finalcount = 0;
              for (const inst of msftCount.docs) {
                // console.log('INST', inst.data(), inst);
                inst.data().microsoft
                  ? (finalcount += 1)
                  : (finalcount = finalcount);
              }
              console.log("Miccrosoft count: ", finalcount + 95);
            } catch (err) {
              console.log("Error indexing applications");
            }
          }
        },
        {
          title: "Count Microsoft 2",
          async execute() {
            try {
              console.log("Counting msft");
              const msftCount = await db
                .collection("decisions")
                .doc("DH5")
                .collection("pending")
                .where("index", ">", 500)
                .get();
              let finalcount = 0;
              for (const inst of msftCount.docs) {
                // console.log('INST', inst.data(), inst);
                inst.data().microsoft
                  ? console.log(
                      `,${inst.data().name} ${inst.data().lastname},`,
                      `${inst.data().email},`,
                      `${inst.data().major},`,
                      `${inst.data().university},`
                    )
                  : (finalcount = finalcount);
              }
              console.log("Miccrosoft count: ", finalcount + 95);
            } catch (err) {
              console.log("Error indexing applications");
            }
          }
        },
        {
          title: "Reviewer stats",
          async execute() {
            try {
              console.log("Calculating...");
              const msftCount = await db
                .collection("decisions")
                .doc("DH5")
                .collection("pending")
                .get();
              const finalcount = 0;
              const rStats = {};
              for (const inst of msftCount.docs) {
                // console.log('INST', inst.data(), inst);
                // console.log('Dec', inst.data().decision);
                if (!inst.data().decision) continue;
                for (const rev of inst.data().decision.assignedTo) {
                  if (rStats[rev]) {
                    rStats[rev].assigned += 1;
                    if (
                      inst
                        .data()
                        .decision.reviewers.some(p => p.reviewer === rev)
                    )
                      rStats[rev].marked += 0;
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
              for (const finalRevCount in rStats) {
                // console.log('l24999', finalRevCount, rStats[finalRevCount]);
                rStats[finalRevCount].marked /= 3;
                rStats[finalRevCount].marked = Math.floor(
                  rStats[finalRevCount].marked
                );
              }
              console.log("Reviewers: ", rStats);
            } catch (err) {
              console.log("Error indexing applications", err);
            }
          }
        }
      ]
    };
  },
  components: {
    Navbar,
    PieChart,
    PieChart2,
    IOdometer,
    DataTable,
    CommitChart
  },
  created() {
    this.$Progress.start();
  },
  async mounted() {
    const nameRes = await db
      .collection("admins")
      // .doc(this.$store.state.firebase.auth().currentUser.email)
      .get();
    const revObj = {};
    nameRes.docs.forEach(val => {
      revObj[val.data().email] = val.data().name;
      if (
        val.data().email === this.$store.state.firebase.auth().currentUser.email
      ) {
        // console.log('Changing role: ', val.data().role);

        this.$store.state.vuex_user_role = val.data().role;
      }
    });
    this.$store.state.allAdmins = revObj;
    this.$store.state.currentAdminUserName = this.$store.state.allAdmins[
      this.$store.state.firebase.auth().currentUser.email
    ];
    // console.log('NAMERES', nameRes.data());
    this.activateModal(
      `Welcome back ${
        this.$store.state.currentAdminUserName
          ? this.$store.state.currentAdminUserName.trim().split(/\s+/)[0]
          : ""
      }!, Loading hackathon data...`
    );

    try {
      let doc = await db.collection("users") // Change to real users later
        .where("geo.latitude", "<", 1000000)
        .get();

        doc.docs.forEach(val => {
          // console.log('Vaal', val);
          this.positions.pos.push({
            lat: val.data().geo ? val.data().geo.latitude : 0,
            lng: val.data().geo ? val.data().geo.longitude : 0
          });
          this.positions.names.push({
            email: val.data().email
          });
          // console.log(val.data().geo);
          this.$Progress.finish();
        });
      this.loading = false;
    } catch (err) {
      console.log("E307", err);
      this.$Progress.fail();
      this.loading = false;
    }

    db.collection("statistics")
      .doc("DH5")
      .onSnapshot(doc => {
        const universityStats = doc.data().applicationStats.universities;
        this.applicationCount = doc.data().applications;
        this.$refs.universities.changeData(
          this.processField(this.filterData(universityStats), "Universities")
        );
      });
    const authRes = await db
      .collection("admins")
      .doc(this.$store.state.firebase.auth().currentUser.email)
      .get();

    this.$store.state.currentUserIsAuthorizedReviewer = authRes.data().authorizedReviewer;
    console.log("auth res: ", authRes.data());
  },
  computed: {
    vuex_user_role: {
      get() {
        return this.$store.state.vuex_user_role;
      },
      set(value) {
        this.$store.commit("update_vuex_role", value);
      }
    },
    vuex_password: {
      get() {
        return this.$store.state.vuex_password;
      },
      set(value) {
        this.$store.commit("update_vuex_password", value);
      }
    },
    vuex_current_user: {
      get() {
        return this.$store.state.vuex_current_user;
      },
      set(value) {
        this.$store.commit("update_vuex_current_user", value);
      }
    }
  },
  methods: {
    filterData(data) {
      const N = 5; // Number of fields to show before collapsing into "Other"
      const values: number[] = Object.values(data);
      const keys = Object.keys(data);
      const out = <any>{};
      let i = 0;
      while (i < N) {
        const mindex = values.indexOf(Math.max(...values));
        out[keys[mindex]] = values[mindex];
        values.splice(mindex, 1);
        keys.splice(mindex, 1);
        i++;
      }
      out.Other = 0;
      values.forEach(value => (out.Other += value));
      return out;
    },
    processField(field, label) {
      const val = Object.values(field);
      return {
        labels: Object.keys(field),
        datasets: [
          {
            label,
            backgroundColor: this.colors,
            data: val
          }
        ]
      };
    },
    async fnctn() {
      try {
        const f = await firebase.functions().httpsCallable("createAdminUser")({
          email: "admin1@google.com",
          phoneNumber: "6473338767",
          password: "password1"
        });
        console.log(f);
      } catch (err) {
        console.log(err);
      }
    },
    async f2() {
      const func = firebase.functions().httpsCallable("newHello");
      try {
        const res = await func({ hello: "hi" });
        console.log(res);
      } catch (err) {
        console.log("l129", err);
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
          .collection("statistics")
          .doc("DH5")
          .get();
      } catch (err) {
        console.log("An error occured: ", err);
      }
    },
    activateModal(msg = "Loading...") {
      this.loading = true;
      this.loadingMessage = msg;
    }
  }
};
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
  font-size: 3em;
  margin: 0;
  color: #00ced1;
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
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
