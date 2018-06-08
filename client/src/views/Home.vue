<template>
  <div class="home">
    <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- <applicant-dropdown/> -->
    <!-- <data-table/> -->
    <signup/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import ApplicantDropdown from '@/components/ApplicantDropdown.vue';
import DataTable from '@/components/DataTable.vue';
import Apply from '@/views/Apply.vue';
import Dashboard from '@/views/Dashboard.vue';
import ForgotPassword from '@/views/ForgotPassword.vue';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';


export default {
  name: 'home',
  components: {
    HelloWorld,
    ApplicantDropdown,
    DataTable,
    Apply,
    ForgotPassword,
    Dashboard,
    Login,
    Signup,
  },
};
</script>
