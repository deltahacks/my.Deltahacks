<template>
  <div id='app'>
    <v-app id='inspire'>
    <Navbar/>
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <form action>
                <h2>{{header}}</h2>
                <div v-if="!active">
                  <v-text-field
                    :disabled='active'
                    name='name'
                    label='Name *'
                    id='name'
                    autocomplete='off'
                    v-model='application.name'
                  ></v-text-field>
                  <v-text-field
                    :disabled='active'
                    name='email'
                    label='Email *'
                    autocomplete='off'
                    v-model='application.email'
                  ></v-text-field>
                </div>
                <div v-else>
                  <v-text-field
                    :disabled='active'
                    name='name'
                    label='Name'
                    id='name'
                    autocomplete='off'
                    v-model='fullName'
                  ></v-text-field>
                </div>
                <v-select
                  :disabled='active'
                  :items='sizes'
                  name='shirt_size'
                  label='Shirt Size'
                  :autocomplete='false'
                  v-model='application.shirt_size'
                ></v-select>
                <v-text-field
                  :disabled='active'
                  name='dietary_restriction'
                  label='Dietary Restriction'
                  autocomplete='off'
                  v-model='application.dietary_restrictions'
                ></v-text-field>
                <v-text-field
                  :disabled='active'
                  name='university'
                  v-model='application.university'
                  autocomplete='off'
                  label='University'
                ></v-text-field>
                <v-container fluid fill-height>
                  <v-flex>
                    <v-text-field
                      :disabled='active'
                      name='phone'
                      mask='phone'
                      label='Phone'
                      autocomplete='off'
                      v-model='application.phone'
                    ></v-text-field>
                  </v-flex>
                  <v-flex></v-flex>
                  <v-flex>
                    <v-text-field
                      mask='phone'
                      :disabled='active'
                      name='emergency_phone'
                      label='Emergency Phone'
                      autocomplete='off'
                      v-model='application.emergency_phone'
                    ></v-text-field>
                  </v-flex>
                </v-container>
                <v-text-field
                  :disabled='active'
                  name='location'
                  label='Coming From'
                  autocomplete='off'
                  v-model='application.location'
                ></v-text-field>
                <v-select
                  :disabled='active'
                  name='gender'
                  label='Gender'
                  :items="['M', 'F', 'Other']"
                  v-model='safeGender'
                ></v-select>
                <v-container fluid fill-height>
                  <v-flex>
                    <v-btn color='green' :disabled="!active" @click='checkin' large>Check In</v-btn>
                  </v-flex>
                  <v-flex>
                    <v-btn color='blue' :disabled="!active" @click='openBadge' large>Open Badge</v-btn>
                  </v-flex>
                  <v-flex v-if="!active">
                    <v-menu offset-y>
                      <v-btn slot="activator" color="orange" depressed large dark id="register">Register
                      </v-btn>
                      <v-list>
                        <v-list-tile
                          @click="register('Walkins')"
                        >
                          <v-list-tile-title>Walk In</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile
                          @click="register('Sponsors')"
                        >
                          <v-list-tile-title>Sponsor</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile
                          @click="register('Mentors')"
                        >
                          <v-list-tile-title>Mentor</v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                  </v-flex>
                  <v-flex v-if="!active">
                    <v-dialog v-model="confirm" persistent max-width="400">
                      <!-- <v-btn color="orange" slot="activator" large>Walk In</v-btn> -->
                      <v-card>
                          <v-card-title class="headline">Are you sure you'd like to register {{application.email}}?</v-card-title>
                          <v-card-text>Make sure you've filled all the fields first!</v-card-text>
                          <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="red" flat @click.native="confirm = false">No</v-btn>
                              <v-btn color="green" flat @click="addWalkIn">Yes</v-btn>
                          </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-flex>
                  <v-flex v-else>
                    <v-btn color="red" @click="reset" large>Reset Form</v-btn>
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
      <v-snackbar v-model="error" top color="red" right :timeout="6000">
          {{errorMessage}}
          <v-btn color="white" flat @click="error = false">
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
import Navbar from '@/components/Navbar.vue';
import db from '../private/firebase_init';

export default {
  name: 'LiveDesk',
  components: {
    Navbar,
  },
  data: () => ({
    drawer: null,
    admin: firebase.auth().currentUser.email,
    email: null,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    bannerMessage: '',
    error: false,
    errorMessage: '',
    banner: false,
    confirm: false,
    header: 'No QR code has been scanned yet.',
    active: false,
    emptyApp: {
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
    },
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
    },
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
    reset() {
      const admin = firebase.auth().currentUser.email
      const ref = db
      .collection('hackathon')
      .doc('DH5')
      .collection('FrontDesk')
      .doc(admin);
      ref.get().then((snap) => {
        if (snap.exists) {
          const data = snap.data();
          data.scanned = '';
          ref.set(data);
        }
      });
    },
    register(target) {
      const app = this.application;
      if (app.email === '' || app.name === '') {
        this.rejectRegistration();
        return;
      }
      db.collection('hackathon').doc('DH5').collection(target).doc(app.email).set(app);
      this.banner = true;
      this.bannerMessage = `${this.application.email} has been registered under ${target}!`;
      this.confirm = false;
    },
    rejectRegistration() {
      this.error = true;
      this.errorMessage = `Could not register person as one of 'Name' or 'Email' was left blank.`;
    },
    getUserApplication(email) {
      return new Promise((resolve, reject) => {
        if (email.length === 0) resolve({found: false, data: {}});

        db.collection('decisions')
          .doc('DH5')
          .collection('pending')
          .doc(email)
          .get()
          .then(snap => {
            const data = this.parseApplication(snap.data());
            if (snap.exists) resolve({
              data,
              found: true,
            });
            else resolve({
              found: false,
              data: {},
            });
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
        .doc('DH5')
        .collection('Checked In')
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
    async openBadge() {
      const badge = this.createTemplate();
      const QRImage = await QR.toDataURL(this.application.email);
      badge.addImage(QRImage, 'JPEG', 14, 40, 15, 15);
      badge.save(`DH5_${this.application.name}${this.application.lastname}`);
    },
    // should insert / generate the back of DH5 badge.
    createTemplate() {
      const t = new pdf('p','mm', [200, 125]);
      t.text(5,10,'DeltaHacks V');
      t.text(0,20, 'Event information');
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
        const result = await this.getUserApplication(scanned).catch(err =>
          console.error(err)
        );
        if (result.found) {
          this.application = result.data;
          this.header = result.data.email;
          this.active = true;
        } else {
          this.application = this.emptyApp;
          this.header = 'No target attendee detected.'
          this.active = false;
        }
      } else {
        this.header = `Account ${admin} not found in front desk collection.`;
      }
    });
  }
};
</script>