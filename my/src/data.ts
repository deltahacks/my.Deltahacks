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
  'Grade 9',
  'Grade 10',
  'Grade 11',
  'Grade 12',
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
  'Hamilton, Ontario, Canada',
  'Toronto, Ontario, Canada',
  'Waterloo, Ontario, Canada',
  'London, Ontario, Canada',
  'Montreal, Quebec, Canada',
  'Vancouver, British Columbia, Canada',
  'Ottawa, Ontario, Canada',
  'Oakville, Ontario, Canada',
  'Mississauga, Ontario, Canada',
  'Guelph, Ontario, Canada',
  'Burlington, Ontario, Canada',
  'Brampton, Ontario, Canada',
  'Markham, Ontario, Canada',
  'Milton, Ontario, Canada',
  'Windsor, Ontario, Canada',
  'Kingston, Ontario, Canada',
  'Kitchener, Ontario, Canada',
  'United States',
  'India',
  'Other',
];

const shirt_size = ['XS', 'S', 'M', 'L', 'XL'];

const degree = ['Bachelors', 'Masters', 'PhD', "Associate's", 'Certificate', 'Diploma', 'High School Diploma'];

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
  'Electrical Engineering',
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
  '6+',
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

export async function getCategories() {
  const res = await firebase
    .functions()
    .httpsCallable('getCategories')();
  const cats = res.data.categories
  return cats.map(each => {
    return each
      .split(" ")
      .map(word => {
        return (
          word.substring(0, 1).toUpperCase() +
          word.substring(1, word.length).toLowerCase()
        );
      })
      .join(" ");
    });
}

const roles = [
  'Front-end',
  'Back-end',
  'Design',
  'iOS Development',
  'Android Development',
  'Hardware',
  'Machine Learning',
  'Graphics Programming',
  'Data Analysis',
  'Game Development',
  'Writer',
  'Product Manager',
  'Other',
];

export const busCities = [
  'Western', 'Waterloo', 'UofT', 'Scarborough/York',
];

export const getBlankApplication = (): AppContents => ({
  // XXX The metadata property ('_') is exclusively managed by our Firebase functions, but we use dummy values here in order to not break anything
  // TODO: Test the workflow to see if we can remove this
  _: {
    index: -1,
    reviews: {
      assignedTo: [],
      scores: [],
    },
    status: 'in progress',
    time_initiated: new Date().getTime(),
    time_submitted: new Date().getTime(),
  },
  name: {
    first: '',
    last: '',
  },
  contact: {
    email: '',
    phone: '',
  },
  first_submitted: new Date().getTime(),
  academics: {
    degree: '',
    major: '',
    graduating: new Date().getTime(),
    school: '',
    year: '',
  },
  personal: {
    birthday: new Date().getTime(),
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
    links: '',
    other: '',
  },
  responses: {
    anything_else: '',
    q1: '',
    q2: '',
    q3: '',
    workshops: [],
    challenges: [],
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
    emails: false,
    team: '',
    termsAndConditions: false,
    code: false,
  },
});

export const getBlankProject = (): any => ({
  _: {
    status: 'in progress',
    table: 'Pending',
    categories: {},
    notes: {},
  },
  name: {
    devpost: '',
    project: '',
  },
  profiles: {
    devpost: '',
    youtube: '',
  },
  responses: {
    challenges: [],
  },
  group: [
    { name: '', email: '' },
    { name: '', email: '' },
    { name: '', email: '' },
  ],
});

export const applicationQuestions: any = [
  /* Standard */
  {
    label: "What's your first name? *",
    fieldType: 'text',
    model: ['name', 'first'],
    requirements: { required: true },
  },
  {
    label: 'And your last name? *',
    fieldType: 'text',
    model: ['name', 'last'],
    requirements: { required: true },
  },
  {
    label: "When's your birthday? *",
    fieldType: 'date',
    model: ['personal', 'birthday'],
    requirements: { required: true, oldEnough: [14, new Date('March 5, 2021')] }, // TODO: Implicitly require age > 18 at time of event
  },
  {
    label: 'Where do you study? *',
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
      'Are you currently enrolled or will be enrolled in a postsecondary program by March 5th, 2021? *',
    fieldType: 'single-select',
    selectData: ['Yes', 'No'],
    model: ['academics', 'enrolled'],
    requirements: { required: true },
  },
  {
    label: 'What degree are you pursuing? *',
    fieldType: 'single-select',
    selectData: degree,
    icon: 'fa-certificate',
    model: ['academics', 'degree'],
    requirements: { required: true, oneOf: degree },
  },
  {
    label: "What's your major? *",
    fieldType: 'combo-box',
    selectData: majorsList,
    icon: 'fa-pencil-alt',
    model: ['academics', 'major'],
    requirements: { required: true },
  },
  {
    label: 'What is your current year of study? *',
    fieldType: 'single-select',
    selectData: yearOfStudy,
    icon: 'fa-calendar',
    model: ['academics', 'year'],
    requirements: { required: true, oneOf: yearOfStudy },
  },
  {
    label: 'And when do you expect to graduate? *',
    fieldType: 'date-grad',
    model: ['academics', 'graduating'],
    requirements: { required: true },
  },
  {
    label: 'Where will you be hacking from? *',
    fieldType: 'single-select',
    selectData: cities,
    icon: 'fa-laptop',
    // For legacy purposes, we're leaving this as the 'traveling_from' field, even though DH7 is online
    model: ['logistics', 'traveling_from'],
    requirements: { required: true, oneOf: cities },
  },
  // {
  //   label: 'Will you be 18 or older on January 25th, 2020?',
  //   fieldType: 'radio-select',
  //   selectData: ['Yes', 'No'],
  //   model: ['academics', 'oldEnough'],
  //   requirements: { required: true, mustBe: 'Yes' },
  // },
  /* Specific questions */
  {
    label: 'How many hackathons have you been to? *',
    fieldType: 'single-select',
    selectData: numberOfHackathons,
    icon: 'fa-list-ol',
    model: ['logistics', 'hackathons_attended'],
    requirements: { required: true, oneOf: numberOfHackathons },
  },
  {
    label:
      'DeltaHacks is the annual Hackathon for Change. \
      If you had the ability to change anything in the world, what would it be and why? *',
    fieldType: 'text-area',
    textLimit: '800',
    model: ['responses', 'q1'],
    requirements: { required: true, max: 800 },
  },
  {
    label: 'Which piece of future technology excites you most and where do you see it going? \
    (AI, Global Internet, Blockchain, Space Civilization, Virtual Reality, etc.) *',
    fieldType: 'text-area',
    textLimit: '600',
    model: ['responses', 'q2'],
    requirements: { required: true, max: 600 },
  },
  {
    label: '\
    You\'ve been transported to a room with only 2 exits: a small window 6m high and a locked door. In the room there are the following items: \
    <br /><br /> \
    Magic Wand, Cloning Machine, Lighter, Candle, Phone, Chainsaw, Invisibility Cloak, Time Machine, 3D printer, Shoelaces, and a Laptop... \
    <br /><br /> \
    How would you use <b>three of these items</b> to escape in time for DeltaHacks 7? \
    *',
    fieldType: 'text-area',
    textLimit: '800',
    model: ['responses', 'q3'],
    requirements: { required: true, max: 800 },
  },
  {
    label: 'What are your social media link(s)? (GitHub, LinkedIn, DevPost, personal website, etc.)',
    fieldType: 'text-area',
    // XXX Unlike previous years, we're coalescing social media links to one text field, but we're keeping the same structure for legacy reasons
    model: ['profiles', 'links'],
  },
  {
    label: 'Is there anything else interesting you want us to know or see? (Clubs you’re involved with, interesting facts, Blog, Youtube, etc)',
    fieldType: 'text-area',
    textLimit: 200,
    model: ['responses', 'anything_else'],
    requirements: { max: 500 },
  },
  {
    label: 'Upload your resume',
    fieldType: 'file',
    model: ['general', 'role'], // TODO: TARAN, FIGURE OUT WHY IS THIS THE MODEL FOR RESUMES??
  },
  /* Survey questions */
  {
    label: 'Which size t-shirt do you wear? *',
    fieldType: 'single-select',
    selectData: shirt_size,
    icon: 'fa-tshirt',
    model: ['logistics', 'shirt_size'],
    requirements: { required: true, oneOf: shirt_size },
  },
  {
    label: 'What kind of hacker are you? *',
    fieldType: 'multi-select',
    selectData: roles,
    icon: 'fa-users',
    model: ['general', 'role'],
    requirements: { required: true },
  },
  {
    label: 'Do you already have a team?',
    fieldType: 'single-select',
    selectData: ['Yes', 'No'],
    icon: 'fa-users',
    model: ['general', 'team'],
  },
  {
    label: 'What type workshops would you like to see at DeltaHacks 7?',
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
    label: 'How did you find out about DeltaHacks 7?',
    fieldType: 'single-select',
    selectData: discovered_by,
    model: ['logistics', 'discovered_by'],
  },
  {
    label: "What's your gender? *",
    fieldType: 'radio-select',
    selectData: gender,
    model: ['personal', 'gender'],
    requirements: { required: true, oneOf: gender },
  },
  {
    label: 'Which ethnic background do you identify with? *',
    fieldType: 'single-select',
    selectData: race,
    icon: 'fa-user-circle',
    model: ['personal', 'race'],
    requirements: { required: true },
  },
  {
    label: 'Please put the name of an emergency contact and their relation to you (e.g. John Smith, Father) *',
    fieldType: 'text',
    model: ['emergency', 'name'],
    requirements: { required: true },
  },
  {
    label: "What is your emergency contact's phone number? *",
    fieldType: 'text',
    model: ['emergency', 'phone'],
    requirements: { required: true },
  },
  // XXX Online for 2021, should (hopefully) reactivate these questions for other years
  // {
  //   label: 'Do you require travel reimbursements?',
  //   fieldType: 'single-select',
  //   selectData: ['Yes', 'No'],
  //   icon: 'fa-ticket-alt',
  //   model: ['logistics', 'reimbursement'],
  // },
  // {
  //   label: 'Do you have any dietary restrictions?',
  //   fieldType: 'combo-box',
  //   selectData: food,
  //   icon: 'fa-utensils',
  //   model: ['logistics', 'diet_restrictions'],
  // },
  // {
  //   label: 'Do you require any special accomodations?',
  //   fieldType: 'text',
  //   model: ['logistics', 'accomodations'],
  // },
];

export const authorizations: any = [
  {
    label:
      '<p>I have read and agree to the \
    <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">\
    MLH Code of Conduct</a>.</p>',
    requirements: { mustBe: true },
    model: ['general', 'termsAndConditions'],
  },
  {
    label:
      '<p>I authorize you to share my application/registration information with Major League Hacking for event \
    administration, ranking and MLH administration in-line with the \
    <a href="https://mlh.io/privacy" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">MLH Privacy Policy</a>. \
    I further agree to the terms of both the \
    <a href="https://github.com/MLH/mlh-policies/tree/master/prize-terms-and-conditions" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">\
    MLH Contest Terms and Conditions</a> and the \
    <a href="https://mlh.io/privacy" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">MLH Privacy Policy</a>.</p>',
    requirements: { mustBe: true },
    model: ['general', 'code'],
  },
  {
    label:
    '<p>I authorize MLH to send me pre- and post-event informational emails, which contain free credit and opportunities from their partners.</p>',
    model: ['general', 'emails'],
    requirements: { required: false },
  },
];

export async function getSubmitQuestions() {
  return [
    {
      label: "What's your personal Devpost ID?",
      fieldType: 'text',
      model: ['profiles', 'devpost'],
      requirements: { required: true, link: true },
    },
    {
      label: "What's your project name?",
      fieldType: 'text',
      model: ['name', 'project'],
      requirements: { required: true },
    },
    {
      label: 'What is your project\'s Devpost link?',
      fieldType: 'text',
      model: ['name', 'devpost'],
      requirements: { required: true, link: true },
    },
    {
      label: 'What is your project\'s demo Youtube video link?',
      fieldType: 'text',
      model: ['profiles', 'youtube'],
      requirements: { required: true, link: true, youtubeLink: true },
    },
    {
      label: 'What challenges would you like to be judged for?',
      fieldType: 'multi-select',
      selectData: await getCategories(),
      icon: 'fa-balance-scale',
      model: ['responses', 'challenges'],
      requirements: { required: true },
    },
  ];
}

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

for (let i = 2025; i >= 2020; i--) gradYears.push(i);

for (let i = 2020; i >= 1980; i--) birthYears.push(i);

for (let i = 1; i <= 31; i++) days.push(i);
