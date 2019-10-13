import firebase from 'firebase';
import { AppContents } from './lets';

/* eslint-disable import/prefer-default-export */

let discovered_by: string[];
discovered_by = [
  'A friend'
, 'MLH'
, 'Facebook'
, 'Twitter'
, 'Posters'
, 'Instagram'
, 'Snapchat'
, 'Other'];

let race = [
   'Black / African American'
  , 'Hispanic'
  , 'East Asian'
  , 'South Asian'
  , 'Middle Eastern'
  , 'Native American'
  , 'White / Caucasian'
  , 'Multiple ethnicity / Other'
  , 'Prefer not to say'
];

let yearOfStudy = [
    'First Year'
  , 'Second Year'
  , 'Third Year'
  , 'Fourth Year'
  , 'Fifth Year'
  , 'Sixth Year']

let relation = [
  'Parent'
  , 'Grandparent'
  , 'Sibling'
  , 'Partner'
  , 'Friend'
  , 'Guardian'
  , 'Other']

let citites = [
   'Hamilton'
  , 'Toronto'
  , 'Waterloo'
  , 'London'
  , 'Montreal'
  , 'Ottawa'
  , 'Mississauga'
  , 'Guelph'
  , 'Burlington'
  , 'Brampton'
  , 'Markham'
  , 'Milton']

let shirt_size = ['XS' , 'S' , 'M' , 'L' , 'XL'];

let degree = ['Bachelors' , 'Masters' , 'PhD'];

let gender = ['Male', 'Female', 'Other'];

const food = [
  'None',
  'Vegetarian',
  'Vegan',
  'Halal',
  'Gluten Free',
  'Kosher',
  'No Beef',
  'Lactose Intolerant',
  'Gluten Free'];

const allUniversities1 = ['McMaster University',
  'University of Waterloo',
  'University of Toronto',
  'University of Western Ontario',
  'Ryerson University',
  'Queen’s University',
  'University of Guelph',
  'University of Ottawa',
  'University of Windsor',
  'University of Ontario Institute of Technology',
  'Carleton University',
  'Brock University',
  'University of British Columbia',
  'Lakehead University',
  'Laurentian University',
  'Nipissing University',
  'OCAD University',
  'Redeemer University College',
  'Royal Military College of Canada',
  'Saint Paul University',
  'St. Jerome’s University',
  'Trent University',
  'University of St. Michael’s College',
  'University of Sudbury',
  'University of Trinity College',
  'Victoria University',
  'Wilfrid Laurier University',
  'Vancouver Island University',
  'Royal Roads University',
  'Simon Fraser University',
  'Trinity Western University',
  'Thompson River University',
  'University of the Fraser Valley',
  'University of Northern British Columbia',
  'University of Victoria',
  'First Nations University of Canada',
  'University of Regina',
  'University of Saskatchewan',
  'Athabasca University',
  'Augustana University College',
  'Concordia University College of Alberta',
  'The King’s University College',
  'University of Alberta',
  'University of Calgary',
  'University of Lethbridge',
  'MacEwan University',
  'Mount Royal University',
  'Brandon University',
  'University of Manitoba',
  'University of Winnipeg',
  'Canadian Mennonite University',
  'St. Paul’s College',
  'Université de Saint-Boniface',
  'Algoma University',
  'Brescia University College',
  'York University',
  'Bishop’s University',
  'Concordia University',
  'École de technologie supérieur',
  'École nationale d’administration publique',
  'École Polytechnique de Montréal',
  'HEC Montréal',
  'Institut national de la recherche scientifique',
  'McGill University',
  'Université de Montréal',
  'Université de Sherbrooke',
  'Université de Québec',
  'Université du Québec à Chicoutimi (UQAC)',
  'Université du Québec à Montréal (UQAM)',
  'Université du Québec à Rimouski (UQAR)',
  'Université du Québec à Trois-Rivières (UQTR)',
  'Université du Québec en Abitibi-Témiscamingue (UQAT)',
  'Université du Québec en Outaouais',
  'Université de Laval',
  'University of Prince Edward Island',
  'Acadia University',
  'Cape Breton University',
  'Dalhousie University',
  'Mount Saint Vincent University',
  'NSCAD University',
  'Saint Mary’s University',
  'St. Francis Xavier University',
  'Université Sainte-Anne',
  'University of King’s College',
  'Mount Allison University',
  'St. Thomas University',
  'Université de Moncton',
  'University of New Brunswick',
  'Memorial University of Newfoundland',
  'BRITISH COLUMBIA',
  'British Columbia Institute of Technology',
  'Okanagan College',
  'Ashton College',
  'Brighton College',
  'Columbia College',
  'Camosun College',
  'Canadian College',
  'Capilano University',
  'Collège Éducacentre',
  'College of the New Caledonia',
  'College of the Rockies',
  'Douglas College',
  'Eton College',
  'Justice Institute of British Columbia',
  'Kwantlen Polytechnic University',
  'Langara College',
  'Native Education College',
  'Nicola Valley Institute of Technology',
  'North Island College',
  'Northern Lights College',
  'Northwest Community College',
  'Okanagan College',
  'Selkirk College',
  'Sprott Shaw College',
  'Vancouver Community College',
  'Vancouver Institute of Media Arts',
  'Winnipeg Technical College',
  'Assiniboine Community College',
  'University College of the North',
  'Red River College of Applied Arts, Science and Technology',
  'École technique et professionnelle, Université de Saint-Boniface',
  'Manitoba Institute of Trades and Technology',
  'New Brunswick College of Craft and Design',
  'New Brunswick Community College',
  'Maritime College of Forest Technology',
  'New Brunswick Bible Institute',
  'College of the North Atlantic',
  'Marine Institute',
  'Centre for Nursing Studies',
  'Université de Guelph, Campus d’Alfred',
  'Algonquin College',
  'Collège Boréal',
  'Cambrian College of Applied Arts and Technology',
  'Canadore College of Applied Arts and Technology',
  'Centennial College of Applied Arts and Technology',
  'La Cité collégiale',
  'Conestoga College Institute of Technology and Advanced Learning',
  'Confederation College of Applied Arts and Technology',
  'Durham College',
  'Fanshawe College of Applied Arts and Technology',
  'Fleming College',
  'George Brown College',
  'Georgian College of Applied Arts and Technology',
  'Humber College Institute of Technology & Advanced Learning University of Guelph, Kemptville Campus',
  'Lambton College of Applied Arts and Technology',
  'Loyalist College of Applied Arts and Technology',
  'The Michener Institute for Applied Health Sciences',
  'Mohawk College of Applied Arts and Technology',
  'Niagara College',
  'Northern College of Applied Arts and Technology',
  'St. Clair College of Applied Arts and Technology',
  'St. Lawrence College',
  'Sault College of Applied Arts and Technology',
  'Seneca College of Applied Arts and Technology',
  'Sheridan College Institute of Technology and Advanced Learning',
  'Aurora College',
  'Academy of Learning College',
  'Canadian Coast Guard College',
  'Gaelic College',
  'Kingston Bible College',
  'Nova Scotia Community College',
  'Nunavut Arctic College',
  'Holland College',
  'Maritime Christian College',
  'Collège Acadie Î.-P.-É.',
  'Cégep de l’Abitibi-Témiscamingue',
  'Collège Ahuntsic',
  'Collège André-Laurendeau',
  'Cégep de Baie-Comeau',
  'Cégep Beauce-Appalaches',
  'Collège de Bois-de-Boulogne',
  'Champlain Regional College',
  'Cégep de Chicoutimi',
  'Dawson College',
  'Cégep de Drummondville',
  'Cégep Édouard-Montpetit',
  'Collège François-Xavier-Garneau',
  'Cégep de la Gaspésie et des Îles',
  'Collège Gérald-Godin',
  'Cégep de Granby-Haute-Yamaska',
  'Heritage College',
  'John Abbott College',
  'Cégep de Jonquière',
  'Cégep de La Pocatière',
  'Cégep régional de Lanaudière',
  'Cégep de Lévis-Lauzon',
  'Cégep Limoilou',
  'Collège Lionel-Groulx',
  'Collège de Maisonneuve',
  'Cégep Marie-Victorin',
  'Cégep de Matane',
  'Collège Montmorency',
  'Cégep de l’Outaouais',
  'Cégep de Rimouski',
  'Collège de Rosemont',
  'Cégep de Saint-Félicien',
  'Cégep de Saint-Hyacinthe',
  'Cégep de Saint-Jean-sur-Richelieu',
  'Cégep de Saint-Jérôme',
  'Cégep de Saint-Laurent',
  'Cégep de Sainte-Foy',
  'Cégep de Sept-Îles',
  'Collège Shawinigan',
  'Cégep de Sherbrooke',
  'Cégep de Sorel-Tracy',
  'Cégep de Thetford',
  'Cégep de Trois-Rivières',
  'Collège de Valleyfield',
  'Vanier College',
  'Cégep de Victoriaville',
  'Cégep du Vieux Montréal',
  'Collège Bart',
  'Collège Jean-de-Brébeuf',
  'Collège Laflèche',
  'LaSalle College',
  'Marianopolis College',
  'Collège International Marie de France',
  'Collège Mérici',
  'O’Sullivan College of Montreal',
  'Collège O’Sullivan de Québec',
  'Collège Stanislas',
  'École de musique Vincent d’Indy',
  'National Circus School',
  'Séminaire de Sherbrooke',
  'Trebas Institute',
  'Bethany College',
  'Briercrest College and Seminary',
  'Carlton Trail Regional College',
  'Horizon College and Seminary',
  'College Mathieu',
  'Cumberland College',
  'Eston College',
  'Great Plains College',
  'Nipawin Bible College',
  'Northlands College',
  'North West Regional College',
  'Parkland College',
  'Saskatchewan Indian Institute of Technologies',
  'Saskatchewan Institute of Applied Sciences and Technology',
  'Southeast Regional College',
  'St Peter’s College',
  'Western Academy Broadcasting College',
  'Yukon College'];

const majorsList = [
  'Computer Science',
  'Software Engineering',
  'Computer Engineering',
  'Physcology',
  'Music',
  'Civil Engineering',
  'Mechatronics Engineering',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Biomedical Engineering',
  'Materials Engineering',
  'Chemical Engineering',
  'Astronomy',
  'Physics',
  'English',
  'Philosophy',
  'Art',
  'Mathematics',
  'Biology',
  'Medicine',
  'Life Science',
  'Health Science',
  'Engineering 1st Year',
  'Other',
];

const workshops = [
  'NodeJs',
  'ReactJs/VueJs',
  'Blockchain',
  'Machine Learning',
  'Buzzwords',
  'Android development',
  'iOS development',
  'Web Development',
  'Intro to AR/VR',
  'Game Development',
  'Intro to UI/UX design',
  'Hardware hacking',
  'Computer Vision with OpenCV',
]


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
    selectData: allUniversities1,
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
    fieldType: 'single-select',
    selectData: degree,
    model: ['academics', 'degree'],
  },
  {
    label: 'And what do you study?',
    fieldType: 'single-select',
    selectData: majorsList,
    model: ['academics', 'major'],
  },
  {
    label: 'What is your current year of study?',
    fieldType: 'single-select',
    selectData: yearOfStudy,
    model: ['academics', 'year'],
  },
  {
    label: 'And when do you expect to graduate?',
    fieldType: 'date',
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
    selectData: gender,
    model: ['personal', 'gender'],
  },
  {
    label: 'Which ethnic background do you identify with?',
    fieldType: 'single-select',
    selectData: race,
    model: ['personal', 'race'],
  },
  {
    label: 'How many hackathons have you been to?',
    fieldType: 'single-select',
    selectData: ['0','1','2','3','4','5','6','7','8','9','10+'],
    model: ['logistics', 'hackathons_attended'],
  },
  {
    label: "What does positive change mean to you? How do you see yourself \
    incorporating positive change into your experience at DeltaHacks? (500 chars)",
    fieldType: 'text-area',
    textLimit: 500,
    model: ['responses', 'q1'],
  },
  {
    label: "Describe a time you had to teach a new skill to someone? (500 chars)",
    fieldType: 'text-area',
    model: ['responses', 'q2'],
  },
  {
    label: "If you were stranded on a deserted island (with no way to escape) \
     for a month, what 3 personal items would you want to have? (Assuming all of your living necessities were covered) (750 chars)",
    fieldType: 'text-area',
    model: ['responses', 'q3'],
  },
  {
    label:
      'Is there anything else you want to tell us? It could be anything at all!',
    fieldType: 'text-area',
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
    label: 'Do you have any dietary restrictions?',
    fieldType: 'combo-box',
    selectData: food,
    model: ['logistics', 'diet_restrictions'],
  },
  {
    label: 'Which size shirt do you wear?',
    fieldType: 'single-select',
    selectData: shirt_size,
    model: ['logistics', 'shirt_size'],
  },
  {
    label: 'How did you hear about DeltaHacks?',
    fieldType: 'single-select',
    selectData: discovered_by,
    model: ['logistics', 'discovered_by'],
  },
  {
    label: 'What workshops would you like to see at deltahacks 6?',
    fieldType: 'multi-select',
    selectData: workshops,
    model: ['responses', 'workshops'],
  },
  {
    label: 'Where are you travelling from?',
    fieldType: 'single-select',
    selectData: citites,
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
    fieldType: 'text-area',
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
