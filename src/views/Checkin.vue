<template>
    <v-app>
        <Navbar/>
        <h2>{{$route.params.id}}</h2>
        <h2> Last status: </h2>
        <v-btn class="checkinButtons">Add meal</v-btn>
        <v-btn @click="checkin" class="checkinButtons">Check in</v-btn>
        <v-btn @click="signin" class="checkinButtons">Sign in building</v-btn>
        <v-btn @click="signout" class="checkinButtons">Sign out building</v-btn>
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
                    whereabouts: [{ building: 'ETB' }],
                })
                .then(() => console.log('Successfully written'))
                .catch(err => console.log(err));
        },
        signin() {
            return navigator.geolocation.getCurrentPosition(position => {
                db
                    .collection('hackathon')
                    .doc('DHV')
                    .collection('checked in')
                    .doc(this.$route.params.id.toLowerCase())
                    .update({
                        whereabouts: this.$store.state.firebase.firestore.FieldValue.arrayUnion({
                            building: 'ETB',
                            geolocation: [position.coords.latitude, position.coords.longitude],
                            time: new Date(),
                            by: this.$store.state.firebase.auth().currentUser.email.toLowerCase(),
                            type: 'incoming',
                        }),
                    })
                    .then(() => console.log('Successfully written'))
                    .catch(err => console.log(err));
            });
        },
        signout() {
            return navigator.geolocation.getCurrentPosition(position => {
                db
                    .collection('hackathon')
                    .doc('DHV')
                    .collection('checked in')
                    .doc(this.$route.params.id.toLowerCase())
                    .update({
                        whereabouts: this.$store.state.firebase.firestore.FieldValue.arrayUnion({
                            building: 'ETB',
                            geolocation: [position.coords.latitude, position.coords.longitude],
                            time: new Date(),
                            by: this.$store.state.firebase.auth().currentUser.email.toLowerCase(),
                            type: 'outgoing',
                        }),
                    })
                    .then(() => console.log('Successfully written'))
                    .catch(err => console.log(err));
            });
        },
        addMeal() {
            const mealNum = document.getElementById('meals');
            if (mealNum.value < 5) {
                mealNum.value = parseInt(mealNum.value) + 1;
            }
        },
        removeMeal() {
            const mealNum = document.getElementById('meals');
            if (mealNum.value > 0) {
                mealNum.value = parseInt(mealNum.value) - 1;
            }
        },
    },
    mounted() {},
};
</script>

<style scoped>
.checkinButtons {
    height: 10%;
}
</style>
