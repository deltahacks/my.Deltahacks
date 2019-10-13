<template>
<div>
  <head>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"
      integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt"
      crossorigin="anonymous"
    />
  </head>
  <div class="container-login100 background">
    <!-- "style="background-image: url('https://wallpapersite.com/images/pages/pic_w/14088.png');" -->
      <h1 class="hellotext">Hello.</h1>
     <img src="../assets/vi2.png" draggable="false" class="back-vi" />
  </div>
  
</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Login',
  mounted() {},
  props: {
    source: String,
  },
  watch: {
    loader() {
      const l: any = this.loader;
      this[l] = !this[l];

      setTimeout(() => {
        this[l] = false;
      }, 3000);
      this.loader = null;
    },
  },
});
</script>
<style scoped src='../assets/css/hello.css'>
</style>
