<template>
  <v-app id="app">
    <router-view/>
  </v-app>
</template>

<script>
import Navbar from '@/components/layouts/Navbar'
export default {
  name: 'App',
  components :{
    Navbar
  }
}
</script>

<style>

</style>
