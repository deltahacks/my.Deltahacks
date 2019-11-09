<template>
  <div id="chart">
    <apexchart type=pie height=350 :options="chartOptions" :series="series" />
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
			series: this.data,
			chartOptions: {
				colors: this.colors,
				labels: this.categories,
				legend: {
					onItemClick: {
						toggleDataSeries: true
					},
					position: 'bottom',
				},
				dataLabels: {
					enabled: true,
					formatter: (percent, { seriesIndex }) => `${this.data[seriesIndex]} (${Math.round(percent)}%)`
				},
				title: {
					text: this.title,
					align: 'center',
					floating: true,
					margin: 30,
				},
			},
		}
	},
	watch: {
		categories(newCategories) {
			this.chartOptions = Object.assign({}, this.chartOptions, { labels: newCategories });
		},
		data(newData) {
			this.series = newData;
		}
	}
});
</script>