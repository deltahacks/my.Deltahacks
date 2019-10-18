<template>
  <div class="container">
    <v-checkbox
        :error-messages="error"
        v-model="inputVal"
    >
      <template v-slot:label>
        <div v-html="title" />
      </template>
    </v-checkbox>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: [
    'title',
    'error',
    'requestUpdate',
    'error',
    'value'
  ],
  data() {
    return { inputVal: this.value }
  },
  watch: {
    inputVal(value) {
      this.$emit('input', value);
      this.requestUpdate();
    }
  },
});
</script>

<style scoped>

.container {
  width: 50%;
}

.container >>> .accent--text {
  color: #1976d2 !important;
  caret-color: #1976d2 !important;
}

.container >>> .v-input--selection-controls__input {
  margin-right: 25px;
}

.container >>> .v-label {
  font-size: 1.35rem !important;
  color: rgba(0,0,0,.54);
}

.container >>> .v-label a {
  color: #145faa;
}

.container >>> .v-messages {
  font-size: 1.25rem !important;
}

@media only screen and (max-width: 960px) {
  .container {
    width: 90%;
  }
}

@media only screen and (max-width: 1280px) and (min-width: 961px) {
  .container {
    width: 70%;
  }
}

</style>