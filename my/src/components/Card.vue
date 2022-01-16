<template>
  <div>
    <div class="container">
      <h1 class="question" v-html="title"></h1>
      <v-text-field
        v-if="inputType == 'text'"
        :value="value"
        @input="onChange($event)"
        :error-messages="error"
        dark
        class="montserratify"
        color="#000000"
      ></v-text-field>
      <div v-else-if="inputType == 'text-area'">
        <v-textarea
          :value="value"
          @input="onChange($event)"
          :counter="textLimit"
          auto-grow
          :error-messages="error"
          dark
          class="textareafix"
          color="#000000"
        ></v-textarea>
      </div>
      <v-select
        v-else-if="inputType == 'single-select'"
        :items="selectData"
        :prepend-icon="icon"
        class="v-select-single montserratify"
        single-line
        :value="value"
        @input="onChange($event)"
        :error-messages="error"
        dark
        color="#000000"
      ></v-select>
      <div v-else-if="inputType == 'date' || inputType == 'date-grad'">
        <div class="date-row" color="#000000">
          <v-select
            v-for="(input, i) in dates"
            :key="i"
            :items="input.options"
            @input="onDate(input.label, $event)"
            :label="input.label"
            v-model="input.value"
            dark
            class="montserratify"
            color="#000000"
          ></v-select>
        </div>
        <div v-if="error" class="error--text">{{ error }}</div>
      </div>
      <div v-else-if="inputType == 'radio-select'" class="radio-row">
        <span v-for="(data, i) in selectData" :key="i" class="radio-item montserratify">
          <input
            type="radio"
            :name="data"
            :id="data"
            :value="data"
            :checked="value === data"
            @change="onChange($event.target.value)"
            color="#000000"
            class="montserratify"
          />
          <label :for="data">{{ data }}</label>
        </span>
        <div v-if="error" class="error--text">{{ error }}</div>
      </div>
      <div v-else-if="inputType == 'combo-box'">
        <v-combobox
          :items="selectData"
          :prepend-icon="icon"
          single-line
          :value="value"
          :icon="icon"
          @input="onChange($event)"
          dark
          color="#000000"
          class="montserratify"
        ></v-combobox>
      </div>
      <div v-else-if="inputType == 'multi-select'">
        <v-select
          :items="selectData"
          :prepend-icon="icon"
          single-line
          multiple
           chips
          :value="value"
          @input="onChange($event)"
          :error-messages="error"
           dark
           color="#000000"
           class="montserratify"
        ></v-select>
      </div>
      <div v-else-if="inputType === 'file'">
        <div class="file-desc" v-if="resume.filename && resume.link">
          Currently Uploaded:
          <a :href="resume.link">{{ resume.filename }}</a>
        </div>
        <file-pond
          @addfile="sendFile()"
          :v-bind="myFiles"
          name="resume"
          ref="pond"
          labelInvalidField="File is not PDF..."
          label-idle="Choose file or drop here"
          accepted-file-types="application/pdf"
          :dropValidation="true"
          v-bind:files="myFiles"
          v-on:init="handleFilePondInit"
          color="#000000"
          class="montserratify"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { Component } from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import vueFilePond from 'vue-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

import { months, gradYears, birthYears, days } from '../data';

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
      years: [],
      myFiles: [],
    } as { dates: any; years: number[]; myFiles: any };
  },
  components: {
    FilePond,
  },
  methods: {
    onChange(event) {
      this.$emit('input', event);
      this.requestUpdate();
    },
    textFunction(s) {
      if (s === 'large') {
        return 'largeText';
      }
      return '';
    },
    onDate(type: string, value: any) {
      let year;
      let month;
      let day = this.inputType === 'date' ? this.dates[2].value : 1;

      if (type.toLowerCase() === 'year') {
        year = value;
        month = months.indexOf(this.dates[1].value);
      } else if (type.toLowerCase() === 'month') {
        year = this.dates[0].value;
        month = months.indexOf(value);
      } else {
        year = this.dates[0].value;
        month = months.indexOf(this.dates[1].value);
        day = value;
      }

      this.$emit(
        'input',
        // When passed into Firebase function, Date objects need to be serialized or else they appear as empty objects
        new Date(year, month, day).toJSON(),
      );

      this.requestUpdate();
    },
    updateDates(mounted: boolean) {
      if (this.inputType === 'date' || this.inputType === 'date-grad') {
        const use = this.value;
        try {
          if (this.inputType === 'date') {
            this.dates = [
              {
                label: 'Year',
                options: this.years,
                value: new Date(use).getFullYear(),
              },
              {
                label: 'Month',
                options: months,
                value: months[new Date(use).getMonth()],
              },
              {
                label: 'Day',
                options: days,
                value: new Date(use).getDate(),
              },
            ];
          } else if (this.inputType === 'date-grad') {
            this.dates = [
              {
                label: 'Year',
                options: this.years,
                value: new Date(use).getFullYear(),
              },
              {
                label: 'Month',
                options: months,
                value: months[new Date(use).getMonth()],
              },
            ];
          }
        } catch (e) {
          console.log('Date passed');
        }
      }
    },
    handleFilePondInit() {
      console.log('Listening...');
    },
    async sendFile() {
      this.upload((this.$refs.pond as any).getFile());
    },
  },
  mounted() {
    this.years = this.inputType === 'date' ? birthYears : gradYears;
    this.updateDates(true);
  },
  watch: {
    value(newVal, oldVal) {
      this.updateDates(false);
    },
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,600&display=swap');

.container >>> .filepond--panel {
  opacity: 0.6;
  margin-bottom: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 35px;
}
.container >>> .filepond--root {
  height: 150px;
  margin-bottom: 10px;
  border-radius: 35px;
}
.container >>> .filepond--drop-label {
  height: 150px;
  color: white;
  font-weight: 500;
  font-size: 1.8em;
  font-family: 'Montserrat';
  border-radius: 35px;
}

.file-desc {
  font-size: 14px;
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
  height: 100%;
  width: 50%;
  margin: 50px auto 0px auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
/* .theme--light.v-input:not(.v-input--is-disabled) {
    font-size: 1.7em;
    text-align: center !important;
} */
.v-input {
  font-size: 1.7em;
  text-align: right;
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
  --radio-button-height: 6vh;

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
  margin-bottom: 45%;
}

.radio-row label {
  margin: 0 15px;
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  padding: 3vh var(--radio-button-height);
  font-size: 18px;
  border-radius: 10px;
  transition: all 0.3s ease-out;
}

.radio-row input[type='radio']:checked + label {
  background-color: rgba(255, 255, 255, 0.45);
}

.radio-row .error--text {
  margin-top: calc(var(--radio-button-height) / 2);
}

/* Override Vuetify's default error color, since it doesn't contrast enough */
.container >>> .error--text {
  caret-color: #bb2e35d8 !important;
  color: #bb2e35d8 !important;

  font-size: 1.25rem !important;
  font-family: 'Montserrat';
}

.container >>> .v-icon.material-icons {
  font-family: 'Material Icons';
}

.container >>> .v-icon.fa {
  font-family: 'Font Awesome 5 Free';
}

.theme--light.v-input:not(.v-input--is-disabled) input,
.theme--light.v-input:not(.v-input--is-disabled) textarea {
  color: white !important;
}

.textareafix{
  font-size:1.3em !important;
  font-family: 'Montserrat' !important;
  /* line-height: 1.5rem !important; */
}

.montserratify{
  font-family: 'Montserrat' !important;
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
    margin: 10px auto;
  }
  .question {
    font-size: 1.5em;
    font-weight: 300;
    color: white;
    /* margin: 20px 20px 50px 20px; */
    margin:0;
    padding: 50px 0 50px 0;
  }
  .field {
    margin: 40px auto;
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
    margin-bottom:-70px;
    height: 100%;
  }
  /* .radio-row input[type='radio'] {
  margin-bottom: 5%;
  } */
  .radio-row label {
    font-size: 13px;
    padding: 2vh 5vh;
  }
}

@media only screen and (max-width: 1280px) and (min-width: 961px) {
  .container {
    width: 70%;
  }
  .question {
    font-size: 2em;
  }
}


</style>

