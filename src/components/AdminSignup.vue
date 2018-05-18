<template>
<div id="app">
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="red">
                <v-toolbar-title>Create an admin account</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <v-btn
                    icon
                    large
                    :href="source"
                    target="_blank"
                    slot="activator"
                    to="/login"
                  >
                    <v-icon>person</v-icon>
                  </v-btn>
                  <span>Login</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field  prepend-icon="email" name="email" label="Email" type="email" v-model="vuex_email"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="vuex_password"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password2" label="Retype Password" id="password2" type="password" v-model="password_repeat"></v-text-field>
                  <v-text-field prepend-icon="lock" name="text" label="Admin Key" id="akey" type="text" v-model="akey"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="red" @click.prevent="signUpFirebase" class="mx-auto">Signup</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'
import admin_key from '../private/admin_key'
export default {
    name: 'AdminSignup',
    data: () => ({
      drawer: null,
      email: null,
      password: null,
      password_repeat: null,
      feedback: null,
      ip_address: null,
      geo: null,
      akey: null
    }),
    props: {
      source: String
    },
    methods: {
        tester(){
            console.log(this.vuex_email)
        },
        signUpFirebase(){
            if(this.vuex_email && this.vuex_password && this.password_repeat){
                if(this.akey === admin_key){
                firebase.auth().createUserWithEmailAndPassword(this.vuex_email, this.vuex_password).then(user => {
                    console.log(user.user.uid, "ID")
                    console.log(this.$store.state.db, "DB")
                    axios.get('https://api.ipify.org?format=json')
                    .then((response) => {
                        console.log(response.data.ip)
                        var ipp = response.data.ip;
                        axios.get(`https://ipapi.co/${ipp}/json/`).then((data) => {
                            console.log(data.data)
                                this.geo = data.data
                                this.$store.state.db.collection('admins').doc(this.vuex_email).set({
                                email: this.vuex_email,
                                geo: this.geo,
                                user_id: user.user.uid,
                                ip: ipp,
                                is_admin: true
                                })
                        }).catch(err => {
                            console.log(err)
                        })
                        console.log(response.ip);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                    }).then(() => {
                        // this.vuex_current_user = firebase.auth().currentUser 
                        console.log("success")
                        this.$router.push({name : 'Dashboard'})

                    }).catch((err) => {
                        this.feedback = err.message;
                    })
            }
            } else {
                this.feedback ="You need to enter all the fields"
            }
        }
    },
    computed: {
        vuex_email: {
            get() {
                return this.$store.state.vuex_email
            },
            set (value) {
                this.$store.commit('update_vuex_email', value)
            }
        },
        vuex_password: {
            get () {
                return this.$store.state.vuex_password
            },
            set (value) {
                this.$store.commit('update_vuex_password', value)
            }
        },
        vuex_current_user: {
            get () {
                return this.$store.state.vuex_current_user
            },
            set (value) {
                this.$store.commit('update_vuex_current_user', value)
            }
        }

    }
  }
</script>