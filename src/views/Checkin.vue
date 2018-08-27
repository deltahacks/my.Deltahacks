<template>
    <v-app>
      <Navbar/>
        <h2>{{$route.params.id}}</h2>
        <v-btn class="checkinButtons">Add meal</v-btn>
        <v-btn @click="checkin" class="checkinButtons">Check in</v-btn>
        <div class="input-prepend-append">
          <button type="button" class="btn btn-prepend" v-on:click='removeMeal()'> - </button>
          <input type="number" min="0" max="5" id="meals" name='f' value="0">
          <button type="button" class="btn btn-append" v-on:click='addMeal()'> + </button>
        </div>
    </v-app>
</template>

<script>
import db from '../private/firebase_init';
import Navbar from '@/components/Navbar.vue';
export default {

    data() {
        return { d: 'l' };
        meals: 0;
    },
    components: {
        Navbar,
    },
    methods: {
        checkin() {
            db
                .collection('hackathon')
                .doc('DHV')
                .collection('checked in')
                .doc(this.$route.params.id.toLowerCase())
                .set({
                    checkedIn: true,
                    time: new Date(),
                    by: this.$store.state.firebase.auth().currentUser.email.toLowerCase(),
                })
                .then(() => console.log('Successfully written'))
                .catch(err => console.log(err));
        },
        addMeal() {
          var mealNum = document.getElementById("meals");
          if (mealNum.value < 5) {
            mealNum.value = parseInt(mealNum.value) + 1;
          }
        },
        removeMeal() {
          var mealNum = document.getElementById("meals");
          if (mealNum.value > 0) {
            mealNum.value = parseInt(mealNum.value) - 1;
          }
        }
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
