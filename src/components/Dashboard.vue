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
                    <v-card-text>{{ lorem.slice(0, 70) }}</v-card-text>
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
                        <v-card-text>{{ lorem.slice(0, 40) }}</v-card-text>
                        </v-card>
                    </v-flex>
                    </v-layout>
                </v-flex>
                </v-layout>
            </v-flex>
            <v-flex d-flex xs12 sm6 md2 child-flex>
                <MapCard/>
            </v-flex>
            <v-flex d-flex xs12 sm6 md3>
                <v-card color="blue lighten-2" dark>
                <v-card-text>{{ lorem.slice(0, 100) }}</v-card-text>
                </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm12 md12>
                <DataTable/>
            </v-flex>
            </v-layout>
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

export default {
    name: 'Dashboard',
    data(){
        return{
            links: ["Home", "About", "Contact"],
            lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
            ,c_user: firebase.auth().currentUser
        }
    },
    components: {
        Navbar,
        Footer,
        Tab,
        DataTable,
        MapCard
    }
}
</script>

<style>

</style>
