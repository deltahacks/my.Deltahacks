<template>
    <v-app class="dashboard">
        <Navbar/>
        <v-container fluid grid-list-md>
            <v-layout row wrap>
            <v-flex d-flex xs12 sm6 md4>
                <v-card color="purple" dark>
                <v-card-title primary class="title">Lorem</v-card-title>
                <v-card-text>{{ lorem }}</v-card-text>
                </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm6 md3>
                <v-layout row wrap>
                <v-flex d-flex>
                    <v-card color="indigo" dark>
                        <v-card-title primary class="title">Total Applicants:</v-card-title>
                        <v-card-text class="totalapps center"></v-card-text>
                    </v-card>
                </v-flex>
                <v-flex d-flex>
                    <v-layout row wrap>
                    <v-flex
                        v-for="n in 2"
                        :key="n"
                        d-flex
                        xs12
                    >
                        <v-card
                        color="red lighten-2"
                        dark
                        >
                               <v-text-field
                                id="testing"
                                name="input-1"
                                label="Label Text"
                                v-model="apps"
                                @keydown="typed"
                                ></v-text-field>
                        </v-card>
                    </v-flex>
                    </v-layout>
                </v-flex>
                </v-layout>
            </v-flex>
            <v-flex d-flex xs12 sm6 md2 child-flex>
                <v-card color="green lighten-2" dark>
                            <GmapMap id="map"
                            :center="{lat:10, lng:10}"
                            :zoom="7"
                            map-type-id="terrain"
                            />
                </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm6 md3>
                <v-card color="white lighten-4" dark>
                    <CommitChart/>
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
import firebase from 'firebase'
import Navbar from './layouts/Navbar'   
import Footer from './layouts/Footer'
import Tab from './layouts/Tab'
import DataTable from './layouts/DataTable'
import MapCard from './layouts/MapCard'
import Chart from './layouts/Chart'
import CommitChart from './layouts/CommitChart'
import Typed from 'typed.js';

export default {
    name: 'Dashboard',
    data(){
        return{
            apps: '245',
            links: ["Home", "About", "Contact"],
            lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
            ,c_user: firebase.auth().currentUser,
        }
    },
    components: {
        Navbar,
        Footer,
        Tab,
        DataTable,
        MapCard,
        Chart,
        CommitChart
    },
    mounted(){
    },
    methods: (
        typed => {
            new Typed(".totalapps", {
                strings: [this.apps],
                typeSpeed: 40
                })
                }
    )
}
</script>

<style>
.totalapps {
    font-size: 30px;
}

.ht{
    font-size: 30px;
}

</style>
