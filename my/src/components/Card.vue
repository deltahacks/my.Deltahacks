<template>
  <div class="background">
    <div class="container">
      <h1 class="title">{{ title }}</h1>
      <v-text-field
        v-if="inputType == 'text'"
        class="field"
        :value="value"
        @input="onChange($event)"
      ></v-text-field>
      <v-select
        v-else-if="inputType == 'single-select'"
        :items="selectData"
        prepend-icon="map"
        single-line
        :value="value"
        @input="onChange($event)"
      ></v-select>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  props: ['title', 'value', 'requestUpdate', 'inputType', 'selectData'],
  methods: {
    onChange(event) {
      this.$emit('input', event);
      this.requestUpdate();
    },
  },
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
  width: 75%;
  font-size: 1.5em;
}

.field:focus {
  outline: none;
  /*   border-bottom: 2px solid white; */
}
</style>
