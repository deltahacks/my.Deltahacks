<template>
    <v-app class="dashboard background">
        <!-- <Navigation class="mobile"/> -->
        <Navbar2 class="navbar1" />
        <div class="container-status100">

            <div class="hide">
                <div class="wrap-status100">
                    <h1 v-show="step === 0">You haven't started yet! Go
                        <a href="/apply" class="currentStatus">here</a> to begin.</h1>
                    <h1 v-show="step > 0">{{currentHeader}}</h1>
                    <br>
                    <v-stepper alt-labels class="transp">
                        <v-stepper-header>
                            <v-stepper-step step="1" :complete="step > 0">{{baseStep}}</v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step step="2" :complete="step > 1">Submitted</v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step step="3" :complete="step > 2">Processing</v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step step="4" :complete="step > 3">Decision</v-stepper-step>
                        </v-stepper-header>
                    </v-stepper>
                </div>
                <br><br><br><br>
                <div>
                    <v-layout row wrap>
                        <v-flex d-flex md3 :key="media.icon" v-for="media in social">
                            <div>
                                <v-btn class="mx-3" dark icon :href="media.link">
                                    <v-icon size="24px">{{ media.icon }}</v-icon>
                                </v-btn>
                            </div>
                        </v-flex>
                    </v-layout>
                </div>
            </div>

            <div class="mobile">
                <div class="wrap-status101">
                    <h1 v-show="step === 0">You haven't started yet! Go
                        <a href="/apply" class="currentStatus">here</a> to begin.</h1>
                    <h1 v-show="step > 0">{{currentHeader}}</h1>
                    <v-card-text></v-card-text>
                    <v-stepper vertical class="wrap-status201">
                        <v-stepper-step :complete="step > 0" step="1">{{baseStep}}</v-stepper-step>
                        <v-stepper-step :complete="step > 1" step="2">Submitted</v-stepper-step>
                        <v-stepper-step :complete="step > 2" step="3">Processing</v-stepper-step>
                        <v-stepper-step :complete="step > 3" step="4">Decision</v-stepper-step>
                    </v-stepper>
                </div>
                <div style="margin-top: 5%;">
                    <v-layout row wrap>
                        <v-flex d-flex md3 :key="media2.icon" v-for="media2 in social">
                            <div>
                                <v-btn class="mx-3" dark icon :href="media2.link">
                                    <v-icon size="24px">{{ media2.icon }}</v-icon>
                                </v-btn>
                            </div>
                        </v-flex>
                    </v-layout>
                </div>
            </div>
        </div>
    </v-app>
</template>

<script>
/* eslint-disable no-unused-expressions */
import { auth } from 'firebase';
import db from '../private/firebase_init';
import Navbar from '@/components/Navbar.vue';
import Navbar2 from '@/components/Navbar2.vue';
import Navigation from '@/components/Navigation.vue';
import { validationMixin } from 'vuelidate';
import { required, maxLength, email } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import { allUniversities } from '../private/data';

export default {
    mixins: [validationMixin],
    name: 'Status',
    data() {
        return {
            social: [
                {
                    link: 'https://twitter.com/deltahacks',
                    icon: 'fab fa-twitter',
                },
                {
                    link: 'https://www.facebook.com/thedeltahacks/',
                    icon: 'fab fa-facebook',
                },
                {
                    link: 'https://www.instagram.com/deltahacks/',
                    icon: 'fab fa-instagram',
                },
                {
                    link: 'https://www.linkedin.com/company/deltahacks/',
                    icon: 'fab fa-linkedin',
                },
            ],
            parent: this,
            picker: null,
            date: '2000-01-01',
            university: null,
            allUniversities,
            dropzoneOptions: {
                url: 'https://httpbin.org/post',
                thumbnailWidth: 150,
                maxFilesize: 0.5,
                headers: { 'My-Awesome-Header': 'header value' },
                addRemoveLinks: true,
                acceptedFiles: 'application/pdf',
            },
            subheaders: [
                "You haven't submitted your application yet. Make sure to submit by Nov 15.",
                "You've submitted your application, stay tuned for updates.",
                'This application is under review.',
                "Congratulations, you've been accepted!",
                'Unfortunately we cannot offer you an invitation this time.',
            ],
            application: {
                name: '',
                email: '',
                school_year: null,
                shirt_size: null,
                dietary_restrictions: null,
                hackathons: null,
                github: '',
                linkedin: '',
                website: '',
                phone: '',
                emergency_phone: '',
            },
            links: ['Home', 'About', 'Contact'],
            story: '',
            custom: true,
            name: '',
            step: 0,
            email: '',
            select: null,
            items: ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Fifth Year'],
            hackathons: ['This is my first one', '2', '3', '5+', '10+'],
            food: ['Vegetarian', 'Vegan', 'Halal', 'Gluten Free', 'Kosher'],
            shirts: ['XS', 'S', 'M', 'L', 'XL'],
            checkbox: false,
        };
    },
    validations: {
        name: { required, maxLength: maxLength(10) },
        email: { required, email },
        select: { required },
        checkbox: { required },
    },
    components: {
        Navbar,
        Navigation,
        Navbar2,
    },
    computed: {
        baseStep() {
            console.log(this.step === 0);
            if (this.step === 0) {
                return 'Not Started';
            }
            return 'In Progress';
        },
        currentHeader() {
            return this.subheaders[this.step - 1];
        },
    },
    methods: {
        updateStep(doc) {
            if (doc.exists) {
                switch (doc.data().status) {
                    case 'in progress':
                        this.step = 1;
                        break;
                    case 'submitted':
                        this.step = 2;
                        break;
                    case 'pending':
                        this.step = 2;
                        break;
                    case 'processing':
                    case 'accepted':
                    case 'rejected':
                        this.step = 3;
                        break;
                    case 'decided':
                        this.step = 4;
                        break;
                    default:
                        this.step = 0;
                }
            } else {
                console.log('Document not found!');
            }
        },
    },
    beforeMount() {
        console.log('mounted');
        const appEmail = auth().currentUser.email;
        db.collection('users')
            .doc(appEmail)
            .onSnapshot(snap => {
                this.updateStep(snap);
            });
    },
};
</script>
<style scoped src='../assets/css/status.css'>
.regular {
    text-decoration: none;
    color: inherit;
}
#footertext {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-weight: bold;
    font-size: 1.3em;
    float: left;
}
</style>
