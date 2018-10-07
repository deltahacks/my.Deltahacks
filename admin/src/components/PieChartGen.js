import { Pie, mixins } from 'vue-chartjs';
import db from '../private/firebase_init';

const { reactiveProp } = mixins;
// doc.data()['U Toronto']
export default {
  extends: Pie,
  data() {
    return {
      uft: 22,
      dataset: null,
    };
  },
  props: ['data', 'options'],
  mounted() {
    this.dataset = this.data;
    // this.renderChart(this.dataset, this.options);
  },
  methods: {
    changeData(data) {
      if (!data) return;
      this.renderChart(data, this.options);
    },
  },
};
