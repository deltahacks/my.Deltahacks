<template>
    <v-app>
        <h2>{{$route.params.id}}</h2>
        <v-btn class="checkinButtons">Add meal</v-btn>
        <v-btn @click="checkin" class="checkinButtons">Check in</v-btn>
    </v-app>
</template>

<script>
import db from '../private/firebase_init';
export default {
    data() {
        return { d: 'l' };
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
