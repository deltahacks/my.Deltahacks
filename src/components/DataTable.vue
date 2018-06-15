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
    <v-data-table :dark=false :search="search" :headers="headers" :items="fake" hide-actions item-key="name">
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td class="text-md-left">{{ props.item.name }}</td>
          <td class="text-md-left">{{ props.item.email }}</td>
          <td class="text-xs-left">{{ props.item.university }}</td>
          <td class="text-xs-left">{{ props.item.applied }}</td>
          <td class="text-xs-left">{{ props.item.phone }}</td>
          <td class="text-xs-left">{{ props.item.age }}</td>
          <td class="text-md-left fonta">
            <i class="fab fa-github"></i>
            <i class="fab fa-linkedin-in"></i>
            <i class="fas fa-globe"></i>
            <i class="far fa-file-alt"></i>
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
import fake from "@/helpers/fake";
import ApplicantDropdown from "@/components/ApplicantDropdown.vue";

export default {
  name: "DataTable",
  methods: {
    f() {
      console.log(fake);
    }
  },
  components: {
    ApplicantDropdown
  },
  data() {
    return {
      current: "All Applicants",
      items: ["All Applicants", "Accepted Applicants", "Unaccepted Applicants"],
      search: "",
      rating: null,
      fake,
      test: "423423423",
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Email", value: "email" },
        { text: "University", value: "university" },
        { text: "Applied", value: "applied" },
        { text: "Phone", value: "phone" },
        { text: "Age", value: "age" },
        { text: "Rate", value: "rate" }
      ]
    };
  }
};
</script>

<style>
.card_title {
  font-weight: 500;
}
</style>
