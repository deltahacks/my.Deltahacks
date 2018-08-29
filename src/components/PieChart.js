import { Pie, mixins } from 'vue-chartjs';
import db from '../private/firebase_init';

const { reactiveProp } = mixins;

function hex2(c) {
  c = Math.round(c);
  if (c < 0) c = 0;
  if (c > 255) c = 255;

  let s = c.toString(16);
  if (s.length < 2) s = `0${s}`;

  return s;
}

function color(r, g, b) {
  return `#${hex2(r)}${hex2(g)}${hex2(b)}`;
}

function shade(col, light) {
  // TODO: Assert that col is good and that -1 < light < 1

  let r = parseInt(col.substr(1, 2), 16);
  let g = parseInt(col.substr(3, 2), 16);
  let b = parseInt(col.substr(5, 2), 16);

  if (light < 0) {
    r = (1 + light) * r;
    g = (1 + light) * g;
    b = (1 + light) * b;
  } else {
    r = ((1 - light) * r) + (light * 255);
    g = ((1 - light) * g) + (light * 255);
    b = ((1 - light) * b) + (light * 255);
  }

  return color(r, g, b);
}
// doc.data()['U Toronto']
export default {
  extends: Pie,
  data() {
    return {
      uft: 22,
    };
  },
  mounted() {
    db
      .collection('statistics')
      .doc('DH5')
      .onSnapshot((doc) => {
        this.renderChart({
          labels: ['Toronto', 'McMaster', 'Waterloo', 'Western', 'Ryerson', 'York U'],
          datasets: [
            {
              label: 'Applications by University',
              backgroundColor: [`${shade('#002F65', 0.2)}`, `${shade('#83002C', 0.2)}`, `${shade('#FDD54F', 0.2)}`, `${shade('#4F2682', 0.2)}`, `${shade('#004C9B', 0.2)}`, `${shade('#E31836', 0.2)}`],
              data: [this.uft, doc.data().McMaster, doc.data().Waterloo, doc.data().Western, doc.data().Ryerson, doc.data()['York U']],
            },
          ],
        });
      });
  },
};
