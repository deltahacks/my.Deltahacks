import firebase from 'firebase';
import { AppContents } from './types';

/* eslint-disable import/prefer-default-export */
export const blankApplication: AppContents = {
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

export const applicationQuestions: any = [
  {
    label: "What's your first name?",
    fieldType: 'text',
    model: ['name', 'first'],
    name: 'first name',
    requirements: {
      required: true
    }
  },
  {
    label: 'And your last name?',
    fieldType: 'text',
    model: ['name', 'last'],
    name: 'last name',
    requirements: {
      required: true
    }
  },
  {
    label: "What's your birthday?",
    fieldType: 'date',
    model: ['personal', 'birthday'],
    name: 'birthday',
    requirements: {
      required: true
    }
  },
  {
    label: "What's your gender?",
    fieldType: 'radio-select',
    selectData: ['Male', 'Female', 'Other'],
    model: ['personal', 'gender'],
    name: 'gender',
    requirements: {
      required: true,
      oneOf: true // Data consumer will use fields from selectData
    }
  },
  {
    label: 'Where do you study?',
    fieldType: 'single-select',
    selectData: ['Waterloo', 'McMaster'],
    model: ['academics', 'school'],
    name: 'school',
    requirements: {
      required: true,
      oneOf: true // Data consumer will use fields from selectData
    }
  },
  {
    label: 'And what do you study?',
    fieldType: 'text',
    model: ['academics', 'major'],
  },
  {
    label: 'What degree are you pursuing?',
    fieldType: 'multi-select',
    model: ['academics', 'degree'],
  },
  {
    label: 'What year are you in?',
    fieldType: 'text',
    model: ['academics', 'year'],
  },
  {
    label: 'And when do you expect to graduate?',
    fieldType: 'text',
    model: ['academics', 'graduating'],
  },
  {
    label: 'Which ethnic background do you identify with?',
    fieldType: 'text',
    model: ['personal', 'race'],
  },
  {
    label: "What's your LinkedIn?",
    fieldType: 'text',
    model: ['profiles', 'linkedin'],
  },
  {
    label: "What's your personal website?",
    fieldType: 'text',
    model: ['profiles', 'website'],
  },
  {
    label: 'Devpost?',
    fieldType: 'text',
    model: ['profiles', 'devpost'],
  },
  {
    label: 'Link us to any other profiles you have',
    fieldType: 'text',
    model: ['profiles', 'devpost'],
  },
  {
    label: 'What number can we reach you at?',
    fieldType: 'text',
    model: ['contact', 'phone'],
  },
  {
    label: 'Do you have any dietary restrictions?',
    fieldType: 'text',
    model: ['logistics', 'diet_restrictions'],
    name: 'dietary restrictions',
    requirements: {
      required: true
    }
  },
  {
    label: 'Which size shirt do you wear?',
    fieldType: 'text',
    model: ['logistics', 'shirt_size'],
  },
  {
    label: 'How many hackathons have you been to?',
    fieldType: 'text',
    model: ['logistics', 'hackathons_attended'],
  },
  {
    label: 'How did you hear about DeltaHacks?',
    fieldType: 'text',
    model: ['logistics', 'discovered_by'],
  },
  {
    label:
      'Is there anything else you want to tell us? It could be anything at all!',
    fieldType: 'text',
    model: ['responses', 'anything_else'],
  },
];

export const months: string[] = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const years: number[] = [];
export const days: number[] = [];

for (let i = 2019; i >= 1980; i--) years.push(i);
for (let i = 0; i <= 31; i++) days.push(i);
