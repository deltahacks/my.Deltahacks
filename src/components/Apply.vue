<template>
    <v-app class="dashboard">
        <Navbar/>
        <form class="ff mx-auto">
        <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        :counter="10"
        label="Name"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
        ></v-text-field>
        <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
        ></v-text-field>
        <v-select
        v-model="select"
        :items="items"
        :error-messages="selectErrors"
        label="Item"
        required
        @change="$v.select.$touch()"
        @blur="$v.select.$touch()"
        ></v-select>
                <v-container d-inline-flex>
                <v-flex xs6 sm6>
                    <v-text-field
                    name="input-1-3"
                    label="Your cell phone number"
                    single-line
                    prepend-icon="phone"
                    ></v-text-field>
                </v-flex>
                <v-flex xs4>
                </v-flex>
                <v-flex xs6 sm6>
                    <v-text-field
                    name="input-1-3"
                    label="Emergency contact phone number"
                    single-line
                    prepend-icon="phone"
                    ></v-text-field>
                </v-flex>
                </v-container>


        <v-checkbox
        v-model="checkbox"
        :error-messages="checkboxErrors"
        label="Do you agree?"
        required
        @change="$v.checkbox.$touch()"
        @blur="$v.checkbox.$touch()"
        ></v-checkbox>

        <v-btn @click="submit">submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
        </form>
        <div class="center ff mx-auto">
                <v-card color="grey darken-3" flat>
                <v-card-text>
                    <v-subheader dark>Tell us a</v-subheader>
                    <v-container fluid>
                    <v-layout row>
                        <v-flex xs12>
                        <v-text-field
                            name="input-1"
                            label="Label Text"
                            textarea
                            dark
                            v-model="story"
                        ></v-text-field>
                        </v-flex>

                    </v-layout>
                        <v-progress-linear
                            v-if="custom"
                            slot="progress"
                            :value="progress"
                            :color="color"
                            height="14"
                        ></v-progress-linear>
                    </v-container>
                </v-card-text>
                </v-card>
        </div>
    </v-app>
</template>

<script>
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import Tab from "./layouts/Tab";
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  name: "Dashboard",
  data() {
    return {
      links: ["Home", "About", "Contact"],
      story: "",
      custom: true,
      name: "",
      email: "",
      select: null,
      items: [
        "First Year",
        "Second Year",
        "Third Year",
        "Forth Year",
        "Fifth Year"
      ],
      checkbox: false
    };
  },
  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    checkbox: { required }
  },
  components: {
    Navbar,
    Footer,
    Tab
  },
  computed: {
    get_vuex_email(){
      return this.$store.state.getters.get_vuex_user_application;
    },
    progress() {
      return Math.min(100, this.story.length / 10);
    },
    color() {
      return ["error", "warning", "success"][Math.floor(this.progress / 40)];
    },
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.required && errors.push("You must agree to continue!");
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
    }
  }
};
</script>

<style>
.ff {
  margin-top: 5%;
  width: 70%;
}
</style>
