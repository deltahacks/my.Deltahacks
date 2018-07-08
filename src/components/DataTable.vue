<template>
  <v-card>
    <v-card-title>
      <v-menu offset-y>
        <v-btn style="width: 250px;" class="bold" slot="activator" color="primary" dark>{{ current }}</v-btn>
        <v-list>
          <v-list-tile v-for="(item, index) in items" :key="index" @click="current = item">
            <v-list-tile-title class="">{{ item }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table :dark=false :search="search" :headers="headers" :items="applications" hide-actions item-key="name">
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td class="text-md-left">{{ props.item.name }}</td>
          <td class="text-md-left">{{ props.item.email }}</td>
          <td class="text-xs-left">{{ props.item.university }}</td>
          <td class="text-xs-left">{{ props.item.first_submitted.unix }}</td>
          <td class="text-xs-left">{{ props.item.phone }}</td>
          <td class="text-xs-left">{{ props.item.age }}</td>
          <td class="text-xs-left">
            Placeholder
          </td>
          <td class="text-xs-right">
            <status-indicator active pulse></status-indicator>
          </td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <applicant-dropdown :usrname="props.item.name" />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import fake from '@/helpers/fake';
import ApplicantDropdown from '@/components/ApplicantDropdown.vue';
import 'vue-status-indicator/styles.css';
import { StatusIndicator } from 'vue-status-indicator';
import db from '../private/firebase_init';

export default {
  name: 'DataTable',
  methods: {
    f() {
      console.log(fake);
    },
    async fb() {
      db
        .collection('applications')
        .doc('DH5_Test')
        .collection('all')
        .get();
    },
  },
  components: {
    ApplicantDropdown,
    StatusIndicator,
  },
  data() {
    return {
      current: 'All Applicants',
      items: ['All Applicants', 'Accepted Applicants', 'Unaccepted Applicants'],
      search: '',
      rating: null,
      fake,
      applications: [
        {
          dietry_restrictions: 'None',
          email: 'Loading@gmail.com',
          emergency_phone: 'Loading',
          github: 'https://github.com/johndoe',
          hackathons: 'None',
          linkedin: 'https://linkedin.com/johndoe',
          name: 'Loading',
          phone: 'Loading',
          school_year: 'NaN',
          shirt_size: 'NaN',
          story: 'NONE',
          university: 'NONE',
          website: 'google.com',
          documents: [
            {
              download_link:
                'https://firebasestorage.googleapis.com/v0/b/mydeltahacks.appspot.com/o/users%2Ftest5%40test.ca%2FGeneral%20Expectations.docx.pdf?alt=media&token=7dcf28a5-2215-4824-8600-583df46399ba',
              filename: 'General Expectations.docx.pdf',
              id: '3ln3opja2',
            },
          ],
          last_modified: {
            date: 'applicationDate',
            unix: 'applicationDate',
          },
          first_submitted: {
            date: 'applicationDate',
            unix: 'applicationDate',
          },
        },
      ],
      test: '423423423',
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
  mounted() {
    const parent = this;
    db
      .collection('applications')
      .doc('DH5_Test')
      .collection('all')
      .get()
      .then((querySnapshot) => {
        parent.applications = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          parent.applications.push(doc.data());
          // console.log(doc.id, ' => ', doc.data());
        });
      });
  },
};
</script>

<style>
.card_title {
  font-weight: 500;
}
</style>
