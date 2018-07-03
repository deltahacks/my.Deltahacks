<link rel="stylesheet" href="http://github.hubspot.com/odometer/themes/odometer-theme-car.css" />       
<script src="http://github.hubspot.com/odometer/odometer.js"></script>
<template>
    <v-app class="dashboard">
        <Navbar/>
        <v-container fluid grid-list-md>
            <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md4>
                    <v-card color="white lighten-4" dark>
                        <GmapMap id="gmap" :center="{lat:43.6532, lng:-79.3832}" :zoom="7" map-type-id="terrain">
                            <GmapMarker :key="index" title="yooo" v-for="(m, index) in positions" :position="m" :clickable="true" :draggable="false" @click="center=m" />
                        </GmapMap>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md2>
                    <v-layout row wrap>
                        <v-flex d-flex>
                            <v-card color="white lighten-4" dark>
                                <v-card-title primary class="title">Total Applicants:</v-card-title>
                                <v-card-text class="totalapps center">
                                    <div id="odometer" class="odometer">123</div>
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex d-flex>
                            <v-layout row wrap>
                                <v-flex d-flex xs12>
                                    <v-card color="white lighten-4" dark>
                                        <v-btn @click="fbdata()" class="bold" color="orange" dark>Fake Firebase</v-btn>
                                    </v-card>
                                </v-flex>
                                <v-flex d-flex xs12>
                                    <v-card color="white lighten-4" dark>
                                        <v-text-field id="testing" name="input-1" label="Label Text" v-model="apps"></v-text-field>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex d-flex xs12 sm6 md3 child-flex>
                    <v-card color="white lighten-4" dark>

                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md3>
                    <v-card color="white lighten-4" dark>
                        <commit-chart/>
                    </v-card>
                </v-flex>
                <!-- <v-subheader class="ht">Applicants</v-subheader> -->
                <v-flex d-flex xs12 sm12 md12>
                    <DataTable/>
                </v-flex>
            </v-layout>
            <div class="text-xs-center">
                <v-pagination :length="6"></v-pagination>
            </div>

        </v-container>
    </v-app>
</template>

<script>
import firebase from "firebase";
// import Typed from 'typed.js';
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
// import Tab from '@/components/Tab'
import DataTable from "@/components/DataTable.vue";
// import MapCard from '@/components/MapCard'
// import Chart from '@/components/Chart'
import CommitChart from "@/components/CommitChart";
import db from "../private/firebase_init";
import { list_of_universities } from "../private/data";
import fake from "@/helpers/fake";

export default {
  name: "Dashboard",
  data() {
    return {
      fake,
      apps: "245",
      links: ["Home", "About", "Contact"],
      list_of_universities,
      lorem:
        "Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.",
      c_user: firebase.auth().currentUser,
      positions: []
    };
  },
  components: {
    Navbar,
    Footer,
    DataTable,
    CommitChart
  },
  created() {
    this.$Progress.start();
  },
  mounted() {
    db //Change to real users later
      .collection("fake_users")
      .where("is_admin", "==", false)
      .get()
      .then(doc =>
        doc.docs.forEach(val => {
          this.positions.push({
            lat: val.data().geo.latitude,
            lng: val.data().geo.longitude
          });
          console.log(val.data().geo);
          this.$Progress.finish();
        })
      )
      .catch(err => {
        console.log(err);
        this.$Progress.fail();
      });
  },
  methods: {
    fbdata() {
      for (let j of fake) {
        db
          .collection("fake_users")
          .doc(j.email)
          .set(j)
          .then(() => console.log("success"))
          .catch(err => console.log(err));
        console.log(j);
      }
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

.odometer {
  font-size: 150px;
  color: blue;
}
</style>
