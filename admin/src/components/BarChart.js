import { Bar, mixins } from 'vue-chartjs';
import db from '../private/firebase_init';

const { reactiveProp } = mixins;

export default {
  extends: Bar,
  data() {
    return {
      uft: 22,
    };
  },
  props: ['data', 'options'],
  mounted() {
    if (this.data) {
      this.renderChart(this.data, this.options);
    }
  },
  methods: {
    changeData(data) {
      if (!data) return;
      console.log(data);
      this.renderChart(data, this.options);
    },
  },
};
