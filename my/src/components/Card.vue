<template>
  <div>
    <div class="container">
      <h1 class="question" id="title1">{{ title }}</h1>
      <v-text-field
        v-if="inputType == 'text'"
        :value="value"
        @input="onChange($event)"
      ></v-text-field>
      <div v-else-if="inputType == 'text-area'">
        <v-textarea
          :value="value"
          @input="onChange($event)"
          :counter="textLimit"          
          auto-grow
          v-validate="{ required: true, max: 500 }"
        ></v-textarea>
      </div>
      <v-select
        v-else-if="inputType == 'single-select'"
        :items="selectData"
        :prepend-icon="icon"
        class="v-select-single"
        single-line
        :value="value"
        @input="onChange($event)"
      ></v-select>
      <div v-else-if="inputType == 'date'" class="date-row">
        <v-select
          v-for="(input, i) in dates"
          :key="i"
          :items="input.options"
          @input="onDate(input.label, $event)"
          :label="input.label"
          v-model="input.value"
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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase';
import { months, years, days } from '../data';

export default Vue.extend({
  props: [
    'title',
    'value',
    'requestUpdate',
    'inputType',
    'selectData',
    'textLimit',
    'icon',
    'textSize',
  ],
  data() {
    return {
      dates: [],
    } as { dates: any };
  },
  methods: {
    onChange(event) {
      this.$emit('input', event);
      this.requestUpdate();
    },
    textFunction(s) {
      if (s == "large") {
        return "largeText"
      }
      console.log(s)
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
  },
  mounted() {
    this.updateDates();
  },
  watch: {
    value(newVal, oldVal) {
      this.updateDates();
    },
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,600&display=swap');
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
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.radio-row input[type='radio'] {
  visibility: hidden;
  height: 0;
  width: 0;
  margin-bottom: 10%;
}

.radio-row label {
  margin: 0 2%;
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
  background-color: #454545;
  color: white;
  padding: 20px 40px;
  border-radius: 10px;
  transition: all 0.3s ease-out;
}
.radio-row input[type='radio']:checked + label {
  background-color: #58ba83;
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
    margin: 20px 20px 50px 20px;
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

