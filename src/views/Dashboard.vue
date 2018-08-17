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
                                    <IOdometer class="iOdometer" :value=applicationCount />
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex d-flex>
                            <v-layout row wrap>
                                <v-flex d-flex xs12>
                                    <v-card color="white lighten-4" dark>
                                        <div class="tooltip">
                                            <span class="tooltiptext">Click only if you know what you're doing</span>
                                            <v-btn @click="fbdata()" class="bold" color="orange" dark>Fake Firebase</v-btn>
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
                                                <v-list-tile v-for="(func, index) in debugFunctions" :key="index" @click="func.execute">
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
                        <pie-chart></pie-chart>
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


<script src="https://rawgit.com/TahaSh/vue-paginate/master/dist/vue-paginate.js"></script>

<script>
import firebase from 'firebase';
// import Typed from 'typed.js';
import PieChart from '@/components/PieChart';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
// import Tab from '@/components/Tab'
import DataTable from '@/components/DataTable.vue';
// import MapCard from '@/components/MapCard'
// import Chart from '@/components/Chart'
import IOdometer from 'vue-odometer';
import 'odometer/themes/odometer-theme-default.css';
import CommitChart from '@/components/CommitChart';
import db from '../private/firebase_init';
import { allUniversities } from '../private/data';
import fake from '@/helpers/fake';
import functions from 'firebase/functions';
export default {
    name: 'Dashboard',
    data() {
        return {
            applicationCount: 0,
            page: 3,
            apps: '245',
            links: ['Home', 'About', 'Contact'],
            allUniversities,
            lorem:
                'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.',
            c_user: firebase.auth().currentUser,
            positions: [],
            loading: false,
            loadingMessage: 'Loading...',
            debugFunctions: [
                {
                    title: 'Index Apps',
                    execute: async function() {
                        try {
                            console.log('Envoking firebase function...');
                            let successfulIndex = await firebase
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
                    execute: async function() {
                        try {
                            let successfulIndex = await firebase
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
                    execute: async function() {
                        try {
                            console.log('Envoking firebase function...');
                            let successfulIndex = await firebase
                                .functions()
                                .httpsCallable('forceUpdateStatistics')({ adminKey: 1234 });
                            console.log('Success!', successfulIndex);
                        } catch (err) {
                            console.log('Error indexing applications');
                        }
                    },
                },
            ],
        };
    },
    components: {
        Navbar,
        Footer,
        DataTable,
        CommitChart,
        PieChart,
        IOdometer,
    },
    created() {
        this.$Progress.start();
    },
    mounted() {
        this.activateModal('Loading hackathon data...');
        db //Change to real users later
            .collection('fake_users')
            .where('is_admin', '==', false)
            .get()
            .then(doc => {
                doc.docs.forEach(val => {
                    this.positions.push({
                        lat: val.data().geo.latitude,
                        lng: val.data().geo.longitude,
                    });
                    //console.log(val.data().geo);
                    this.$Progress.finish();
                });
                this.loading = false;
            })
            .catch(err => {
                console.log(err);
                this.$Progress.fail();
                this.loading = false;
            });

        db
            .collection('statistics')
            .doc('DH5')
            .onSnapshot(doc => {
                this.applicationCount = doc.data().applications;
            });
    },
    methods: {
        async fnctn() {
            try {
                let f = await firebase.functions().httpsCallable('createAdminUser')({
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
            let func = firebase.functions().httpsCallable('newHello');
            try {
                let res = await func({ hello: 'hi' });
                console.log(res);
            } catch (err) {
                console.log('l129', err);
            }
        },
        async fbdata() {
            for (let j of fake) {
                let { application, ...j2 } = j;
                try {
                    let ind = await firebase.functions().httpsCallable('returnIndex')({});
                    console.log('Index data: ', ind.data.index);
                    db
                        .collection('fake_users')
                        .doc(j.email)
                        .set({ ...j2, index: ind.data.index })
                        .then(() => {
                            db
                                .collection('applications')
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
        },
        fake_apps() {},
        async getApplicationCount() {
            try {
                let allStatistics = await db
                    .collection('statistics')
                    .doc('DH5')
                    .get();
            } catch (err) {
                console.log('An error occured: ', err);
            }
        },
        activateModal(msg = 'Loading...') {
            this.loading = true;
            this.loadingMessage = msg;
        },
    },
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
</style>

