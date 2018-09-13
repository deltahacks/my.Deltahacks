<template>
    <v-card>
        <v-card-title>
            <v-menu offset-y>
                <v-btn style="width: 250px;" class="bold" slot="activator" color="primary" dark>{{ current }}</v-btn>
                <v-list>
                    <v-list-tile v-for="(item, index) in items" :key="index" @click="onChangeBucket(item)">
                        <v-list-tile-title class="">{{ item }}</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table v-bind:peeps="peeps" :disable-initial-sort=true :dark=false :search="search" :headers="headers" :items="applications[page - 1]" hide-actions item-key="email">
            <template slot="items" slot-scope="props">
                <tr @click="selectRow($event, props)">
                    <td class="text-md-left">{{ props.item.name }}</td>
                    <td class="text-md-left">{{ props.item.email }}</td>
                    <td class="text-xs-left">{{ props.item.university }}</td>
                    <td class="text-xs-left">{{ new Date(props.item.first_submitted.date).toLocaleDateString("en-US") }}</td>
                    <td class="text-xs-left">{{ props.item.phone }}</td>
                    <td class="text-xs-left">{{ props.item.age }}</td>
                    <td class="text-xs-left">
                        {{ props.item.decision.reviewers.length }}/3
                    </td>
                    <td class="text-xs-right">
                        <status-indicator v-if="props.item.decision.reviewers.some(e => e.reviewer == $store.state.firebase.auth().currentUser.email)" active></status-indicator>
                        <status-indicator v-else-if="props.item.decision.assignedTo && props.item.decision.assignedTo.includes($store.state.firebase.auth().currentUser.email.toLowerCase())" intermediary></status-indicator>
                        <status-indicator v-else semi></status-indicator>
                    </td>
                </tr>
            </template>
            <template slot="expand" slot-scope="props">
                <applicant-dropdown id='dropdown' :usrname="props.item.name" :applicant='props.item' :isReviewed='props.item.decision.reviewers.some(e => e.reviewer == $store.state.firebase.auth().currentUser.email)' :random='3' />
            </template>
        </v-data-table>
        <div class="text-xs-center">
            <v-pagination id="pageButton" v-model="page" :length="numApplicants" circle @input="nextPage"></v-pagination>
        </div>
    </v-card>
</template>

<script>
import Vue from 'vue';
import { StatusIndicator } from 'vue-status-indicator';
import { functions } from 'firebase';
import { mapState, mapMutations } from 'vuex';
import fake from '@/helpers/fake';
import ApplicantDropdown from '@/components/ApplicantDropdown.vue';
import 'vue-status-indicator/styles.css';
import db from '../private/firebase_init';

export default {
    name: 'DataTable',
    methods: {
        ...mapMutations(['update_DataTable_lastVisible']),
        onChangeBucket(item) {
            this.current = item;
            switch (item) {
                case 'Assigned to Me':
                    this.restriction = [
                        'decision.assignedTo',
                        'array-contains',
                        this.$store.state.firebase.auth().currentUser.email,
                    ];
                    this.refetchCurrentPage();
                    break;
                case 'All Applicants':
                    this.restriction = this.defaultRestriction;
                    this.refetchCurrentPage();
                    break;
            }
        },
        async fb() {
            db
                .collection('applications')
                .doc('DH5_Test')
                .collection('all')
                .get();
        },
        selectRow(e, props) {
            // this is still kinda janky but seems to work
            props.expanded = !props.expanded;
            const offset = 50 * props.index;
            window.scrollTo(0, window.screen.height / 2 + offset);
        },
        async nextPage() {
            console.log('Page is: ', this.page);
            if (!this.applications[`${this.page}`]) {
                console.log('Getting next page');
                const result = await db
                    .collection(this.collection)
                    .doc(this.hackathon)
                    .collection(this.bucket)
                    .orderBy('index')
                    .where(...this.restriction)
                    .limit(this.rowsPerPage)
                    .startAfter((this.page - 1) * 20)
                    .get();
                this.update_DataTable_lastVisible(result.docs[result.docs.length - 1]);
                Vue.set(this.applications, this.page - 1, result.docs.map(a => a.data()));
            }
        },
        async refetchCurrentPage() {
            console.log('In mount fill');
            const result = await db
                .collection(this.collection)
                .doc(this.hackathon)
                .collection(this.bucket)
                .orderBy('index')
                .where(...this.restriction)
                .limit(this.rowsPerPage)
                .get();
            this.update_DataTable_lastVisible(result.docs[result.docs.length - 1]);
            Vue.set(this.applications, this.page - 1, result.docs.map(a => a.data()));
        },
        async applicantCount() {
            let size = 0;
            await db
                .collection(this.collection)
                .doc(this.hackathon)
                .collection(this.bucket)
                .get()
                .then(snap => {
                    size = 5;
                });
            return (size = 5);
        },
    },
    components: {
        ApplicantDropdown,
        StatusIndicator,
    },
    data() {
        return {
            // lastVisible: null,
            page: 1,
            rowsPerPage: 20,
            numApplicants: 0,
            applications: {},
            peeps: [fake],
            current: 'All Applicants',
            items: [
                'All Applicants',
                'Assigned to Me',
                'Accepted Applicants',
                'Unaccepted Applicants',
            ],
            collection: 'decisions',
            hackathon: 'DH5',
            bucket: 'pending',
            restriction: ['index', '>=', 0],
            defaultRestriction: ['index', '>=', 0],
            buckets: [
                {
                    title: 'Pending Applications',
                    db_key: 'in progre',
                },
                {
                    title: 'Unsubmitted Applications',
                    db_key: 'submitted',
                },
                {
                    title: 'Accepted Applicants',
                    db_key: 'submitted',
                },
                {
                    title: 'Rejected Applicants',
                    db_key: 'submitted',
                },
            ],
            search: '',
            rating: null,
            fake,
            expanded: {},
            headers: [
                {
                    text: 'Name',
                    align: 'left',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Email', value: 'email' },
                { text: 'University', value: 'university' },
                { text: 'Applied (seconds)', value: 'applied' },
                { text: 'Phone', value: 'phone' },
                { text: 'Age', value: 'age' },
                { text: 'Status', value: 'rate' },
                { text: '', value: 'rate' },
            ],
        };
    },
    async mounted() {
        const parent = this;
        await db
            .collection(this.collection)
            .doc(this.hackathon)
            .collection(this.bucket)
            .get()
            .then(snap => {
                console.log(snap.size);
                this.numApplicants = Math.ceil(snap.size / this.rowsPerPage);
                console.log('Number apps: ', this.numApplicants);
            });

        if (!this.applications[this.page - 1]) {
            console.log('In mount fill');
            const result = await db
                .collection(this.collection)
                .doc(this.hackathon)
                .collection(this.bucket)
                .orderBy('index')
                .where(...this.restriction)
                .limit(this.rowsPerPage)
                .get();
            this.update_DataTable_lastVisible(result.docs[result.docs.length - 1]);
            Vue.set(this.applications, this.page - 1, result.docs.map(a => a.data()));
        }
    },
    computed: {
        lastVisible: 'DataTable.lastVisible',
    },
};
</script>

<style>
.card_title {
    font-weight: 500;
}

#dropdown {
    width: 100%;
}

#pageButton {
    outline: 0;
    border: none;
}
</style>