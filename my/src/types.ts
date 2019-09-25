/* eslint-disable camelcase */
export interface ApplicationModel {
  app:
    | {}
    | {
        name: {
          first: string;
          last: string;
        };
        contact: {
          email: string;
          phone: string;
        };
        first_submitted: Date;
        academics: {
          degree: degree;
          major: string;
          graduating: string;
          school: string;
          year: year;
        };
        personal: {
          birthday: Date;
          gender: gender;
          race: race;
        };
        emergency: {
          name: string;
          phone: string;
          relation: relation;
        };
        documents: {
          download_link?: string;
          filename?: string;
          id?: string;
        };
        profiles: {
          devpost?: string;
          github?: string;
          linkedin?: string;
          website?: string;
        };
        responses: {
          anything_else?: string;
          q1?: string;
          q2?: string;
          q3?: string;
          q4?: string;
          workshops?: Array<string>;
        };
        logistics: {
          discovered_by: string;
          diet_restrictions: string;
          shirt_size: shirt_size;
          traveling_from: string;
          hackathons_attended: number;
        };
        resume: {
          filename: string;
          link: string;
        };
      };
}

export interface StatusModel {
  genderCompleted: boolean,
  response: {
    rsvp: boolean,
    bus: boolean,
    location: string,
    email: string | null,
  },
  emptyResponse: {
    rsvp: boolean,
    bus: boolean,
    location: string,
    email: string | null,
  },
  criticalError: boolean,
  hasResponded: boolean,
  confirmation: boolean,
  timeout: any,
  bus: boolean,
  busLocations: string[],
  busWarning: string,
  feedback: boolean,
  social: any,
  parent: any,
  picker: any,
  date: string,
  university: any,
  allUniversities: string[],
  dropzoneOptions: any,
  subheaders: string[]
  application: {
    name: string,
    email: string,
    school_year: any,
    shirt_size: any,
    dietary_restrictions: any,
    hackathons: any,
    github: string,
    linkedin: string,
    website: string,
    phone: string,
    emergency_phone: string,
  },
  links: string[],
  story: string,
  custom: boolean,
  name: string,
  step: number,
  email: string,
  select: any,
  items: string[],
  hackathons: string[],
  food: string[],
  shirts: string[],
  checkbox: boolean,
}

export interface ApplyState {
  loading: boolean;
  feedback: string;
  confirmClear: boolean;
  loadingMessage: string;
  bannerColor: string;
  bannerMessage: string;
  current_time: Date;
  // Todo: type this as a Firestore object
  appFirestorePath: any;
  applicationStatus: applicationStatus;
}

export interface SignupState {
  drawer: null,
  email: null | string,
  password: null,
  password_repeat: null,
  feedback: null | string,
  ip_address: null,
  geo: null,
}

export interface AutofillData {}

export interface FormValidation {
  name: {required: any; maxLength: string};
  email: {required: any; email: string};
  select: {required: any};
  checkbox: {required: any};
  university: {in: any};
}

type discovered_by =
  | 'A friend'
  | 'MLH'
  | 'Facebook'
  | 'Twitter'
  | 'Posters'
  | 'Instagram'
  | 'Snapchat'
  | 'Other';

type race =
  | 'Black / African American'
  | 'Hispanic'
  | 'East Asian'
  | 'South Asian'
  | 'Middle Eastern'
  | 'Native American'
  | 'White / Caucasian'
  | 'Multiple ethnicity / Other'
  | 'Prefer not to say';

type year =
  | 'First Year'
  | 'Second Year'
  | 'Third Year'
  | 'Fourth Year'
  | 'Fifth Year'
  | 'Sixth Year';

type relation =
  | 'Parent'
  | 'Grandparent'
  | 'Sibling'
  | 'Partner'
  | 'Friend'
  | 'Guardian'
  | 'Other';

type citites =
  | '(Type your own option)'
  | 'Hamilton'
  | 'Toronto'
  | 'Waterloo'
  | 'London'
  | 'Montreal'
  | 'Ottawa'
  | 'Mississauga'
  | 'Guelph'
  | 'Burlington'
  | 'Brampton'
  | 'Markham'
  | 'Milton';

type shirt_size = 'XS' | 'S' | 'M' | 'L' | 'XL';

type degree = 'Bachelors' | 'Masters' | 'PhD';

type gender = 'M' | 'F' | 'O';

type applicationStatus = 'in progress' | 'submitted';
