<template>
    <v-app class="dashboard">
        <Navbar/>
        <v-container fluid grid-list-md>
            <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md4>
                    <v-card color="white lighten-4" dark>
                        <v-card-title primary class="title">Lorem</v-card-title>
                        <v-card-text>{{ lorem }}</v-card-text>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md3>
                    <v-layout row wrap>
                        <v-flex d-flex>
                            <v-card color="white lighten-4" dark>
                                <v-card-title primary class="title">Total Applicants:</v-card-title>
                                <v-card-text class="totalapps center"></v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex d-flex>
                            <v-layout row wrap>
                                <v-flex v-for="n in 2" :key="n" d-flex xs12>
                                    <v-card color="white lighten-4" dark>
                                        <v-text-field id="testing" name="input-1" label="Label Text" v-model="apps"></v-text-field>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex d-flex xs12 sm6 md2 child-flex>
                    <v-card color="white lighten-4" dark>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md3>
                    <v-card color="white lighten-4" dark>
                        <commit-chart/>
                    </v-card>
                </v-flex>
                <v-subheader class="ht">Applicants</v-subheader>
                <v-flex d-flex xs12 sm12 md12>
                    <DataTable/>
                </v-flex>
            </v-layout>
            <div class="text-xs-center">
                <v-pagination :length="6" v-model="page"></v-pagination>
            </div>

        </v-container>
    </v-app>
</template>

<script>
import firebase from 'firebase';
// import Typed from 'typed.js';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
// import Tab from '@/components/Tab'
import DataTable from '@/components/DataTable.vue';
// import MapCard from '@/components/MapCard'
// import Chart from '@/components/Chart'
import CommitChart from '@/components/CommitChart';

export default {
  name: 'Dashboard',
  data() {
    return {
      apps: '245',
      links: ['Home', 'About', 'Contact'],
      lorem:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.',
      c_user: firebase.auth().currentUser,
    };
  },
  components: {
    Navbar,
    Footer,
    DataTable,
    CommitChart,
  },
  mounted() {},
  methods: {},
};
</script>

<style>
.totalapps {
  font-size: 30px;
}

.ht {
  font-size: 30px;
}
</style>
