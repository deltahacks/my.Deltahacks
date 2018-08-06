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
    <v-data-table v-bind:peeps="peeps" :disable-initial-sort=true :dark=false :search="search" :headers="headers" :items="applications[page - 1]" hide-actions item-key="name">
      <template slot="items" slot-scope="props">
        <tr @click="selectRow($event, props)">
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
        <applicant-dropdown :usrname="props.item.name" :applicant='props.item' />
      </template>
    </v-data-table>
    <div class="text-xs-center">
      <v-pagination v-model="page" :length="3" circle @input="nextPage"></v-pagination>
    </div>
  </v-card>

</template>

<script>
import fake from '@/helpers/fake';
import ApplicantDropdown from '@/components/ApplicantDropdown.vue';
import 'vue-status-indicator/styles.css';
import db from '../private/firebase_init';
import Vue from 'vue';
import { StatusIndicator } from 'vue-status-indicator';
import { functions } from 'firebase';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'DataTable',
  methods: {
    ...mapMutations(['update_DataTable_lastVisible']),
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
    selectRow(e, props) {
      props.expanded = !props.expanded;
      // update this if you change the size of expand to a % //
      var body = document.body,
          html = document.documentElement;

      var height = Math.max( body.scrollHeight, body.offsetHeight,
                            html.clientHeight, html.scrollHeight, html.offsetHeight );
        console.log(height);
        console.log(e.pageY);
        console.log(e.pageY - height);
      if (e.pageY + 620 > height) {
        window.scrollTo(0, e.pageY + ((e.pageY) - height));
      } else {
        window.scrollTo(0, e.pageY);
      }
    },
    async nextPage() {
      console.log('Page is: ', this.page);
      if (!this.applications[`${this.page}`]) {
        console.log('Getting next page');
        const result = await db
          .collection('applications')
          .doc('DH5_Test')
          .collection('all')
          .orderBy('index')
          .limit(20)
          .startAfter((this.page - 1) * 20)
          .get();
        this.update_DataTable_lastVisible(result.docs[result.docs.length - 1]);
        Vue.set(this.applications, this.page - 1, result.docs.map(a => a.data()));
      }
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
      pagination: {
        page: 1,
        rowsPerPage: 10,
      },
      applications: {},
      peeps: [fake],
      current: 'All Applicants',
      items: ['All Applicants', 'Accepted Applicants', 'Unaccepted Applicants'],
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
    if (!this.applications[this.page - 1]) {
      console.log('In mount fill');
      const result = await db
        .collection('applications')
        .doc('DH5_Test')
        .collection('all')
        .orderBy('index')
        .limit(20)
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
</style>
