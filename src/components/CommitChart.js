import { Line } from 'vue-chartjs';
// import firebase from 'firebase';
import db from '../private/firebase_init';

export default {
  extends: Line,
  mounted() {
    // const now = new Date();
    // const today = new Date(`${now.getMonth() + 1}/${now.getDate() + 1}/${now.getFullYear}`);
    // const yesterday = new Date(`${now.getMonth() + 1}/${now.getDate() - 3}/${now.getFullYear}`);
    // Overwriting base render method with actual data.
    db
      .collection('applications')
      .doc('DH5_test')
      .collection('all')
      .orderBy('last_modified.unix')
      .get()
      .then((snap) => {
        // console.log('SNAP!', snap);
        snap.forEach((doc) => {
          // console.log('Data21', doc.data());
        });
      })
      .catch(err => console.log('ERROR19', err));

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
