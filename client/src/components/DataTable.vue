<template>
  <v-data-table
    :headers="headers"
    :items="fake"
    hide-actions
    item-key="name"
  >
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <td>{{ props.item.name }}</td>
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
        <applicant-dropdown :usrname="props.item.name"/>
    </template>
  </v-data-table>
</template>

<script>
import fake from '@/helpers/fake';
import ApplicantDropdown from '@/components/ApplicantDropdown.vue';

export default {
  name: 'DataTable',
  methods: {
    f() {
      console.log(fake);
    },
  },
  components: {
    ApplicantDropdown,
  },
  data() {
    return {
      rating: null,
      fake,
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
        { text: 'Applied', value: 'applied' },
        { text: 'Phone', value: 'phone' },
        { text: 'Age', value: 'age' },
        { text: 'Rate', value: 'rate' },
      ],
    };
  },
};
</script>

<style>

</style>
