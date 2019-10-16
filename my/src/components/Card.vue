<template>
  <div>
    <div class="container">
      <h1 class="question" id="title1">{{ title }}</h1>
      <v-text-field
        v-if="inputType == 'text'"
        :value="value"
        @input="onChange($event)"
        :error-messages="error"
      ></v-text-field>
      <div v-else-if="inputType == 'text-area'">
        <v-textarea
          :value="value"
          @input="onChange($event)"
          :counter="textLimit"
          auto-grow
          :error-messages="error"
        ></v-textarea>
        <!-- <v-progress-linear
                    v-if="custom"
                    slot="progress"
                    :value="q1Progress"
                    :color="q1Color"
                    height="5"
                  ></v-progress-linear> -->
      </div>
      <v-select
        v-else-if="inputType == 'single-select'"
        :items="selectData"
        :prepend-icon="icon"
        class="v-select-single"
        single-line
        :value="value"
        @input="onChange($event)"
        :error-messages="error"
      ></v-select>
      <div v-else-if="inputType == 'date'" class="date-row">
        <v-select
          v-for="(input, i) in dates"
          :key="i"
          :items="input.options"
          @input="onDate(input.label, $event)"
          :label="input.label"
          v-model="input.value"
          :error-messages="error"
        ></v-select>
      </div>
      <div v-else-if="inputType == 'radio-select'" class="radio-row">
        <span v-for="(data, i) in selectData" :key="i" class="radio-item">
          <input
            type="radio"
            name="inputs"
            :id="data"
            :value="data"
            :checked="value === data"
            @input="onChange($event.target.value)"
          />
          <label :for="data">{{ data }}</label>
        </span>
        <div v-if="error" class="error--text">{{error}}</div>
      </div>
      <div v-else-if="inputType == 'combo-box'">
        <v-combobox
          :items="selectData"
          :prepend-icon="icon"
          single-line
          :value="value"
          :icon="icon"
          @input="onChange($event)"
        ></v-combobox>
      </div>
      <div v-else-if="inputType == 'multi-select'">
        <v-select
          :items="selectData"
          :prepend-icon="icon"
          single-line
          multiple
          :value="value"
          @input="onChange($event)"
        ></v-select>
      </div>
      <div v-else-if="inputType === 'file'">
        <div class="file-desc" v-if="resume.filename && resume.link">
          Currently Uploaded: <a :href="resume.link">{{resume.filename }}</a>
        </div>
        <file-pond
          @addfile="sendFile()"
          :v-bind="myFiles"
          name="resume"
          ref="pond"
          labelInvalidField="File is not PDF..."
          label-idle="Drop resume here (PDF only)"
          accepted-file-types="application/pdf"
          :dropValidation="true"
          v-bind:files="myFiles"
          v-on:init="handleFilePondInit"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { Component } from 'vue';
import firebase from 'firebase';

import vueFilePond from 'vue-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

import { months, years, days } from '../data';

const FilePond: Component = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
);

export default Vue.extend({
  props: [
    'title',
    'value',
    'requestUpdate',
    'inputType',
    'selectData',
    'textLimit',
    'icon',
    'error',
    'upload',
    'resume',
  ],
  data() {
    return {
      dates: [],
      myFiles: [],
    } as { dates: any, myFiles: any };
  },
  components: {
    FilePond,
  },
  methods: {
    onChange(event) {
      this.$emit('input', event);
      this.requestUpdate();
    },
    onDate(type: string, value: any) {
      if (type.toLowerCase() === 'year') {
        this.$emit(
          'input',
          firebase.firestore.Timestamp.fromDate(new Date(
            value,
            months.indexOf(this.dates[1].value),
            this.dates[2].value,
          )),
        );
      } else if (type.toLowerCase() === 'month') {
        this.$emit(
          'input',
          firebase.firestore.Timestamp.fromDate(new Date(
            this.dates[0].value,
            months.indexOf(value),
            this.dates[2].value,
          )),
        );
      } else {
        this.$emit(
          'input',
          firebase.firestore.Timestamp.fromDate(new Date(
            this.dates[0].value,
            months.indexOf(this.dates[1].value),
            value,
          )),
        );
      }
      this.requestUpdate();
    },
    updateDates() {
      if (this.inputType === 'date') {
        try {
          this.dates = [
            {
              label: 'Year',
              options: years,
              value: new Date(this.value.toDate()).getFullYear(),
            },
            {
              label: 'Month',
              options: months,
              value: months[new Date(this.value.toDate()).getMonth()],
            },
            {
              label: 'Day',
              options: days,
              value: new Date(this.value.toDate()).getDate(),
            },
          ];
        } catch (e) {
          console.log('Date passed');
        }
      }
    },
    handleFilePondInit() {
      console.log('Listening...');
    },
    async sendFile() {
      this.upload(this.$refs.pond.getFile());
    },
  },
  mounted() {
    this.updateDates();
  },
  watch: {
    value(newVal, oldVal) {
      this.updateDates();
    },
  },
  computed: {
    q1Progress() {
      return Math.min(100, this.value.length / 5);
    },
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,600&display=swap');

.container >>> .filepond--panel {
  opacity: 0.6;
  margin-bottom: 20px;
}
.container >>> .filepond--panel-root {
  height: 100% !important;
}
.container >>> .filepond--wrapper {
  height: 130px !important;
}

.file-desc {
  font-size: 17px;
  padding-bottom: 2%;
}

.question {
  font-size: 2.5em;
  font-weight: 600;
  color: white;
  margin: 50px;
  font-family: 'Montserrat';
  text-align: center;
}

.date-row {
  display: flex;
  flex-direction: row;
  margin-bottom: 5%;
}
.date-row .v-input {
  margin-right: 2%;
}

.container {
  color: white !important;
  padding: 50px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 50px;
  height: 100%;
  width: 50%;
  margin: 50px auto 0px auto;
  display: flex;
  flex-direction: column;
}

.field {
  margin: 80px auto;
  color: white;
  border: transparent;
  width: 75%;
  font-size: 2.5em;
  font-family: 'Montserrat';
  text-align: center !important;
}

.field.v-text-field {
  color: red;
}

.field:focus {
  outline: none;
  /*   border-bottom: 2px solid white; */
}

.radio-row heading {
  text-align: center;
  font-size: 0.8em;
}

.radio-row {
  --radio-button-height: 40px;

  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.radio-row span {
  display: inline-block;
}

.radio-row input[type='radio'] {
  visibility: hidden;
  height: 0;
  width: 0;
  margin-bottom: 10%;
}

.radio-row label {
  margin: 0 15px;
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
  background-color: #454545;
  color: white;
  padding: 20px var(--radio-button-height);
  border-radius: 10px;
  transition: all 0.3s ease-out;
}

.radio-row input[type='radio']:checked + label {
  background-color: #58ba83;
}

.radio-row .error--text {
  margin-top: calc(var(--radio-button-height) / 2);
}

/* Override Vuetify's default error color, since it doesn't contrast enough */
.container >>> .error--text {
  caret-color: #bb2e35d8 !important;
  color: #bb2e35d8 !important;

  font-size: 1.25rem !important;
  font-family: 'Montserrat', 'Roboto'
}

.container >>> .v-icon.material-icons {
  font-family: 'Material Icons'
}

.container >>> .v-icon.fa {
  font-family: 'Font Awesome 5 Free'
}

.theme--light.v-input:not(.v-input--is-disabled) input,
.theme--light.v-input:not(.v-input--is-disabled) textarea {
  color: white !important;
}

@media only screen and (max-width: 960px) {
  .container {
    color: white;
    padding: 50px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 50px;
    height: 100%;
    min-height: 300px;
    width: 90%;
    margin: 50px auto;
  }
  .question {
    font-size: 1.5em;
    font-weight: 300;
    color: white;
    margin: 20px;
  }
  .field {
    margin: 0 auto;
    padding-top: 10%;
    background: transparent;
    border: transparent;
    border-color: white;
    width: 75%;
    font-size: 1.5em;
  }

  .v-select-single {
    padding-top: 15%;
  }

  .date-row {
    display: flex;
    flex-direction: column;
    width: 60%;
    margin-top: 5%;
    align-self: center;
  }
  .radio-row {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .radio-item {
    margin-top: 30px;
    height: 100%;
  }
}

@media only screen and (max-width: 1280px) and (min-width: 961px) {
  .container {
    width: 70%;
  }
  .question {
    font-size: 2.0em;
  }
}
</style>

