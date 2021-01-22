<template>
  <div>
    <v-select :items="allNewsTitles" label="News Title" outlined v-model="newUpdateTitle"></v-select>
    <v-textarea
      v-model="newUpdateBody"
      label="NewUpdate"
      counter
      maxlength="999"
      full-width
      single-line
    ></v-textarea>
    <v-btn color="red" @click="postMessage()">Post</v-btn>
    </div>

</template>

<script lang="ts">
import firebase from 'firebase';
import Vue from 'vue';
import { allNewsTitles } from '../data';
import db from '../firebase_init';

interface NewsData {
    newUpdateBody: string,
    newUpdateTitle: string,
    allNewsTitles: any
}

interface News {
    datePosted: Date,
    postedBy: string,
    title: string,
    body: string,
    hidden: boolean
}

export default Vue.extend({
  name: 'News',
  data(): NewsData {
    return {
      newUpdateBody: '',
      newUpdateTitle: '',
      allNewsTitles,
    };
  },
  methods: {
    async postMessage() {
      const body = {
        datePosted: new Date().toJSON(),
        postedBy: this.$store.state.firebase.auth().currentUser.email.toLowerCase(),
        title: this.newUpdateTitle,
        body: this.newUpdateBody,
        hidden: false,
      };

      try {
        await db.collection('DH7').doc('news').collection('all').add(body);
        console.log('Successfully posted update!');
      } catch (e) {
        console.log('Post failed');
        console.log(e);
      }
    },
  },
});

</script>

<style>

</style>
