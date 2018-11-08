
import { Line } from 'vue-chartjs';
// import firebase from 'firebase';
import { functions } from 'firebase';
import db from '../private/firebase_init';

export default {
  extends: Line,
  methods: {
    setStartDate() {
      const out = new Date();
      out.setMonth(out.getMonth() - 1);
      return out;
    },
    /**
     * Use this method if you want to populate every single day
     * @param {Date} startDate date one month ago.
     */
    populateDateLabels(startDate) {
      const outMap = {};
      const today = new Date();
      const current = startDate;
      while (current < today) {
        outMap[current.toDateString()] = 0;
        current.setDate(current.getDate() + 1);
        // console.log(current);
      }
      return outMap;
    },
  },
  mounted() {
    // Overwriting base render method with actual data.
    const startFrom = this.setStartDate(); // currently 1 month ago
    const track = this.populateDateLabels(startFrom);
    db
      .collection('applications')
      .doc('DH5')
      .collection('submitted')
      .orderBy('last_modified.unix')
      .endAt(startFrom.getTime() / 1000)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const item = doc.data();
          if (!item.last_modified) return;
          const date = new Date(item.last_modified.date);
          const dateString = date.toDateString();
          if (track[dateString] >= 0) {
            track[dateString] += 1;
          }
        });
        this.renderChart({
          labels: Object.keys(track),
          datasets: [{
            label: 'Applicants per day',
            borderColor: '#f87979',
            backgroundColor: '#f87979',
            data: Object.values(track),
            fill: false,
          }],
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
          scales: {
            xAxes: [{
              ticks: {
                stepSize: 5, // adjust this to change interval with label
              },
            }],
          },
        });
      });
  },
};
