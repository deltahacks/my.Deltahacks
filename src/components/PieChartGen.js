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
    r *= (1 + light);
    g *= (1 + light);
    b *= (1 + light);
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
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options);
  },
};
