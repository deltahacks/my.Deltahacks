<template>
	<div id="chart">
		<apexchart type=radialBar height=450 :options="chartOptions" :series="series" />
	</div>
</template>

<script lang="ts">
import VueApexCharts from 'vue-apexcharts';
import Vue from 'vue';

export default Vue.extend({
	components: {
		apexchart: VueApexCharts,
	},
	props: ['title', 'categories', 'data'],
	data() {
		return {
			series: this.data,
			chartOptions: {
				plotOptions: {
					radialBar: {
						offsetY: -18,
						startAngle: 0,
						endAngle: 270,
						hollow: {
							margin: 5,
							size: '30%',
							background: 'transparent',
							image: undefined,
						},
						dataLabels: {
							name: { show: false, },
							value: { show: false, }
						}
					},
				},
				colors: [
					'#E31836',
					'#83002C',
					'#004C9B',
					'#FDD54F',
					'#4F2682',
					'#63a832',
					'#e0932f',
					'#FF6633',
					'#FFB399'
				],
				labels: this.categories,
				legend: {
					show: true,
					floating: true,
					fontSize: '10.5px',
					position: 'left',
					offsetX: -25,
					offsetY: 10,
					labels: { useSeriesColors: true, },
					markers: { size: 0 },
					formatter: function(seriesName, opts) {
							return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
					},
					itemMargin: { horizontal: 1, }
        },
				title: {
					text: this.title,
					align: 'center',
					floating: true
				},
				responsive: [{
					breakpoint: 480,
					options: {
						legend: {
								show: false
						}
					}
				}]
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
