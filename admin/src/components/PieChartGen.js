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
      if (this.$data._chart) {
        this.$data._chart.destroy();
      }
      this.renderChart(data, this.options);
    },
  },
};
