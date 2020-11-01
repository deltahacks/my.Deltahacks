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
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details @input="bruh()"></v-text-field>
    </v-card-title>
    <v-data-table
      v-bind:peeps="peeps"
      :disable-initial-sort="true"
      :dark="false"
      :search="search"
      :headers="headers"
      :items="applications[0]"
      hide-actions
      :pagination.sync="pagination"
      item-key="contact.email"
      ref="tableref"
    >
      <template slot="items" slot-scope="props">
        <tr @click="selectRow($event, props)">
          <td class="text-md-left">{{ props.item.name.first + ' ' + props.item.name.last}}</td>
          <td class="text-md-left">{{ props.item.contact.email }}</td>
          <td class="text-xs-left">{{ props.item.academics.school }}</td>
          <td
            class="text-xs-left"
          >{{ props.item._.time_submitted.seconds ? dateFromTimestamp(props.item._.time_submitted).toLocaleDateString("en-US"):props.item._.time_submitted.toLocaleDateString("en-US") }}</td>
          <td class="text-xs-left">{{ props.item.contact.phone }}</td>
          <td class="text-xs-left">{{ getAgeFromDate(props.item.personal.birthday) }}</td>
          <td
            class="text-xs-left"
            id="numRevs"
            :title="props.item._.reviews.assignedTo.length ? assignmentToName(props.item._.reviews.assignedTo) : 'unassigned'"
          >{{ props.item._.reviews.scores.length }}/3</td>

          <td class="text-xs-right">
            <status-indicator
              v-if="$store.state.vuex_user_role == 'mod' && bigDiff(props)"
              negative
            ></status-indicator>
            <status-indicator
              v-else-if="props.item._.reviews.scores.some(e => e.reviewer == $store.state.firebase.auth().currentUser.email)"
              active
            ></status-indicator>
            <status-indicator
              v-else-if="props.item._.reviews.assignedTo && props.item._.reviews.assignedTo.includes($store.state.firebase.auth().currentUser.email.toLowerCase())"
              intermediary
            ></status-indicator>
            <status-indicator v-else semi></status-indicator>
          </td>
        </tr>
      </template>
      <template slot="expand" slot-scope="props">
        <applicant-dropdown
          id="dropdown"
          :usrname="props.item.name"
          :applicant="props.item"
          :isReviewed="props.item._.reviews.scores.some(e => e.reviewer == $store.state.firebase.auth().currentUser.email)"
          :random="3"
        />
      </template>
    </v-data-table>
    <div class="text-xs-center">
      <v-pagination id="pageButton" v-model="pagination.page" :length="numApplicants" :total-visible="15" circle></v-pagination>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { StatusIndicator } from 'vue-status-indicator';
import { functions, firestore, auth } from 'firebase';
import { mapState, mapMutations } from 'vuex';
import ApplicantDropdown from '@/components/ApplicantDropdown.vue';
import 'vue-status-indicator/styles.css';
import db from '../firebase_init';

interface State {
  pagination: any;
  rowsPerPage: number;
  numApplicants: number;
  applications: any;
  currentSet: any;
  peeps: any;
  current: string;
  items: string[];
  bucket: string;
  restriction: [string, firestore.WhereFilterOp, string | number];
  buckets: any;
  search: string;
  rating: any;
  expanded: any;
  headers: any;
}

export default Vue.extend({
  name: 'DataTable',
  data(): State {
    return {
      // lastVisible: null,
      pagination: {
        descending: false,
        page: 1,
        rowsPerPage: 50,
        sortBy: 'desc',
        totalItems: 0,
      },
      rowsPerPage: 50,
      numApplicants: 0,
      applications: {},
      currentSet: [],
      peeps: [],
      current: 'All Applicants',
      items: [
        'All Applicants',
        'Assigned to Me',
        'Accepted Applicants',
        'Rejected Applicants',
        '1/3',
        '2/3',
      ],
      bucket: 'pending',
      restriction: ['_.status', '==', 'submitted'],
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
        { text: 'Name', align: 'left', value: 'name.first' },
        { text: 'Email', value: 'contact.email' },
        { text: 'University', value: 'academic.school' },
        { text: 'Applied', value: 'applied' },
        { text: 'Phone', value: 'contact.phone' },
        { text: 'Age', value: 'age' },
        { text: 'Status', value: '_.decision' },
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
          this.restriction = ['_.status', '==', 'submitted'];
          this.changeScope([]);
          break;
        case 'Assigned to Me':
          this.restriction = [
            '_.reviews.assignedTo',
            'array-contains',
            auth().currentUser!.email as string,
          ];
          this.changeScope([]);
          break;
        case 'Accepted Applicants':
          this.restriction = ['_.decision', '==', 'accepted'];
          this.changeScope([]);
          break;
        case 'Rejected Applicants':
          this.restriction = ['_.decision', '==', 'rejected'];
          this.changeScope([]);
          break;
        case '1/3':
          this.restriction = ['_.status', '==', 'submitted'];
          this.changeScope(['1/3']);
          break;
        case '2/3':
          this.restriction = ['_.status', '==', 'submitted'];
          this.changeScope(['2/3']);
          break;
        default:
          break;
      }
    },
    assignmentToName(emails) {
      let res = '';
      emails.forEach((val) => {
        if (this.$store.state.allAdmins && this.$store.state.allAdmins[val]) { res += `${this.$store.state.allAdmins[val]}, `; }
      });
      return res;
    },
    bigDiff(prop) {
      if (!prop || !prop.item._.reviews.scores[1]) return false;
      const M = 5; // The difference threshold you want to check for.
      const { scores } = prop.item._;
      let maxDiff = Math.abs(scores[1].score - scores[0].score);
      const minEle = Math.min(...scores.map(r => r.score));

      for (let i = 0; i < scores.length; i++) {
        const current = Math.abs(scores[i].score - minEle);
        if (current > maxDiff) maxDiff = current;
      }

      return maxDiff >= M;
    },
    selectRow(e, props) {
      props.item._.reviews.scores.forEach(r => console.log(r.score));
      console.log(props);
      props.expanded = !props.expanded;
      const offset = 50 * props.index;
      window.scrollTo(0, window.screen.height / 2 + offset);
    },
    async changeScope(customFilter: string[]) {
      const result = await db
        .collection(this.$store.state.currentHackathon)
        .doc('applications')
        .collection('all')
        .orderBy('_.index')
        .where(...this.restriction)
        .get();
      let resultsToUse = result.docs.map((doc) => {
        const docData = doc.data();
        docData.contact.email = doc.id;
        return docData;
      });
      if (customFilter.includes('1/3') || customFilter.includes('2/3')) {
        const filter = customFilter.includes('1/3') ? 1 : 2;
        resultsToUse = resultsToUse.filter(each => each._.reviews.scores.length === filter);
      }
      this.numApplicants = Math.ceil(resultsToUse.length / this.rowsPerPage);
      this.pagination.totalItems = this.numApplicants;
      this.currentSet = resultsToUse as any;
      this.pagination.page = 1;
      this.applications = [];
      Vue.set(this.applications, 0, resultsToUse);
    },
    getAgeFromDate(bday): number {
      let bdayDate;
      try {
        bdayDate = bday;
        if (bday.seconds) {
          bdayDate = new firestore.Timestamp(bday.seconds, bday.nanoseconds).toDate();
        }
      } catch (e) {
        return 1;
      }
      return this.calculateAge(bdayDate);
    },
    dateFromTimestamp(obj) {
      return new firestore.Timestamp(obj.seconds, obj.nanoseconds).toDate();
    },
    calculateAge(birthday: Date): number {
      const ageDifMs = Date.now() - birthday.getTime();
      const ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    },
    async setNumApplicants() {
      const stats = await
      db.collection(this.$store.state.currentHackathon)
        .doc('statistics')
        .get();
      this.numApplicants = Math.ceil(stats.data()!.applications / this.rowsPerPage);
    },
    bruh() {
      setTimeout(() => {
        this.numApplicants = this.pagination.rowsPerPage ? Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage) : 0;
      }, 10);
    },
  },
  async mounted() {
    this.changeScope([]);
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

#pageButton li button {
  outline: none;
}
</style>
