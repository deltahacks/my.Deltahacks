<template>
  <div class="background">
    <div class="container">
      <h1 class="question" id="title1">{{ title }}</h1>
      <v-text-field
        v-if="inputType == 'text'"
        class="field red--text"
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
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,600&display=swap');
.question {
  font-size: 2.5em;
  font-weight: 600;
  color: white;
  margin: 50px;
  font-family: 'Montserrat';
}

.container {
  color: white;
  padding: 50px;
  text-align: center;
  background-color: rgba(123, 131, 126, 0.2);
  border-radius: 50px;
  height: 400px;
  width: 50%;
  margin: 50px auto;
}

.field {
  margin: 80px auto;
  color: lightgrey;
  background: transparent;
  border: transparent;
  width: 75%;
  font-size: 2.5em;
  font-family: 'Montserrat';
  text-align: center !important;
}

.field:focus {
  outline: none;
  /*   border-bottom: 2px solid white; */
}

@media only screen and (max-width: 850px) {
  .container {
  color: white;
  padding: 50px;
  text-align: center;
  background-color: rgba(53, 61, 56, 0.2);
  border-radius: 50px;
  height: 400px;
  width: 80%;
  margin: 50px auto;
}
.question {
  font-size: 2em;
  font-weight: 300;
  color: white;
  margin: 50px;
}
}
.theme--light.v-input:not(.v-input--is-disabled) input, .theme--light.v-input:not(.v-input--is-disabled) textarea {
    color: lightgrey !important;
}

@media only screen and (max-width: 400px) {
  .container {
  color: white;
  padding: 50px;
  text-align: center;
  background-color: rgba(53, 61, 56, 0.452);
  border-radius: 50px;
  height: 400px;
  width: 90%;
  margin: 50px auto;
}
.question {
  font-size: 1.5em;
  font-weight: 300;
  color: white;
  margin: 20px;
}
.field {
  margin: 100px auto;
  background: transparent;
  border: transparent;
  width: 75%;
  font-size: 1.5em;
}
}
</style>

