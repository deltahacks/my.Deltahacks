<template>
  <div class="background">
    <div class="container" v-scroll-reveal>
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
      <div
        v-else-if="inputType == 'date'"
        class="date-row"
      >
        <v-select
          v-for="(input,i) in dates"
          :key="i"
          :items="input.options"
          @input="onDate(input.label,$event)"
          :label="input.label"
          v-model="input.value"
        ></v-select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';
import VueScrollReveal from 'vue-scroll-reveal';

import { months, years, days } from '../data';

Vue.use(VueScrollReveal, {
  class: 'v-scroll-reveal', // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
  duration: 1000,
  scale: 1.35,
  distance: '10px',
  mobile: true,
  reset: true,
});
export default Vue.extend({
  props: ['title', 'value', 'requestUpdate', 'inputType', 'selectData'],
  data() {
    return {
      dates: [],
    } as {dates: any};
  },
  methods: {
    onChange(event) {
      this.$emit('input', event);
      this.requestUpdate();
    },
    onDate(type: string, value: any) {
      if (type.toLowerCase() === 'year') {
        this.$emit('input', firebase.firestore.Timestamp.fromDate(new Date(value, months.indexOf(this.dates[1].value), this.dates[2].value)));
      } else if (type.toLowerCase() === 'month') {
        this.$emit('input', firebase.firestore.Timestamp.fromDate(new Date(this.dates[0].value, months.indexOf(value), this.dates[2].value)));
      } else {
        this.$emit('input', firebase.firestore.Timestamp.fromDate(new Date(this.dates[0].value, months.indexOf(this.dates[1].value), value)));
      }
      this.requestUpdate();
    },
    updateDates() {
      if (this.inputType === 'date') {
        this.dates = [
          { label: 'Year', options: years, value: new Date(this.value.toDate()).getFullYear() },
          { label: 'Month', options: months, value: months[new Date(this.value.toDate()).getMonth()] },
          { label: 'Day', options: days, value: new Date(this.value.toDate()).getDate() },
        ];
      }
    },
  },
  mounted() {
    this.updateDates();
  },
  watch: {
    value(newVal, oldVal) {
      this.updateDates();
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

.date-row {
  display: flex;
  flex-direction: row;
}
.date-row .v-input {
  margin-right: 2%;
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

