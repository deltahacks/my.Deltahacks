 <template>
  <v-card>
    <v-card-title>
      <v-menu offset-y>
        <v-btn
          style="width: 250px;"
          class="bold"
          slot="activator"
          color="primary"
          dark
        >{{ current }}</v-btn>
        <v-list>
          <v-list-tile v-for="(item, index) in items" :key="index" @click="onChangeBucket(item)">
            <v-list-tile-title class>{{ item }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
    </v-card-title>
    <v-data-table
      v-bind:peeps="peeps"
      :disable-initial-sort="true"
      :dark="false"
      :search="search"
      :headers="headers"
      :items="applications[page - 1]"
      hide-actions
      item-key="email"
    >
      <template slot="items" slot-scope="props">
        <tr @click="selectRow($event, props)">
          <td class="text-md-left">{{ props.item.name.first + ' ' + props.item.name.last}}</td>
          <!-- <td class="text-md-left">{{ props.item.email }}</td> -->
          <td class="text-xs-left">{{ props.item.academics.school }}</td>
          <td
            class="text-xs-left"
          >{{ new Date(props.item.first_submitted.date).toLocaleDateString("en-US") }}</td>
          <td class="text-xs-left">{{ props.item.phone }}</td>
          <td class="text-xs-left">{{ getAgeFromDate(props.item.personal.birthday) }}</td>
          <td
            class="text-xs-left"
            id="numRevs"
            :title="props.item.decision.assignedTo ? assignmentToName(props.item.decision.assignedTo) : 'unassigned'"
          >{{ props.item.decision.reviewers.length }}/3</td>

          <td class="text-xs-right">
            <status-indicator
              v-if="$store.state.vuex_user_role == 'mod' && bigDiff(props)"
              negative
            ></status-indicator>
            <status-indicator
              v-else-if="props.item.decision.reviewers.some(e => e.reviewer == $store.state.firebase.auth().currentUser.email)"
              active
            ></status-indicator>
            <status-indicator
              v-else-if="props.item.decision.assignedTo && props.item.decision.assignedTo.includes($store.state.firebase.auth().currentUser.email.toLowerCase())"
              intermediary
            ></status-indicator>
            <status-indicator v-else semi></status-indicator>
          </td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <applicant-dropdown
          v-bind="{refetchCurrentPage}"
          id="dropdown"
          :usrname="props.item.name"
          :applicant="props.item"
          :isReviewed="props.item.decision.reviewers.some(e => e.reviewer == $store.state.firebase.auth().currentUser.email)"
          :random="3"
        />
      </template>
    </v-data-table>
    <div class="text-xs-center">
      <v-pagination id="pageButton" v-model="page" :length="numApplicants" circle @input="nextPage"></v-pagination>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { StatusIndicator } from 'vue-status-indicator';
import { functions } from 'firebase';
import { mapState, mapMutations } from 'vuex';
import ApplicantDropdown from '@/components/ApplicantDropdown.vue';
import 'vue-status-indicator/styles.css';
import db from '../private/firebase_init';

export default Vue.extend({
  name: 'DataTable',
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
      hackathon: 'DH6',
      bucket: 'pending',
      restriction: ['index', '>=', 0] as [any, any, any],
      defaultRestriction: ['index', '>=', 0] as [any, any, any],
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
  components: {
    ApplicantDropdown,
    StatusIndicator,
  },
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
        default:
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
      if (!prop || !prop.item.decision.reviewers[1]) return false;
      const M = 5; // The difference threshold you want to check for.
      const { reviewers } = prop.item.decision;
      let maxDiff = Math.abs(reviewers[1].score - reviewers[0].score);
      const minEle = Math.min(...reviewers.map(r => r.score));

      for (let i = 0; i < reviewers.length; i++) {
        const current = Math.abs(reviewers[i].score - minEle);
        if (current > maxDiff) maxDiff = current;
      }

      return maxDiff >= M;
    },
    selectRow(e, props) {
      props.item.decision.reviewers.forEach(r => console.log(r.score));
      props.expanded = !props.expanded;
      const offset = 50 * props.index;
      window.scrollTo(0, window.screen.height / 2 + offset);
    },
    async nextPage() {
      console.log('Page is: ', this.page);
      if (!this.applications[`${this.page - 1}`]) {
        console.log('Getting next page');
        const result = await db
          .collection(this.hackathon)
          .doc('applications')
          .collection('all')
          .orderBy('index')
          .where(...(this.restriction as [any, any, any]))
          .limit(this.rowsPerPage)
          .startAfter((this.page - 1) * this.rowsPerPage)
          .get();
        // this.update_DataTable_lastVisible(result.docs[result.docs.length - 1]);
        Vue.set(
          this.applications,
          this.page - 1,
          result.docs.map(a => a.data()),
        );
      }
    },
    async refetchCurrentPage() {
      console.log('In mount fill');
      const result = await db
        .collection(this.hackathon)
        .doc('applications')
        .collection('all')
        .orderBy('index')
        .where(...(this.restriction as [any, any, any]))
        .limit(this.rowsPerPage)
        .get();
      // this.update_DataTable_lastVisible(result.docs[result.docs.length - 1]);
      Vue.set(this.applications, this.page - 1, result.docs.map(a => a.data()));
    },
    async applicantCount() {
      let size = 0;

      const snap = await db
        .collection(this.hackathon)
        .doc('applications')
        .collection('all')
        .get();
      size = 5;
      return 5;
    },
    getAgeFromDate(bday: firebase.firestore.Timestamp): number {
      const bdayDate = bday.toDate();
      const current = new Date();
      return this.calculateAge(bdayDate);
    },
    calculateAge(birthday: Date): number {
      // birthday is a date
      const ageDifMs = Date.now() - birthday.getTime();
      const ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    },
  },
  async mounted() {
    const parent = this;
    /*
    const snap = await db
      .collection('statistics')
      .doc(this.hackathon)
      .get();
    console.log(this.rowsPerPage);
    // console.log(snap.data().applications);
    this.numApplicants = Math.ceil(snap.data()!.applications / this.rowsPerPage);
    console.log('Number apps: ', this.numApplicants);
    */
    if (!this.applications[this.page - 1]) {
      console.log('In mount fill');
      const result = await db
        .collection(this.hackathon)
        .doc('applications')
        .collection('all')
        .where('_.status', '==', 'submitted')
        .limit(this.rowsPerPage)
        .get();
      console.log('r123', result.docs);
      console.log(result.docs[0].data());
      // this.update_DataTable_lastVisible(result.docs[result.docs.length - 1]);
      Vue.set(this.applications, this.page - 1, result.docs.map(a => a.data()));
    }
  },
});
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
