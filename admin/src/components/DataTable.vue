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
          <td class="text-md-left">{{ props.item.name + ' ' + props.item.lastname}}</td>
          <td class="text-md-left">{{ props.item.email }}</td>
          <td class="text-xs-left">{{ props.item.university }}</td>
          <td class="text-xs-left">{{ new Date(props.item.first_submitted.date).toLocaleDateString("en-US") }}</td>
          <td class="text-xs-left">{{ props.item.phone }}</td>
          <td class="text-xs-left">{{ getAgeFromDate(props.item.birthday) }}</td>
          <td class="text-xs-left" id="numRevs" :title="props.item.decision.assignedTo ? assignmentToName(props.item.decision.assignedTo) : 'unassigned'">
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
        <applicant-dropdown v-bind="{refetchCurrentPage}" id='dropdown' :usrname="props.item.name" :applicant='props.item' :isReviewed='props.item.decision.reviewers.some(e => e.reviewer == $store.state.firebase.auth().currentUser.email)' :random='3' />
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
import ApplicantDropdown from '@/components/ApplicantDropdown.vue';
import 'vue-status-indicator/styles.css';
import db from '../private/firebase_init';

export default {
  name: 'DataTable',
  methods: {
    // ...mapMutations(['update_DataTable_lastVisible']),
    onChangeBucket(item) {
      this.current = item;
      switch (item) {
        case 'All Applicants':
          this.restriction = this.defaultRestriction;
          this.refetchCurrentPage();
          break;
        case 'Assigned to Me':
          this.restriction = [
            'decision.assignedTo',
            'array-contains',

            this.$store.state.firebase.auth().currentUser.email,
          ];
          this.refetchCurrentPage();
          break;
        case 'Accepted Applicants':
          this.bucket = 'round1';
          this.restriction = this.defaultRestriction;
          this.refetchCurrentPage();
          break;
        case 'Overflow Applicants':
          this.bucket = 'overflow';
          this.restriction = this.defaultRestriction;
          this.refetchCurrentPage();
          break;
        case 'Rejected Applicants':
          this.bucket = 'rejected';
          this.restriction = this.defaultRestriction;
          this.refetchCurrentPage();
          break;
      }
    },
    assignmentToName(emails) {
      let res = '';
      emails.forEach((val) => {
        res += `${this.$store.state.allAdmins[val]}, `;
      });
      return res;
    },
    async fb() {
      db.collection('applications')
        .doc('DH5')
        .collection('all')
        .get();
    },
    bigDiff(prop) {
      const M = 5; // The difference threshold you want to check for.
      const reviewers = prop.item.decision.reviewers;
      let max_diff = Math.abs(reviewers[1].score - reviewers[0].score);
      let min_ele = Math.min(...reviewers.map(r => r.score));

      for (let i = 0; i < reviewers.length; i++) {
        const current = Math.abs(reviewers[i].score - min_ele);
        if (current > max_diff)
          max_diff = current;
      }

      return max_diff >= M;
    },
    selectRow(e, props) {
      this.bigDiff(props);
      props.expanded = !props.expanded;
      const offset = 50 * props.index;
      window.scrollTo(0, window.screen.height / 2 + offset);
    },
    async nextPage() {
      console.log('Page is: ', this.page);
      if (!this.applications[`${this.page - 1}`]) {
        console.log('Getting next page');
        const result = await db
          .collection(this.collection)
          .doc(this.hackathon)
          .collection(this.bucket)
          .orderBy('index')
          .where(...this.restriction)
          .limit(this.rowsPerPage)
          .startAfter((this.page - 1) * this.rowsPerPage)
          .get();
        // this.update_DataTable_lastVisible(result.docs[result.docs.length - 1]);
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
      // this.update_DataTable_lastVisible(result.docs[result.docs.length - 1]);
      Vue.set(this.applications, this.page - 1, result.docs.map(a => a.data()));
    },
    async applicantCount() {
      let size = 0;
      await db
        .collection(this.collection)
        .doc(this.hackathon)
        .collection(this.bucket)
        .get()
        .then((snap) => {
          size = 5;
        });
      return (size = 5);
    },
    getAgeFromDate(bday) {
      const b2 = new Date(bday.slice(4), bday.slice(2, 4) - 1, bday.slice(0, 2));
      // console.log('BDAAAY', b2, bday.slice(0, 2), bday.slice(2, 4) - 1, bday.slice(4));
      const current = new Date();
      return this.calculateAge(b2);
    },
    calculateAge(birthday) {
      // birthday is a date
      const ageDifMs = Date.now() - birthday.getTime();
      const ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
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
      rowsPerPage: 50,
      numApplicants: 0,
      applications: {},
      peeps: [],
      current: 'All Applicants',
      items: [
        'All Applicants',
        'Assigned to Me',
        'Accepted Applicants',
        'Overflow Applicants',
        'Rejected Applicants',
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
      expanded: {},
      headers: [
        { text: 'Name', align: 'left', value: 'name' },
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
      .collection('statistics')
      .doc(this.hackathon)
      .get()
      .then((snap) => {
        console.log(this.rowsPerPage);
        console.log(snap.data().applications);
        this.numApplicants = Math.ceil(snap.data().applications / this.rowsPerPage);
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
      console.log('r123', result);
      // this.update_DataTable_lastVisible(result.docs[result.docs.length - 1]);
      Vue.set(this.applications, this.page - 1, result.docs.map(a => a.data()));
    }
  },
  /*  computed: {
        lastVisible: 'DataTable.lastVisible',
    }, */
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
