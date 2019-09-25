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
