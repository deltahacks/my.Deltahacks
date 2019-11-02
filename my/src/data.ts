/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AppContents } from './types';

const discovered_by: string[] = [
  'A friend',
  'MLH',
  'Facebook',
  'Twitter',
  'Posters',
  'Instagram',
  'Snapchat',
  'Other',
];

const race = [
  'Black / African American',
  'Hispanic',
  'East Asian',
  'South Asian',
  'Middle Eastern',
  'Native American',
  'White / Caucasian',
  'Multiple ethnicity / Other',
  'Prefer not to say',
];

const yearOfStudy = [
  'First Year',
  'Second Year',
  'Third Year',
  'Fourth Year',
  'Fifth Year',
  'Sixth Year',
];

const relation = [
  'Parent',
  'Grandparent',
  'Sibling',
  'Partner',
  'Friend',
  'Guardian',
  'Other',
];

const cities = [
  'Hamilton',
  'Toronto',
  'Waterloo',
  'London',
  'Montreal',
  'Ottawa',
  'Mississauga',
  'Guelph',
  'Burlington',
  'Brampton',
  'Markham',
  'Milton',
  'Other',
];

const shirt_size = ['XS', 'S', 'M', 'L', 'XL'];

const degree = ['Bachelors', 'Masters', 'PhD'];

const gender = ['Male', 'Female', 'Other'];

const food = [
  'None',
  'Vegetarian',
  'Vegan',
  'Halal',
  'Gluten Free',
  'Kosher',
  'No Beef',
  'Lactose Intolerant',
  'Gluten Free',
  'Other (Type your own)',
];

const allUniversities1 = [
  'McMaster University',
  'University of Waterloo',
  'University of Toronto',
  'University of Western Ontario',
  'Ryerson University',
  'Queen’s University',
  'University of Guelph',
  'University of Ottawa',
  'University of Windsor',
  'University of Ontario Institute of Technology',
  'Algoma University',
  'York University',
  'Concordia University',
  'McGill University',
  'Carleton University',
  'Brock University',
  'University of British Columbia',
  'Lakehead University',
  'Laurentian University',
  'Nipissing University',
  'OCAD University',
  'Redeemer University College',
  'Trent University',
  'University of Trinity College',
  'Victoria University',
  'Wilfrid Laurier University',
  'Simon Fraser University',
  'Thompson River University',
  'University of the Fraser Valley',
  'University of Northern British Columbia',
  'University of Victoria',
  'University of Regina',
  'University of Saskatchewan',
  'Athabasca University',
  'University of Alberta',
  'University of Calgary',
  'University of Manitoba',
  'University of Winnipeg',
  'Acadia University',
  'Dalhousie University',
  'Saint Mary’s University',
  'St. Francis Xavier University',
  'Université Sainte-Anne',
  'University of King’s College',
  'Mount Allison University',
  'Université de Moncton',
  'University of New Brunswick',
  'Memorial University of Newfoundland',
  'British Columbia Institute of Technology',
  'Camosun College',
  'Winnipeg Technical College',
  'University College of the North',
  'College of the North Atlantic',
  'Algonquin College',
  'Cambrian College',
  'Canadore College',
  'Centennial College',
  'La Cité collégiale',
  'Conestoga College',
  'Confederation College',
  'Durham College',
  'Fanshawe College',
  'Fleming College',
  'George Brown College',
  'Georgian College',
  'Lambton College',
  'Loyalist College',
  'The Michener Institute for Applied Health Sciences',
  'Mohawk College',
  'Niagara College',
  'Northern College',
  'St. Clair College',
  'St. Lawrence College',
  'Sault College',
  'Seneca College',
  'Sheridan College Institute of Technology and Advanced Learning',
  'St Peter’s College',
  'Western Academy Broadcasting College',
  'Yukon College',
  'Other',
];

const majorsList = [
  'Accounting',
  'Animal Biology',
  'Animal Science',
  'Anthropology',
  'Applied Human Nutrition',
  'Art',
  'Art History',
  'Biochemistry',
  'Biodiversity',
  'Biology',
  'Biological and Medical Physics',
  'Biological and Pharmaceutical Chemistry',
  'Biological Engineering',
  'Biological Science',
  'Biomedical Engineering',
  'Biomedical Toxicology',
  'Bio-Medical Science',
  'Chemical Physics',
  'Chemistry',
  'Chemical Engineering',
  'Child Studies',
  'Civil Engineering',
  'Classical Studies',
  'Computer Engineering',
  'Computer Science',
  'Criminal Justice and Public Policy',
  'Ecology',
  'Economics',
  'Engineering Systems and Computing',
  'English',
  'Environment and Resource Management',
  'Environmental Engineering',
  'Environmental Sciences',
  'Equine Management',
  'European Studies',
  'Family Studies and Human Development',
  'Food, Agricultural and Resource Economics',
  'Food and Agricultural Business',
  'Food Industry Management',
  'Food Science',
  'French Studies/Études Françaises',
  'General (B.A.)',
  'Geography',
  'Health Science',
  'History',
  'Honours Agriculture',
  'Hospitality and Tourism Management ',
  'Human Kinetics',
  'International Development Studies',
  'Life Science',
  'Management',
  'Management Economics and Finance',
  'Marine & Freshwater Biology',
  'Marketing Management',
  'Mathematics',
  'Mechanical Engineering',
  'Mechatronics Engineering',
  'Medicine',
  'Materials Engineering',
  'Microbiology',
  'Molecular Biology & Genetics',
  'Music',
  'Nanoscience',
  'Neuroscience',
  'Nutrition',
  'Philosophy',
  'Physical Science',
  'Physics',
  'Plant Science',
  'Political Science',
  'Psychology',
  'Public Management',
  'Spanish & Hispanic Studies',
  'Sociology',
  'Software Engineering',
  'Theatre Studies',
  'Theoretical Physics',
  'Undeclared',
  'Other',
];

const numberOfHackathons = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10+',
];

const workshops = [
  'Node.js',
  'React/Vue.js',
  'Blockchain',
  'Machine Learning',
  'Android Development',
  'iOS Development',
  'Web Development',
  'Intro to AR/VR',
  'Game Development',
  'Interview Prep',
  'Intro to UI/UX Design',
  'Hardware Hacking',
  'Computer Vision with OpenCV',
];

const roles = [
  'None',
  'Front-end',
  'Back-end',
  'Design',
  'iOS Development',
  'Android Development',
  'Hardware Hacking',
  'Machine Learning',
  'Graphics Programming',
  'Data Analysis',
  'Game Development',
  'Writer',
  'Product Manager',
  'Other',
];

export const getBlankApplication = (): AppContents => ({
  _: {
    index: -1,
    reviews: {
      assignedTo: [],
      scores: [],
    },
    status: 'in progress',
    time_initiated: new Date(),
    time_submitted: new Date(),
  },
  name: {
    first: '',
    last: '',
  },
  contact: {
    email: '',
    phone: '',
  },
  first_submitted: new Date(),
  academics: {
    degree: '',
    major: '',
    graduating: new Date(),
    school: '',
    year: '',
  },
  personal: {
    birthday: new Date(),
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
    other: '',
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
    termsAndConditions: false,
    code: false,
  },
});

export const applicationQuestions: any = [
  {
    label: "What's your first name?",
    fieldType: 'text',
    model: ['name', 'first'],
    requirements: { required: true },
  },
  {
    label: 'And your last name?',
    fieldType: 'text',
    model: ['name', 'last'],
    requirements: { required: true },
  },
  {
    label: 'What number can we reach you at?',
    fieldType: 'text',
    model: ['contact', 'phone'],
  },
  {
    label: 'Where do you study?',
    fieldType: 'single-select',
    selectData: allUniversities1,
    icon: 'fa-school',
    model: ['academics', 'school'],
    requirements: {
      required: true,
      oneOf: allUniversities1,
    },
  },
  {
    label:
      'Are you currently enrolled or will be enrolled in a postsecondary program by January 25th, 2020?',
    fieldType: 'single-select',
    selectData: ['Yes', 'No'],
    model: ['academics', 'enrolled'],
    requirements: { required: true, mustBe: 'Yes' },
  },
  {
    label: 'What degree are you pursuing?',
    fieldType: 'single-select',
    selectData: degree,
    icon: 'fa-certificate',
    model: ['academics', 'degree'],
    requirements: { required: true, oneOf: degree },
  },
  {
    label: "What's your major?",
    fieldType: 'combo-box',
    selectData: majorsList,
    icon: 'fa-pencil-alt',
    model: ['academics', 'major'],
    requirements: { required: true, oneOf: majorsList },
  },
  {
    label: 'What is your current year of study?',
    fieldType: 'single-select',
    selectData: yearOfStudy,
    icon: 'fa-calendar',
    model: ['academics', 'year'],
    requirements: { required: true, oneOf: yearOfStudy },
  },
  {
    label: 'And when do you expect to graduate?',
    fieldType: 'date-grad',
    model: ['academics', 'graduating'],
    // requirements: { required: true, },
  },
  {
    label: "What's your birthday?",
    fieldType: 'date',
    model: ['personal', 'birthday'],
    requirements: { required: true },
  },
  {
    label: 'Will you be 18 or older on January 25th, 2020?',
    fieldType: 'radio-select',
    selectData: ['Yes', 'No'],
    model: ['academics', 'oldEnough'],
    requirements: { required: true, mustBe: 'Yes' },
  },
  {
    label: "What's your gender?",
    fieldType: 'radio-select',
    selectData: gender,
    model: ['personal', 'gender'],
    requirements: {
      required: true,
      oneOf: gender,
    },
  },
  {
    label: 'Which ethnic background do you identify with?',
    fieldType: 'single-select',
    selectData: race,
    icon: 'fa-user-circle',
    model: ['personal', 'race'],
    requirements: { required: true },
  },
  {
    label: 'How many hackathons have you been to?',
    fieldType: 'single-select',
    selectData: numberOfHackathons,
    icon: 'fa-list-ol',
    model: ['logistics', 'hackathons_attended'],
    requirements: { required: true, oneOf: numberOfHackathons },
  },
  {
    label:
      'What does positive change mean to you? How do you see yourself \
    incorporating positive change into your experience at DeltaHacks?',
    fieldType: 'text-area',
    textLimit: '500',
    model: ['responses', 'q1'],
    requirements: { required: true, max: 500 },
  },
  {
    label: 'Describe a time you had to teach a new skill to someone.',
    fieldType: 'text-area',
    textLimit: '500',
    model: ['responses', 'q2'],
    requirements: { required: true, max: 500 },
  },
  {
    label:
      'If you were stranded on a deserted island, with no way to escape, \
     for a month, what 3 personal items would you want to have?',
    fieldType: 'text-area',
    textLimit: '750',
    model: ['responses', 'q3'],
    requirements: { required: true, max: 750 },
  },
  {
    label: "What's your GitHub?",
    fieldType: 'text',
    model: ['profiles', 'github'],
    requirements: { link: true },
  },
  {
    label: "What's your LinkedIn?",
    fieldType: 'text',
    model: ['profiles', 'linkedin'],
    requirements: { link: true },
  },
  {
    label: "What's your Devpost?",
    fieldType: 'text',
    model: ['profiles', 'devpost'],
    requirements: { link: true },
  },
  {
    label:
      'Is there anything else interesting you would want us to see? (e.g. Personal Website, Codepen, Dribble, Youtube, etc)',
    fieldType: 'text-area',
    textLimit: '200',
    model: ['profiles', 'other'],
  },
  {
    label: 'What workshops would you like to see at DeltaHacks VI?',
    fieldType: 'multi-select',
    selectData: workshops,
    icon: 'fa-wrench',
    model: ['responses', 'workshops'],
  },
  {
    label: 'Would you like to be considered for a coffee chat with a sponsor?',
    fieldType: 'single-select',
    selectData: ['Yes', 'No'],
    icon: 'fa-coffee',
    model: ['general', 'coffee'],
  },
  {
    label: 'Where are you travelling from?',
    fieldType: 'single-select',
    selectData: cities,
    icon: 'fa-plane',
    model: ['logistics', 'traveling_from'],
    requirements: { required: true, oneOf: cities },
  },
  {
    label: 'Do you require travel reimbursements?',
    fieldType: 'single-select',
    selectData: ['Yes', 'No'],
    icon: 'fa-ticket-alt',
    model: ['logistics', 'reimbursement'],
  },
  {
    label: 'Do you have any dietary restrictions?',
    fieldType: 'combo-box',
    selectData: food,
    icon: 'fa-utensils',
    model: ['logistics', 'diet_restrictions'],
  },
  {
    label: 'Do you require any special accomodations?',
    fieldType: 'text',
    model: ['logistics', 'accomodations'],
  },
  {
    label: 'Please put in the name of an emergency contact',
    fieldType: 'text',
    model: ['emergency', 'name'],
    requirements: { required: true },
  },
  {
    label: "What is your emergency contact's phone number?",
    fieldType: 'text',
    model: ['emergency', 'phone'],
    requirements: { required: true },
  },
  {
    label: 'Which size shirt do you wear?',
    fieldType: 'single-select',
    selectData: shirt_size,
    icon: 'fa-tshirt',
    model: ['logistics', 'shirt_size'],
    requirements: { required: true, oneOf: shirt_size },
  },
  {
    label: 'Do you already have a team?',
    fieldType: 'single-select',
    selectData: ['Yes', 'No'],
    icon: 'fa-users',
    model: ['general', 'team'],
  },
  {
    label: 'What area do you typically work in?',
    fieldType: 'single-select',
    selectData: roles,
    icon: 'fa-users',
    model: ['general', 'role'],
  },
  {
    label:
      'Is there anything else you want to tell us? It could be anything at all!',
    fieldType: 'text-area',
    textLimit: 200,
    model: ['responses', 'anything_else'],
    requirements: { max: 500 },
  },
  {
    label: 'Please upload your resumé',
    fieldType: 'file',
    model: ['general', 'role'],
  },
];

export const authorizations: any = [
  {
    label:
      '<p>I have read and agree to the \
    <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">\
    MLH Code of Conduct</a>.</p>',
    model: ['general', 'termsAndConditions'],
  },
  {
    label:
      '<p>I authorize you to share my application/registration information for event administration, ranking, MLH \
    administration, pre- and post-event informational e-mails, and occasional messages about hackathons in-line with the \
    <a href="https://mlh.io/privacy" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">MLH Privacy Policy</a>. \
    I further agree to the terms both the \
    <a href="https://github.com/MLH/mlh-policies/tree/master/prize-terms-and-conditions" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">\
    MLH Contest Terms and Conditions</a> and the \
    <a href="https://mlh.io/privacy" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">MLH Privacy Policy</a>.</p>',
    model: ['general', 'code'],
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
export const gradYears: number[] = [];
export const birthYears: number[] = [];
export const days: number[] = [];

for (let i = 2024; i >= 2019; i--) gradYears.push(i);

for (let i = 2019; i >= 1980; i--) birthYears.push(i);

for (let i = 1; i <= 31; i++) days.push(i);
