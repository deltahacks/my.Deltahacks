import { Pie, mixins } from 'vue-chartjs';
import Vue from 'vue';
import db from '../firebase_init';

const { reactiveProp } = mixins;
// doc.data()['U Toronto']
export default Vue.extend({
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
      // eslint-disable-next-line no-underscore-dangle
      if (this.$data._chart) {
        // eslint-disable-next-line no-underscore-dangle
        this.$data._chart.destroy();
      }
      this.renderChart(data, this.options);
    },
  },
});
