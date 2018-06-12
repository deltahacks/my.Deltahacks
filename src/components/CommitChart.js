import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['10', '11', '12', '13', '14', '15', '16'],
      datasets: [{
        label: 'Applicants per day',
        borderColor: '#f87979',
        backgroundColor: '#f87979',
        data: [10, 13, 22, 8, 11, 9, 17],
        fill: false,
      }, /* {
        label: 'My Second dataset',
        borderColor: 'light-blue',
        backgroundColor: 'light-blue',
        data: [7, 49, 46, 13, 25, 30, 22],
        fill: false,
      } */],
    }, {
      responsive: true,
      title: {
        display: true,
      },
      tooltips: {
        position: 'average',
        mode: 'index',
        intersect: false,
      },
    });
  },
};
