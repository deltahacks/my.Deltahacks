import { Line } from 'vue-chartjs';
// import firebase from 'firebase';
import db from '../private/firebase_init';

export default {
  extends: Line,
  data() {
    return {
      datacollection: {
        labels: [],
        datasets: [],
        borderColor: '#f87979',
        backgroundColor: '#f87979',
        data: [10, 13, 22, 8, 11, 9, 17],
        fill: false,
      },
      options: {
        responsive: true,
        title: {
          display: true,
        },
        tooltips: {
          position: 'average',
          mode: 'index',
          intersect: false,
        },
      },
    };
  },
  methods: {
    setStartDate() {
      const out = new Date();
      out.setMonth(out.getMonth() - 1);
      return out;
    },
    populateDateLabels(startDate) {
      const outMap = {};
      const today = new Date();
      const current = startDate;
      while (current < today) {
        outMap[current] = 0;
        current.setDate(current.getDate() + 1);
        console.log(current);
      }
      return outMap;
    },
  },
  mounted() {
    // const now = new Date();
    // const today = new Date(`${now.getMonth() + 1}/${now.getDate() + 1}/${now.getFullYear}`);
    // const yesterday = new Date(`${now.getMonth() + 1}/${now.getDate() - 3}/${now.getFullYear}`);
    // Overwriting base render method with actual data.
    const startFrom = this.setStartDate(); // currently 1 month ago
    const track = {};
    db
      .collection('applications')
      .doc('DH5_Test')
      .collection('all')
      .orderBy('last_modified.unix')
      .startAfter(startFrom.getTime() / 1000)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const item = doc.data();
          console.log(doc.data());
          const date = new Date(item.last_modified.date.toDate());
          const dateString = date.toDateString();
          if (!track[dateString]) {
            track[dateString] = 1;
          } else {
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
                stepSize: 2, //adjust this to change interval with label
              },
            }]
          },
        });
      });
  },
};
