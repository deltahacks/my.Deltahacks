<template>
  <v-dialog v-model="isOpen" max-width="350" content-class="dialog__container">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>{{ body }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- Define actions as children -->
        <slot></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  props: ['open', 'title', 'body', 'value'],
  computed: {
    isOpen: {
      get() {
        return this.value
      },
      set(value) {
          this.$emit('input', value)
      }
    }
  }
});
</script>

<style lang="scss">

.dialog__container.v-dialog {
  border-radius: 20px;

  .v-card__actions {
    padding: 4px 12px 12px;
  }

  & > div {
    background-color: #3c7576;
    color: rgba(255, 255, 255, 0.87);
  }

  .v-btn__content {
    background-color: #0000;
  }

  .v-btn {
    border-radius: 8px;
    background-color: #4b9f8cc7 !important;
    color: rgba(255, 255, 255, 0.87);

    &.warning {
      background-color: #3ca3b1a8 !important;
    }
  }
}

</style>