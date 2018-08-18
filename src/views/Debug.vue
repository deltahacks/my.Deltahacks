<template>
  <div class="main">
    <div class="buttons">
      <v-btn>h</v-btn>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase';
import functions from 'firebase/functions';

export default {
    name: 'Signup',
    data: () => ({
        drawer: null,
    }),
    methods: {
        tester() {
            console.log(this.vuex_email);
        },
    },
};
</script>
<style scoped>
.main {
    background-color: lightgray;
}

.buttons {
    position: relative;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
}
</style>
