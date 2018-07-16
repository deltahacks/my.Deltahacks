import { Pie } from 'vue-chartjs';

export default {
  extends: Pie,
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['Toronto', 'McMaster', 'Waterloo', 'Western', 'Ryerson', 'York'],
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: ['#002F65', '#83002C', '#FDD54F', '#4F2682', '#004C9B', '#E31836'],
          data: [40, 20, 12, 6, 3, 6],
        },
      ],
    });
  },
};
