<template>
  <div>
      <apexcharts type="bar" :options="chartOptions" :series="series"></apexcharts>
  </div>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'

export default {
    components: {
      apexcharts: VueApexCharts,
    },
    data: function() {
      return {
        chartOptions: {
          chart: {
            id: 'vuechart-example'
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          }
        },
        series: [{
          name: 'series-1',
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }]
      }
    },
    mounted() {
      // this.chartOptions.xaxis.categories = this.headers;
      //   this.series = this.data;
    },
    methods: {
      changeData(data) {
        console.log('Changing!')
        console.log(data);
        this.chartOptions.xaxis.categories = Object.keys(data);
        this.series = [{
          name: 'test',
          data: Object.values(data)
        }];
      },
    },
};
</script>
