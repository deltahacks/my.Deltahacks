<template>
  <!-- A component for testing stuff out -->
  <v-app>
    <parallax-container class="horizontal-card">

      <parallax-element class="text-container" :parallaxStrength="-5" :type="'translation'">
        <h2>'translation'</h2>
      </parallax-element>

      <parallax-element class="background-image" :parallaxStrength="-10" :type="'translation'">
        <img src="http://deltahacks.com/img/logolarge.png" alt="">
      </parallax-element>

    </parallax-container>
  </v-app>
</template>

<script>
export default {
  name: "Playground",
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>
