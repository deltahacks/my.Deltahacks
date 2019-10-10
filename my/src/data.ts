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
    workshops: [],
  },
  logistics: {
    discovered_by: '',
    diet_restrictions: '',
    shirt_size: '',
    traveling_from: '',
    hackathons_attended: 0,
    reimbursement: '',
    accomodations: '',
  },
  resume: {
    filename: '',
    link: '',
  },
  general: {
    coffee: '',
    team: '',
    terms: '',
    code: ''
  }
};

export const applicationQuestions: any = [
  {
    label: "What's your first name?",
    fieldType: 'text',
    model: ['name', 'first'],
  },
  {
    label: 'And your last name?',
    fieldType: 'text',
    model: ['name', 'last'],
  },
  {
    label: 'What number can we reach you at?',
    fieldType: 'text',
    model: ['contact', 'phone'],
  },
  {
    label: 'Where do you study?',
    fieldType: 'single-select',
    selectData: ['Waterloo', 'McMaster'],
    model: ['academics', 'school'],
  },
  {
    label: 'Will you be enrolled in a university program or community college on January 18th, 2020?',
    fieldType: 'single-select',
    selectData: ['Yes', 'No'],
    model: ['academics', 'enrolled'],
  },
  {
    label: 'What degree are you pursuing?',
    fieldType: 'multi-select',
    model: ['academics', 'degree'],
  },
  {
    label: 'And what do you study?',
    fieldType: 'text',
    model: ['academics', 'major'],
  },
  {
    label: 'What is your current year of study?',
    fieldType: 'text',
    model: ['academics', 'year'],
  },
  {
    label: 'And when do you expect to graduate?',
    fieldType: 'text',
    model: ['academics', 'graduating'],
  },
  {
    label: "What's your birthday?",
    fieldType: 'date',
    model: ['personal', 'birthday'],
  },
  {
    label: 'Will you be 18 or older on January 18th, 2020?',
    fieldType: 'single-select',
    selectData: ['Yes', 'No'],
    model: ['academics', 'oldEnough'],
  },
  {
    label: "What's your gender?",
    fieldType: 'radio-select',
    selectData: ['Male', 'Female', 'Other'],
    model: ['personal', 'gender'],
  },
  {
    label: 'Which ethnic background do you identify with?',
    fieldType: 'text',
    model: ['personal', 'race'],
  },
  {
    label: 'Will DH6 be your first Hackathon?',
    fieldType: 'single-select',
    selectData: ['Yes', 'No'],
    model: ['logistics', 'firstHackathon'],
  },
  {
    label: 'How many hackathons have you been to?',
    fieldType: 'text',
    model: ['logistics', 'hackathons_attended'],
  },
  {
    label: "What does positive change mean to you? How do you see yourself \
    incorporating positive change into your experience at DeltaHacks? (500 chars)",
    fieldType: 'text',
    model: ['responses', 'q1'],
  },
  {
    label: "Describe a time you had to teach a new skill to someone? (500 chars)",
    fieldType: 'text',
    model: ['responses', 'q2'],
  },
  {
    label: "If you were stranded on a deserted island (with no way to escape) \
     for a month, what 3 personal items would you want to have? (Assuming all of your living necessities were covered) (750 chars)",
    fieldType: 'text',
    model: ['responses', 'q3'],
  },
  {
    label:
      'Is there anything else you want to tell us? It could be anything at all!',
    fieldType: 'text',
    model: ['responses', 'anything_else'],
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
    label: 'Do you have any dietary restrictions??',
    fieldType: 'text',
    model: ['logistics', 'diet_restrictions'],
  },
  {
    label: 'Which size shirt do you wear?',
    fieldType: 'text',
    model: ['logistics', 'shirt_size'],
  },
  {
    label: 'How did you hear about DeltaHacks?',
    fieldType: 'text',
    model: ['logistics', 'discovered_by'],
  },
  {
    label: 'What workshops would you like to see at deltahacks 6?',
    fieldType: 'checkboxes',
    model: ['responses', 'workshops'],
  },
  {
    label: 'Where are you travelling from?',
    fieldType: 'text',
    model: ['logistics', 'traveling_from'],
  },
  {
    label: 'Do you require travel reimbursements?',
    fieldType: 'single-select',
    selectData: ['Yes', 'No'],
    model: ['logistics', 'reimbursement']
  },
  {
    label: 'Would you like to be considered for a coffee chat?',
    fieldType: 'single-select',
    selectData: ['Yes', 'No'],
    model: ['general', 'coffee']
  },
  {
    label: 'Do you require travel reimbursements?',
    fieldType: 'single-select',
    selectData: ['Yes', 'No'],
    model: ['logistics', 'reimbursement']
  },
  {
    label: 'Do you already have a team?',
    fieldType: 'single-select',
    selectData: ['Yes', 'No'],
    model: ['general', 'team']
  },
  {
    label: 'What is your \"role\" when going to hackathons?',
    fieldType: 'text',
    model: ['general', 'role'],
  },
  {
    label: 'Do you agree with the MLH terms and conditions? ',
    fieldType: 'single-select',
    selectData: ['Yes', 'No'],
    model: ['general', 'terms']
  },
  {
    label: 'I have read and agree to the MLH Code of Conduct. I authorize you to share my application/registration information for event administration, ranking, MLH \
    administration, pre- and post-event informational e-mails, and occasional messages about hackathons in-line with the MLH Privacy Policy. I further agree to the terms both the MLH Contest Terms and Conditions and the MLH Privacy Policy ',
    fieldType: 'single-select',
    selectData: ['Yes', 'No'],
    model: ['general', 'code']
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
