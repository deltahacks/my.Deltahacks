import { Bar, mixins } from 'vue-chartjs';
import Vue from 'vue';
import db from '../firebase_init';

const { reactiveProp } = mixins;

export default Vue.extend({
  extends: Bar,
  data() {
    return {
      uft: 22,
    };
  },
  props: ['data', 'options'],
  mounted() {
    if (this.data) {
      // @ts-ignore
      this.renderChart(this.data, this.options);
    }
  },
  methods: {
    changeData(data) {
      if (!data) return;
      console.log(data);
      // @ts-ignore
      this.renderChart(data, this.options);
    },
  },
});
