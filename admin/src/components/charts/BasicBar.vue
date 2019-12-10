<template>
  <div id="chart">
    <apexchart type=bar height=450 :options="chartOptions" :series="series" />
  </div>
</template>

<script lang="ts">
import VueApexCharts from 'vue-apexcharts';
import Vue from 'vue';

export default Vue.extend({
  components: {
    apexchart: VueApexCharts,
  },
  props: ['title', 'categories', 'data', 'colors'],
  data() {
    return {
      series: [{ data: this.data }],
      chartOptions: {
        plotOptions: {
          bar: { barHeight: '100%', distributed: true },
        },
        colors: this.colors,
        xaxis: {
          categories: this.categories,
          labels: {
            minHeight: 100,
            maxHeight: 100,
          },
        },
        title: {
          text: this.title,
          align: 'center',
          floating: true,
        },
        tooltip: {
          theme: 'dark',
          y: {
            title: { formatter: () => this.title },
          },
        },
      },
    };
  },
  watch: {
    categories(newCategories) {
      this.chartOptions = Object.assign({}, this.chartOptions, { xaxis: { categories: newCategories } });
    },
    data(newData) {
      this.series = [{ data: this.data }];
    },
  },
});
</script>
