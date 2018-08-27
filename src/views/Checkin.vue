<template>
    <v-app>
        <v-btn class="checkinButtons">Add meal</v-btn>
    </v-app>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    console.log(this.$route.params.id);
  },
};
</script>

<style scoped>
.checkinButtons {
    height: 10%;
}
</style>
