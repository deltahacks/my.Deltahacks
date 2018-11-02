<template>
    <v-app class="dashboard">
        <Navbar />
        <v-container fluid grid-list-md>
            <v-layout row wrap>
                <v-flex d-flex xs12 sm6 md4>
                    <v-card color="white lighten-4" dark>
                        <GmapMap id="gmap" :center="{lat:43.6532, lng:-79.3832}" :zoom="7" map-type-id="terrain">
                            <GmapMarker :key="index" v-for="(m, index) in positions.pos" :position="m" :title="positions.names[index].email" :clickable="true" :draggable="false" @click="center=m" />
                        </GmapMap>
                    </v-card>
                </v-flex>
                <v-flex d-flex xs12 sm6 md2>
                    <v-layout row wrap>
                        <v-flex d-flex>
                            <v-card color="white lighten-4" dark>
                                <v-card-title primary class="title">Total Submissions:</v-card-title>
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
                                                <v-list-tile v-for="(func, index) in debugFunctions" :key="index" @click="func.execute()">
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
                        <commit-chart />
                    </v-card>
                </v-flex>
                <!-- <v-subheader class="ht">Applicants</v-subheader> -->
                <v-flex d-flex xs12 sm12 md12>
                    <DataTable id='dataTable' />
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
import PieChart from '@/components/PieChart';
import Navbar from '@/components/Navbar.vue';
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
            positions: { pos: [], names: [] },
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
                {
                    title: 'Count Microsoft',
                    execute: async function() {
                        try {
                            console.log('Counting msft');
                            let msftCount = await db
                                .collection('decisions')
                                .doc('DH5')
                                .collection('pending')
                                .get();
                            let finalcount = 0;
                            for (let inst of msftCount.docs) {
                                //console.log('INST', inst.data(), inst);
                                inst.data().microsoft
                                    ? (finalcount += 1)
                                    : (finalcount = finalcount);
                            }
                            console.log('Miccrosoft count: ', finalcount + 95);
                        } catch (err) {
                            console.log('Error indexing applications');
                        }
                    },
                },
                {
                    title: 'Count Microsoft 2',
                    execute: async function() {
                        try {
                            console.log('Counting msft');
                            let msftCount = await db
                                .collection('decisions')
                                .doc('DH5')
                                .collection('pending')
                                .get();
                            let finalcount = 0;
                            for (let inst of msftCount.docs) {
                                //console.log('INST', inst.data(), inst);
                                inst.data().microsoft
                                    ? console.log(
                                          `,${inst.data().name} ${inst.data().lastname},`,
                                          `${inst.data().email},`,
                                          `${inst.data().major},`,
                                          `${inst.data().university},`
                                      )
                                    : (finalcount = finalcount);
                            }
                            console.log('Miccrosoft count: ', finalcount + 95);
                        } catch (err) {
                            console.log('Error indexing applications');
                        }
                    },
                },
                {
                    title: 'Reviewer stats',
                    execute: async function() {
                        try {
                            console.log('Calculating...');
                            let msftCount = await db
                                .collection('decisions')
                                .doc('DH5')
                                .collection('pending')
                                .get();
                            let finalcount = 0;
                            let rStats = {};
                            for (let inst of msftCount.docs) {
                                //console.log('INST', inst.data(), inst);
                                //console.log('Dec', inst.data().decision);
                                if (!inst.data().decision) continue;
                                for (let rev of inst.data().decision.assignedTo) {
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
                                    for (let rev2 of inst.data().decision.reviewers) {
                                        if (rStats[rev2.reviewer]) {
                                            rStats[rev2.reviewer].marked += 1;
                                        } else {
                                            rStats[rev2.reviewer] = { marked: 0, assigned: 1 };
                                        }
                                    }
                                }
                            }
                            for (let finalRevCount in rStats) {
                                //console.log('l24999', finalRevCount, rStats[finalRevCount]);
                                rStats[finalRevCount].marked /= 3;
                                rStats[finalRevCount].marked = Math.floor(
                                    rStats[finalRevCount].marked
                                );
                            }
                            console.log('Reviewers: ', rStats);
                        } catch (err) {
                            console.log('Error indexing applications', err);
                        }
                    },
                },
            ],
        };
    },
    components: {
        Navbar,
        DataTable,
        CommitChart,
        PieChart,
        IOdometer,
    },
    created() {
        this.$Progress.start();
    },
    async mounted() {
        let nameRes = await db
            .collection('admins')
            //.doc(this.$store.state.firebase.auth().currentUser.email)
            .get();
        console.log('ALL ADM', nameRes.docs[0].data());
        let revObj = {};
        nameRes.docs.forEach(val => {
            revObj[val.data().email] = val.data().name;
        });
        this.$store.state.allAdmins = revObj;
        this.$store.state.currentAdminUserName = this.$store.state.allAdmins[
            this.$store.state.firebase.auth().currentUser.email
        ];
        //console.log('NAMERES', nameRes.data());
        this.activateModal(
            `Welcome back ${
                this.$store.state.currentAdminUserName
                    ? this.$store.state.currentAdminUserName.trim().split(/\s+/)[0]
                    : ''
            }!, Loading hackathon data...`
        );
        db.collection('users') //Change to real users later
            .where('geo.latitude', '<', 1000000)
            .get()
            .then(doc => {
                doc.docs.forEach(val => {
                    console.log('Vaal', val);
                    this.positions.pos.push({
                        lat: val.data().geo ? val.data().geo.latitude : 0,
                        lng: val.data().geo ? val.data().geo.longitude : 0,
                    });
                    this.positions.names.push({
                        email: val.data().email,
                    });
                    //console.log(val.data().geo);
                    this.$Progress.finish();
                });
                this.loading = false;
            })
            .catch(err => {
                console.log('E307', err);
                this.$Progress.fail();
                this.loading = false;
            });

        db.collection('statistics')
            .doc('DH5')
            .onSnapshot(doc => {
                this.applicationCount = doc.data().applications;
            });

        let authRes = await db
            .collection('admins')
            .doc(this.$store.state.firebase.auth().currentUser.email)
            .get();

        this.$store.state.currentUserIsAuthorizedReviewer = authRes.data().authorizedReviewer;
        console.log('auth res: ', authRes.data());
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

#dataTable {
    width: 100%;
}

.title {
    color: black;
}
</style>

