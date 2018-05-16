<template>
<div id="app">
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <v-btn
                    icon
                    large
                    :href="source"
                    target="_blank"
                    slot="activator"
                  >
                    <v-icon large>code</v-icon>
                  </v-btn>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field  prepend-icon="email" name="email" label="Email" type="email" v-model="vuex_email"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="vuex_password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary">Login</v-btn>
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
  export default {
    name: 'Signup',
    data: () => ({
      drawer: null,
      email: null,
      password: null,
      password_repeat: null
    }),
    props: {
      source: String
    },
    methods: {

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
        }

    }
  }
</script>