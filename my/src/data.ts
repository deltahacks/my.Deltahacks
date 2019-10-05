import firebase from 'firebase';
import { AppContents } from './types';

/* eslint-disable import/prefer-default-export */
export const blankApplication: AppContents =
{
  _: {
    index: 0,
    reviews: {
      assignedTo: [],
      scores: [],
    },
    status: 'in progress',
    time_initiated: firebase.firestore.Timestamp.fromDate(new Date()),
    time_submitted: firebase.firestore.Timestamp.fromDate(new Date()),
  },
  name: {
    first: '',
    last: '',
  },
  contact: {
    email: '',
    phone: '',
  },
  first_submitted: firebase.firestore.Timestamp.fromDate(new Date()),
  academics: {
    degree: '',
    major: '',
    graduating: '',
    school: '',
    year: '',
  },
  personal: {
    birthday: firebase.firestore.Timestamp.fromDate(new Date()),
    gender: '',
    race: '',
  },
  emergency: {
    name: '',
    phone: '',
    relation: '',
  },
  documents: {
    download_link: '',
    filename: '',
    id: '',
  },
  profiles: {
    devpost: '',
    github: '',
    linkedin: '',
    website: '',
  },
  responses: {
    anything_else: '',
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    workshops: [],
  },
  logistics: {
    discovered_by: '',
    diet_restrictions: '',
    shirt_size: '',
    traveling_from: '',
    hackathons_attended: 0,
  },
  resume: {
    filename: '',
    link: '',
  },
};

export const months: string[] = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];
export const years: number[] = [];
export const days: number[] = [];

for (let i = 2019; i >= 1980; i--) years.push(i);
for (let i = 0; i <= 31; i++) days.push(i);
