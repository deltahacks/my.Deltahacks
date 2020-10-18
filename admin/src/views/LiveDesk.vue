<template>
  <div id="app">
    <v-app id="inspire">
      <Navbar />
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <form action>
                <h2>{{header}}</h2>
                <div v-if="!active">
                  <v-text-field
                    :disabled="active"
                    name="name"
                    label="Name *"
                    id="name"
                    autocomplete="off"
                    v-model="application.name.first"
                  ></v-text-field>
                  <v-text-field
                    :disabled="active"
                    name="email"
                    label="Email *"
                    autocomplete="off"
                    v-model="application.contact.email"
                  ></v-text-field>
                </div>
                <div v-else>
                  <v-text-field
                    :disabled="active"
                    name="name"
                    label="Name"
                    id="name"
                    autocomplete="off"
                    v-model="fullName"
                  ></v-text-field>
                </div>
                <v-text-field
                  :disabled="active"
                  name="university"
                  v-model="application.academics.school"
                  autocomplete="off"
                  label="University/Organization *"
                ></v-text-field>
                <v-select
                  :disabled="active"
                  :items="sizes"
                  name="shirt_size"
                  label="Shirt Size"
                  :autocomplete="false"
                  v-model="application.logistics.shirt_size"
                ></v-select>
                <v-text-field
                  :disabled="active"
                  name="dietary_restriction"
                  label="Dietary Restriction"
                  autocomplete="off"
                  v-model="application.logistics.diet_restrictions"
                ></v-text-field>
                <v-container fluid fill-height>
                  <v-flex>
                    <v-text-field
                      :disabled="active"
                      name="phone"
                      mask="phone"
                      label="Phone"
                      autocomplete="off"
                      v-model="application.contact.phone"
                    ></v-text-field>
                  </v-flex>
                  <v-flex></v-flex>
                  <v-flex>
                    <v-text-field
                      mask="phone"
                      :disabled="active"
                      name="emergency_phone"
                      label="Emergency Phone"
                      autocomplete="off"
                      v-model="application.emergency.phone"
                    ></v-text-field>
                  </v-flex>
                </v-container>
                <v-text-field
                  :disabled="active"
                  name="location"
                  label="Coming From"
                  autocomplete="off"
                  v-model="application.logistics.traveling_from"
                ></v-text-field>
                <v-container fluid fill-height>
                  <v-flex>
                    <v-btn
                      color="green"
                      :disabled="!active"
                      @click="checkin('attendee')"
                      large
                    >Check In</v-btn>
                  </v-flex>
                  <v-flex>
                    <v-btn color="blue" @click="openBadge" large>Open Badge</v-btn>
                  </v-flex>
                  <v-flex v-if="!active">
                    <v-menu offset-y>
                      <v-btn
                        slot="activator"
                        color="orange"
                        depressed
                        large
                        dark
                        id="register"
                      >Register</v-btn>
                      <v-list>
                        <v-list-tile @click="register('walkins')">
                          <v-list-tile-title>Walk In</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="register('sponsors')">
                          <v-list-tile-title>Sponsor</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="register('mentors')">
                          <v-list-tile-title>Mentor</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="register('execs')">
                          <v-list-tile-title>Exec</v-list-tile-title>
                        </v-list-tile>
                        <v-list-tile @click="register('volunteers')">
                          <v-list-tile-title>Volunteer</v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
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
      <v-btn fab dark large color="green">
        <h2>{{ !application.logistics.shirt_size ? '?' : application.logistics.shirt_size }}</h2>
      </v-btn>
      <v-snackbar v-model="banner" top color="green" right :timeout="3000">
        {{bannerMessage}}
        <v-btn color="white" flat @click="banner = false">Close</v-btn>
      </v-snackbar>
      <v-snackbar v-model="error" top color="red" right :timeout="6000">
        {{errorMessage}}
        <v-btn color="white" flat @click="error = false">Close</v-btn>
      </v-snackbar>
    </v-app>
  </div>
</template>

<script lang="ts">
import QR from 'qrcode';
import pdf from 'jspdf';
import firebase from 'firebase';
import Vue from 'vue';
import db from '../firebase_init';
import Navbar from '@/components/Navbar.vue';

const currentHackathon = 'DH7';

export default Vue.extend({
  name: 'LiveDesk',
  components: {
    Navbar,
  },
  data: () => ({
    drawer: null,
    admin: firebase.auth().currentUser!.email,
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
      contact: { email: '', phone: '' },
      name: { first: '', last: '' },
      logistics: { shirt_size: null, diet_restrictions: null, traveling_from: '' },
      academics: { school: '' },
      emergency: { name: '', phone: '' },
      personal: { birthday: '', gender: '' },
      type: '',
    },
    application: {
      contact: { email: '', phone: '' },
      name: { first: '', last: '' },
      logistics: { shirt_size: null, diet_restrictions: null, traveling_from: '' },
      academics: { school: '' },
      emergency: { name: '', phone: '' },
      personal: { birthday: '', gender: '' },
      type: '',
    },
  }),
  computed: {
    safeGender(): string {
      const { gender } = this.application.personal;
      return gender !== '' ? gender : 'N/A';
    },
    fullName(): string {
      return `${this.application.name.first} ${this.application.name.last}`;
    },
  },
  methods: {
    // saveDownLoadLinks() {
    //   const document = db.collection('decisions').doc('DH5').collection('round5');
    //   document.get()
    //     .then((snap) => {
    //       snap.docs.forEach((doc) => {
    //         const app = doc.data();
    //         const { email } = app;
    //         const ref = firebase.storage().ref();
    //         ref.child(`hackathon/DH5/users/${email}/QRCode.png`)
    //           .getDownloadURL().then((url) => {
    //             console.log(email);
    //             app.download = url;
    //             document.doc(email).set(app);
    //           });
    //       });
    //     });
    // },
    async reset() {
      const admin = firebase.auth().currentUser!.email;
      const ref = db
        .collection(currentHackathon)
        .doc('hackathon')
        .collection('live desk')
        .doc(admin || undefined);
      ref.get().then((snap) => {
        if (snap.exists) {
          const data = snap.data();
          data!.scanned = '';
          ref.set(data!);
        }
      });
    },
    directoryToName(dir): string {
      console.log(dir);
      if (dir === 'walkins') return 'attendee';
      if (dir === 'sponsors') return 'sponsor';
      if (dir === 'mentors') return 'mentor';
      if (dir === 'volunteers') return 'volunteer';
      if (dir === 'execs') return 'executive';
      return '';
    },
    register(target) {
      if (!this.validateForm()) {
        this.formFeedback();
        return;
      }
      const app = this.application;
      // reject if no identifying field is created.
      if (app.contact.email === '' || app.name.first === '') {
        this.rejectRegistration();
        return;
      }
      app.type = target.slice(0, -1);
      // parse name field
      // const [first, last] = app.name.split(' ');
      // app.name = first;
      // app.lastname = last || '';
      // add to respective directory
      db.collection(currentHackathon)
        .doc('hackathon')
        .collection(target)
        .doc(app.contact.email)
        .set(app);
      // add type and include in general checked in directory)
      console.log(this.directoryToName(target));
      this.checkin(this.directoryToName(target));
      // open banner
      this.banner = true;
      this.bannerMessage = `${this.application.contact.email} has been registered under ${target}!`;
      this.confirm = false;
    },
    rejectRegistration() {
      this.error = true;
      this.errorMessage = "Could not register person as one of 'Name' or 'Email' was left blank.";
    },
    async getUserApplication(email: string) {
      return new Promise(async (resolve, reject) => {
        if (email.length === 0) resolve({ found: false, data: {} });

        const snap = await db
          .collection(currentHackathon)
          .doc('applications')
          .collection('all')
          .doc(email)
          .get();

        const data = this.parseApplication(snap.data());
        if (snap.exists) {
          resolve({
            data,
            id: snap.id,
            found: true,
          });
        } else {
          resolve({
            found: false,
            data: {},
          });
        }
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
    attendee() {
      this.checkin('attendee');
    },
    // ENCRYPT AND DECRYPT FUNCTIONS HERE - KAJOBAN
    // mainencrypt(plainText) {
    //   //use CryptoJS to encrypt plaintext email
    //   let cipher = encrypt(plainText);
    //   //use custom function to replace special chars
    //   cipher = ereplace(cipher);
    //   //return ciphertext
    //   return cipher;
    // },
    // maindecrypt(cipherText) {
    //   //use custom function to replace special chars
    //   let cipher = dreplace(cipherText);
    //   //use CryptoJS to decrypt the ciphertext
    //   let plaintext = decrypt(cipher);
    //   //return plaintext
    //   return plaintext;
    // },
    // isValidEmail(email) {
    //   return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    //     String(email).toLowerCase()
    //   );
    // },
    //   Make sure this stays consistent with checkin function of ./Checkin.vue
    async checkin(type = 'attendee') {
      if (!this.validateForm()) {
        this.formFeedback();
        return;
      }
      const app = this.application;
      const name = `${app.name.first} ${app.name.last}`;
      app.type = type;
      try {
        await db
          .collection(currentHackathon)
          .doc('hackathon')
          .collection('checked in')
          .doc(this.application.contact.email)
          .set({
            time: new Date(),
            by: this.$store.state.firebase
              .auth()
              .currentUser.email.toLowerCase(),
            type: app.type,
            name,
            meals: 0,
            org: this.application.academics.school,
          });

        this.bannerMessage = `${this.fullName} has been checked in!`;
        this.banner = true;
        console.log('Successfully written');
      } catch (err) {
        console.log(err);
      }
    },
    async openBadge() {
      if (this.application.contact.email === '') return;
      const { badge, error } = await this.createTemplate();
      if (error) return;
      const QRImage = await QR.toDataURL(
        `https://admin.deltahacks.com/checkin/${this.application.contact.email}`,
      );
      const imageOffset = (badge.internal.pageSize.width - 25) / 2;
      badge.addImage(QRImage, 'JPEG', imageOffset, 3, 25, 25);
      badge.save(`${currentHackathon}_${this.application.name.first}${this.application.name.last}`);
    },
    // should insert / generate the back of DH7 badge.
    async createTemplate() {
      // eslint-disable-next-line new-cap
      const t = new pdf('l', 'mm', [165, 200]);
      const centeredText = (text, y) => {
        const textWidth = (t.getStringUnitWidth(text) * t.internal.getFontSize())
          / t.internal.scaleFactor;
        const textOffset = (t.internal.pageSize.width - textWidth) / 2;
        t.text(textOffset, y, text);
      };
      const snap = await db
        .collection(currentHackathon)
        .doc('hackathon')
        .collection('checked in')
        .doc(this.application.contact.email)
        .get();
      if (snap.exists) {
        const data = snap.data();
        centeredText(this.fullName, 35);
        t.setFontSize(10);
        centeredText(this.application.academics.school, 40);
        t.setFontSize(14);
        centeredText(this.typeToTitle(data!.type), 50);
      } else {
        this.error = true;
        this.errorMessage = `${this.application.contact.email} has not been registered or checked in!`;
        return {
          error: true,
          badge: undefined,
        };
      }
      return {
        error: false,
        badge: t,
      };
    },
    typeToTitle(type) {
      if (type === 'sponsor') return 'Sponsor';
      if (type === 'mentor') return 'Mentor';
      if (type === 'executive') return 'Organizer';
      if (type === 'volunteer') return 'Volunteer';
      return 'Attendee';
    },
    validateForm() {
      const { school } = this.application.academics;
      const { email } = this.application.contact;
      // if (this.name.length < 2) return false;
      if (school === '' || email === '') return false;
      return true;
    },
    formFeedback() {
      this.error = true;
      this.errorMessage = 'Required fields not filled!';
    },
  },
  async beforeMount() {
    const admin = firebase.auth().currentUser!.email;
    const ref = db
      .collection(currentHackathon)
      .doc('hackathon')
      .collection('live desk')
      .doc(admin || undefined);
    ref.onSnapshot(async (snap) => {
      if (snap.exists) {
        const { scanned }: any = snap.data();
        // this code (below) is case sensitive !
        // it is critical that you use THIS CODE to decrypt an email
        const code = this.$route.params.email;
        const email = this.$route.params.email
          ? this.$route.params.email.toLowerCase()
          : scanned;
        // //EN(DE)CRYPT HERE - KAJOBAN
        // if (email != null && this.isValidEmail(email)) {
        //   let encryptedemail = this.mainencrypt(email);
        //   console.log(encryptedemail); //KUMAIL LOOK AT THIS
        // } else {
        //   let decryptedemail = this.maindecrypt(code);
        //   console.log(decryptedemail); //KUMAIL LOOK AT THIS
        // }
        const result: any = await this.getUserApplication(email).catch(err => console.error(err));
        if (result.found) {
          this.application = result.data;
          this.header = result.id;
          console.log(this.header);
          this.active = true;
        } else {
          this.application = this.emptyApp;
          this.header = 'No target attendee detected.';
          this.active = false;
        }
      } else {
        this.header = `Account ${admin} not found in front desk collection.`;
      }
    });
  },
});
</script>
