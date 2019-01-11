<template>
  <div id='app'>
    <v-app id='inspire'>
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <form action>
                <h2>{{header}}</h2>
                <v-text-field
                  :disabled='true'
                  name='name'
                  label='Name'
                  id='name'
                  autocomplete='off'
                  v-model='fullName'
                ></v-text-field>
                <!-- <v-text-field name='email' label='Email' autocomplete='off' v-model='application.email'></v-text-field> -->
                <v-select
                  :disabled='true'
                  :items='sizes'
                  name='shirt_size'
                  label='Shirt Size'
                  :autocomplete='false'
                  v-model='application.shirt_size'
                ></v-select>
                <v-text-field
                  :disabled='true'
                  name='dietary_restriction'
                  label='Dietary Restriction'
                  autocomplete='off'
                  v-model='application.dietary_restrictions'
                ></v-text-field>
                <v-text-field
                  :disabled='true'
                  name='university'
                  label='University'
                  autocomplete='off'
                  v-model='application.university'
                ></v-text-field>
                <v-container fluid fill-height>
                  <v-flex>
                    <v-text-field
                      :disabled='true'
                      name='phone'
                      label='Phone'
                      autocomplete='off'
                      v-model='application.phone'
                    ></v-text-field>
                  </v-flex>
                  <v-flex></v-flex>
                  <v-flex>
                    <v-text-field
                      :disabled='true'
                      name='emergency_phone'
                      label='Emergency Phone'
                      autocomplete='off'
                      v-model='application.emergency_phone'
                    ></v-text-field>
                  </v-flex>
                </v-container>
                <v-text-field
                  :disabled='true'
                  name='location'
                  label='Coming From'
                  autocomplete='off'
                  v-model='application.location'
                ></v-text-field>
                <v-text-field
                  :disabled='true'
                  name='gender'
                  label='Gender'
                  autocomplete='off'
                  v-model='safeGender'
                ></v-text-field>
                <v-container fluid fill-height>
                  <v-flex>
                    <v-btn color='green' @click='checkin' large>Check In</v-btn>
                  </v-flex>
                  <v-flex>
                    <v-btn color='blue' @click='openBadge' large>Open Badge</v-btn>
                  </v-flex>
                </v-container>
              </form>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-snackbar v-model="banner" top color="green" right :timeout="3000">
          {{bannerMessage}}
          <v-btn color="white" flat @click="banner = false">
              Close
          </v-btn>
      </v-snackbar>
    </v-app>
  </div>
</template>

<script>
import firebase from 'firebase';
import pdf from 'jspdf';
import QR from 'qrcode';
import db from '../private/firebase_init';

export default {
  name: 'LiveDesk',
  data: () => ({
    drawer: null,
    email: null,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    bannerMessage: '',
    banner: false,
    header: 'No QR code has been scanned yet.',
    application: {
      name: '',
      lastname: '',
      email: '',
      shirt_size: null,
      dietary_restrictions: null,
      university: null,
      phone: '',
      emergency_phone: '',
      emergency_name: '',
      location: '',
      birthday: '',
      gender: ''
    }
  }),
  computed: {
    safeGender() {
      const { gender } = this.application;
      return gender != '' ? gender : 'N/A';
    },
    fullName() {
      return `${this.application.name} ${this.application.lastname}`;
    }
  },
  methods: {
    getUserApplication(email) {
      return new Promise((resolve, reject) => {
        db.collection('decisions')
          .doc('DH5')
          .collection('pending')
          .doc(email)
          .get()
          .then(snap => {
            const data = this.parseApplication(snap.data());
            if (snap.exists) resolve(data);
            else reject(`Failed to retrieve application for ${email}.`);
          });
      });
    },
    // append any other safety checks needed.
    // probably won't need any others.
    parseApplication(app) {
      if (!app.gender) {
        app.gender = '';
      }
      return app;
    },
    //   Make sure this stays consistent with checkin function of ./Checkin.vue
    checkin() {
      if (this.application.email === '') return;
      db.collection('hackathon')
        .doc('DHV')
        .collection('checked in')
        .doc(this.application.email)
        .set({
          checkedIn: true,
          time: new Date(),
          by: this.$store.state.firebase.auth().currentUser.email.toLowerCase(),
          whereabouts: [
            {
              initialCheckin: true,
              building: 'ETB',
              time: new Date(),
              by: this.$store.state.firebase
                .auth()
                .currentUser.email.toLowerCase(),
              type: 'incoming'
            }
          ],
          meals: 0
        })
        .then(() => {
          this.bannerMessage = `${this.fullName} has been checked in!`;
          this.banner = true;
          console.log('Successfully written');
        })
        .catch(err => console.log(err));
    },
    // TODO: Once badge template is created adjust this to use that.
    async openBadge() { // inserts QR Code of email into green rectangle
      const badge = this.createTemplate();
      const code = await QR.toDataURL(this.application.email);
      badge.addImage(code, 'JPEG', 90, 50, 30, 30);
      badge.save(`${this.application.email}_badge`);
    },
    // should insert / generate the back of DH5 badge.
    createTemplate() {
      const t = new pdf();
      t.text(90,10,'DeltaHacks V');
      t.text(85,20, 'Event information');
      return t;
    },
  },
  beforeMount() {
    const admin = firebase.auth().currentUser.email;
    const ref = db
      .collection('hackathon')
      .doc('DH5')
      .collection('FrontDesk')
      .doc(admin);
    ref.onSnapshot(async snap => {
      if (snap.exists) {
        const { scanned } = snap.data();
        const app = await this.getUserApplication(scanned).catch(err =>
          console.error(err)
        );
        this.application = app;
        this.header = app.email;
      } else {
        this.header = `Account ${admin} not found in front desk collection.`;
      }
    });
  }
};
</script>