<template>
  <div class="background">
    <div class="container">
      <h1 class="title">{{ title }}</h1>
      <input class="field" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  props: ['title'],
});
</script>

<style scoped>
.title {
  font-size: 2.5em;
  color: white;
}

.container {
  color: white;
  padding: 50px;
  text-align: center;
  background-color: rgba(53, 61, 56, 0.452);
  border-radius: 20px;
  height: 250px;
}

.field {
  margin: 80px;
  background: transparent;
  border: transparent;
  border-bottom: 1px solid white;
  width: 75%;
  color: white;
  font-size: 1.5em;
}

.field:focus {
  outline: none;
  /*   border-bottom: 2px solid white; */
}
</style>
